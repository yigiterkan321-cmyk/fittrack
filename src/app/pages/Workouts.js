import React, { useState } from "react";
import WorkoutForm from "../components/WorkoutForm";
import WorkoutCard from "../components/WorkoutCard";
import { WORKOUT_TYPES } from "../interfaces/types";

const FILTERS = ["All", "Cardio", "Strength"];

function Workouts({ workouts, onAdd, onDelete, onUpdate }) {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter]     = useState("All");
  const [search, setSearch]     = useState("");
  const [sort, setSort]         = useState("newest");

  const filtered = workouts
    .filter((w) => filter === "All" || w.type === filter)
    .filter((w) => w.exercise.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sort === "newest"
      ? new Date(b.createdAt) - new Date(a.createdAt)
      : new Date(a.createdAt) - new Date(b.createdAt)
    );

  function handleSave(data) {
    onAdd(data);
    setShowForm(false);
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Workouts 💪</h1>
          <p className="page-sub">{workouts.length} total workouts logged</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "✕ Cancel" : "+ Log Workout"}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h2 className="form-card-title">New Workout</h2>
          <WorkoutForm onSave={handleSave} onCancel={() => setShowForm(false)} />
        </div>
      )}

      {/* Controls */}
      <div className="controls-bar">
        <div className="search-wrap">
          <span className="search-icon-inner">🔍</span>
          <input className="search-input" placeholder="Search exercises..." value={search}
            onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="filter-group">
          {FILTERS.map((f) => (
            <button key={f} className={`filter-btn ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
        <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">{search ? "🔍" : "💪"}</div>
          <p className="empty-title">{search ? "No results found" : "No workouts yet"}</p>
          <p className="empty-sub">{search ? "Try a different search" : "Log your first workout above!"}</p>
        </div>
      ) : (
        <div className="card-grid">
          {filtered.map((w) => (
            <WorkoutCard key={w.id} workout={w} onDelete={onDelete} onUpdate={onUpdate} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Workouts;
