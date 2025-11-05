import { useState } from 'react';
import './App.css';

// Import your components here
import Button from './components/Button';
import TaskManager from './components/TaskManager';
import PostsList from './components/PostsList'; // Add this import

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Navbar */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">PLP Task Manager</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Task Manager Component */}
        <TaskManager />
        
        {/* Counter Example */}
        <div className="mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-6">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4">Counter Example</h2>
            <div className="flex items-center gap-4 my-4">
              <Button
                onClick={() => setCount((count) => count - 1)}
                variant="danger"
              >
                -
              </Button>
              <span className="text-xl font-bold">{count}</span>
              <Button
                onClick={() => setCount((count) => count + 1)}
                variant="success"
              >
                +
              </Button>
            </div>
          </div>
        </div>

        {/* API Data - Posts List */}
        <PostsList />
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 shadow mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} PLP Task Manager. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;