# AI Chat Application Frontend

This is a Next.js application that provides a sleek user interface for interacting with the OpenAI chat API.

## Features

- Real-time API status indicator
- Smooth scrolling chat window
- Streaming responses from OpenAI's API
- Responsive design that adapts to different screen sizes

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn package manager
- An OpenAI API key

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install the dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the frontend directory with your OpenAI API key:
```bash
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
```
Note: If you don't provide an API key, the application will prompt you for one when you send your first message.

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Type your message in the input field at the bottom of the screen.
2. Press Enter or click the Send button to submit your message.
3. Wait for the AI to generate and stream its response.
4. The status indicator in the top right corner shows if the API is online or offline.

## Deployment

This application is configured for deployment on Vercel. To deploy:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically deploy the application

You can also manually deploy the application using the Vercel CLI:
```bash
npx vercel
```