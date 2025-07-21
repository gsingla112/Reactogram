# Reactogram

Reactogram is a fullstack social media application built with React, Node, Express, and MongoDB. Users can sign up, log in, create posts with images, like/unlike posts, and comment on posts.

## Project Structure

```
reactogram-be/      # Backend (Node.js, Express, MongoDB)
reactogram-fe/      # Frontend (React, Redux)
uploads/            # Uploaded images
```

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB (running locally at `mongodb://localhost:27017`)

### Backend Setup

1. Navigate to the backend folder:
   ```sh
   cd reactogram-be
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the backend server:
   ```sh
   node server.js
   ```
   Or for development with auto-reload:
   ```sh
   npx nodemon server.js
   ```
   The backend runs at [http://localhost:4000](http://localhost:4000).

### Frontend Setup

1. Navigate to the frontend folder:
   ```sh
   cd reactogram-fe
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend server:
   ```sh
   npm start
   ```
   The frontend runs at [http://localhost:3000](http://localhost:3000).

## Features

- User authentication (signup/login)
- Create, view, and delete posts with images
- Like/unlike posts
- Comment on posts
- View your profile and posts

## Technologies Used

- **Frontend:** React, Redux, Bootstrap, Axios, SweetAlert2
- **Backend:** Express, MongoDB, Mongoose, JWT, Multer, bcryptjs

## Folder Overview

- [`reactogram-be/server.js`](reactogram-be/server.js): Express server entry point
- [`reactogram-be/models/`](reactogram-be/models/): Mongoose models for User and Post
- [`reactogram-be/routes/`](reactogram-be/routes/): API routes for users, posts, and file uploads
- [`reactogram-fe/src/`](reactogram-fe/src/): React components, pages, Redux store, and configuration

## License

This project is licensed under the ISC License.

---

Feel free to contribute or