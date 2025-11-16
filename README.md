# Full-Stack Python Development AI Agent - React + Next.js Frontend

https://code-flow-ai-frontend-one.vercel.app/

This project now has a complete full-stack architecture with:
- **Frontend**: Next.js + React + TypeScript + Tailwind CSS + Clerk Authentication
- **Backend**: FastAPI (Python) + Google ADK + Gemini 2.0 Flash

## 🚀 Quick Start

### 1. Install Backend Dependencies

```bash
pip install fastapi uvicorn
```

### 2. Start Backend API

```bash
python api.py
```

The API will run on `http://localhost:7860`

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 4. Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🔑 Clerk Authentication Setup

Your Clerk keys are already configured in `frontend/.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_ZGlzdGluY3QtbW9vc2UtMzcuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=<YOUR_SECRET_KEY>
```

**Important**: Replace `<YOUR_SECRET_KEY>` with your actual Clerk secret key from the [Clerk Dashboard](https://dashboard.clerk.com/apps/app_35PwE1PQquinVH157XMhtxxjI9U/instances/ins_35PwE5itxBSfhSxGihjuajFM4a2).

## 📁 Project Structure

```
FULL_STACK_AGENT/
├── frontend/                    # Next.js + React Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx      # Root layout with Clerk
│   │   │   ├── page.tsx        # Main page
│   │   │   └── globals.css     # Global styles
│   │   └── components/
│   │       ├── LandingPage.tsx # Unauthenticated landing
│   │       └── ChatInterface.tsx # Authenticated chat
│   ├── middleware.ts            # Clerk middleware
│   ├── package.json
│   └── .env.local              # Clerk keys
│
├── my_first_agent/             # AI Agents
│   ├── agent.py                # 12 specialized agents
│   └── __init__.py
│
├── api.py                      # FastAPI backend (NEW)
├── app.py                      # Gradio interface (legacy)
├── requirements.txt
└── .env                        # Google API key

```

## 🔧 Architecture

### Frontend (React/Next.js)
- **Authentication**: Clerk handles sign-in/sign-up with beautiful pre-built UI
- **Landing Page**: Shown to unauthenticated users with features and stats
- **Chat Interface**: Protected route only accessible after authentication
- **API Communication**: Axios calls to FastAPI backend

### Backend (FastAPI/Python)
- **API Endpoint**: `/api/chat` receives messages and returns AI responses
- **CORS**: Configured for React frontend
- **Agent Integration**: Uses same 12-agent system with Google ADK
- **Session Management**: Tracks user sessions with InMemorySessionService

## 🌟 Features

### ✅ Implemented
- [x] Clerk authentication (sign-in/sign-up/sign-out)
- [x] Protected routes (chat only for authenticated users)
- [x] Beautiful landing page with gradients
- [x] Real-time chat interface
- [x] 12 specialized AI agents
- [x] FastAPI backend with CORS
- [x] Responsive design (mobile + desktop)
- [x] User profile display
- [x] Example prompts
- [x] Loading states

### 🎨 UI/UX Features
- Modern gradient design (Indigo → Purple → Pink)
- Smooth animations and transitions
- Responsive grid layouts
- Interactive cards and buttons
- User avatar in header (via Clerk)
- Clean, professional typography

## 📡 API Endpoints

### `GET /`
Health check and info
```json
{
  "message": "Full-Stack Python AI Agent API",
  "version": "1.0.0",
  "agents": 12,
  "status": "online"
}
```

### `POST /api/chat`
Send message to AI agents
```json
{
  "message": "Create a FastAPI endpoint",
  "userId": "user_123",
  "history": []
}
```

Response:
```json
{
  "response": "Here's a FastAPI endpoint...",
  "userId": "user_123",
  "sessionId": "session_abc123"
}
```

## 🔐 Security

- **Clerk Authentication**: Industry-standard auth with JWT tokens
- **Protected Routes**: Middleware ensures authentication
- **CORS**: Restricted to localhost during development
- **Environment Variables**: Sensitive keys stored in `.env` files
- **Session Management**: Unique sessions per user

## 🚢 Deployment

### Backend (FastAPI)
Deploy to:
- **Render**: Add `api.py` as entry point
- **Railway**: Auto-detects Python
- **Heroku**: Add `Procfile` with `web: uvicorn api:app --host 0.0.0.0 --port $PORT`

### Frontend (Next.js)
Deploy to:
- **Vercel**: One-click deployment (recommended for Next.js)
- **Netlify**: Full Next.js support
- **Railway**: Supports Next.js

Update `NEXT_PUBLIC_API_URL` in production to point to your deployed backend.

## 🛠️ Development

### Run Backend Only
```bash
python api.py
```

### Run Frontend Only
```bash
cd frontend
npm run dev
```

### Run Both (Recommended)
Terminal 1:
```bash
python api.py
```

Terminal 2:
```bash
cd frontend
npm run dev
```

## 📝 Environment Variables

### Backend (`.env`)
```env
GOOGLE_API_KEY=your_google_api_key
PORT=7860
```

### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_API_URL=http://localhost:7860
```

## 🎯 Next Steps

1. **Add Clerk Secret Key**: Get it from Clerk Dashboard
2. **Install Dependencies**: Run `pip install fastapi uvicorn` and `cd frontend && npm install`
3. **Start Backend**: `python api.py`
4. **Start Frontend**: `cd frontend && npm run dev`
5. **Sign Up**: Create your first user at `http://localhost:3000`
6. **Start Chatting**: Ask the AI agents anything about full-stack development!

## 💡 Tips

- The **landing page** appears when not logged in
- The **chat interface** appears after authentication
- Click **Sign Out** in the header to return to landing page
- All 12 agents are available (Backend, Frontend, Database, DevOps, etc.)
- Streaming responses work automatically

## 🐛 Troubleshooting

**Frontend shows "Error connecting to AI agent"**
- Make sure backend is running on port 7860
- Check `NEXT_PUBLIC_API_URL` in `.env.local`

**Clerk authentication not working**
- Verify your Clerk keys in `.env.local`
- Check that keys match your Clerk application

**TypeScript errors in frontend**
- Run `npm install` to install all dependencies
- Errors will disappear once dependencies are installed

---

**Made with ❤️ using Next.js, React, Clerk, FastAPI, and Google ADK**
