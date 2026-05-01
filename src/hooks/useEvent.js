import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export function useEvent() {
  const [event, setEvent] = useState(null);   // null = loading / no event
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "content", "main"), (snap) => {
      const data = snap.data();
      setEvent(data?.event ?? null);
      setLoading(false);
    });
    return unsub;
  }, []);

  return { event, loading };
}