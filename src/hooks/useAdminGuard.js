import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../lib/firebase";

export function useAdminGuard() {
  const { user } = useAuth();
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    let active = true;

    if (!user || !db) {
      setAuthorized(false);
      return () => {
        active = false;
      };
    }

    setAuthorized(null);
    getDoc(doc(db, "admin_users", user.uid))
      .then((snapshot) => {
        if (!active) return;
        setAuthorized(
          snapshot.exists() &&
            snapshot.data().role === "admin" &&
            snapshot.data().active === true,
        );
      })
      .catch(() => {
        if (active) setAuthorized(false);
      });

    return () => {
      active = false;
    };
  }, [user]);

  return { authorized };
}
