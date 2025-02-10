import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, where, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore";

function HabitList() {
  const [habits, setHabits] = useState([]);
  const [selectedView, setSelectedView] = useState("daily");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    let q;
    if (selectedView === "daily") {
      q = query(collection(db, "habits"), where("date", "==", selectedDate), orderBy("createdAt", "desc"));
    } else if (selectedView === "weekly") {
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      const startDate = weekStart.toISOString().split("T")[0];
      q = query(collection(db, "habits"), where("date", ">=", startDate), orderBy("date"));
    } else if (selectedView === "monthly") {
      const monthStart = new Date();
      monthStart.setDate(1);
      const startDate = monthStart.toISOString().split("T")[0];
      q = query(collection(db, "habits"), where("date", ">=", startDate), orderBy("date"));
    }

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const habitArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHabits(habitArray);
    });

    return () => unsubscribe();
  }, [selectedView, selectedDate]);

  const toggleCompletion = async (habitId, currentStatus) => {
    const habitRef = doc(db, "habits", habitId);
    await updateDoc(habitRef, { completed: !currentStatus });
  };

  return (
    <div>
      <h2>Your Habits</h2>
      <div>
        <button onClick={() => setSelectedView("daily")}>Daily</button>
        <button onClick={() => setSelectedView("weekly")}>Weekly</button>
        <button onClick={() => setSelectedView("monthly")}>Monthly</button>
      </div>
      {selectedView === "daily" && (
        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
      )}
      <ul>
        {habits.map((habit) => (
          <li key={habit.id}>
            <input
              type="checkbox"
              checked={habit.completed}
              onChange={() => toggleCompletion(habit.id, habit.completed)}
            />
            {habit.name} - {habit.type} - {habit.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HabitList;
