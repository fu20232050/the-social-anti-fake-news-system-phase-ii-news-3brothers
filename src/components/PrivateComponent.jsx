import React from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';

/**
 * Private Component Higher-Order Function
 * Used to wrap components that require permission control
 * 
 * @param {React.ComponentType} Component - Component to wrap
 * @param {Object} options - Permission control options
 * @param {string} options.requiredRole - Required role to access the component ('admin', 'member')
 * @param {Array} options.restrictedRoles - Array of restricted roles, e.g., ['reader']
 * @param {React.ReactNode} options.fallbackComponent - Component to display when no permission
 * @returns {React.ComponentType} Wrapped component
 */
const PrivateComponent = (Component, options = {}) => {
  const {
    requiredRole = null,
    restrictedRoles = [],
    fallbackComponent: FallbackComponent
  } = options;

  return function PrivateComponentWrapper(props) {
    const { user, isLoggedIn, loading } = useAuth();

    // 如果正在加载认证状态，显示加载指示器
    if (loading) {
      return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

    // 检查用户是否被限制访问
    const isRestricted = restrictedRoles.includes(user?.role);

    // 检查用户是否有足够权限
    const hasAccess = (
      // 已登录
      isLoggedIn &&
      // 如果有角色限制，用户必须拥有该角色；如果没有角色限制，则只需要登录
      (!requiredRole || user?.role === requiredRole || user?.role === 'admin') &&
      // 用户不在被禁止列表中
      !isRestricted
    );

    // 如果没有访问权限，返回备用组件或提示信息
    if (!hasAccess) {
      if (FallbackComponent) {
        return <FallbackComponent {...props} />;
      }

      // 默认的无权限提示
      return (
        <div className="alert alert-warning mt-4" role="alert">
          <h4 className="alert-heading">Insufficient Permissions</h4>
          <p>
            {isLoggedIn && isRestricted
              ? 'Your account doesn\'t have sufficient permissions to perform this action. Only members and administrators can publish news.'
              : 'You need to log in to perform this action.'}
          </p>
        </div>
      );
    }

    // 如果有权限，渲染原始组件
    return <Component {...props} />;
  };
};

export default PrivateComponent;