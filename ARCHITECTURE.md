# AI Chat Application Architecture

This document explains the architecture of the AI Chat Application and how the frontend and backend components interact.

## Overview

The application follows a client-server architecture:

1. A Next.js frontend application provides the user interface
2. A FastAPI backend handles API requests to OpenAI's services
3. Vercel is used for deployment and hosting both components

## Frontend (Next.js)

The frontend consists of three main UI components:

1. **Status Indicator** - Shows the API status (online/offline) in the top-right corner
2. **Chat Window** - Displays messages from both the user and AI assistant
3. **Input Form** - Allows users to type and submit messages

### Key Frontend Files:

- `/app/page.tsx` - The main page component handling state and API interactions
- `/components/StatusIndicator.tsx` - Component for displaying API status
- `/components/ChatWindow.tsx` - Component for rendering chat messages
- `/components/InputForm.tsx` - Component for text input and submission
- `/styles/Chat.module.css` - Styling for the chat interface
- `/styles/globals.css` - Global styling for the application

## Backend (FastAPI)

The backend API handles:

1. Chat message processing by communicating with OpenAI
2. Streaming responses back to the frontend
3. Health checks to verify API status

### Key Backend Files:

- `/api/app.py` - The main FastAPI application handling requests

## Communication Flow

1. User submits a message from the frontend
2. Frontend sends a POST request to `/api/chat` with:
   - User's message
   - Developer message (system prompt)
   - Model selection
   - OpenAI API key
3. Backend processes the request and creates a streaming connection to OpenAI
4. OpenAI responses are streamed back to the frontend in real-time
5. Frontend displays the responses as they arrive

## Deployment

Both the frontend and backend are deployed on Vercel:

- The frontend uses Vercel's Next.js support
- The backend uses Vercel's Python support
- Routing is configured to direct API requests to the backend and all other requests to the frontend

## Environment Variables

- `NEXT_PUBLIC_OPENAI_API_KEY` - The OpenAI API key used for requests (optional in frontend, can be user-provided)
