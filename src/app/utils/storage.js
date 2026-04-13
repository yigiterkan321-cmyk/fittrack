import { STORAGE_KEY, GOALS_KEY, PROFILE_KEY } from "../interfaces/types";

const SAMPLE_WORKOUTS = [
  { id: 1, type: "Cardio", exercise: "Running", duration: 45, distance: "7.5", difficulty: "Medium", notes: "Morning run, felt great!", calories: 450, date: "2026-04-13", createdAt: "2026-04-13T07:30:00.000Z" },
  { id: 2, type: "Strength", exercise: "Bench Press", duration: 60, sets: "4", reps: "10", weight: "80", difficulty: "Hard", notes: "New PR today!", calories: 360, date: "2026-04-12", createdAt: "2026-04-12T18:00:00.000Z" },
  { id: 3, type: "Cardio", exercise: "Cycling", duration: 40, distance: "15", difficulty: "Medium", notes: "Indoor cycling session", calories: 380, date: "2026-04-11", createdAt: "2026-04-11T08:00:00.000Z" },
  { id: 4, type: "Strength", exercise: "Squat", duration: 50, sets: "5", reps: "8", weight: "100", difficulty: "Hard", notes: "Legs day, brutal!", calories: 300, date: "2026-04-10", createdAt: "2026-04-10T17:30:00.000Z" },
  { id: 5, type: "Cardio", exercise: "Jump Rope", duration: 20, distance: "", difficulty: "Easy", notes: "Warm up session", calories: 200, date: "2026-04-09", createdAt: "2026-04-09T07:00:00.000Z" },
  { id: 6, type: "Strength", exercise: "Pull-Up", duration: 45, sets: "4", reps: "12", weight: "", difficulty: "Medium", notes: "Back and biceps", calories: 270, date: "2026-04-08", createdAt: "2026-04-08T18:30:00.000Z" },
  { id: 7, type: "Cardio", exercise: "Running", duration: 55, distance: "9", difficulty: "Hard", notes: "Long run, pushed limits", calories: 550, date: "2026-04-07", createdAt: "2026-04-07T06:30:00.000Z" },
  { id: 8, type: "Strength", exercise: "Deadlift", duration: 60, sets: "4", reps: "6", weight: "120", difficulty: "Extreme", notes: "Heavy day!", calories: 360, date: "2026-04-06", createdAt: "2026-04-06T17:00:00.000Z" },
  { id: 9, type: "Cardio", exercise: "Swimming", duration: 45, distance: "2", difficulty: "Medium", notes: "Pool session", calories: 400, date: "2026-04-05", createdAt: "2026-04-05T09:00:00.000Z" },
  { id: 10, type: "Strength", exercise: "Shoulder Press", duration: 45, sets: "3", reps: "12", weight: "50", difficulty: "Medium", notes: "Shoulders and triceps", calories: 270, date: "2026-04-04", createdAt: "2026-04-04T18:00:00.000Z" },
  { id: 11, type: "Cardio", exercise: "HIIT", duration: 30, distance: "", difficulty: "Extreme", notes: "Intense HIIT circuit", calories: 420, date: "2026-04-03", createdAt: "2026-04-03T07:00:00.000Z" },
  { id: 12, type: "Strength", exercise: "Bicep Curl", duration: 40, sets: "4", reps: "15", weight: "25", difficulty: "Easy", notes: "Arms day", calories: 240, date: "2026-04-02", createdAt: "2026-04-02T17:30:00.000Z" },
];

const SAMPLE_GOALS = { weeklyWorkouts: 5, weeklyCalories: 2500, monthlyKm: 80 };
const SAMPLE_PROFILE = { name: "Yigit Erkan", weight: 75, height: 180, age: 22 };

export const loadWorkouts = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) { localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_WORKOUTS)); return SAMPLE_WORKOUTS; }
    return JSON.parse(saved);
  } catch { return SAMPLE_WORKOUTS; }
};
export const saveWorkouts = (data) => localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

export const loadGoals = () => {
  try {
    const saved = localStorage.getItem(GOALS_KEY);
    if (!saved) { localStorage.setItem(GOALS_KEY, JSON.stringify(SAMPLE_GOALS)); return SAMPLE_GOALS; }
    return JSON.parse(saved);
  } catch { return SAMPLE_GOALS; }
};
export const saveGoals = (data) => localStorage.setItem(GOALS_KEY, JSON.stringify(data));

export const loadProfile = () => {
  try {
    const saved = localStorage.getItem(PROFILE_KEY);
    if (!saved) { localStorage.setItem(PROFILE_KEY, JSON.stringify(SAMPLE_PROFILE)); return SAMPLE_PROFILE; }
    return JSON.parse(saved);
  } catch { return SAMPLE_PROFILE; }
};
export const saveProfile = (data) => localStorage.setItem(PROFILE_KEY, JSON.stringify(data));