import React, { useState } from "react";
import { formatDate, formatDuration } from "../utils/helpers";
import WorkoutForm from "./WorkoutForm";

const DIFF_COLOR = { Easy:"#10B981", Medium:"#F59E0B", Hard:"#EF4444", Extreme:"#8B5CF6" };

function WorkoutCard({ workout, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <div className="workout-card editing">
        <WorkoutForm
          initial={workout}
          onSave={(data) => { onUpdate(workout.id, data); setEditing(false); }}
          onCancel={() => setEditing(false)}
        />
      </div>
    );
  }

  const isCardio = workout.type === "Cardio";

  return (
    <div className={`workout-card ${isCardio ? "cardio" : "strength"}`}>
      <div className="wc-header">
        <div className="wc-type-badge" style={{ background: isCardio ? "#FEE2E2" : "#DBEAFE", color: isCardio ? "#EF4444" : "#3B82F6" }}>
          {isCardio ? "🏃 Cardio" : "🏋️ Strength"}
        </div>
        <div className="wc-difficulty" style={{ color: DIFF_COLOR[workout.difficulty] }}>
          ● {workout.difficulty}
        </div>
      </div>

      <h3 className="wc-title">{workout.exercise}</h3>
      <p className="wc-date">{formatDate(workout.createdAt)}</p>

      <div className="wc-stats">
        <div className="wc-stat">
          <span>⏱</span>
          <span>{formatDuration(workout.duration)}</span>
        </div>
        <div className="wc-stat">
          <span>🔥</span>
          <span>{workout.calories} kcal</span>
        </div>
        {isCardio && workout.distance && (
          <div className="wc-stat">
            <span>📍</span>
            <span>{workout.distance} km</span>
          </div>
        )}
        {!isCardio && workout.sets && (
          <div className="wc-stat">
            <span>📋</span>
            <span>{workout.sets}×{workout.reps} {workout.weight ? `@ ${workout.weight}kg` : ""}</span>
          </div>
        )}
      </div>

      {workout.notes && <p className="wc-notes">💬 {workout.notes}</p>}

      <div className="wc-actions">
        <button className="btn btn-edit btn-sm" onClick={() => setEditing(true)}>✏ Edit</button>
        <button className="btn btn-danger btn-sm" onClick={() => onDelete(workout.id)}>🗑 Delete</button>
      </div>
    </div>
  );
}

export default WorkoutCard;
