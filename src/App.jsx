import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ForYou from "./pages/ForYou";
import Book from "./pages/Book";
import SidebarLayout from "./layouts/SidebarLayout";
import Library from "./pages/Library";
import Player from "./pages/Player";
import Settings from "./pages/Settings";
import ChoosePlan from "./pages/ChoosePlan";




function App() {
  return (
    <BrowserRouter>
      <Routes>

        
        <Route path="/" element={<Home />} />

      
        <Route
          path="/for-you"
          element={
            <SidebarLayout>
              <ForYou />
            </SidebarLayout>
          }
        />

        <Route
          path="/book/:id"
          element={
            <SidebarLayout>
              <Book />
            </SidebarLayout>
          }
        />

        <Route
          path="/library"
          element={
           <SidebarLayout>
            {({ openLogin }) => <Library onLoginClick={openLogin} />}
          </SidebarLayout>
          }
        />

     <Route
          path="/player/:id"
          element={
            <SidebarLayout>
              {({ fontSize }) => <Player fontSize={fontSize} />}
            </SidebarLayout>
          }
        />

       <Route
          path="/settings"
          element={
            <SidebarLayout>
              {({ openLogin }) => <Settings onLoginClick={openLogin} />}
            </SidebarLayout>
          }
        />

         <Route path="/choose-plan" element={<ChoosePlan />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;