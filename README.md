# Reaction Time Game

A full-stack mobile + web app where users test and submit their reaction speed, then view a live leaderboard. Built with **Expo + React Native** (frontend) and **Express + Firebase Firestore** (backend), and deployed with **Vercel**.

---

## Features

- Tap when prompted to test your reaction time
- Submit your name and score to a live leaderboard
- View top 10 fastest times
- Admin button to clear leaderboard
- Fully deployed and accessible from any device

---

## Live Demo Links

- **Frontend (Web App):**  
  [reaction-game.vercel.app](https://reaction-game.vercel.app)  
  *(view and play in browser)*

- **Backend API (Express on Vercel):**  
  [reaction-game-api.vercel.app](https://reaction-game-api.vercel.app)  
  *(handles `/scores` and `/scores/all` routes)*

---

## Tech Stack

| Layer      | Tech                               |
|------------|------------------------------------|
| Frontend   | React Native + Expo + Expo Router  |
| Backend    | Node.js + Express.js               |
| Database   | Firebase Firestore (NoSQL)         |
| Deployment | Vercel (both frontend + backend)   |
| HTTP       | Axios                              |
| Auth       | None (public leaderboard)          |

---

## How It Works

1. User taps "Start", waits for a visual cue, then taps again
2. Reaction time is measured in milliseconds
3. User submits their name + score to backend
4. Scores are saved in Firestore
5. Leaderboard screen fetches and displays the top 10 fastest times

---

## Project Structure

```
reaction-game/
├── frontend/         # Expo React Native app
│   ├── app/          # Screens and navigation (expo-router)
│   ├── services/     # API helpers
│   └── ...
├── backend/          # Express + Firebase API
│   ├── api/index.ts  # Main Express server (Vercel-compatible)
│   ├── firebase.ts   # Firebase Admin SDK init
│   └── ...
```

---

## Environment Variables

**Backend (Vercel → Settings → Environment Variables):**

| Key              | Value                            |
|------------------|----------------------------------|
| `FIREBASE_CONFIG`| Stringified serviceAccount JSON  |

To generate the value:
- Use your Firebase Admin SDK JSON
- Replace line breaks with `\\n`
- Paste it into Vercel as one long line

---

## API Endpoints

| Method | Route             | Description               |
|--------|-------------------|---------------------------|
| GET    | `/scores`         | Get top 10 scores         |
| POST   | `/scores`         | Submit a score            |
| DELETE | `/scores/all`     | Clear leaderboard          |

---

## Deployment Notes

- Backend deployed via `vercel --prod` from `/backend` folder
- Frontend built with `npx expo export --platform web`, then deployed to Vercel from `dist/`

---

## Author

[NetTerminalGene](https://github.com/NetTerminalGene)  

---

## Notes:

ChatGPT helped tutorialize this project for me, but from that, I learned many things, such as coding/syntax in TypeScript, navigating VSCode, and working with React. 
