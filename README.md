# Hono + PostgreSQL CRUD (Node.js)

🌐 **Available languages:**

-   [English](./README.md)
-   [Español](./README.es.md)

Complete example of a **CRUD** using the [Hono](https://hono.dev/) framework with **PostgreSQL** in **Node.js**.  
This project demonstrates how to connect Hono with PostgreSQL using the [`pg`](https://www.npmjs.com/package/pg) package and implement RESTful routes to **create, read, update, and delete users**.

⚠️ **Important**: This project **does not include a frontend**. It is designed as a **pure backend**, ideal for testing with tools like **Postman**, **cURL**, or integrating with any frontend (React, Vue, Angular, etc.).

---

## 🚀 Technologies

-   [Node.js](https://nodejs.org/) – Runtime environment.
-   [Hono](https://hono.dev/) – Fast and lightweight web framework for building APIs.
-   [PostgreSQL](https://www.postgresql.org/) – Relational database.
-   [`pg`](https://www.npmjs.com/package/pg) – Official PostgreSQL client for Node.js.

---

## 📂 Project structure

```
/hono-postgresql-crud
 ├── db.js         # Connection and automatic DB & tables creation
 ├── userRoutes.js # User CRUD routes
 ├── app.js        # Hono configuration and routes registration
 └── index.js      # Main server
```

---

## 🗄️ Database

On startup, the database and `users` table are automatically created if they don't exist:

```sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL
);
```

---

## 📌 CRUD Endpoints

### 1. **Create user**

**POST** `/users`

```json
{
    "name": "John Doe",
    "email": "john@example.com"
}
```

✅ **Success response:**

```json
{
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
}
```

❌ **If the email already exists:**

```json
{
    "error": "Email already exists"
}
```

---

### 2. **Get user by ID**

**GET** `/users/:id`

✅ **Response:**

```json
{
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
}
```

❌ **If not found:**

```json
{
    "error": "User not found"
}
```

---

### 3. **Update user**

**PUT** `/users/:id`

```json
{
    "name": "John Updated",
    "email": "john_updated@example.com"
}
```

✅ **Response:**

```json
{ "message": "User updated" }
```

❌ **If not found:**

```json
{ "error": "User not found" }
```

❌ **If email already exists:**

```json
{ "error": "Email already exists" }
```

---

### 4. **Delete user**

**DELETE** `/users/:id`

✅ **Response:**

```json
{ "message": "User deleted" }
```

❌ **If not found:**

```json
{ "error": "User not found" }
```

---

## ▶️ Running the project

1. **Clone the repository**

```bash
git clone https://github.com/your-username/hono-postgresql-crud.git
cd hono-postgresql-crud
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure PostgreSQL**

Ensure PostgreSQL is running on `localhost:5432` and update credentials in `db.js` if necessary:

```js
const config = {
    user: 'postgres',
    host: 'localhost',
    password: 'your_password',
    port: 5432,
};
```

4. **Run the server**

```bash
node index.js
```

Server will run at:

```
http://localhost:3000
```

---

## 🛠️ Testing the API

You can use:

-   [Postman](https://www.postman.com/)
-   [Insomnia](https://insomnia.rest/)
-   **cURL** in terminal

Example with cURL:

```bash
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name": "John Doe", "email": "john@example.com"}'
```

---

## ⭐ Contributing

If you find this project useful, give it a **star** ⭐ on GitHub.  
Any improvements or pull requests are welcome.

---

### 🔗 Topics

`hono` `postgresql` `nodejs` `crud` `api` `backend`
