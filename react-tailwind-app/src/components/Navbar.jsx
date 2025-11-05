import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <nav className="flex items-center justify-between p-4">
      <div className="text-xl font-bold">Week3 App</div>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/api">API</Link>
        <button onClick={toggleTheme}>{theme === 'dark' ? 'Light' : 'Dark'}</button>
      </div>
    </nav>
  );
}
