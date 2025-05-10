<div align="center">
  <img src="https://camo.githubusercontent.com/86f61f7d4367c71a580e11af0bcd4f333d1b967225a679a12998657db1307dd3/68747470733a2f2f692e636c6f756475702e636f6d2f7a6659366c4c376546612d3330303078333030302e706e67" alt="Express.js Logo" width="300"/>
</div>

<div align="center">

[![NPM Version](https://img.shields.io/npm/v/express.svg)](https://www.npmjs.com/package/express)
[![GitHub Stars](https://img.shields.io/github/stars/expressjs/express.svg)](https://github.com/expressjs/express)
[![License](https://img.shields.io/npm/l/express.svg)](https://github.com/expressjs/express/blob/master/LICENSE)

**Fast, unopinionated, minimalist web framework for Node.js**

[Website](https://expressjs.com/) | [Documentation](https://expressjs.com/en/5x/api.html) | [GitHub](https://github.com/expressjs/express) | [npm](https://www.npmjs.com/package/express)

</div>

# Express.js API Routes Documentation

This document outlines the API routes for a web application built with Express.js, all starting from the base path `http://localhost:<port>/api/v1`.

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

## Docker Compose Setup

This project includes a Docker Compose configuration to simplify the setup and deployment of the application and its dependencies.

### Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your machine
- [Docker Compose](https://docs.docker.com/compose/install/) installed

### Configuration

The `compose.yml` file defines the services required to run the application, including:

- **Application Service**: Runs the Express.js application
- **Database Service**: Configures a database (e.g., MongoDB) for persistent storage

### Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/pxycknomdictator/instagram-backend-api.git
   cd instagram-backend-api
   ```
