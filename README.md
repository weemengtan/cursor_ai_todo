# ToDo App with Firebase

A modern, full-featured ToDo application built with Next.js 14, React, TypeScript, Tailwind CSS, and Firebase Firestore for real-time data persistence.

## Features

- ✅ **Create** new to-do tasks
- ✅ **Read** and display all tasks in real-time
- ✅ **Update** task text and completion status
- ✅ **Delete** tasks
- 🔄 Real-time synchronization with Firebase
- 📱 Responsive design with modern UI
- ⚡ Optimistic updates for better UX
- 🎨 Beautiful UI with shadcn/ui components
- 🔒 Data persistence across sessions

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: Firebase Firestore
- **Real-time**: Firebase real-time listeners
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- Firebase project with Firestore enabled

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase configuration (see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md))

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Firebase Setup

This app requires Firebase configuration. Please refer to [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for detailed setup instructions.

### Required Environment Variables

Add these to your `.env.local` file or Replit Secrets:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Project Structure

```
src/
├── app/
│   ├── api/health/route.ts    # Health check endpoint
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Main page
├── components/
│   └── ui/                    # shadcn/ui components
├── lib/
│   ├── firebase.ts            # Firebase configuration
│   ├── useTodos.ts            # Custom hook for todo operations
│   └── utils.ts               # Utility functions
└── todo-app.tsx               # Main ToDo component
```

## API Endpoints

- `GET /api/health` - Health check endpoint to verify Firebase connectivity

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Remember to add your Firebase environment variables to your Vercel project settings.
