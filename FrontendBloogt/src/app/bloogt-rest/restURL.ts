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
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////                     POST
export const getAllPosts = baseURL + "/api/posts/getAllPosts";
export const getPostById = baseURL + "/api/posts/getPostById/[[id]]";
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////                     CATEGORY
export const getAllCategories = baseURL + "/api/category/getAllCategories";
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////                     HASHTAG
export const getAllHashtags = baseURL + "/api/hashtags/getAllHashtags";

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////                     COMMENTS
export const getCommentById = baseURL + "/api/comments/getCommentByPostId/[[id]]";