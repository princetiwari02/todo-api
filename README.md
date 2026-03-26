# ✅ Todo API

A powerful Todo REST API with priorities, deadlines, categories, tags, status tracking, and overdue detection.

## ✨ Features
- Full CRUD for todos
- Priority levels: `low`, `medium`, `high`, `urgent`
- Status tracking: `pending`, `in-progress`, `completed`, `cancelled`
- Due dates with overdue filter
- Auto-sets `completedAt` timestamp
- Category & tag support
- Summary stats per user (count by status)
- Pagination & sorting

## 🛠 Tech Stack
- Node.js, Express.js, MongoDB + Mongoose, JWT + bcryptjs

## 🚀 Setup & Run
```bash
npm install && cp .env.example .env && npm run dev
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register |
| POST | `/api/auth/login` | Login |
| GET | `/api/todos` | Get all todos (filtered) |
| GET | `/api/todos/:id` | Get todo by ID |
| POST | `/api/todos` | Create todo |
| PUT | `/api/todos/:id` | Update todo |
| DELETE | `/api/todos/:id` | Delete todo |
| PATCH | `/api/todos/:id/complete` | Mark as complete |

## 🔍 Query Parameters
```
?status=pending          → Filter by status
?priority=high           → Filter by priority
?category=Work           → Filter by category
?tag=urgent              → Filter by tag
?overdue=true            → Only overdue todos
?sort=-dueDate           → Sort by due date (desc)
?page=1&limit=20         → Pagination
```

## 📋 Create Todo Example
```json
POST /api/todos
Authorization: Bearer <token>
{
  "title": "Submit project report",
  "description": "Include Q3 analysis and forecasts",
  "priority": "high",
  "category": "Work",
  "tags": ["report", "q3"],
  "dueDate": "2024-07-31T18:00:00.000Z"
}
```
