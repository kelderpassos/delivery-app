import React from 'react';
import { Route, Routes, Redirect } from 'react-router-dom';
import Login from './pages/login';
import './App.css';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/">
          <Redirect to="/login" />

        </Route>
        <Route exact path="/login" element={ Login } />

      </Routes>
    </div>
  );
}

export default App;
