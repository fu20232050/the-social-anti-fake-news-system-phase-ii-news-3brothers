import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getAllUsers, updateUserRole } from '../services/authService';

const AdminPage = () => {
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [message, setMessage] = useState('');

  // Verify if user is admin
  useEffect(() => {
    if (!isAdmin()) {
      // 可以在这里添加重定向逻辑
      console.error('Access denied: User is not an administrator');
    }
  }, [isAdmin]);

  // Get all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getAllUsers();
        setUsers(allUsers);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        setMessage('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Upgrade user role (from reader to member)
  const handleUpgradeRole = async (userId) => {
    if (!isAdmin()) return;
    
    try {
      setUpdatingId(userId);
      await updateUserRole(userId, 'member');
      // 更新本地用户列表
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId ? { ...user, role: 'member' } : user
        )
      );
      setMessage('User role upgraded successfully');
      // 3秒后清除消息
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Failed to upgrade user role:', error);
      setMessage('Failed to upgrade user role');
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return <div className="container py-5">Loading users...</div>;
  }

  return (
    <div className="container py-5">
      <h1 className="mb-5">Admin Dashboard - User Management</h1>
      
      {message && (
        <div className="alert alert-info mb-4">
          {message}
        </div>
      )}

      <div className="card">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">All Users</h2>
        </div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`badge ${user.role === 'admin' ? 'bg-danger' : user.role === 'member' ? 'bg-success' : 'bg-secondary'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    {user.role === 'reader' && (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => handleUpgradeRole(user.id)}
                        disabled={updatingId === user.id}
                      >
                        {updatingId === user.id ? 'Upgrading...' : 'Upgrade to Member'}
                      </button>
                    )}
                    {user.role === 'member' && (
                      <span className="text-muted">Already Member</span>
                    )}
                    {user.role === 'admin' && (
                      <span className="text-muted">Admin User</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;