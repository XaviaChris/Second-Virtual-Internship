import "./LoginModal.css";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  sendPasswordResetEmail,
} from "firebase/auth";

function LoginModal({ isOpen, onClose }) {
  const [mode, setMode] = useState("login"); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  if (!isOpen) return null;

  
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/for-you");
      onClose();
    } catch (error) {
      console.error(error.message);
    }
  };

 
  const handleGuestLogin = async () => {
    try {
      await signInAnonymously(auth);
      navigate("/for-you");
      onClose();
    } catch (error) {
      console.error(error.message);
    }
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (mode === "signup") {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }

      navigate("/for-you");
      onClose();
    } catch (error) {
      console.error(error.message);
    }
  };

  
  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
      setMode("login");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="modal__overlay">
      <div className="modal">
        <button className="modal__close" onClick={onClose}>
          ✕
        </button>

       
        <h3 className="center">
          {mode === "login" && "Log in to Summarist"}
          {mode === "signup" && "Sign up for Summarist"}
          {mode === "reset" && "Reset your password"}
        </h3>

       
        {mode === "reset" ? (
          <>
            <form className="modal__form" onSubmit={handleResetPassword}>
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button className="btn">Send reset link</button>
            </form>

            <div className="modal__footer">
              <div
                className="modal__signup"
                onClick={() => setMode("login")}
              >
                Go to login
              </div>
            </div>
          </>
        ) : (
          <>
           
            {mode === "login" && (
              <>
                <button
                  className="btn modal__guest"
                  onClick={handleGuestLogin}
                >
                  <FaUser className="modal__icon" />
                  Login as a Guest
                </button>

                <div className="modal__divider">or</div>
              </>
            )}

            
            <button
              className="btn modal__google"
              onClick={handleGoogleLogin}
            >
              <FcGoogle className="modal__icon--white" />
              {mode === "signup"
                ? "Sign up with Google"
                : "Login with Google"}
            </button>

            <div className="modal__divider">or</div>

           
            <form className="modal__form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="btn">
                {mode === "signup" ? "Sign Up" : "Login"}
              </button>
            </form>

           
            <div className="modal__footer">
              {mode === "login" && (
                <div
                  className="modal__link"
                  onClick={() => setMode("reset")}
                >
                  Forgot your password?
                </div>
              )}

              <div
                className="modal__signup"
                onClick={() =>
                  setMode(mode === "signup" ? "login" : "signup")
                }
              >
                {mode === "signup"
                  ? "Go to login"
                  : "Don’t have an account? Sign up"}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginModal;