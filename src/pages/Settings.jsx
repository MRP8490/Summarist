import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Sidebar from "../components/Sidebar";
import { auth } from "../firebase";
import "./Settings.css";

function Settings() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Sidebar />

      <main className="settings-page">
        <section className="settings-content">
          <h1>Settings</h1>

          <div className="settings-row">
            <div>
              <h3>Your Subscription plan</h3>
              <p>{user ? "Premium Plus" : "No Active Plan"}</p>
            </div>
          </div>

          <div className="settings-row">
            <div>
              <h3>Email</h3>
              <p>{user?.email || "Guest User"}</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Settings;