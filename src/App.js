import logo from './logo.svg';
import './App.css';
import Dashboard from './components/dashboard';
import Routers from './Routers/routers';
import Sidebar from './components/sidebar';
import { useEffect } from 'react';
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
