import { Injectable } from "@nestjs/common";
import { IPostsService } from "./interfaces/posts-service.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PostsEntity } from "./entities/posts.entity";
import { LikesEntity } from "src/likes/entities/likes.entity";
import { TagsEntiy } from "./entities/tags.entity";
import { CommentsLikesEntity } from "../likes/entities/comments-likes.entity";
import { FilesService } from "../files/files.service";
import { GetUserIdDto } from "./dto/get-user-id.dto";
import { GetTagAndUserIdDto } from "./dto/get-tag-and-user-id.dto";
import { GetPostIdAndUserIdDto } from "./dto/get-post-id-and-user-id.dto";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { GetPostIdDto } from "./dto/get-post-id.dto";

@Injectable()
export class PostsService implements IPostsService {

    constructor(
        @InjectRepository(PostsEntity)
        private readonly postsRepository: Repository<PostsEntity>,
        @InjectRepository(LikesEntity)
        private readonly likesRepository: Repository<LikesEntity>,
        @InjectRepository(TagsEntiy)
        private readonly tagsRepository: Repository<TagsEntiy>,
        @InjectRepository(CommentsLikesEntity)
        private readonly commentsLikesRepository: Repository<CommentsLikesEntity>,
        private readonly filesService: FilesService,
    ) {}

    async findAllPosts(dto: GetUserIdDto): Promise<PostsArray> {
        const posts = await this.postsRepository.find();
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
        post.contentDir = await this.filesService.saveFiles("posts", dto.text, dto.photos, dto.videos);
        post.authorId = Number(dto.authorId);
        post.tags = await this.findTags(dto.text);
        await this.postsRepository.save(post);
        return {};
    }

    async updPost(dto: UpdatePostDto): Promise<Empty> {
        let post = await this.postsRepository.findOne({
            where: { id: Number(dto.id) },
        });
        if (dto.title) {
            post.title = dto.title;
        }
        if (dto.authorId) {
            post.authorId = Number(dto.authorId);
        }
        if (dto.delPhotos) {
            await this.filesService.delFilesSeparatly(dto.delPhotos, "posts", post.contentDir, "photos");
        }
        if (dto.delVideos) {
            await this.filesService.delFilesSeparatly(dto.delVideos, "posts", post.contentDir, "videos");
        }
        await this.filesService.updFiles("posts", post.contentDir, dto.text, dto.photos, dto.videos);
        await this.postsRepository.save(post);
        return {}; 
    }

    async delPost(dto: GetPostIdDto): Promise<Empty> {
        const post = await this.postsRepository.findOne({
            where: { id: Number(dto.postId) },
            relations: { comments: true },
        });
        for (const comment of post.comments) {
            await this.commentsLikesRepository.delete({ commentId: comment.id });
        }
        await this.filesService.delFiles("posts", post.contentDir);
        await this.likesRepository.delete({ postId: post.id });
        await this.postsRepository.delete(Number(dto.postId));
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
        const postFiles = await this.filesService.getFiles("posts", post.contentDir);
        const readyPost: Post = {
            id: String(post.id),
            title: post.title,
            text: postFiles.text,
            photos: postFiles.photos,
            videos: postFiles.videos,
            likesNumber: String(post.likesNumber),
            authorId: String(post.authorId),
            commentsNumber: String(post.commentsNumber),
            isLiked,
        };
        return readyPost;
    }

    private async findTags(text: string): Promise<TagsEntiy[]> {
        const tagsNames = await this.filesService.findTagsInText(text);
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

}