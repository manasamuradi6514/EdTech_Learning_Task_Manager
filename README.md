📘 EdTech Learning Task Manager

A Full-Stack Role-Based Task Management System
Tech Stack: React, Node.js, Express, MongoDB

1️⃣ Overview

This project is a Student–Teacher Learning Task Manager, built as part of a take-home full-stack assignment.

It demonstrates:

->Authentication

->Role-based authorization

->Student–Teacher relationship

->Secure CRUD API design

->A clean React UI connected to a Node.js backend

Both students and teachers can manage tasks, but with different access permissions defined by the assignment.

2️⃣ Features
🔐 Authentication

->JWT-based login

->Email + password signup

->Password hashing using bcrypt

->Secure protected routes

🧑‍🏫 Role-Based Access Control
STUDENT

->Can view only their own tasks

->Can create, update, and delete only their tasks

->Must be linked to a teacher using teacherId

TEACHER

->Can view:

Tasks they created

Tasks belonging to students assigned to them

->Can edit/delete only tasks they created

->Cannot edit/delete tasks created by students

📝 Task Management

->Create task

->Edit progress (not-started, in-progress, completed)

->Delete task

->Optional due date

->Filter tasks on the UI

->Real-time updates after operations

💻 Frontend (React)

->Signup

->Login

->Dashboard with role-based UI

->Clean modern styling (CSS)

->Token stored in localStorage

🛠 Backend (Node.js + Express)

->REST APIs

->Mongoose models

->Role-check middleware

->Centralized error handling

->Input validation using express-validator




edtechtaskmanager/
│
├── client/           # React Frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│
├── server/           # Backend APIs
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── models/
│   ├── config/
│   ├── index.js
│   ├── package.json
│
└── README.md

4️⃣ Setup Instructions
🟦 Backend Setup

->Go to server folder:
cd server
npm install

->Create .env file:
MONGO_URI=mongodb://localhost:27017/edtech
JWT_SECRET=mysecret123
PORT=5000

->Start backend:
npm run dev

->Backend runs at:
http://localhost:5000

🟩 Frontend Setup
->
cd ../client
npm install
npm start

->Frontend runs at:
http://localhost:3000

 5️⃣Role Functionality (Teacher Task-View Logic)
 🧑‍🎓 Student Logic
 ->On signup:
 role = "student"
teacherId = <teacher_id>
->On fetching tasks:
GET /tasks → returns only tasks where userId === studentId

Students cannot see or modify teacher tasks.


🧑‍🏫 Teacher Logic

->Teacher can view:

Tasks they created

Tasks created by students assigned to them

->Backend query:
Task.find({
  $or: [
    { userId: teacherId },
    { userId: { $in: studentIds } }
  ]
})

Teacher can edit/delete only tasks they created, not student tasks.

7️⃣ AI Assistance Disclosure (Required in assignment)

->AI assistance was used only for:

Structuring the project

Writing boilerplate code

Improving readability

Generating documentation (README & styling suggestions)

->I personally implemented:

Authentication

JWT logic

Student–teacher relationship

Role-based access control

CRUD operations

Dashboard integration

Debugging & testing

8️⃣Known Issues

Teacher dropdown is not dynamically populated

No pagination for large task sets

Alerts can be replaced with better toast notifications

No global state management (Redux/Zustand)


9️⃣ Improvements (Future Work)

Add pagination for teacher view

Add date-based filtering (due this week, overdue)

Use toast notifications

Add profile settings

Deploy backend + frontend on Render

Add loading skeleton UI
