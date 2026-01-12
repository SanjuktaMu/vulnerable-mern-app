# SecureNotes – Vulnerable MERN Application

SecureNotes is a MERN stack notes application developed for educational and security testing purposes.  
The project intentionally demonstrates selected OWASP Top 10 vulnerabilities in a controlled environment to understand how real-world web applications can be attacked and secured.

⚠️ **Warning:**  
This application is intentionally vulnerable. **Do NOT use it in production.**

---

## 🚀 Features

- User authentication (Login & Registration)
- Notes management (Create, Read, Update, Delete)
- Admin dashboard interface
- Protected routes (authentication guard)
- Responsive UI (desktop & mobile)
- Intentional OWASP vulnerability demonstrations

---

## 🛠 Tech Stack

### Frontend
- React
- React Router
- HTML, CSS (custom admin dashboard UI)

### Backend
- Node.js
- Express.js
- MongoDB
- JWT-based authentication

---

## 🔐 Security Focus (OWASP)

This project is designed to demonstrate and study common security issues, including:

- Broken Authentication
- Stored Cross-Site Scripting (XSS)
- Improper Input Validation

Each vulnerability is intentionally included to:
- Understand how it occurs
- Learn how it can be exploited
- Explore how it should be fixed

---

## 📂 Project Structure

vulnerable-mern-app/
│
├── backend/
│ ├── index.js
│ ├── routes/
│ ├── models/
│ ├── middleware/
│ └── package.json
│
├── frontend/
│ ├── frontend/
│ │ ├── src/
│ │ ├── public/
│ │ └── package.json
│ └── package.json
│
├── .gitignore
└── README.md

---

## ▶️ How to Run Locally

### Backend
```bash
cd backend
npm install
npm start


### Frontend
cd frontend/frontend
npm install
npm start

###
###👩‍💻 Author

Sanjukta Mukherjee
B.Tech Computer Science
Security & Full-Stack Development Enthusiast

📜 Disclaimer

This project is created strictly for learning, academic, and security demonstration purposes.
It intentionally contains vulnerabilities and should never be used in real-world production environments.
