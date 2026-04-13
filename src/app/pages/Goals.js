import React, { useState } from "react";
import { loadGoals, saveGoals } from "../utils/storage";
import { isThisWeek, isThisMonth } from "../utils/helpers";

function GoalBar({ label, current, target, unit, color }) {
  const pct = Math.min(100, Math.round((current / target) * 100));
  return (
    <div className="goal-item">
      <div className="goal-item-header">
        <span className="goal-item-label">{label}</span>
        <span className="goal-item-val" style={{color}}>{current} / {target} {unit}</span>
      </div>
      <div className="goal-track">
        <div className="goal-track-fill" style={{width:`${pct}%`, background:color}} />
      </div>
      <span className="goal-pct-label">{pct}% complete</span>
    </div>
  );
}

function Goals({ workouts }) {
  const [goals, setGoals] = useState(loadGoals);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(goals);

  const weeklyWorkouts = workouts.filter((w) => isThisWeek(w.createdAt)).length;
  const weeklyCalories = workouts.filter((w) => isThisWeek(w.createdAt)).reduce((s,w)=>s+w.calories,0);
  const monthlyKm = workouts.filter((w)=>isThisMonth(w.createdAt)&&w.type==="Cardio"&&w.distance).reduce((s,w)=>s+Number(w.distance),0);

  function handleSave() {
    setGoals(form);
    saveGoals(form);
    setEditing(false);
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Goals 🎯</h1>
          <p className="page-sub">Track your fitness targets</p>
        </div>
        <button className="btn btn-primary" onClick={() => setEditing(!editing)}>
          {editing ? "✕ Cancel" : "✏ Edit Goals"}
        </button>
      </div>

      {editing && (
        <div className="form-card">
          <h2 className="form-card-title">Update Your Goals</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Weekly Workouts</label>
              <input type="number" min="1" max="14" value={form.weeklyWorkouts}
                onChange={(e)=>setForm(p=>({...p,weeklyWorkouts:Number(e.target.value)}))} />
            </div>
            <div className="form-group">
              <label>Weekly Calories (kcal)</label>
              <input type="number" min="100" step="100" value={form.weeklyCalories}
                onChange={(e)=>setForm(p=>({...p,weeklyCalories:Number(e.target.value)}))} />
            </div>
            <div className="form-group">
              <label>Monthly Distance (km)</label>
              <input type="number" min="1" value={form.monthlyKm}
                onChange={(e)=>setForm(p=>({...p,monthlyKm:Number(e.target.value)}))} />
            </div>
          </div>
          <div className="form-actions">
            <button className="btn btn-primary" onClick={handleSave}>Save Goals</button>
          </div>
        </div>
      )}

      <div className="goals-list">
        <GoalBar label="💪 Workouts This Week" current={weeklyWorkouts} target={goals.weeklyWorkouts} unit="sessions" color="#3B82F6" />
        <GoalBar label="🔥 Calories This Week" current={weeklyCalories} target={goals.weeklyCalories} unit="kcal" color="#EF4444" />
        <GoalBar label="📍 Distance This Month" current={Math.round(monthlyKm*10)/10} target={goals.monthlyKm} unit="km" color="#8B5CF6" />
      </div>

      {/* Motivational message */}
      <div className="motivation-card">
        <p className="motivation-text">
          {weeklyWorkouts >= goals.weeklyWorkouts
            ? "🎉 Weekly workout goal achieved! You're crushing it!"
            : `💪 ${goals.weeklyWorkouts - weeklyWorkouts} more workout(s) to hit your weekly goal. Keep going!`}
        </p>
      </div>
    </div>
  );
}

export default Goals;
