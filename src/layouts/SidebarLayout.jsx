import { useState } from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import LoginModal from "../components/LoginModal";
import "./SidebarLayout.css";

function SidebarLayout({ children }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [fontSize, setFontSize] = useState(14);

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  return (
    <div className="layout">
      <Sidebar
        onLoginClick={openLogin}
        fontSize={fontSize}
        setFontSize={setFontSize}
      />

     <div className="main page__with-sidebar">
        <TopBar />

        <div className="page__content">
          {typeof children === "function"
            ? children({ openLogin, fontSize })
            : children}
        </div>
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={closeLogin} />
    </div>
  );
}

export default SidebarLayout;