import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewsList from './components/NewsList';
import NewsDetail from './components/NewsDetail';
import VotePage from './components/VotePage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import NewsPost from './components/NewsPost';
import UserProfile from './components/UserProfile';
import AdminPage from './components/AdminPage';
import CreateNews from './components/CreateNews';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

function App() {
  return (
      <Router>
        <AuthProvider>
          <Navbar />
          <div className="App container my-4">
            <Routes>
              {/* 公共路由 - 所有人都可以访问 */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* 需要登录的基础路由 - 所有登录用户都可以访问 */}
              <Route element={<ProtectedRoute requiredRole={null} />}>
                <Route path="/" element={<NewsList />} />
                <Route path="/news/:id" element={<NewsDetail />} />
                <Route path="/vote/:id" element={<VotePage />} />
                <Route path="/profile" element={<UserProfile />} />
              </Route>
              
              {/* 高级权限路由 - 只有成员和管理员可以发布新闻 */}
              <Route element={<ProtectedRoute requiredRole="member" />}>
                <Route path="/post" element={<NewsPost />} />
                <Route path="/create-news" element={<CreateNews />} />
              </Route>
              
              {/* 管理员路由 - 只有管理员可以访问 */}
              <Route element={<ProtectedRoute requiredRole="admin" />}>
                <Route path="/admin" element={<AdminPage />} />
              </Route>
            </Routes>
          </div>
        </AuthProvider>
      </Router>
  );
}

export default App;
