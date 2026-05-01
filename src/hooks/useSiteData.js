// src/hooks/useSiteData.js
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export function useSiteData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "content", "main"), (snap) => {
      setData(snap.exists() ? snap.data() : null);
      setLoading(false);
    });
    return unsub;
  }, []);

  return { data, loading };
}