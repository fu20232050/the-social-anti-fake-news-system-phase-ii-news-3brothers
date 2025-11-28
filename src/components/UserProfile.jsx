import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../contexts/AuthContext.jsx';
import { updateUserProfile, handleAvatarUpload } from '../services/authService.js';

const UserProfile = () => {
  const { user, updateUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [updateError, setUpdateError] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState('');

  // If user is not logged in, redirect to login page
  React.useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  // Define form validation rules
  const ProfileSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('First name is required')
      .min(2, 'First name must be at least 2 characters')
      .max(50, 'First name cannot exceed 50 characters'),
    lastName: Yup.string()
      .required('Last name is required')
      .min(2, 'Last name must be at least 2 characters')
      .max(50, 'Last name cannot exceed 50 characters'),
  });

  // Handle avatar upload
  const handleAvatarChange = async (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      try {
        const avatarDataUrl = await handleAvatarUpload(file);
        setAvatarFile(file);
        setAvatarPreview(avatarDataUrl);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      setUpdateError('');
      
      // 准备更新数据
      const updateData = {
        ...values,
        avatar: avatarPreview
      };
      
      // 调用更新服务
      const updatedUser = await updateUserProfile(user.id, updateData);
      
      // 更新认证上下文
      updateUser(updatedUser);
      
      setUpdateSuccess('Profile updated successfully!');
      setEditing(false);
      
      // 3秒后清除成功消息
      setTimeout(() => {
        setUpdateSuccess('');
      }, 3000);
      
    } catch (error) {
      console.error('Failed to update profile:', error);
      setUpdateError(error.message || 'Update failed, please try again later');
    }
  };

  // Get role name
  const getRoleName = (role) => {
    const roleMap = {
      'admin': 'Admin',
      'member': 'Member',
      'reader': 'Reader'
    };
    return roleMap[role] || role;
  };

  // 如果用户正在加载或不存在，显示加载状态
  if (!user) {
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h2>User Profile</h2>
              <button 
                className="btn btn-outline-light"
                onClick={() => setEditing(!editing)}
                disabled={!!updateSuccess}
              >
                {editing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
            <div className="card-body">
              {updateError && (
                <div className="alert alert-danger mb-4">
                  {updateError}
                </div>
              )}
              {updateSuccess && (
                <div className="alert alert-success mb-4">
                  {updateSuccess}
                </div>
              )}

              {editing ? (
                <Formik
                  initialValues={{
                    firstName: user.firstName,
                    lastName: user.lastName
                  }}
                  validationSchema={ProfileSchema}
                  onSubmit={handleSubmit}
                  enableReinitialize
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="mb-4 text-center">
                        <div 
                          className="mb-3"
                          style={{
                            width: '150px',
                            height: '150px',
                            borderRadius: '50%',
                            border: '2px dashed #ccc',
                            margin: '0 auto',
                            overflow: 'hidden',
                            cursor: 'pointer'
                          }}
                        >
                          {avatarPreview ? (
                            <img
                              src={avatarPreview}
                              alt="Avatar preview"
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              onClick={() => document.getElementById('editAvatarUpload').click()}
                            />
                          ) : (
                            <div
                              style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#999'
                              }}
                              onClick={() => document.getElementById('editAvatarUpload').click()}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                              </svg>
                              <span className="mt-1">Click to upload avatar</span>
                            </div>
                          )}
                        </div>
                        <input
                          type="file"
                          id="editAvatarUpload"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          style={{ display: 'none' }}
                        />
                        <small className="text-muted">Supports JPG, PNG, GIF formats, max 5MB</small>
                      </div>

                      <div className="row mb-4">
                        <div className="col-md-6">
                          <label htmlFor="firstName" className="form-label">First Name *</label>
                          <Field
                            type="text"
                            id="firstName"
                            name="firstName"
                            className="form-control"
                            disabled={isSubmitting}
                          />
                          <ErrorMessage
                            name="firstName"
                            component="div"
                            className="text-danger mt-1 small"
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="lastName" className="form-label">Last Name *</label>
                          <Field
                            type="text"
                            id="lastName"
                            name="lastName"
                            className="form-control"
                            disabled={isSubmitting}
                          />
                          <ErrorMessage
                            name="lastName"
                            component="div"
                            className="text-danger mt-1 small"
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                          type="email"
                          id="email"
                          value={user.email}
                          className="form-control"
                          disabled
                        />
                        <small className="text-muted">Email address cannot be changed</small>
                      </div>

                      <div className="mb-4">
                        <label className="form-label">User Role</label>
                        <div className="form-control bg-light text-dark">
                          {getRoleName(user.role)}
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="form-label">Registration Date</label>
                        <div className="form-control bg-light text-dark">
                          {new Date(user.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>

                      <div className="d-flex justify-content-end">
                        <button
                          type="button"
                          className="btn btn-secondary mr-2"
                          onClick={() => {
                            setEditing(false);
                            setAvatarPreview(user.avatar);
                            setAvatarFile(null);
                          }}
                          disabled={isSubmitting}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2"></span>
                              Updating...
                            </>
                          ) : (
                            'Save Changes'
                          )}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              ) : (
                // 查看模式
                <div>
                  <div className="mb-4 text-center">
                    <div 
                      style={{
                        width: '150px',
                        height: '150px',
                        borderRadius: '50%',
                        border: '3px solid #ddd',
                        margin: '0 auto',
                        overflow: 'hidden'
                      }}
                    >
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt="User avatar"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <div
                          style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#f8f9fa',
                            color: '#6c757d'
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                          </svg>
                          <span className="mt-1">No avatar</span>
                        </div>
                      )}
                    </div>
                    <h3 className="mt-3">{user.firstName} {user.lastName}</h3>
                    <p className="text-muted">{getRoleName(user.role)}</p>
                  </div>

                  <div className="border-top pt-4">
                    <div className="mb-4">
                      <h4 className="text-muted">Account Information</h4>
                      <div className="row">
                        <div className="col-md-4 text-muted">Email:</div>
                        <div className="col-md-8">{user.email}</div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-md-4 text-muted">Registration Date:</div>
                        <div className="col-md-8">
                          {new Date(user.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-md-4 text-muted">User ID:</div>
                        <div className="col-md-8">{user.id}</div>
                      </div>
                    </div>

                    <div className="border-top pt-4 mt-4">
                      <h4 className="text-muted">Permission Information</h4>
                      <div className="mb-2">
                        <strong>Current Role:</strong> {getRoleName(user.role)}
                      </div>
                      <div className="mb-2">
                        <strong>Permission Description:</strong>
                      </div>
                      <ul className="list-group">
                        {user.role === 'admin' && (
                          <>
                            <li className="list-group-item">• View all news</li>
                            <li className="list-group-item">• Post news</li>
                            <li className="list-group-item">• Edit and delete any news</li>
                            <li className="list-group-item">• Manage user accounts and permissions</li>
                          </>
                        )}
                        {user.role === 'member' && (
                          <>
                            <li className="list-group-item">• View all news</li>
                            <li className="list-group-item">• Post news</li>
                            <li className="list-group-item">• Vote on news</li>
                            <li className="list-group-item">• Edit personal profile</li>
                          </>
                        )}
                        {user.role === 'reader' && (
                          <>
                            <li className="list-group-item">• View all news</li>
                            <li className="list-group-item">• Vote on news</li>
                            <li className="list-group-item">• Edit personal profile</li>
                            <li className="list-group-item text-danger">• Cannot post news</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;