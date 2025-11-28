import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

/**
 * Protected Route Component
 * Controls access to routes based on user role
 * 
 * @param {Object} props - Component props
 * @param {string} props.requiredRole - Required role to access the route ('admin', 'member', or null to only require login)
 * @param {React.ReactNode} props.redirectPath - Redirect path when unauthorized, defaults to '/login'
 * @param {React.ReactNode} props.restrictedFor - Array of restricted roles, e.g., ['reader']
 */
const ProtectedRoute = ({ 
  requiredRole = null, 
  redirectPath = '/login',
  restrictedFor = [] 
}) => {
  const { user, isAuthenticated, loading } = useAuth();

  // 如果正在加载认证状态，返回null或加载指示器
  if (loading) {
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // 检查用户是否被禁止访问
  const isRestricted = restrictedFor.includes(user?.role);
  
  // 检查用户是否有足够权限
  const hasAccess = (
    // 已登录
    isAuthenticated &&
    // 如果有角色限制，用户必须拥有该角色；如果没有角色限制，则只需要登录
    (!requiredRole || user?.role === requiredRole || user?.role === 'admin') &&
    // 用户不在被禁止列表中
    !isRestricted
  );

  // 如果没有访问权限，根据登录状态重定向
  if (!hasAccess) {
    // 如果是被角色限制（如读者尝试访问成员页面），显示提示并重定向到首页
    if (isAuthenticated && isRestricted) {
      // 显示一个提示然后重定向
      return (
        <div className="container d-flex flex-column justify-content-center align-items-center" style={{ height: '80vh' }}>
          <div className="alert alert-warning text-center mb-4" style={{ maxWidth: '500px' }}>
            <h4 className="alert-heading">Insufficient Permissions</h4>
            <p>Your account doesn't have sufficient permissions to access this page. Only members and administrators can access.</p>
          </div>
          <Navigate to="/" replace />
        </div>
      );
    }
    
    // 其他情况重定向到登录页面
    return <Navigate to={redirectPath} replace />;
  }

  // 如果有访问权限，渲染子路由
  return <Outlet />;
};

export default ProtectedRoute;