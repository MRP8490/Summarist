import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthModal.css";

function AuthModal({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleGuestLogin() {
    localStorage.setItem("user", JSON.stringify({ email: "guest@gmail.com" }));
    onClose();
    navigate("/for-you");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!email.includes("@")) {
      alert("Invalid email");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ email }));
    onClose();
    navigate("/for-you");
  }

  return (
    <div className="auth-overlay">
      <form className="auth-modal" onSubmit={handleSubmit}>
        <button type="button" className="auth-close" onClick={onClose}>
          ×
        </button>

        <h2>{isLogin ? "Log in to Summarist" : "Sign up to Summarist"}</h2>

        <button type="button" className="google-button" onClick={handleGuestLogin}>
          Sign in as Guest
        </button>

        <div className="auth-divider">or</div>

        <input
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="auth-submit">
          {isLogin ? "Login" : "Sign up"}
        </button>

        <p className="auth-switch" onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Login"}
        </p>
      </form>
    </div>
  );
}

export default AuthModal;