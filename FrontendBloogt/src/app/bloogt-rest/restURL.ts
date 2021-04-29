'use strict';

///////////////////////////////////////////////////////////////////////////////////////////////

export const protocol: string = "http"
export const url: string ='localhost';
export const port: number =8998;    

export const baseURL = protocol + "://" + url + ":" + port;

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////                     USER
export const getAllUsers = baseURL + "/api/user/getAllUsers";
export const getUserDetailsByUsername = baseURL + "/api/user/getUserByUsername/[[username]]";
export const getFollowingUsersByUsername = baseURL + "/api/follows/[[username]]/following";
export const getFollowedByUsersByUsername = baseURL + "/api/follows/[[username]]/followedBy";
export const registerUser = baseURL + "/api/user/newUser";
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////                     POST
export const getAllPosts = baseURL + "/api/posts/getAllPosts";
export const getPostById = baseURL + "/api/posts/getPostById/[[id]]";
export const getPostByUsername = baseURL + "/api/user/getPostsByUsername/[[username]]";
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////                     CATEGORY
export const getAllCategories = baseURL + "/api/category/getAllCategories";
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////                     HASHTAG
export const getAllHashtags = baseURL + "/api/hashtags/getAllHashtags";

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////                     COMMENTS
export const getCommentById = baseURL + "/api/comments/getCommentByPostId/[[id]]";
export const postComment = baseURL + "/api/comments/newComment";
export const dislikeCommentById = baseURL + "/api/reaction/comment/[[id]]/dislike";
export const likeCommentById = baseURL + "/api/reaction/comment/[[id]]/like";

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////                     LOGIN
export const login = baseURL + "/api/login";