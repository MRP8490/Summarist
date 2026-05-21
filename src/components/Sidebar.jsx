import { useEffect, useState } from "react";
import {
  FiHome,
  FiBookmark,
  FiEdit,
  FiSearch,
  FiSettings,
  FiHelpCircle,
  FiLogIn,
  FiLogOut,
} from "react-icons/fi";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import "./Sidebar.css";

function Sidebar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  async function handleLogout() {
    await signOut(auth);
    window.location.href = "/";
  }

  return (
    <aside className="sidebar">
      <div>
        <h1 className="sidebar-logo">📚 Summarist</h1>

        <nav className="sidebar-nav">
          <a href="/for-you" className="sidebar-link">
            <FiHome />
            <span>For you</span>
          </a>

          <a href="/library" className="sidebar-link">
            <FiBookmark />
            <span>My Library</span>
          </a>

          <a href="/library" className="sidebar-link">
            <FiEdit />
            <span>Highlights</span>
          </a>

          <a href="/for-you" className="sidebar-link">
            <FiSearch />
            <span>Search</span>
          </a>
        </nav>
      </div>

      <div className="sidebar-bottom">
        <a href="/settings" className="sidebar-link">
          <FiSettings />
          <span>Settings</span>
        </a>

        <a href="/" className="sidebar-link">
          <FiHelpCircle />
          <span>Help & Support</span>
        </a>

        {user ? (
          <button className="sidebar-button" onClick={handleLogout}>
            <FiLogOut />
            <span>Logout</span>
          </button>
        ) : (
          <a href="/" className="sidebar-link">
            <FiLogIn />
            <span>Login</span>
          </a>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;