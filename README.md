PastPeek – Today in History
PastPeek is a web application that shows interesting historical facts for the current day, with the ability to explore other dates, save favorite facts, add notes, and manage a personal collection. It includes Google Login for secure access and personalized experiences.

Features
-Google Authentication for login
-Displays Today’s Fact by default
-Explore facts for any selected date
-Save and unsave facts
-Add personal notes to saved facts
-Delete facts or notes
-Persistent state using local storage

Tech Stack
-Frontend: React, Vite, CSS
-Authentication: Google OAuth
-API: Numbers API (for history facts)
-State Management: React Hooks and Local Storage
-Build Tool: Vite

Installation

Clone the repository:
-git clone https://github.com/your-username/pastpeek.git
cd pastpeek/frontend

Install dependencies:
-npm install

-Create an .env file in the root folder with your Google Client ID:
VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com

Start the development server:
-npm run dev (for frontend)
-node server.js (for backend)
