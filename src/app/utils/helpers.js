export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-GB", { day:"2-digit", month:"short", year:"numeric" });

export const formatDuration = (mins) => {
  if (mins < 60) return `${mins}m`;
  return `${Math.floor(mins/60)}h ${mins%60}m`;
};

export const calcCalories = (type, duration, weight = 75) => {
  const MET = type === "Cardio" ? 8 : 5;
  return Math.round((MET * weight * duration) / 60);
};

export const getWeekStart = () => {
  const d = new Date();
  d.setDate(d.getDate() - d.getDay() + 1);
  d.setHours(0,0,0,0);
  return d;
};

export const isThisWeek = (iso) => new Date(iso) >= getWeekStart();
export const isThisMonth = (iso) => {
  const d = new Date(iso);
  const now = new Date();
  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
};

export const getLast7Days = () => {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split("T")[0];
  });
};

export const COLORS = {
  cardio:   "#EF4444",
  strength: "#3B82F6",
  green:    "#10B981",
  yellow:   "#F59E0B",
  purple:   "#8B5CF6",
  gray:     "#6B7280",
};
