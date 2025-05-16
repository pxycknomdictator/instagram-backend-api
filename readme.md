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

This document outlines the API routes for an Express.js-based web application, using the base path `http://localhost:<port>/api/v1`. The API supports core social media features, including user authentication, posts, comments, likes, stories, user profiles, and real-time private messaging and notifications.

## API Routes

All routes require the base path `http://localhost:<port>/api/v1`. Endpoints marked with 🔒 require a valid JWT token in the `Authorization` header (e.g., `Bearer <token>`).

### Authentication Routes 🔐

| Method | Endpoint                            | Description                                    | Authentication |
|--------|-------------------------------------|------------------------------------------------|----------------|
| POST   | `/login`                            | Authenticate user with credentials 🧑‍💻        | None           |
| POST   | `/signup`                           | Register a new user account 📝                 | None           |
| POST   | `/renew-tokens`                     | Refresh user authentication tokens 🔄          | None           |
| GET    | `/logout`                           | Log out user 🚪                               | 🔒 Required    |
| POST   | `/account/forgot-password`          | Request a password reset link 🔑               | None           |
| POST   | `/account/reset-password`           | Reset user password 🔒                        | None           |
| GET    | `/account/reset-password-form`      | Display password reset form 📄                 | None           |
| GET    | `/account/verify-email`             | Verify email address via link 📧               | None           |
| POST   | `/account/verify-email`             | Send verification email 📧                     | 🔒 Required    |
| POST   | `/account/verify-by-code`           | Verify email using a code 📨                   | None           |
| DELETE | `/account/delete`                   | Delete user account 🗑️                        | 🔒 Required    |

### Posts Routes 📸

| Method | Endpoint                     | Description                                    | Authentication |
|--------|------------------------------|------------------------------------------------|----------------|
| GET    | `/posts`                     | Retrieve all posts 📜                          | None           |
| POST   | `/posts`                     | Create post (single file: `post`) 🖼️          | 🔒 Required    |
| GET    | `/posts/:postId`             | Retrieve specific post 🔍                      | None           |
| DELETE | `/posts/:postId`             | Delete post 🗑️                                | 🔒 Required    |

### Comments Routes 💬

| Method | Endpoint                     | Description                                    | Authentication |
|--------|------------------------------|------------------------------------------------|----------------|
| GET    | `/comments`                  | Retrieve all comments 🗣️                      | None           |
| POST   | `/comments`                  | Create comment ✍️                             | 🔒 Required    |
| PATCH  | `/comments/:commentId`       | Update comment 📝                             | 🔒 Required    |
| DELETE | `/comments/:commentId`       | Delete comment 🗑️                             | 🔒 Required    |

### Likes Routes ❤️

| Method | Endpoint                     | Description                                    | Authentication |
|--------|------------------------------|------------------------------------------------|----------------|
| POST   | `/likes`                     | Add like 👍                                    | 🔒 Required    |
| DELETE | `/likes/:postId`             | Remove like 👎                                 | 🔒 Required    |

### Stories Routes 📹

| Method | Endpoint                     | Description                                    | Authentication |
|--------|------------------------------|------------------------------------------------|----------------|
| POST   | `/stories`                   | Upload story (single file: `story`) 🎥         | 🔒 Required    |
| GET    | `/stories/:storyId`          | Retrieve specific story 📺                    | None           |
| PATCH  | `/stories/:storyId/view`     | Increment story views 👀                      | None           |
| DELETE | `/stories/:storyId`          | Delete specific story 🗑️                      | 🔒 Required    |
| DELETE | `/stories`                   | Delete all user stories 🗑️                    | 🔒 Required    |

### User Profile Routes 🧑

| Method | Endpoint                            | Description                                    | Authentication |
|--------|-------------------------------------|------------------------------------------------|----------------|
| GET    | `/profile/:username`                | Retrieve user profile by username 👤           | None           |
| GET    | `/profile/current-user`             | Retrieve current user profile 🪞              | 🔒 Required    |
| PATCH  | `/account/edit`                     | Update user settings ⚙️                       | 🔒 Required    |
| PATCH  | `/profile/avatar`                   | Update avatar (single file: `avatar`) 🖼️      | 🔒 Required    |
| DELETE | `/profile/avatar`                   | Remove avatar 🗑️                             | 🔒 Required    |
| PUT    | `/profile/change-password`          | Change password 🔒                            | 🔒 Required    |
| POST   | `/profile/:userId/follow`           | Follow user ➕                                 | 🔒 Required    |
| DELETE | `/profile/:userId/unfollow`         | Unfollow user ➖                               | 🔒 Required    |
| GET    | `/profile/:username/followers`      | Retrieve user's followers 👥                   | None           |
| GET    | `/profile/:username/following`      | Retrieve user's following list 👥              | None           |

### Messages Route 📩

| Method | Endpoint                     | Description                                    | Authentication |
|--------|------------------------------|------------------------------------------------|----------------|
| GET    | `/messages/:username`        | Retrieve conversations for a user 📬           | 🔒 Required    |

### Health Check Route 🩺

| Method | Endpoint                     | Description                                    | Authentication |
|--------|------------------------------|------------------------------------------------|----------------|
| GET    | `/health`                    | Check API health ✅                            | None           |

## Route Details

- **Authentication Routes**:
  - Handle user login, signup, token refresh, logout, and account management (password reset, email verification, account deletion).
  - Example: `POST /login` expects `{ email, password }` and returns JWT tokens.
- **Posts Routes**:
  - Manage social media posts, including creation (with file upload), retrieval, and deletion.
  - Example: `POST /posts` requires a multipart form with a `post` file.
- **Comments Routes**:
  - Allow users to view, create, update, or delete comments on posts.
  - Example: `POST /comments` expects `{ text: string }`.
- **Likes Routes**:
  - Enable liking and unliking posts.
  - Example: `POST /likes` expects `{ postId: string }`.
- **Stories Routes**:
  - Support story uploads, views, and deletions.
  - Example: `POST /stories` requires a multipart form with a `story` file.
- **User Profile Routes**:
  - Manage user profiles, avatars, passwords, and follow/unfollow actions.
  - Example: `PATCH /profile/avatar` requires a multipart form with an `avatar` file.
- **Messages Route**:
  - Retrieve private conversations between the authenticated user and a specified user.
  - Middleware: `validateAuth` ensures JWT authentication.
  - Example: `GET /messages/johndoe` returns `[{ id: 1, recipient: "johndoe", message: "Hello!", timestamp: "2025-05-16T12:13:00Z" }, ...]`.
- **Health Check Route**:
  - Verify API availability.
  - Example: `GET /health` returns `{ status: "OK" }`.

## Error Handling

- **400 Bad Request**: Invalid request body or parameters.
- **401 Unauthorized**: Missing or invalid JWT token.
- **404 Not Found**: Resource (e.g., post, user) not found.
- **500 Internal Server Error**: Unexpected server issues.

## Real-Time Private Messaging and Notifications 📡

The API supports **real-time private messaging** and **notifications** to enable instant communication between users. Private messaging allows users to send and receive messages in real time, with messages stored in MongoDB for persistence. Notifications are triggered for events like new messages, likes, follows, or other interactions.

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

The `compose.yml` defines the service configuration for the API and MongoDB.

### Environment Setup 🌐

1. **Create a `.env` file** in the project root to configure environment variables. Example:
   ```plaintext
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