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

This document outlines the API routes for an Express.js-based web application, using the base path `http://localhost:<port>/api/v1`. The API supports core social media features and includes real-time private messaging and notification capabilities.

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

## Real-Time Private Messaging and Notifications 📡

The API supports **real-time private messaging** and **notifications** to enable instant communication between users. Private messaging allows users to send and receive messages in real time, with messages stored in MongoDB for persistence. Notifications are triggered for events like new messages etc.

### Features

- **Private Messaging**: Users can join private conversation rooms and exchange messages instantly. Messages are saved in MongoDB for chat history retrieval.
- **Notifications**: Real-time alerts for new messages, likes, follows, or other interactions, with RESTful routes for managing notification state.
- **Security**: All real-time interactions require JWT authentication to ensure only authorized users can send or receive messages and notifications.

## Setup with Docker Compose 🐳

### Prerequisites 📋

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (for local development)

### Configuration ⚙️

The `compose.yml` defines:

### Environment Setup 🌐

1. **Create a `.env` file** in the project root to configure environment variables. Example:
   ```
   NODE_ENV=development
   PORT=3000
   DATABASE_URL=mongodb://mongodb:27017/instagram
   ARGON2_ROUND=10
   JWT_ACCESS_TOKEN_SECRET_KEY=your_access_secret
   JWT_REFRESH_TOKEN_SECRET_KEY=your_refresh_secret
   JWT_ACCESS_TOKEN_EXPIRY_TIME=1d
   JWT_REFRESH_TOKEN_EXPIRY_TIME=7d
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   RESEND_API_KEY=your_resend_api_key
   CLIENT_ORIGIN=http://localhost:3000
   ```
   Ensure sensitive information like `RESEND`, `CLOUDINARY`, and `JWT` secrets is securely generated and stored. 🔐

### Getting Started 🚀

1. **Clone repository**:
   ```bash
   git clone https://github.com/pxycknomdictator/instagram-backend-api.git
   cd instagram-backend-api
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Create and configure the `.env` file** as described above. 📝
4. **Start services**:
   ```bash
   docker-compose up
   ```

## License 📜

This project is licensed under the MIT License. See the [LICENSE](https://github.com/expressjs/express/blob/master/LICENSE) file for details.
