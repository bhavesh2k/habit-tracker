import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const HabitList = () => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "habits"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setHabits(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Your Habits</h2>
      <ul>
        {habits.map((habit) => (
          <li key={habit.id} className="p-2 border-b flex justify-between">
            <span>{habit.name}</span>
            <span className="text-gray-500">{habit.type}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HabitList;
