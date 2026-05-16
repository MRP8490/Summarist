import Sidebar from "../components/Sidebar";
import "./Settings.css";

function Settings() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Sidebar />

      <main className="settings-page">
        <section className="settings-content">
          <h1>Settings</h1>

          <div className="settings-row">
            <div>
              <h3>Your Subscription plan</h3>
              <p>premium-plus</p>
            </div>
          </div>

          <div className="settings-row">
            <div>
              <h3>Email</h3>
              <p>{user?.email || "guest@gmail.com"}</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Settings;