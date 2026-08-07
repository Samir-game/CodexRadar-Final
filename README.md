# CodexRadar

CodexRadar is a full-stack Codeforces analytics platform that helps competitive programmers track contest performance, problem-solving activity, and long-term growth. It also provides an AI Coach that turns a user's Codeforces history into a personalized practice plan.

## Features

- Secure authentication with JWT and HTTP-only cookies
- Codeforces profile, contest history, rating progression, and problem-solving analytics
- Interactive Recharts dashboards for solved problems, rating buckets, and contest performance
- Gemini-powered AI Coach with strengths, focus areas, a 7-day plan, and a suggested next step
- Daily Codeforces data sync with Node-Cron
- Email reminders for upcoming contests and inactive users using Nodemailer and Agenda
- Responsive UI with account logout and deletion controls

## Tech stack

**Frontend:** React, Vite, React Router, Axios, Recharts, CSS  
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Bcrypt.js, Nodemailer, Agenda, Node-Cron  
**APIs:** Codeforces API, Gemini API

## Prerequisites

- Node.js 18+
- MongoDB Atlas database or local MongoDB instance
- Gemini API key (optional; enables generative AI coaching)
- Gmail App Password (optional; enables notification emails)

## Setup

### 1. Clone and install dependencies

```bash
git clone https://github.com/yourusername/CodexRadar.git
cd CodexRadar
cd server && npm install
cd ../client && npm install
```

### 2. Configure the server

Create `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/codexradar?retryWrites=true&w=majority
JWT_TOKEN_SECRET=replace_with_a_long_random_secret
JWT_EXPIRY=2d

CODEFORCES_INFO_API=https://codeforces.com/api/user.info
CODEFORCES_RATING_API=https://codeforces.com/api/user.rating
CODEFORCES_STATUS_API=https://codeforces.com/api/user.status
CODEFORCES_CONTEST_LIST=https://codeforces.com/api/contest.list

# Optional: AI Coach
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-pro

# Optional: email notifications (use a Gmail App Password)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

### 3. Configure the client (optional)

The frontend defaults to `http://localhost:5000`. To use a different backend URL, create `client/.env`:

```env
VITE_BASE_URL=http://localhost:5000
```

### 4. Run the app

In separate terminals:

```bash
cd server
npm start
```

```bash
cd client
npm run dev
```

Open the Vite URL shown in the terminal, usually `http://localhost:5173`.

## Notes

- Never commit `.env` files or API keys.
- If `GEMINI_API_KEY` is not configured, the AI Coach displays a data-driven fallback plan.
- Gmail requires an App Password; standard Gmail passwords will not work with Nodemailer.
