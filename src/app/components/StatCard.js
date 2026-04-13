import React from "react";

function StatCard({ icon, label, value, unit, color = "#3B82F6", sub }) {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ background: color + "20", color }}>
        {icon}
      </div>
      <div className="stat-body">
        <p className="stat-label">{label}</p>
        <div className="stat-value-row">
          <span className="stat-value">{value}</span>
          {unit && <span className="stat-unit">{unit}</span>}
        </div>
        {sub && <p className="stat-sub">{sub}</p>}
      </div>
    </div>
  );
}

export default StatCard;
