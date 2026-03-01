# 🌸 FloraAurora – Full Stack Flower Store Application

## 📌 Project Overview

FloraAurora is a full-stack e-commerce web application built using **Node.js, Express, Next.js (React), and PostgreSQL**.

The application allows users to:

- Log in using name and phone number
- Browse flower products
- Add and remove items from cart
- View dynamic cart updates
- Interact with a live REST API backend

This project demonstrates frontend development, backend API creation, database integration, cloud deployment, and production environment configuration.

---

## 🚀 Live Application

Frontend (Vercel):  
https://floraaurora.vercel.app  

Backend API (Render):  
https://floraaurora.onrender.com  

Example API Endpoint:  
https://floraaurora.onrender.com/api/flowers  

---

## 🛠️ Technology Stack

### Frontend
- Next.js (React)
- TypeScript
- Fetch API
- Responsive design
- Environment-based API configuration

### Backend
- Node.js
- Express.js
- RESTful API architecture
- Modular routes & controllers

### Database
- PostgreSQL
- Relational schema
- Foreign key relationships

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: Render PostgreSQL

---

## 🗄️ Database Schema

### 1️⃣ customers

| Column       | Type        |
|--------------|------------|
| id           | SERIAL (PK) |
| name         | VARCHAR     |
| phone        | VARCHAR     |
| created_at   | TIMESTAMP   |

---

### 2️⃣ flowers

| Column       | Type        |
|--------------|------------|
| id           | SERIAL (PK) |
| name         | VARCHAR     |
| price        | NUMERIC     |
| image_url    | TEXT        |
| featured     | BOOLEAN     |
| stock        | INTEGER     |

---

### 3️⃣ cart

| Column        | Type        |
|---------------|------------|
| id            | SERIAL (PK) |
| customer_id   | INTEGER (FK → customers.id) |
| flower_id     | INTEGER (FK → flowers.id) |
| quantity      | INTEGER     |

---

## 📡 API Endpoints

### 🔐 Customer

**POST** `/api/customers/login`  
Creates a new customer or logs in existing user based on phone number.

---

### 🌸 Flowers

**GET** `/api/flowers`  
Returns all available flower products.

---

### 🛒 Cart

**GET** `/api/cart/:customer_id`  
Returns cart items for a customer.

**POST** `/api/cart/add`  
Adds item to cart.

**DELETE** `/api/cart/remove/:id`  
Removes item from cart.

---

## 🏗️ Project Structure

```
floraaurora/
│
├── client/          # Next.js frontend
│
├── server/          # Express backend
│   ├── routes/
│   ├── controllers/
│   ├── db.js
│   └── server.js
│
├── package.json
└── README.md
```

The project follows a clear separation of concerns:

- **Frontend** handles UI and API calls  
- **Backend** handles business logic and database queries  
- **Database** stores persistent relational data  

---

## 🎨 UI & UX

- Soft pastel floral theme
- Clean layout
- Mobile responsive design
- Smooth login → shop → cart flow
- Clear user navigation

The interface adapts to both desktop and mobile screens.

---

## ⚙️ Local Setup Instructions

### 1️⃣ Backend Setup

```bash
cd server
npm install
npm start
```

Create `.env` inside `server/`:

```
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
```

---

### 2️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

Create `.env.local` inside `client/`:

```
NEXT_PUBLIC_API_URL=http://localhost:5001
```

---

## 🌍 Production Environment Configuration

- Backend reads `DATABASE_URL` from environment variables.
- Frontend uses `NEXT_PUBLIC_API_URL` for API calls.
- Environment variables are securely configured on Vercel and Render.

---

## 🧠 Planning & Execution Approach

1. Designed database schema first.
2. Built backend APIs with modular structure.
3. Connected PostgreSQL using `pg` library.
4. Built frontend UI using Next.js.
5. Integrated API using environment variables.
6. Deployed backend and database to Render.
7. Deployed frontend to Vercel.
8. Resolved production environment configuration issues.

---

## 🚧 Challenges Faced

- Environment variable handling in Next.js production
- CORS configuration
- Migrating local PostgreSQL database to cloud
- API endpoint misconfiguration
- Production debugging using browser dev tools

All issues were resolved through systematic debugging and environment management.

---

## 🤖 Use of AI Tools

AI tools such as ChatGPT were used for:

- Debugging deployment issues
- Improving environment configuration
- Refining documentation clarity

All architectural decisions, debugging processes, and code implementation were understood and executed independently.

---

## 📈 Evaluation Criteria Addressed

✔ Clean code structure  
✔ RESTful API design  
✔ Relational database usage  
✔ Full-stack integration  
✔ Production deployment  
✔ Responsive UI  
✔ Documentation completeness  

---

## 👩‍💻 Author

Sana Syed  
Full Stack Developer 
