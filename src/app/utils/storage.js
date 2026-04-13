import { STORAGE_KEY, GOALS_KEY, PROFILE_KEY } from "../interfaces/types";

export const loadWorkouts = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
};
export const saveWorkouts = (data) => localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

export const loadGoals = () => {
  try { return JSON.parse(localStorage.getItem(GOALS_KEY)) || { weeklyWorkouts: 4, weeklyCalories: 2000, monthlyKm: 50 }; }
  catch { return { weeklyWorkouts: 4, weeklyCalories: 2000, monthlyKm: 50 }; }
};
export const saveGoals = (data) => localStorage.setItem(GOALS_KEY, JSON.stringify(data));

export const loadProfile = () => {
  try { return JSON.parse(localStorage.getItem(PROFILE_KEY)) || { name: "Athlete", weight: 75, height: 175, age: 22 }; }
  catch { return { name: "Athlete", weight: 75, height: 175, age: 22 }; }
};
export const saveProfile = (data) => localStorage.setItem(PROFILE_KEY, JSON.stringify(data));
