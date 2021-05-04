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
export const getReactionsOfPost = baseURL + "/api/reaction/post/user";
export const followUser = baseURL + "/api/follows/follow/[[username]]";
export const unfollowUser = baseURL + "/api/follows/unfollow/[[username]]";
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////                     POST
export const getAllPosts = baseURL + "/api/posts/getAll";
export const getAllQuickPosts = baseURL + "/api/posts/getAll/category/name/QuickPost";
export const getAllQuickPostsOfFollowing = baseURL + "/api/posts/getAll/following/category/name/QuickPost?includeSelf=true";
export const getPostById = baseURL + "/api/posts/getById/[[id]]";
export const getPostByUsername = baseURL + "/api/user/getPostsByUsername/[[username]]";
export const createNewPost = baseURL + "/api/posts/new";
export const likePostById = baseURL + "/api/reaction/post/[[id]]/like";
export const dislikePostById = baseURL + "/api/reaction/post/[[id]]/dislike";

export const getPostReactionsOfUser = baseURL + "/api/reaction/posts/user/[[username]]?reaction=[[reaction]]";
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////                     CATEGORY
export const getAllCategories = baseURL + "/api/category/getAllCategories";
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////                     HASHTAG
export const getAllHashtags = baseURL + "/api/hashtags/getAllHashtags";

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////                     COMMENTS
export const getAllCommentsOfUser = baseURL + "/api/user/getCommentsByUsername/[[username]]";
export const getCommentById = baseURL + "/api/comments/getCommentByPostId/[[id]]";
export const postComment = baseURL + "/api/comments/newComment";
export const dislikeCommentById = baseURL + "/api/reaction/comment/[[id]]/dislike";
export const likeCommentById = baseURL + "/api/reaction/comment/[[id]]/like";

export const getCommentReactionsOfUser = baseURL + "/api/reaction/comments/user/[[username]]?reaction=[[reaction]]";

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////                     LOGIN
export const login = baseURL + "/api/login";