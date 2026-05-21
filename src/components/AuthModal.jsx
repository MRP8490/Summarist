import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
} from "firebase/auth";
import { auth } from "../firebase";
import "./AuthModal.css";

function AuthModal({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

async function handleGuestLogin() {
  try {
    setError("");
    await signInAnonymously(auth);
    onClose();
    navigate("/for-you");
  } catch (err) {
    console.log(err);
    setError(err.message);
  }
}

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }

      onClose();
      navigate("/for-you");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
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

        {error && <p className="auth-error">{error}</p>}

        <input
          placeholder="Email Address"
          type="email"
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