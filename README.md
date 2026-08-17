# User Management App

A simple CRUD web application built with **Node.js**, **Express**, **MongoDB (Mongoose)**, and **EJS** for managing user records — with pagination, search, and full create/read/update/delete functionality.

## Features

- 📋 **List users** — paginated view of all users (cursor-based pagination using `lastId`, with continuous row numbering via `count`)
- ➕ **Add user** — create a new user with a country dropdown list
- 👁️ **View user** — see full details of a single user
- ✏️ **Edit user** — update an existing user's data
- 🗑️ **Delete user** — remove a user from the database
- 🔍 **Search** — search users by first name or last name (case-insensitive, supports multi-word queries)

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose ODM
- **Templating:** EJS
- **Other:** `method-override` (for PUT/DELETE from HTML forms)

## Project Structure

```
├── controllers/
│   └── userController.js    # Route handler logic (CRUD, pagination, search)
├── model/
│   └── myDataSchema.js      # Mongoose User schema
├── data/
│   └── data.js              # Static country list used in add/edit forms
├── views/
│   ├── index.ejs            # Paginated user list
│   └── user/
│       ├── add.ejs
│       ├── view.ejs
│       ├── edit.ejs
│       └── search.ejs
├── routes/
│   └── userRoutes.js
├── app.js
└── package.json
```

## Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd <project-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (or configure your DB connection directly) with your MongoDB connection string:
   ```
   MONGO_URI=mongodb://localhost:27017/your-db-name
   PORT=3000
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Open your browser at:
   ```
   http://localhost:3000
   ```

## Routes

| Method | Route                          | Description                    |
|--------|---------------------------------|---------------------------------|
| GET    | `/`                              | List users (paginated)         |
| GET    | `/user/add`                      | Show add-user form              |
| POST   | `/user`                          | Create a new user               |
| GET    | `/view/:id`                      | View a single user              |
| GET    | `/edit/:id`                      | Show edit form for a user       |
| PUT    | `/edit/:id`                      | Update a user                   |
| DELETE | `/delete/:id`                    | Delete a user                   |
| GET    | `/search`                        | Search users by name            |

## Notes

- Pagination uses a **cursor-based** approach (`lastId`) rather than `skip`/`limit`, for better performance on large collections.
- Row numbering across pages stays continuous via a `count` query parameter passed along with each "Next" link.

## License

This project is open source and available for personal or educational use.
