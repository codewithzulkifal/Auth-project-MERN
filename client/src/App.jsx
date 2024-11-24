import React from "react";

import {  BrowserRouter,  Routes,  Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Navbar from "./Components/Navbar";
import Privateroute from "./Components/Privateroute";

function App() {

  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<Privateroute />}>
            <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
