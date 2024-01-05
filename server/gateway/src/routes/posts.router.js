const { Router } = require("express");
const multer = require("multer");
const { getAllPosts, getAllPostsByTag, 
        getOnePost, createPost, 
        updatePost, deletePost, 
        getAllComments, getAllAnswers, 
        createComment, updateComment, 
        deleteComment, addLikeToPost, 
        removeLikeFromPost, addLikeToComment, 
        removeLikeFromComment, sendPhoto, 
        sendVideo } = require("../services/posts.service");

const postsRouter = Router();
const files = multer();

//Posts requests.
postsRouter.get("/api/posts", getAllPosts);
postsRouter.get("/api/posts/tags/:tag", getAllPostsByTag);
postsRouter.get("/api/posts/:id", getOnePost);
postsRouter.post("/api/posts/create", createPost);
postsRouter.put("/api/posts/update/:id", updatePost);
postsRouter.delete("/api/posts/delete/:id", deletePost);

//Comments requests.
postsRouter.get("/api/posts/comments/:id", getAllComments);
postsRouter.get("/api/posts/comments/answers/:id", getAllAnswers);
postsRouter.post("/api/posts/comments/create", createComment);
postsRouter.put("/api/posts/comments/update/:id", updateComment);
postsRouter.delete("/api/posts/comments/delete/:id", deleteComment);

//Likes requests.
postsRouter.post("/api/posts/likes/add/:id", addLikeToPost);
postsRouter.post("/api/posts/likes/remove/:id", removeLikeFromPost);
postsRouter.post("/api/posts/comments/likes/add/:id", addLikeToComment);
postsRouter.post("/api/posts/comments/likes/remove/:id", removeLikeFromComment);

//Files requests.
postsRouter.get("/api/posts/files/photo", sendPhoto);
postsRouter.get("/api/posts/files/video", sendVideo);

module.exports = postsRouter;