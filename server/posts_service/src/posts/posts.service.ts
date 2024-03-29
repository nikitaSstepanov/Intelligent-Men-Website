import { Injectable } from "@nestjs/common";
import { IPostsService } from "./interfaces/posts-service.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PostsEntity } from "./entities/posts.entity";
import { LikesEntity } from "src/likes/entities/likes.entity";
import { TagsEntiy } from "./entities/tags.entity";
import { FilesService } from "../files/files.service";
import { GetUserIdDto } from "./dto/get-user-id.dto";
import { GetTagAndUserIdDto } from "./dto/get-tag-and-user-id.dto";
import { GetPostIdAndUserIdDto } from "./dto/get-post-id-and-user-id.dto";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { GetPostIdDto } from "./dto/get-post-id.dto";
import { CommentsService } from "src/comments/comments.service";

@Injectable()
export class PostsService implements IPostsService {

    constructor(
        @InjectRepository(PostsEntity)
        private readonly postsRepository: Repository<PostsEntity>,
        @InjectRepository(LikesEntity)
        private readonly likesRepository: Repository<LikesEntity>,
        @InjectRepository(TagsEntiy)
        private readonly tagsRepository: Repository<TagsEntiy>,
        private readonly commentsService: CommentsService,
        private readonly filesService: FilesService,
    ) {}

    async findAllPosts(dto: GetUserIdDto): Promise<PostsArray> {
        const posts = await this.postsRepository.find({
            order: { id: "DESC" },
            take: Number(dto.paginationLimit),
            skip: (Number(dto.paginationPage) - 1) * Number(dto.paginationLimit),
        });
        const result = { posts: [] };
        for (const post of posts) {
            const readyPost = await this.preparePost(post, Number(dto.userId));
            result.posts.push(readyPost);
        }
        return result;
    }

    async findAllPostsByTag(dto: GetTagAndUserIdDto): Promise<PostsArray> {
        const tag = await this.tagsRepository.findOne({
            where: { name: dto.tag },
            relations: { posts: true },
        });
        const posts = tag.posts;
        const result = { posts: [] };
        for (const post of posts) {
            const readyPost = await this.preparePost(post, Number(dto.userId));
            result.posts.push(readyPost);
        }
        return result;
    }

    async findOnePost(dto: GetPostIdAndUserIdDto): Promise<Post | Empty> {
        const post = await this.postsRepository.findOne({
            where: { id: Number(dto.postId) },
        });
        if (post) {
            const readyPost = await this.preparePost(post, Number(dto.userId));
            return readyPost;
        } else {
            return {};
        }
    }

    async createPost(dto: CreatePostDto): Promise<Empty> {
        const post = new PostsEntity();
        post.title = dto.title;
        post.contentDir = dto.contentDir;
        post.authorId = Number(dto.authorId);
        post.tags = await this.findTags(dto.text);
        await this.postsRepository.save(post);
        return {};
    }

    async updPost(dto: UpdatePostDto): Promise<DirectoryName> {
        let post = await this.postsRepository.findOne({
            where: { id: Number(dto.id) },
        });
        if (dto.title) {
            post.title = dto.title;
        }
        if (dto.authorId) {
            post.authorId = Number(dto.authorId);
        }
        await this.updTags(dto.text, post.id);
        await this.postsRepository.save(post);
        return { name: post.contentDir }; 
    }

    async delPost(dto: GetPostIdDto): Promise<Empty> {
        const post = await this.postsRepository.findOne({
            where: { id: Number(dto.postId) },
            relations: { comments: true, tags: true},
        });
        for (const comment of post.comments) {
            await this.commentsService.delComment({ commentId: String(comment.id) });
        } 
        await this.filesService.deleteFiles({ mode: "posts", "filesDir": post.contentDir });
        await this.likesRepository.delete({ postId: post.id });
        await this.postsRepository.remove(post);
        return {};
    }

    private async preparePost(post: PostsEntity, userId: number): Promise<Post> {
        const like = await this.likesRepository.findOne({
            where: {
                userId,
                postId: post.id,
            },
        });
        let isLiked = false;
        if (like) {
            isLiked = true;
        }
        const filesIds = await this.filesService.getFilesIds({ mode: "posts", filesDir: post.contentDir });
        const readyPost: Post = {
            id: String(post.id),
            title: post.title,
            filesIds: filesIds.ids,
            likesNumber: String(post.likesNumber),
            authorId: String(post.authorId),
            commentsNumber: String(post.commentsNumber),
            isLiked,
        };
        return readyPost;
    }

    private async findTags(text: string): Promise<TagsEntiy[]> {
        const tagsNames = await this.findTagsInText(text);
        const tagsArray: TagsEntiy[] = [];
        for (const tagName of tagsNames) {
            let tag = await this.tagsRepository.findOne({
                where: { name: tagName },
            });
            if (!tag) {
                const newTag = new TagsEntiy();
                newTag.name = tagName;
                tag = await this.tagsRepository.save(newTag);
            }
            tagsArray.push(tag);
        }
        return tagsArray;
    }

    async findTagsInText(text: string): Promise<string[]> {
        const tags: string[] = [];
        let isTag = false;
        let tag = "";
        for (const symbol of text) {
            if (symbol === "#") {
                isTag = true;
            } else if (isTag === false) {
                continue;
            } else if (symbol != " ") {
                tag += symbol;
            } else if (symbol === " ") {
                tags.push(tag);
                isTag = false;
                tag = "";
            }
        }
        if (tag != "") {
            tags.push(tag);
        }
        return tags;
    }

    async updTags(text: string, postId: number): Promise<void> {
        const newTags = await this.findTagsInText(text);
        const post = await this.postsRepository.findOne({
            where: { id: postId },
            relations: { tags: true },
        });
        const tags = post.tags;
        for (const tagName of newTags) {
            let tag = await this.tagsRepository.findOne({
                where: { name: tagName },
            });
            if (!tag) {
                const newTag = new TagsEntiy();
                newTag.name = tagName;
                tag = await this.tagsRepository.save(newTag);
            }
            const check = tags.some((t) => {
                return t.name == tag.name;
            });
            if (!check) {
                tags.push(tag);
            }
        }
        post.tags = tags;
        await this.postsRepository.save(post);
    }

}