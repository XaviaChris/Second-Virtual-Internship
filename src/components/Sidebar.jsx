import Logo from "../assets/logo.png";
import "./Sidebar.css";
import { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { IoBookmarkOutline } from "react-icons/io5";
import { RiBallPenLine } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import { HiOutlineCog } from "react-icons/hi";
import { BsQuestionCircle } from "react-icons/bs";
import { LuLogOut } from "react-icons/lu";
import { CiLogin } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useLocation } from "react-router-dom";




function Sidebar({ onLoginClick, fontSize, setFontSize }) {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const isPlayerPage = location.pathname.startsWith("/player");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleAuthClick = async () => {
    if (user) {
      await signOut(auth);
    } else {
      onLoginClick?.();
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img className="logo__img" src={Logo} alt="logo" />
      </div>

      <div className="links">
        <ul className="top__links">
          <li>
            <NavLink to="/for-you" className="single--link">
              <AiOutlineHome className="sidebar__icon" />
              For You
            </NavLink>
          </li>

          <li>
            <NavLink to="/library" className="single--link">
              <IoBookmarkOutline className="sidebar__icon" />
              My Library
            </NavLink>
          </li>

          <li>
            <NavLink to="/highlights" className="single--link no--click">
              <RiBallPenLine className="sidebar__icon" />
              Highlights
            </NavLink>
          </li>

          <li>
            <NavLink to="/search" className="single--link no--click">
              <IoSearch className="sidebar__icon" />
              Search
            </NavLink>
          </li>
        </ul>

       {isPlayerPage && (
  <div className="sidebar__font-controls">
    <button
      className={fontSize === 14 ? "active" : ""}
      onClick={() => setFontSize(14)}
    >
      Aa
    </button>

    <button
      className={fontSize === 16 ? "active" : ""}
      onClick={() => setFontSize(16)}
    >
      Aa
    </button>

    <button
      className={fontSize === 20 ? "active" : ""}
      onClick={() => setFontSize(20)}
    >
      Aa
    </button>

    <button
      className={fontSize === 24 ? "active" : ""}
      onClick={() => setFontSize(24)}
    >
      Aa
    </button>
  </div>
)}

        <ul className="bottom__links">
          <li>
            <NavLink to="/settings" className="single--link">
              <HiOutlineCog className="sidebar__icon" />
              Settings
            </NavLink>
          </li>

          <li>
            <NavLink to="/help" className="single--link no--click">
              <BsQuestionCircle className="sidebar__icon" />
              Help & Support
            </NavLink>
          </li>

          <li className="single--link" onClick={handleAuthClick}>
            {user ? (
              <>
                <LuLogOut className="sidebar__icon" />
                Logout
              </>
            ) : (
              <>
                <CiLogin className="sidebar__icon" />
                Login
              </>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;