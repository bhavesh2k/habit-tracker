import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const HabitForm = ({ onHabitAdded }) => {
  const [habit, setHabit] = useState("");
  const [type, setType] = useState("checkbox");

  const addHabit = async (e) => {
    e.preventDefault();
    if (!habit) return;

    try {
      await addDoc(collection(db, "habits"), {
        name: habit,
        type: type,
        createdAt: Timestamp.now(),
      });
      setHabit("");
      onHabitAdded(); // Refresh the habit list after adding
    } catch (error) {
      console.error("Error adding habit:", error);
    }
  };

  return (
    <form onSubmit={addHabit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={habit}
        onChange={(e) => setHabit(e.target.value)}
        placeholder="Enter habit name"
        className="p-2 border rounded"
        required
      />
      <select value={type} onChange={(e) => setType(e.target.value)} className="p-2 border rounded">
        <option value="checkbox">Checkbox</option>
        <option value="measurable">Measurable (e.g., minutes, reps)</option>
      </select>
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">Add</button>
    </form>
  );
};

export default HabitForm;