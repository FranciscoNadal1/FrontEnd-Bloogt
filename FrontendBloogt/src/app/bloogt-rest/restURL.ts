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
export const getAllPosts = baseURL + "/api/posts/getAll";;
export const moreLikedPostLasHour = baseURL + "/api/trending/betterPost/[[category]]/0/1";
export const lastsPostsExceptCategory = baseURL + "/api/trending/lastsPostsExceptCategory/[[category]]/0/5";
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
export const getAllPostsOfHashtag = baseURL + "/api/hashtags/getPostsOfHashtagByName/[[hashtag]]";
export const getLastTrendingHashtag = baseURL + "/api/trending/trendingLastHour/0/10";



///////////////////////////////////////////////////////////////////////////////////////////////
///////////////                     COMMENTS
export const getAllCommentsOfUser = baseURL + "/api/user/getCommentsByUsername/[[username]]";
export const getCommentById = baseURL + "/api/comments/getCommentByPostId/[[id]]";
export const postComment = baseURL + "/api/comments/newComment";
export const dislikeCommentById = baseURL + "/api/reaction/comment/[[id]]/dislike";
export const likeCommentById = baseURL + "/api/reaction/comment/[[id]]/like";

export const getCommentReactionsOfUser = baseURL + "/api/reaction/comments/user/[[username]]?reaction=[[reaction]]";

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////                     CHAT

export const getAllChatsUser = baseURL + "/api/chat/getAllChatsOfUser";
export const getChatById = baseURL + "/api/chat/getChat/[[id]]";
export const createNewChat = baseURL + "/api/chat/newChat/[[username]]";
export const sendMessage = baseURL + "/api/chat/newMessage/[[id]]";
export const getChatByI = baseURL + "/api/chat/getAllChatsOfUser";
export const getUnreadMessages = baseURL + "/api/chat/unreadMessages";



///////////////////////////////////////////////////////////////////////////////////////////////
///////////////                     LOGIN
export const login = baseURL + "/api/login";

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////                     FILE
export const uploadFiles = baseURL + "/api/files/upload";

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////                     NOTIFICATIONS
export const notificationCount = baseURL + "/api/notifications/count";
export const getSelfNotifications = baseURL + "/api/notifications/get";

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////                     STATISTICS
export const getUserStatistics = baseURL + "/api/charts/user/statistics/[[username]]";

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////                     SEARCH
export const searchUser = baseURL + "/api/search/user/[[username]]/5";
export const searchHashtag = baseURL + "/api/search/hashtag/[[hashtag]]/5";