import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewsList from './components/NewsList';
import NewsDetail from './components/NewsDetail';
import VotePage from './components/VotePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<NewsList />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/vote/:id" element={<VotePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
