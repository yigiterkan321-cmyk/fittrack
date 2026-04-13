import React from "react";

const NAV = [
  { path: "/",         icon: "📊", label: "Dashboard" },
  { path: "/workouts", icon: "💪", label: "Workouts"  },
  { path: "/progress", icon: "📈", label: "Progress"  },
  { path: "/goals",    icon: "🎯", label: "Goals"     },
  { path: "/profile",  icon: "👤", label: "Profile"   },
];

function Navbar({ currentPage, onNavigate }) {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span className="nav-logo">⚡</span>
        <span className="nav-title">FitTrack</span>
      </div>
      <div className="nav-links">
        {NAV.map((item) => (
          <button
            key={item.path}
            className={`nav-item ${currentPage === item.path ? "active" : ""}`}
            onClick={() => onNavigate(item.path)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
