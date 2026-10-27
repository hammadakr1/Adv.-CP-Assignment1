# Course API – Express.js + Modular MVC

REST API with **Authentication**, **Category CRUD** and **Course CRUD**.
Stack: Node.js, Express, MongoDB (Mongoose), JWT, bcryptjs, express-validator.

## Folder Structure
```
course-api/
├── server.js                  # entry point (DB connect + listen)
├── .env                       # PORT, MONGO_URI, JWT_SECRET
├── postman/                   # importable Postman collection
└── src/
    ├── app.js                 # express app, route mounting
    ├── config/db.js           # MongoDB connection
    ├── middleware/            # auth (JWT), validate (400), notFound (404), errorHandler
    ├── utils/                 # asyncHandler, ApiError
    └── modules/
        ├── auth/              # model, controller, routes, validation
        ├── category/          # model, controller, routes, validation
        └── course/            # model, controller, routes, validation
```

## Setup
```
npm install
npm run dev        # or: npm start
```
MongoDB must be running (local `mongodb://127.0.0.1:27017/course_api`)
or put your MongoDB Atlas connection string in `.env` as `MONGO_URI`.

## Endpoints
| Method | URL | Auth | Description |
|---|---|---|---|
| POST | /api/auth/register | – | Register (201) |
| POST | /api/auth/login | – | Login, returns JWT (200) |
| GET | /api/auth/me | Bearer | Current user |
| POST | /api/categories | Bearer | Create category (201) |
| GET | /api/categories | – | List categories (200) |
| GET | /api/categories/:id | – | Single category |
| PUT | /api/categories/:id | Bearer | Update |
| DELETE | /api/categories/:id | Bearer | Delete |
| POST | /api/courses | Bearer | Create course (needs valid category id) |
| GET | /api/courses | – | List (optional `?category=<id>&search=<text>`) |
| GET | /api/courses/:id | – | Single course |
| PUT | /api/courses/:id | Bearer | Update |
| DELETE | /api/courses/:id | Bearer | Delete |

Protected routes need header: `Authorization: Bearer <token>`

## Request bodies
Register: `{ "name": "Ali", "email": "ali@example.com", "password": "123456" }`
Login: `{ "email": "ali@example.com", "password": "123456" }`
Category: `{ "name": "Web Development", "description": "All web courses" }`
Course: `{ "title": "Node.js Basics", "description": "Learn Node", "price": 49.99, "category": "<categoryId>", "instructor": "Ahmed", "duration": "6 weeks", "level": "beginner" }`

## Postman Evidence Guide
1. **Screenshot 1** – POST /api/auth/register (201) and POST /api/auth/login (200).
2. **Screenshot 2** – POST /api/categories with Bearer token + body → **201 Created**.
3. **Screenshot 3** – GET /api/categories → **200 OK**.
4. **Screenshot 4** – POST /api/categories with body `{}` (name missing) → **400 Bad Request**.
5. **Screenshot 5** – GET /api/categories/123 (invalid ID) or GET /api/unknown → **404**.

Write your Name and Roll No. at the top of every page, and make sure the
URL, method, headers and response (status + body) are all visible.
