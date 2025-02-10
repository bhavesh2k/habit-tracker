import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

function HabitList() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "habits"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const habitArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHabits(habitArray);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return (
    <div>
      <h2>Your Habits</h2>
      <ul>
        {habits.map((habit) => (
          <li key={habit.id}>
            {habit.name} - {habit.type}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HabitList;