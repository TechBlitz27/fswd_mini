# CA Firm Visibility & Client Tracking Portal

A comprehensive full-stack MERN web application designed for Chartered Accountancy (CA) firms. This platform serves a dual purpose: it acts as a professional digital storefront to attract new corporate clients and provides a secure, role-based dashboard for existing clients to track their statutory compliance deadlines (GST, ITR, Audits) in real-time.

---

## 🚀 Key Features

* **Dual-Flow Architecture:** Seamlessly integrates a public-facing informative website with a highly secure backend portal.
* **Role-Based Access Control (RBAC):** Strict access separation for 4 distinct roles: Admin, CA (Partner), Staff, and Client.
* **Real-Time Status Tracking:** Clients can log in to view the live status of their assigned tasks (e.g., Pending, In Progress, Filed) without needing to call or email the firm.
* **Secure Authentication:** Stateless session management using JSON Web Tokens (JWT) and one-way password cryptography via Bcrypt.
* **Data Integrity:** Compound Unique Indexes implemented via Mongoose ODM to prevent duplicate compliance entries.

---

## 🛠️ Technology Stack

**Frontend (Client-Side)**
* **Core:** React.js (Single Page Application)
* **Build Tool:** Vite (for fast HMR and optimized builds)
* **Styling:** Tailwind CSS & Glassmorphism UI principles
* **Routing:** React Router Dom v6
* **Icons:** Lucide-React

**Backend (Server-Side)**
* **Runtime:** Node.js
* **Framework:** Express.js
* **Security:** Cors, JWT (jsonwebtoken), Bcrypt.js

**Database (Persistence Layer)**
* **Database:** MongoDB Atlas (Cloud NoSQL)
* **ODM:** Mongoose
* **GUI Management:** MongoDB Compass

---

## 📂 Project Structure

```text
CA-Portal-Project/
├── backend/                  # Express.js Server & APIs
│   ├── controllers/          # Business logic (auth, compliance, clients)
│   ├── middleware/           # Security guards (auth.js, role.js)
│   ├── models/               # Mongoose DB Schemas
│   ├── routes/               # API endpoints
│   ├── .env                  # Secret keys (Not uploaded to Git)
│   └── server.js             # Main server entry point
│
└── frontend/                 # React.js UI (Vite)
    ├── src/
    │   ├── components/       # Reusable UI (Navbar, Footer, ProtectedRoute)
    │   ├── context/          # Global state management (AuthContext)
    │   ├── pages/            # Public pages & Secure Dashboards
    │   └── services/         # Axios API call managers
    └── index.html            # Main HTML file
⚙️ Installation & Setup Guide
Follow these steps to run both the frontend and backend locally on your machine.

Prerequisites
Node.js (v18 or higher) installed

MongoDB account (or local MongoDB Compass)

Git installed

1. Clone the Repository
Bash
git clone [https://github.com/your-username/ca-portal-project.git](https://github.com/your-username/ca-portal-project.git)
cd ca-portal-project
2. Backend Setup
Navigate to the backend directory and install dependencies:

Bash
cd backend
npm install
Create a .env file in the backend folder and add your credentials:

Code snippet
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_super_secret_jwt_key
Start the backend development server:

Bash
npm run dev

3. Frontend Setup
Open a new terminal window/tab, navigate to the frontend directory, and install dependencies:

Bash
cd frontend
npm install
Start the Vite development server:

Bash
npm run dev
Note: The frontend will be accessible at http://localhost:5173 and the backend APIs at http://localhost:5000.