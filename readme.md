# API Routes Documentation

This document outlines the API routes for a web application, all starting from the base path `http://localhost:<port>/api/v1`.

## Authentication Routes

- **POST /api/v1/renew-tokens**: Renew authentication tokens
- **GET /api/v1/logout**: Log out user (requires authentication)
- **POST /api/v1/login**: User login (validated with loginSchema)
- **POST /api/v1/signup**: User registration (validated with registerSchema)
- **DELETE /api/v1/account/delete**: Delete user account (requires authentication)
- **GET /api/v1/account/reset-password-form**: Get password reset form
- **POST /api/v1/account/forgot-password**: Initiate password reset (validated with forgotSchema)
- **GET /api/v1/account/verify-email**: Check email verification status
- **POST /api/v1/account/verify-email**: Verify email (requires authentication)
- **POST /api/v1/account/reset-password**: Reset password (validated with resetPasswordSchema)

## Comments Routes

- **GET /api/v1/comments**: Get all comments
- **POST /api/v1/comments**: Create a new comment (requires authentication, validated with commentSchema)
- **DELETE /api/v1/comments/:commentId**: Delete a specific comment (requires authentication)
- **PATCH /api/v1/comments/:commentId**: Update a specific comment (requires authentication, validated with commentSchema)

## Health Check Route

- **GET /api/v1/health**: Perform health check

## Likes Routes

- **POST /api/v1/likes**: Create a like (validated with likeSchema)
- **DELETE /api/v1/likes/:postId**: Remove a like

## Posts Routes

- **GET /api/v1/posts**: Get all posts
- **POST /api/v1/posts**: Create a new post (requires authentication, validated with postSchema, single file upload: "post")
- **GET /api/v1/posts/:postId**: Get a specific post
- **DELETE /api/v1/posts/:postId**: Delete a specific post (requires authentication)

## Stories Routes

- **POST /api/v1/stories**: Upload a new story (validated with storySchema, single file upload: "story")
- **DELETE /api/v1/stories**: Delete all user stories
- **GET /api/v1/stories/:storyId**: Get a specific story
- **DELETE /api/v1/stories/:storyId**: Delete a specific story
- **PATCH /api/v1/stories/:storyId/view**: Update story views

## User Profile Routes

- **GET /api/v1/profile/:username**: Get user profile by username
- **POST /api/v1/profile/:userId/follow**: Follow a user
- **DELETE /api/v1/profile/:userId/unfollow**: Unfollow a user
- **GET /api/v1/profile/:username/following**: Get users followed by username
- **GET /api/v1/profile/:username/followers**: Get followers of username
- **GET /api/v1/profile/current-user**: Get current user profile
- **PATCH /api/v1/account/edit**: Update user settings (validated with settingsSchema)
- **PATCH /api/v1/profile/avatar**: Update user avatar (single file upload: "avatar")
- **DELETE /api/v1/profile/avatar**: Delete user avatar
- **PUT /api/v1/profile/change-password**: Change user password (validated with passwordsSchema)
