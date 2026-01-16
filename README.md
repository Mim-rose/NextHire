# NextHire: A Modern Job Portal

NextHire is a full-stack job search platform built with React (frontend) and Node.js/Express/MongoDB (backend). Features include job browsing, smart search, applications, and recruiter tools.

🌐 **Live Demo:** [https://next-hire-nine.vercel.app]

---

## ✨ Features

- 🔍 Smart job search by title, company, category, location
- 🏢 Browse companies and their job openings
- 📝 Apply with resume and cover letter upload
- 👤 User authentication (Email/Password + Google OAuth)
- 💼 Post and manage job listings (for recruiters)
- 📊 Track your applications
- 🎯 Filter jobs by category
- 📱 Fully responsive design

---

## 🛠️ Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, React Router, Firebase Auth, Axios, SweetAlert2

**Backend:** Node.js, Express, MongoDB, JWT, Multer, CORS

**Deployment:** Vercel (frontend), Render (backend), MongoDB Atlas

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/nexthire-job-portal.git
cd nexthire-job-portal

# Install dependencies
npm install
cd backend && npm install && cd ..

# Set up environment variables (see .env.example)

# Start backend (from backend folder)
cd backend && npm start

# Start frontend (from root, new terminal)
npm run dev
```

---

## 🔐 Environment Setup

Create `.env` in root and `backend/.env`:

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:3000
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
# ... other Firebase configs
```

**Backend (backend/.env):**
```env
PORT=3000
DB_USER=your_mongodb_user
DB_PASS=your_mongodb_pass
JWT_SECRET=your_secret
NODE_ENV=development
```

---

## 🎯 Technical Highlights

- **Modern UI/UX** - Clean, intuitive interface built with Tailwind CSS
- **Secure Authentication** - Firebase + JWT token-based auth with HTTP-only cookies
- **Real-time Search** - Instant job filtering and search functionality
- **File Upload** - Seamless resume and cover letter upload with Multer
- **Role-Based Access** - Separate dashboards for job seekers and recruiters
- **Mobile Optimized** - Fully responsive design that works on all devices

---

## 👨‍💻 Author

Made with ❤️ by **[Jannatul Afrose Mim]**

⭐ Star this repo if you find it helpful!
