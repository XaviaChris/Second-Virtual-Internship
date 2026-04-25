import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import "./Settings.css";
import loginImage from "../assets/login.png";

function Settings({ onLoginClick }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return (
      <div className="library__empty">
        <img className="login--img" src={loginImage} alt="login" />
        <h2>Log in to your account to see your library</h2>
        <button
          className="btn login__cta--btn"
          onClick={onLoginClick}
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="settings">
      <h1 className="settings__title">Settings</h1>
      <hr className="line__divider" />

      <div className="settings__section">
        <h2 className="settings__label">Your Subscription plan</h2>
        <p className="settings__value">premium-plus</p>
        <hr className="line__divider" />
      </div>

      <div className="settings__section">
        <h2 className="settings__label">Email</h2>
        <p className="settings__value">{user.email}</p>
      </div>

      <hr className="line__divider" />
    </div>
  );
}

export default Settings;