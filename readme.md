# Express.js API Documentation 🚀

<div align="center">
  <img src="https://camo.githubusercontent.com/86f61f7d4367c71a580e11af0bcd4f333d1b967225a679a12998657db1307dd3/68747470733a2f2f692e636c6f756475702e636f6d2f7a6659366c4c376546612d3330303078333030302e706e67" alt="Express.js Logo" width="250"/>
</div>

<div align="center" style="margin-top: 10px;">
  <a href="https://www.npmjs.com/package/express"><img src="https://img.shields.io/npm/v/express.svg" alt="NPM Version"/></a>
  <a href="https://github.com/expressjs/express"><img src="https://img.shields.io/github/stars/expressjs/express.svg" alt="GitHub Stars"/></a>
  <a href="https://github.com/expressjs/express/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/express.svg" alt="License"/></a>
</div>

<div align="center">
  <strong>Fast, unopinionated, minimalist web framework for Node.js</strong> ⚡️
</div>

<div align="center">
  <a href="https://expressjs.com/">Website</a> | 
  <a href="https://expressjs.com/en/5x/api.html">Documentation</a> | 
  <a href="https://github.com/expressjs/express">GitHub</a> | 
  <a href="https://www.npmjs.com/package/express">npm</a>
</div>

## Overview 📖

This document outlines the API routes for an Express.js-based web application, using the base path `http://localhost:<port>/api/v1`.

## Authentication Routes 🔐

- **POST /login**: Authenticate user with credentials 🧑‍💻
- **POST /signup**: Register a new user account 📝
- **POST /renew-tokens**: Refresh user authentication tokens 🔄
- **GET /logout**: Log out user (requires authentication) 🚪
- **POST /account/forgot-password**: Request a password reset link 🔑
- **POST /account/reset-password**: Reset user password 🔒
- **GET /account/reset-password-form**: Display password reset form 📄
- **GET /account/verify-email**: Verify email address via link 📧
- **POST /account/verify-email**: Send verification email (requires authentication) 📧
- **POST /account/verify-by-code**: Verify email using a code 📨
- **DELETE /account/delete**: Delete user account (requires authentication) 🗑️

## Posts Routes 📸

- **GET /posts**: Retrieve all posts 📜
- **POST /posts**: Create post (requires authentication, single file: `post`) 🖼️
- **GET /posts/:postId**: Retrieve specific post 🔍
- **DELETE /posts/:postId**: Delete post (requires authentication) 🗑️

## Comments Routes 💬

- **GET /comments**: Retrieve all comments 🗣️
- **POST /comments**: Create comment (requires authentication) ✍️
- **PATCH /comments/:commentId**: Update comment (requires authentication) 📝
- **DELETE /comments/:commentId**: Delete comment (requires authentication) 🗑️

## Likes Routes ❤️

- **POST /likes**: Add like 👍
- **DELETE /likes/:postId**: Remove like 👎

## Stories Routes 📹

- **POST /stories**: Upload story (single file: `story`) 🎥
- **GET /stories/:storyId**: Retrieve specific story 📺
- **PATCH /stories/:storyId/view**: Increment story views 👀
- **DELETE /stories/:storyId**: Delete specific story 🗑️
- **DELETE /stories**: Delete all user stories 🗑️

## User Profile Routes 🧑

- **GET /profile/:username**: Retrieve user profile by username 👤
- **GET /profile/current-user**: Retrieve current user profile 🪞
- **PATCH /account/edit**: Update user settings ⚙️
- **PATCH /profile/avatar**: Update avatar (single file: `avatar`) 🖼️
- **DELETE /profile/avatar**: Remove avatar 🗑️
- **PUT /profile/change-password**: Change password 🔒
- **POST /profile/:userId/follow**: Follow user ➕
- **DELETE /profile/:userId/unfollow**: Unfollow user ➖
- **GET /profile/:username/followers**: Retrieve user's followers 👥
- **GET /profile/:username/following**: Retrieve user's following list 👥

## Health Check Route 🩺

- **GET /health**: Check API health ✅

## Setup with Docker Compose 🐳

### Prerequisites 📋

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Configuration ⚙️

The `compose.yml` defines:

- **Application Service**: Runs Express.js app 🖥️
- **Database Service**: Configures MongoDB 🗄️

### Environment Setup 🌐

1. **Create a `.env` file** in the project root to configure environment variables. Example:
   ```
   NODE_ENV=
   PORT=
   DATABASE_URL=
   ARGON2_ROUND=
   JWT_ACCESS_TOKEN_SECRET_KEY=
   JWT_REFRESH_TOKEN_SECRET_KEY=
   JWT_ACCESS_TOKEN_EXPIRY_TIME=
   JWT_REFRESH_TOKEN_EXPIRY_TIME=
   CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=
   RESEND_API_KEY=
   CLIENT_ORIGIN=
   ```
   Ensure sensitive information like `RESEND AND CLOUDINARY` is securely generated and stored. 🔐

### Getting Started 🚀

1. **Clone repository**:
   ```bash
   git clone https://github.com/pxycknomdictator/instagram-backend-api.git
   cd instagram-backend-api
   ```
2. **Create and configure the `.env` file** as described above. 📝
3. **Start services**:
   ```bash
   docker-compose up
   ```
