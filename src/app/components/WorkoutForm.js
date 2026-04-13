import React, { useState } from "react";
import { WORKOUT_TYPES, CARDIO_EXERCISES, STRENGTH_EXERCISES, DIFFICULTY_LEVELS } from "../interfaces/types";
import { calcCalories } from "../utils/helpers";

const DEFAULT = {
  type: WORKOUT_TYPES.CARDIO,
  exercise: CARDIO_EXERCISES[0],
  duration: 30,
  distance: "",
  sets: "",
  reps: "",
  weight: "",
  difficulty: "Medium",
  notes: "",
  date: new Date().toISOString().split("T")[0],
};

function WorkoutForm({ onSave, initial, onCancel }) {
  const [form, setForm] = useState(initial || DEFAULT);

  const set = (k, v) => setForm((p) => ({
    ...p, [k]: v,
    ...(k === "type" ? { exercise: v === WORKOUT_TYPES.CARDIO ? CARDIO_EXERCISES[0] : STRENGTH_EXERCISES[0] } : {}),
  }));

  const exercises = form.type === WORKOUT_TYPES.CARDIO ? CARDIO_EXERCISES : STRENGTH_EXERCISES;
  const estCalories = calcCalories(form.type, Number(form.duration));

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.exercise || !form.duration) return;
    onSave({ ...form, duration: Number(form.duration), calories: estCalories });
  }

  return (
    <form className="workout-form" onSubmit={handleSubmit}>
      <div className="form-grid">

        {/* Type */}
        <div className="form-group full">
          <label>Workout Type</label>
          <div className="type-toggle">
            {Object.values(WORKOUT_TYPES).map((t) => (
              <button key={t} type="button"
                className={`type-btn ${form.type === t ? "active" : ""}`}
                style={form.type === t ? { background: t === "Cardio" ? "#EF4444" : "#3B82F6" } : {}}
                onClick={() => set("type", t)}
              >
                {t === "Cardio" ? "🏃 Cardio" : "🏋️ Strength"}
              </button>
            ))}
          </div>
        </div>

        {/* Exercise */}
        <div className="form-group">
          <label>Exercise</label>
          <select value={form.exercise} onChange={(e) => set("exercise", e.target.value)}>
            {exercises.map((ex) => <option key={ex}>{ex}</option>)}
          </select>
        </div>

        {/* Date */}
        <div className="form-group">
          <label>Date</label>
          <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} />
        </div>

        {/* Duration */}
        <div className="form-group">
          <label>Duration (minutes)</label>
          <input type="number" min="1" max="300" value={form.duration} onChange={(e) => set("duration", e.target.value)} />
        </div>

        {/* Difficulty */}
        <div className="form-group">
          <label>Difficulty</label>
          <select value={form.difficulty} onChange={(e) => set("difficulty", e.target.value)}>
            {DIFFICULTY_LEVELS.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>

        {/* Cardio fields */}
        {form.type === WORKOUT_TYPES.CARDIO && (
          <div className="form-group">
            <label>Distance (km)</label>
            <input type="number" step="0.1" placeholder="e.g. 5.5" value={form.distance}
              onChange={(e) => set("distance", e.target.value)} />
          </div>
        )}

        {/* Strength fields */}
        {form.type === WORKOUT_TYPES.STRENGTH && (
          <>
            <div className="form-group">
              <label>Sets</label>
              <input type="number" min="1" placeholder="e.g. 4" value={form.sets}
                onChange={(e) => set("sets", e.target.value)} />
            </div>
            <div className="form-group">
              <label>Reps</label>
              <input type="number" min="1" placeholder="e.g. 10" value={form.reps}
                onChange={(e) => set("reps", e.target.value)} />
            </div>
            <div className="form-group">
              <label>Weight (kg)</label>
              <input type="number" step="0.5" placeholder="e.g. 80" value={form.weight}
                onChange={(e) => set("weight", e.target.value)} />
            </div>
          </>
        )}

        {/* Notes */}
        <div className="form-group full">
          <label>Notes (optional)</label>
          <textarea rows="2" placeholder="How did it feel?" value={form.notes}
            onChange={(e) => set("notes", e.target.value)} />
        </div>

        {/* Calorie estimate */}
        <div className="form-group full">
          <div className="calorie-estimate">
            🔥 Estimated calories burned: <strong>{estCalories} kcal</strong>
          </div>
        </div>
      </div>

      <div className="form-actions">
        {onCancel && <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>}
        <button type="submit" className="btn btn-primary">
          {initial ? "Update Workout" : "Save Workout"}
        </button>
      </div>
    </form>
  );
}

export default WorkoutForm;
