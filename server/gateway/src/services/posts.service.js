const { loadSync } = require("@grpc/proto-loader");
const { loadPackageDefinition, credentials } = require("@grpc/grpc-js");
const { resolve } = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

const URL = process.env.POSTS_SERVICE_URL;
const pkgDfnPosts = loadSync(resolve(__dirname, "..", "..", "grpc_protos", "posts.proto"));
const postsProto = loadPackageDefinition(pkgDfnPosts);
const postsService = new postsProto.posts.PostsService(URL, credentials.createInsecure());

//Posts functions.

const getAllPosts = async () => {}

const getAllPostsByTag = async () => {}

const getOnePost = async () => {}

const createPost = async () => {}

const updatePost = async () => {}

const deletePost = async () => {}

//Comments functions.

const getAllComments = async () => {}

const getAllAnswers = async () => {}

const createComment = async () => {}

const updateComment = async () => {}

const deleteComment = async () => {}

//Likes functions.

const addLikeToPost = async () => {}

const removeLikeFromPost = async () => {}

const addLikeToComment = async () => {}

const removeLikeFromComment = async () => {}

//Files functions.

const sendPhoto = async () => {}

const sendVideo = async () => {}

module.exports = {
    getAllPosts, getAllPostsByTag,
    getOnePost, createPost, 
    updatePost, deletePost,
    getAllComments, getAllAnswers,
    createComment, updateComment,
    deleteComment, addLikeToPost,
    removeLikeFromPost, addLikeToComment,
    removeLikeFromComment, sendPhoto,
    sendVideo,
};