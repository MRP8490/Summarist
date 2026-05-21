import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
          <Link to="/for-you" className="sidebar-link">
            <FiHome />
            <span>For you</span>
          </Link>

          <Link to="/library" className="sidebar-link">
            <FiBookmark />
            <span>My Library</span>
          </Link>

          <Link to="/library" className="sidebar-link">
            <FiEdit />
            <span>Highlights</span>
          </Link>

          <Link to="/for-you" className="sidebar-link">
            <FiSearch />
            <span>Search</span>
          </Link>
        </nav>
      </div>

      <div className="sidebar-bottom">
        <Link to="/settings" className="sidebar-link">
          <FiSettings />
          <span>Settings</span>
        </Link>

        <Link to="/" className="sidebar-link">
          <FiHelpCircle />
          <span>Help & Support</span>
        </Link>

        {user ? (
          <button className="sidebar-button" onClick={handleLogout}>
            <FiLogOut />
            <span>Logout</span>
          </button>
        ) : (
          <Link to="/" className="sidebar-link">
            <FiLogIn />
            <span>Login</span>
          </Link>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;