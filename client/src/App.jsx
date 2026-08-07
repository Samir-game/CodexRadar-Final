import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Home from "./pages/Home.jsx";
import Introduction from "./pages/Introduction.jsx";
import ContestHistory from "./pages/ContestHistory.jsx";
import ProblemSolvingHistory from "./pages/ProblemSolvingHistory.jsx";
import Setting from "./pages/Setting.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import AICoach from "./pages/AICoach.jsx";
import "./App.css"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <Introduction />
            </>
          } 
        />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route 
          path="/home" 
          element={
            <>
              <Navbar/>
              <Home />
            </>
          } 
        />

        <Route 
          path="/contest-history" 
          element={
            <>
              <Navbar />
              <ContestHistory />
            </>
          } 
        />

        <Route 
          path="/problem-history" 
          element={
            <>
              <Navbar />
              <ProblemSolvingHistory />
            </>
          } 
        />
        <Route 
        path="/ai-coach" 
        element={
            <>
              <Navbar />
              <AICoach />
            </>
          } 
        />


        <Route 
          path="/aboutus" 
          element={
            <>
              <Navbar />
              <AboutUs />
            </>
          } 
        />

        <Route 
          path="/settings" 
          element={
            <>
              <Navbar />
              <Setting />
            </>
          } 
        />
        <Route 
          path="/contact-us" 
          element={
            <>
              <Navbar />
              <ContactUs />
            </>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
