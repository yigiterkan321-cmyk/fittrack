import React from "react";
import StatCard from "../components/StatCard";
import WorkoutCard from "../components/WorkoutCard";
import { isThisWeek, isThisMonth, formatDuration } from "../utils/helpers";

function Dashboard({ workouts, goals, onNavigate, onDelete, onUpdate }) {
  const weeklyWorkouts = workouts.filter((w) => isThisWeek(w.createdAt));
  const monthlyWorkouts = workouts.filter((w) => isThisMonth(w.createdAt));

  const weeklyCalories = weeklyWorkouts.reduce((s, w) => s + w.calories, 0);
  const totalDuration  = weeklyWorkouts.reduce((s, w) => s + w.duration, 0);
  const monthlyKm      = monthlyWorkouts
    .filter((w) => w.type === "Cardio" && w.distance)
    .reduce((s, w) => s + Number(w.distance), 0);

  const recentWorkouts = workouts.slice(0, 3);

  const weekProgress = Math.min(100, Math.round((weeklyWorkouts.length / (goals.weeklyWorkouts || 4)) * 100));

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard 📊</h1>
          <p className="page-sub">Welcome back! Here's your fitness overview.</p>
        </div>
        <button className="btn btn-primary" onClick={() => onNavigate("/workouts")}>
          + Log Workout
        </button>
      </div>

      {/* Weekly goal banner */}
      <div className="goal-banner">
        <div className="goal-banner-text">
          <span>Weekly Goal</span>
          <strong>{weeklyWorkouts.length} / {goals.weeklyWorkouts} workouts</strong>
        </div>
        <div className="goal-bar-wrap">
          <div className="goal-bar">
            <div className="goal-fill" style={{ width: `${weekProgress}%` }} />
          </div>
          <span className="goal-pct">{weekProgress}%</span>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <StatCard icon="💪" label="Workouts This Week" value={weeklyWorkouts.length} unit="sessions" color="#3B82F6" sub={`Goal: ${goals.weeklyWorkouts}`} />
        <StatCard icon="🔥" label="Calories Burned" value={weeklyCalories.toLocaleString()} unit="kcal" color="#EF4444" sub="This week" />
        <StatCard icon="⏱" label="Active Time" value={formatDuration(totalDuration)} color="#10B981" sub="This week" />
        <StatCard icon="📍" label="Distance Run" value={monthlyKm.toFixed(1)} unit="km" color="#8B5CF6" sub="This month" />
      </div>

      {/* Recent Workouts */}
      <div className="section-header">
        <h2 className="section-title">Recent Workouts</h2>
        {workouts.length > 3 && (
          <button className="btn btn-ghost btn-sm" onClick={() => onNavigate("/workouts")}>View All →</button>
        )}
      </div>

      {recentWorkouts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🏋️</div>
          <p className="empty-title">No workouts yet</p>
          <p className="empty-sub">Log your first workout to get started!</p>
          <button className="btn btn-primary" onClick={() => onNavigate("/workouts")}>Log Workout</button>
        </div>
      ) : (
        <div className="card-grid">
          {recentWorkouts.map((w) => (
            <WorkoutCard key={w.id} workout={w} onDelete={onDelete} onUpdate={onUpdate} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
