import React, { useState } from "react";
import Navbar from "./app/components/Navbar";
import Dashboard from "./app/pages/Dashboard";
import Workouts  from "./app/pages/Workouts";
import Progress  from "./app/pages/Progress";
import Goals     from "./app/pages/Goals";
import Profile   from "./app/pages/Profile";
import { useWorkouts } from "./app/hooks/useWorkouts";
import { loadGoals } from "./app/utils/storage";

function App() {
  const [page, setPage] = useState("/");
  const { workouts, addWorkout, updateWorkout, deleteWorkout } = useWorkouts();
  const goals = loadGoals();

  const props = { workouts, onDelete: deleteWorkout, onUpdate: updateWorkout, onNavigate: setPage };

  return (
    <div className="app-shell">
      <Navbar currentPage={page} onNavigate={setPage} />
      <main className="main-content">
        {page === "/"         && <Dashboard {...props} goals={goals} />}
        {page === "/workouts" && <Workouts  {...props} onAdd={addWorkout} />}
        {page === "/progress" && <Progress  workouts={workouts} />}
        {page === "/goals"    && <Goals     workouts={workouts} />}
        {page === "/profile"  && <Profile   workouts={workouts} />}
      </main>
    </div>
  );
}

export default App;
