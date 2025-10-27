import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AllTasksPage from './pages/AllTasksPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/all-tasks" element={<AllTasksPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
