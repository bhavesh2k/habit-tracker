import { useState } from "react";
import HabitForm from "./HabitForm";
import HabitList from "./HabitList";

const HabitTracker = () => {
  const [view, setView] = useState("daily");

  return (
    <div className="max-w-lg mx-auto mt-8 p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Habit Tracker</h1>
      <HabitForm />
      <div className="flex justify-center gap-4 mt-4">
        <button onClick={() => setView("daily")} className={`p-2 rounded ${view === "daily" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
          Daily
        </button>
        <button onClick={() => setView("weekly")} className={`p-2 rounded ${view === "weekly" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
          Weekly
        </button>
        <button onClick={() => setView("monthly")} className={`p-2 rounded ${view === "monthly" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
          Monthly
        </button>
      </div>
      <HabitList />
    </div>
  );
};

export default HabitTracker;
