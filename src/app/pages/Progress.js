import React from "react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell,
} from "recharts";
import { getLast7Days, isThisMonth } from "../utils/helpers";

function Progress({ workouts }) {
  // Last 7 days calories
  const last7 = getLast7Days().map((day) => {
    const dayWorkouts = workouts.filter((w) => w.createdAt.startsWith(day));
    return {
      day: new Date(day).toLocaleDateString("en-GB", { weekday: "short" }),
      calories: dayWorkouts.reduce((s, w) => s + w.calories, 0),
      duration: dayWorkouts.reduce((s, w) => s + w.duration, 0),
      count: dayWorkouts.length,
    };
  });

  // Type distribution
  const cardioCount   = workouts.filter((w) => w.type === "Cardio").length;
  const strengthCount = workouts.filter((w) => w.type === "Strength").length;
  const pieData = [
    { name: "Cardio",   value: cardioCount   },
    { name: "Strength", value: strengthCount },
  ].filter((d) => d.value > 0);

  // Monthly distance
  const monthlyDistance = workouts
    .filter((w) => isThisMonth(w.createdAt) && w.type === "Cardio" && w.distance)
    .reduce((s, w) => s + Number(w.distance), 0);

  const totalCalories = workouts.reduce((s, w) => s + w.calories, 0);
  const totalDuration = workouts.reduce((s, w) => s + w.duration, 0);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Progress 📈</h1>
          <p className="page-sub">Your fitness analytics</p>
        </div>
      </div>

      {workouts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📈</div>
          <p className="empty-title">No data yet</p>
          <p className="empty-sub">Log some workouts to see your progress charts!</p>
        </div>
      ) : (
        <>
          {/* Summary cards */}
          <div className="stats-grid">
            <div className="stat-card"><div className="stat-icon" style={{background:"#FEE2E2",color:"#EF4444"}}>🔥</div><div className="stat-body"><p className="stat-label">Total Calories</p><div className="stat-value-row"><span className="stat-value">{totalCalories.toLocaleString()}</span><span className="stat-unit">kcal</span></div></div></div>
            <div className="stat-card"><div className="stat-icon" style={{background:"#DBEAFE",color:"#3B82F6"}}>💪</div><div className="stat-body"><p className="stat-label">Total Workouts</p><div className="stat-value-row"><span className="stat-value">{workouts.length}</span></div></div></div>
            <div className="stat-card"><div className="stat-icon" style={{background:"#D1FAE5",color:"#10B981"}}>⏱</div><div className="stat-body"><p className="stat-label">Total Time</p><div className="stat-value-row"><span className="stat-value">{Math.round(totalDuration/60)}</span><span className="stat-unit">hrs</span></div></div></div>
            <div className="stat-card"><div className="stat-icon" style={{background:"#EDE9FE",color:"#8B5CF6"}}>📍</div><div className="stat-body"><p className="stat-label">Distance This Month</p><div className="stat-value-row"><span className="stat-value">{monthlyDistance.toFixed(1)}</span><span className="stat-unit">km</span></div></div></div>
          </div>

          {/* Calories chart */}
          <div className="chart-card">
            <h2 className="chart-title">Calories Burned — Last 7 Days</h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={last7} margin={{top:8,right:8,bottom:0,left:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="day" tick={{fontSize:12}} />
                <YAxis tick={{fontSize:12}} />
                <Tooltip formatter={(v) => [`${v} kcal`, "Calories"]} />
                <Bar dataKey="calories" fill="#EF4444" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Duration chart */}
          <div className="chart-card">
            <h2 className="chart-title">Active Minutes — Last 7 Days</h2>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={last7} margin={{top:8,right:8,bottom:0,left:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="day" tick={{fontSize:12}} />
                <YAxis tick={{fontSize:12}} />
                <Tooltip formatter={(v) => [`${v} min`, "Duration"]} />
                <Line type="monotone" dataKey="duration" stroke="#3B82F6" strokeWidth={2} dot={{r:4}} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie chart */}
          {pieData.length > 0 && (
            <div className="chart-card">
              <h2 className="chart-title">Workout Distribution</h2>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${Math.round(percent*100)}%`}>
                    <Cell fill="#EF4444" />
                    <Cell fill="#3B82F6" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Progress;
