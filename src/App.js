import React, { useEffect } from "react"
import './App.css';
import Routers from './Routers/routers.tsx';
import Sidebar from './components/sidebar.tsx';
import { useNavigate } from "react-router-dom";

function App() {

  const navigate = useNavigate()

  useEffect(()=>{
    navigate("/Students")
  },[])

  return (
    <div className="flex">
      <Sidebar/>
      <Routers/>
    </div>
  );
}

export default App;
