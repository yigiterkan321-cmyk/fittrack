import React, { useState } from "react";
import { loadProfile, saveProfile } from "../utils/storage";

function Profile({ workouts }) {
  const [profile, setProfile] = useState(loadProfile);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(profile);

  const bmi = (profile.weight / ((profile.height/100) ** 2)).toFixed(1);
  const bmiLabel = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obese";
  const bmiColor = bmi < 18.5 ? "#F59E0B" : bmi < 25 ? "#10B981" : bmi < 30 ? "#F59E0B" : "#EF4444";

  const totalCalories = workouts.reduce((s,w)=>s+w.calories,0);
  const totalWorkouts = workouts.length;
  const cardioCount   = workouts.filter(w=>w.type==="Cardio").length;
  const strengthCount = workouts.filter(w=>w.type==="Strength").length;
  const favType = cardioCount >= strengthCount ? "Cardio 🏃" : "Strength 🏋️";

  function handleSave() {
    setProfile(form);
    saveProfile(form);
    setEditing(false);
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Profile 👤</h1>
          <p className="page-sub">Your personal fitness profile</p>
        </div>
        <button className="btn btn-primary" onClick={() => setEditing(!editing)}>
          {editing ? "✕ Cancel" : "✏ Edit Profile"}
        </button>
      </div>

      {/* Avatar + name */}
      <div className="profile-card">
        <div className="profile-avatar">{profile.name.charAt(0).toUpperCase()}</div>
        <div className="profile-info">
          <h2 className="profile-name">{profile.name}</h2>
          <p className="profile-meta">{profile.age} years old · {profile.height} cm · {profile.weight} kg</p>
        </div>
      </div>

      {editing && (
        <div className="form-card">
          <h2 className="form-card-title">Edit Profile</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Name</label>
              <input value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} />
            </div>
            <div className="form-group">
              <label>Age</label>
              <input type="number" value={form.age} onChange={e=>setForm(p=>({...p,age:Number(e.target.value)}))} />
            </div>
            <div className="form-group">
              <label>Weight (kg)</label>
              <input type="number" step="0.5" value={form.weight} onChange={e=>setForm(p=>({...p,weight:Number(e.target.value)}))} />
            </div>
            <div className="form-group">
              <label>Height (cm)</label>
              <input type="number" value={form.height} onChange={e=>setForm(p=>({...p,height:Number(e.target.value)}))} />
            </div>
          </div>
          <div className="form-actions">
            <button className="btn btn-primary" onClick={handleSave}>Save Profile</button>
          </div>
        </div>
      )}

      {/* BMI */}
      <div className="bmi-card">
        <h2 className="section-title">BMI Calculator</h2>
        <div className="bmi-value" style={{color:bmiColor}}>{bmi}</div>
        <div className="bmi-label" style={{color:bmiColor}}>{bmiLabel}</div>
        <div className="bmi-scale">
          <span>Underweight</span><span>Normal</span><span>Overweight</span><span>Obese</span>
        </div>
      </div>

      {/* All-time stats */}
      <h2 className="section-title">All-Time Stats</h2>
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-icon" style={{background:"#DBEAFE",color:"#3B82F6"}}>💪</div><div className="stat-body"><p className="stat-label">Total Workouts</p><div className="stat-value-row"><span className="stat-value">{totalWorkouts}</span></div></div></div>
        <div className="stat-card"><div className="stat-icon" style={{background:"#FEE2E2",color:"#EF4444"}}>🔥</div><div className="stat-body"><p className="stat-label">Total Calories</p><div className="stat-value-row"><span className="stat-value">{totalCalories.toLocaleString()}</span><span className="stat-unit">kcal</span></div></div></div>
        <div className="stat-card"><div className="stat-icon" style={{background:"#D1FAE5",color:"#10B981"}}>🏃</div><div className="stat-body"><p className="stat-label">Cardio Sessions</p><div className="stat-value-row"><span className="stat-value">{cardioCount}</span></div></div></div>
        <div className="stat-card"><div className="stat-icon" style={{background:"#EDE9FE",color:"#8B5CF6"}}>⭐</div><div className="stat-body"><p className="stat-label">Favourite Type</p><div className="stat-value-row"><span className="stat-value" style={{fontSize:"16px"}}>{totalWorkouts > 0 ? favType : "—"}</span></div></div></div>
      </div>
    </div>
  );
}

export default Profile;
