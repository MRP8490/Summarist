import {
  FiBookOpen,
  FiBookmark,
  FiEdit,
  FiSearch,
  FiSettings,
  FiHelpCircle,
  FiLogIn,
  FiLogOut,
} from "react-icons/fi";
import "./Sidebar.css";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));

  function handleLogout() {
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  return (
    <aside className="sidebar">
      <div>
        <h1 className="sidebar-logo">📚 Summarist</h1>

        <nav className="sidebar-nav">
          <a href="/for-you" className="sidebar-link">
            <FiBookOpen />
            <span>For you</span>
          </a>

          <a href="/library" className="sidebar-link">
            <FiBookmark />
            <span>My Library</span>
          </a>

          <div className="sidebar-disabled">
            <FiEdit />
            <span>Highlights</span>
          </div>

          <div className="sidebar-disabled">
            <FiSearch />
            <span>Search</span>
          </div>
        </nav>
      </div>

      <div className="sidebar-bottom">
        <a href="/settings" className="sidebar-link">
          <FiSettings />
          <span>Settings</span>
        </a>

        <div className="sidebar-disabled">
          <FiHelpCircle />
          <span>Help & Support</span>
        </div>

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