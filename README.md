# TaskFlow – Task / To-Do Management System

TaskFlow is a simple web-based task management application designed for students and small teams.  
It allows users to create, track, and manage tasks with due dates, priorities, and statuses in one centralized place.

This project is developed as part of **CP476 – Web Development** and is built using a provided Docker-based lab environment.

## 📌 Project Objectives
- Help users organize tasks and reduce missed deadlines
- Provide clear visibility into task progress
- Practice full-stack web development using industry-standard tools
- Apply Agile planning concepts (user stories, sprints, Kanban)

## 👥 Target Users
- Students managing assignments and personal to-dos
- Small teams (2–5 people) coordinating tasks for a class project or club

## 🚀 Features

### Must Have
- User registration and login
- Create, view, update, and delete tasks
- Task fields: title, description, status, priority, due date
- Filter tasks by status
- Server-side validation
- Basic security (authentication, authorization, SQL injection prevention)

### Should Have
- Search tasks by keyword
- Sort tasks by due date or priority
- Task details page
- Overdue task indicator

### Could Have
- Team workspace with shared tasks
- Tags/labels
- Activity log

## 🛠 Tech Stack

### Frontend
- React (NextJS)
- Tailwind CSS (styling)

### Backend
- PHP

### Database
- MySQL

### Environment
- Docker (provided Web Development Lab)

## 👨‍👩‍👧 Team

| Role | Name |
|-----|------|
| Project Lead / Coordinator | Ryan Wilson |
| Frontend Lead | Patrick Oiwoh |
| Backend / Database Lead | Jeremy Joanes |

Roles may rotate in later milestones.

How to Run TaskFlow Locally
Prerequisites

Before running the project, ensure you have:

Node.js (v18+ recommended)

MySQL Server installed and running

MySQL Workbench (for database setup)

1. Database Setup

Open MySQL Workbench

Connect to your local MySQL instance

Run the following:

CREATE DATABASE taskflow;
USE taskflow;

Create tables:

CREATE TABLE Users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Tasks (
  task_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  status ENUM('Pending','In Progress','Completed') NOT NULL DEFAULT 'Pending',
  priority ENUM('Low','Medium','High') NOT NULL DEFAULT 'Medium',
  due_date DATE NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_tasks_user
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
    ON DELETE CASCADE
);

2. Backend Setup

Navigate to backend folder:

cd backend

Install dependencies:

npm install

Create a .env file inside the backend folder:

PORT=3001
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=YOUR_PASSWORD
DB_NAME=taskflow
DB_PORT=3306

Start the backend server:

node src/server.js

Backend will run at:

http://localhost:3001

Test endpoint:

http://localhost:3001/api/health

3. Frontend Setup

Open a new terminal window.

Navigate to frontend folder:

cd frontend

Install dependencies:

npm install

Start the development server:

npm run dev

Frontend will run at:

http://localhost:3000

4. Running the Full Application

Ensure MySQL server is running.

Start backend (node src/server.js)

Start frontend (npm run dev)

Open browser at:

http://localhost:3000

Project Structure
todo-app-476/
│
├── frontend/   (Next.js UI)
├── backend/    (Node.js + Express API)
└── database/   (MySQL schema)
