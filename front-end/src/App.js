import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/login";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route exact path="/login" element={ <Login /> } />
      <Route path="/" element={ <Navigate to="/login" /> } />
    </Routes>
  );
}

export default App;
