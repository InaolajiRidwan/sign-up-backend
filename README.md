project/
│── server.js               # Entry point
│── .env                    # Environment variables
│── package.json            # Dependencies & scripts
│
├── models/                 # Mongoose schemas
│   └── User.js
│
├── controllers/            # Business logic
│   └── userController.js
│
├── services/               # Helper services (e.g., auth, email)
│   └── authService.js
│
├── middleware/             # Middlewares (auth, errors, logging)
│   ├── authMiddleware.js
│   └── errorMiddleware.js
│
├── routes/                 # API route definitions
│   └── userRoutes.js


🔑 Keywords & Concepts
🟢 MongoDB

🗄️ Database: A NoSQL database used to store data in JSON-like documents.

📂 Collection: Similar to a table in SQL; holds multiple documents.

📑 Document: A single record in MongoDB, stored in key-value pairs (like JSON).

📝 Schema: Defines the structure of a document (used in Mongoose).

🔄 CRUD: Create, Read, Update, Delete – basic operations on the database.

🆔 ObjectId: Unique identifier automatically assigned to each document.

⚡ Express.js

🚀 Express: A Node.js web framework for building APIs and servers.

🌐 Route: Defines the endpoint (URL) and HTTP method (GET, POST, PUT, DELETE).

📥 Request (req): Data coming from the client (e.g., body, params, query).

📤 Response (res): Data sent back from the server to the client.

🛠️ Middleware: Functions that run between the request and response (e.g., logging, authentication).

🐹 Mongoose

🔗 ODM (Object Data Modeling): A library to connect MongoDB with Node.js.

🏗️ Model: A constructor compiled from a Schema that creates and manages documents.

✅ Validation: Ensures data meets specific rules before being saved.

🤝 Populate: A method to link documents across collections (like relationships).

🌍 dotenv

🔐 Environment Variables: Securely store sensitive information (API keys, database URLs, secrets).

📄 .env file: File where environment variables are stored (not pushed to GitHub).

💻 process.env: The way to access variables in Node.js.

🛡️ Middleware

⚙️ Application-level middleware: Applied to all routes (e.g., app.use(express.json())).

🎯 Route-level middleware: Applied to specific routes.

🚨 Error-handling middleware: Catches and handles errors ((err, req, res, next)).

🔍 Authentication middleware: Verifies user identity from a token or session.

👮 Authorization middleware: Checks if the authenticated user has the right role or permission to access certain resources (e.g., only admins can see all users).

🧑‍💻 Controller

📌 Functionality: Controllers act as the “brain” of the application.

🔄 Role: They handle incoming requests, call the appropriate services or models, and send back responses.

📑 Examples:

Handling registration and login.

Returning a list of users (only if authorized).

Updating or deleting a record in MongoDB.

🏗️ Model

📌 Functionality: Models define the shape of data and interact with the database.

🔄 Role: Used to query MongoDB (create, read, update, delete documents).

📑 Examples:

A User model with username, email, password, and role.

A Post model with title, body, author.

🔑 Authorization (with JWT & Roles)

📌 Functionality: Ensures only the right people can access specific routes.

🆔 Authentication vs Authorization:

Authentication: Confirms who the user is (e.g., via JWT token).

Authorization: Confirms what the user can do (e.g., admin vs normal user).

🔒 Use Case:

Normal users can only access their profile.

Admins can access /all-users.

🔒 bcryptjs

🔑 Hashing: Converts passwords into an unreadable format before storing.

🧂 Salt: Random data added to the password before hashing to strengthen security.

🔍 Compare: Verifies entered password against the stored hash.

🛡️ Security: Ensures passwords are not stored in plain text.

🔑 jsonwebtoken (JWT)

🎫 JWT: A compact, secure way to transmit information between client and server.

🆔 Payload: Contains the user data (e.g., id, email, role).

🔏 Signature: Ensures the token has not been tampered with.

⏳ Expiration: Tokens can have a time limit for added security.

🔒 Authentication: Commonly used for login sessions in APIs.

👮 Authorization with role: Decides whether a user can access admin-only or user-only routes.

📧 nodemailer

📮 Nodemailer: A Node.js library to send emails.

✉️ Transporter: Defines the email service configuration (e.g., Gmail, SMTP).

📨 Mail Options: Defines the sender, recipient, subject, and body of an email.

🔔 Use Case: Send verification emails, password reset links, notifications.

🧾 Regex (Regular Expressions)

🔍 Regex: A pattern-matching language for searching and validating strings.

✅ Validation: Used to check formats (e.g., emails, phone numbers, passwords).

🔄 Search & Replace: Find and modify parts of a string.

⚡ Examples:

^[A-Za-z0-9]+$ → Matches only letters and numbers.

^\S+@\S+\.\S+$ → Matches a valid email format.
