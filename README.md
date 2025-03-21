# Blog Website Client

A modern blog website built with React and Vite, featuring user authentication, content management, and responsive design.

## Technologies Used

- **React** - Frontend library
- **Vite** - Build tool and dev server
- **Firebase** - Authentication and storage
- **Cloudinary** - Image hosting and optimization
- **Google Analytics** - User analytics tracking

## Features

- User authentication (signup, login, profile management)
- Blog post creation and management
- Rich text editor
- Responsive design for all devices
- Image upload and management
- Analytics integration

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create an `.env` file with the following variables:
   ```
   VITE_FIREBASE_API_KEY=your-firebase-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
   VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
   VITE_FIREBASE_APP_ID=your-firebase-app-id
   VITE_CLOUD_NAME=your-cloudinary-cloud-name
   VITE_BACKEND_URL=your-backend-api-url
   VITE_GA_ID=your-google-analytics-id
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Production Build

To create a production build:

```bash
npm run build
```

## Backend API

This client connects to a backend API for data persistence. The API repository can be accessed at [backend-repository-link].

## License

[Your license information]
