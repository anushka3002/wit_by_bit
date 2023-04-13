import logo from './logo.svg';
import './App.css';
import Dashboard from './components/dashboard';
import Routers from './Routers/routers';
import Sidebar from './components/sidebar';

function App() {
  return (
    <div className="flex">
      <Sidebar/>
      <Routers/>
    </div>
  );
}

export default App;
