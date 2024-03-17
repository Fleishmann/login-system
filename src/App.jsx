import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  const location = useLocation();

  const isLoginPage = location.pathname === '/';
  const isRegisterPage = location.pathname === '/signup';

  return (
    <div className='App'>
      {!isLoginPage && !isRegisterPage && <Navbar />}
      <div className='container'>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
