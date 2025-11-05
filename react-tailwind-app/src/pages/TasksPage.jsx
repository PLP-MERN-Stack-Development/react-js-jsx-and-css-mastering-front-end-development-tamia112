import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Button from '../components/Button';

export default function TasksPage() {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('all');

  function addTask(e) {
    e.preventDefault();
    if (!text.trim()) return;
    setTasks(prev => [...prev, { id: Date.now(), text, completed: false }]);
    setText('');
  }
  function toggleComplete(id) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }
  function deleteTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  const filtered = tasks.filter(t => filter === 'all' ? true : filter === 'active' ? !t.completed : t.completed);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={addTask} className="flex gap-2 mb-4">
        <input value={text} onChange={e => setText(e.target.value)} placeholder="New task"
               className="flex-1 p-2 border rounded" />
        <Button type="submit">Add</Button>
      </form>

      <div className="flex gap-2 mb-4">
        <Button variant={filter === 'all' ? 'primary' : 'secondary'} onClick={() => setFilter('all')}>All</Button>
        <Button variant={filter === 'active' ? 'primary' : 'secondary'} onClick={() => setFilter('active')}>Active</Button>
        <Button variant={filter === 'completed' ? 'primary' : 'secondary'} onClick={() => setFilter('completed')}>Completed</Button>
      </div>

      <ul className="space-y-2">
        {filtered.map(t => (
          <li key={t.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-900 rounded">
            <div>
              <input type="checkbox" checked={t.completed} onChange={() => toggleComplete(t.id)} />
              <span className={`ml-2 ${t.completed ? 'line-through text-gray-500' : ''}`}>{t.text}</span>
            </div>
            <Button variant="danger" onClick={() => deleteTask(t.id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
