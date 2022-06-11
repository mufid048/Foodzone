import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Login from './components/Login';
import { useState } from 'react';



function App() {
  return (
    <div>
      <Navbar/>
      <Login />
    </div>
  );
}

export default App;
