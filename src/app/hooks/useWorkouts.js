import { useState, useEffect, useCallback } from "react";
import { loadWorkouts, saveWorkouts } from "../utils/storage";
import { calcCalories } from "../utils/helpers";

export function useWorkouts() {
  const [workouts, setWorkouts] = useState(loadWorkouts);

  useEffect(() => { saveWorkouts(workouts); }, [workouts]);

  // CREATE
  const addWorkout = useCallback((data) => {
    const workout = {
      id: Date.now(),
      ...data,
      calories: data.calories || calcCalories(data.type, data.duration),
      createdAt: new Date().toISOString(),
    };
    setWorkouts((prev) => [workout, ...prev]);
    return workout;
  }, []);

  // UPDATE
  const updateWorkout = useCallback((id, data) => {
    setWorkouts((prev) => prev.map((w) =>
      w.id === id ? { ...w, ...data, calories: data.calories || calcCalories(data.type, data.duration) } : w
    ));
  }, []);

  // DELETE
  const deleteWorkout = useCallback((id) => {
    setWorkouts((prev) => prev.filter((w) => w.id !== id));
  }, []);

  return { workouts, addWorkout, updateWorkout, deleteWorkout };
}
