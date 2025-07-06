# Firebase Setup Guide

This ToDo app is now integrated with Firebase Firestore for data persistence. Follow these steps to set up Firebase:

## 1. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Firestore Database in your project
4. Set up Firestore security rules (for development, you can use test mode)

## 2. Environment Variables

Add the following environment variables to your `.env.local` file or Replit Secrets:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 3. Getting Firebase Config

1. In your Firebase project, go to Project Settings
2. Scroll down to "Your apps" section
3. Click on the web app icon (</>) to add a web app
4. Register your app and copy the configuration object
5. Extract the values and add them to your environment variables

## 4. Firestore Security Rules

For development, you can use these basic rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**Note:** These rules allow anyone to read and write to your database. For production, implement proper authentication and authorization.

## 5. Features

The app now includes:
- ✅ Real-time data synchronization
- ✅ Create, read, update, delete operations
- ✅ Loading states
- ✅ Error handling
- ✅ Persistent data storage
- ✅ Optimistic updates

## 6. Running the App

1. Install dependencies: `npm install`
2. Set up your environment variables
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

Your todos will now be saved to Firebase and persist across sessions! 