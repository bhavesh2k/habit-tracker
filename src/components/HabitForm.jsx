import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

function HabitForm() {
  const [habit, setHabit] = useState("");
  const [type, setType] = useState("checkbox");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!habit) return;

    try {
      await addDoc(collection(db, "habits"), {
        name: habit,
        type: type,
        createdAt: Timestamp.now(),
      });
      setHabit(""); // Clear input after saving
      alert("Habit added successfully!");
    } catch (error) {
      console.error("Error adding habit:", error);
      alert("Failed to add habit.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter habit..."
        value={habit}
        onChange={(e) => setHabit(e.target.value)}
        required
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="checkbox">Checkbox</option>
        <option value="measurable">Measurable</option>
      </select>
      <button type="submit">Add Habit</button>
    </form>
  );
}

export default HabitForm;