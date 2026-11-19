# Blog REST API

A beginner-friendly REST API for managing blog posts. It uses Node.js and Express and supports all five CRUD operations.

## 1. Requirements

- Node.js (LTS version recommended)
- npm
- Postman, Thunder Client, or Insomnia for testing

## 2. Installation

Open a terminal in this project folder and run:

```bash
npm install
```

## 3. Start the server

For normal use:

```bash
npm start
```

For development with automatic restart:

```bash
npm run dev
```

Open `http://localhost:3000` in a browser. The welcome response confirms that the server is running.

## 4. API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/posts` | Retrieve all posts |
| GET | `/posts/:id` | Retrieve one post |
| POST | `/posts` | Create a post |
| PUT | `/posts/:id` | Update a post |
| DELETE | `/posts/:id` | Delete a post |

Optional query parameters for `GET /posts`:
- `search`: searches title, content, and author
- `category`: filters by category

Example: `GET http://localhost:3000/posts?category=Technology`

## 5. Example requests

### Create a post

`POST http://localhost:3000/posts`

Choose **Body → raw → JSON** in Postman:

```json
{
  "title": "My First Blog",
  "content": "This is the content of my first blog post.",
  "author": "Your Name",
  "category": "Technology"
}
```

### Get all posts

`GET http://localhost:3000/posts`

### Get one post

`GET http://localhost:3000/posts/1001`

### Update a post

`PUT http://localhost:3000/posts/1001`

```json
{
  "title": "Updated Blog Title",
  "category": "Education"
}
```

### Delete a post

`DELETE http://localhost:3000/posts/1001`

## 6. Status codes

- `200 OK`: request completed successfully
- `201 Created`: a post was created
- `400 Bad Request`: required data is missing or invalid
- `404 Not Found`: the requested post or route does not exist
- `500 Internal Server Error`: unexpected server error

## 7. Project structure

```text
blog-rest-api/
├── controllers/
│   └── postController.js
├── data/
│   └── posts.js
├── middleware/
│   └── errorMiddleware.js
├── routes/
│   └── postRoutes.js
├── .gitignore
├── app.js
├── package.json
├── README.md
└── server.js
```

## 8. Data storage note

This version uses an in-memory JavaScript array, which is one of the basic storage options allowed in the project brief. Changes are temporary and reset when the server restarts. MongoDB is listed as a bonus feature in the brief and is not included in this basic version.

## 9. Before submitting

1. Run the project locally and test each endpoint.
2. Replace the sample author names with your own test data.
3. Read the controller and route files so you can explain how each operation works.
4. Create your own GitHub repository and push the project.
5. Submit the repository URL through the course LMS.

This project is a starter implementation. Review, test, and adapt it so the submitted work reflects your understanding.
