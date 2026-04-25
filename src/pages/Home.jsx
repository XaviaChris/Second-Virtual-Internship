

import '../App.css'
import NavBar from '../components/NavBar.jsx';
import LandingInfo from '../components/LandingInfo.jsx';
import Features from '../components/Features.jsx'
import Reviews from '../components/Reviews.jsx'
import Numbers from '../components/Numbers.jsx';
import Footer from '../components/Footer.jsx'
import { useState } from "react";
import LoginModal from "../components/LoginModal";


function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
    <NavBar onLoginClick={() => setIsModalOpen(true)} />
    <LandingInfo onLoginClick={() => setIsModalOpen(true)} />
    <Features />
    <Reviews onLoginClick={() => setIsModalOpen(true)}  />
    <Numbers />
    <Footer />



     <LoginModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  )
}

export default Home