# FitTrack — Workout Tracker App

A professional fitness tracking React application built for the TNC GROUP Software Persona Internship 2026.

## Features

- **Dashboard** — weekly goal progress, stats overview, recent workouts
- **Workouts** — log cardio & strength workouts with full CRUD (Create, Read, Update, Delete)
- **Progress** — interactive charts (bar, line, pie) powered by Recharts
- **Goals** — set and track weekly/monthly fitness goals
- **Profile** — personal info, BMI calculator, all-time stats

## Tech Stack

- **ReactJS** — UI library with custom hooks
- **Recharts** — data visualization
- **LocalStorage** — persistent data storage
- **CSS** — custom responsive design (no UI library)

## Project Structure

```
src/
├── App.js
├── index.js
├── index.css
└── app/
    ├── components/
    │   ├── Navbar.js
    │   ├── StatCard.js
    │   ├── WorkoutForm.js
    │   └── WorkoutCard.js
    ├── pages/
    │   ├── Dashboard.js
    │   ├── Workouts.js
    │   ├── Progress.js
    │   ├── Goals.js
    │   └── Profile.js
    ├── hooks/
    │   └── useWorkouts.js
    ├── interfaces/
    │   └── types.js
    └── utils/
        ├── storage.js
        └── helpers.js
```

## Getting Started

```bash
npm install
npm start
```

## Deploy (Netlify)

1. Push to GitHub
2. Netlify → New site from Git
3. Build command: `npm run build`
4. Publish directory: `build`

---

Built with ❤️ by Yigit Erkan | TNC GROUP Software Persona Internship 2026
