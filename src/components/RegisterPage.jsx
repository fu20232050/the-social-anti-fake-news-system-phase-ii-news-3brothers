import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { registerUser, handleAvatarUpload } from '../services/authService.js';

// Define form validation rules
const RegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name cannot exceed 50 characters'),
  lastName: Yup.string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name cannot exceed 50 characters'),
  email: Yup.string()
    .required('Email is required')
    .email('Please enter a valid email address')
    .max(255, 'Email cannot exceed 255 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password cannot exceed 100 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');

  // Handle avatar upload
  const handleAvatarChange = async (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      try {
        const avatarDataUrl = await handleAvatarUpload(file);
        setAvatar(file);
        setAvatarPreview(avatarDataUrl);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      setRegisterError('');
      
      // 准备用户数据
      const userData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        avatar: avatarPreview
      };
      
      // 调用注册服务
      const registeredUser = await registerUser(userData);
      
      console.log('Registration successful, user data:', registeredUser);
      setRegisterSuccess('Registration successful! Redirecting to homepage...');
      
      // 3秒后跳转到首页
      setTimeout(() => {
        navigate('/');
      }, 3000);
      
    } catch (error) {
      console.error('Registration failed:', error);
        setRegisterError(error.message || 'Registration failed, please try again later');
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white text-center">
              <h2>User Registration</h2>
            </div>
            <div className="card-body">
              {registerError && (
                <div className="alert alert-danger mb-3">
                  {registerError}
                </div>
              )}
              {registerSuccess && (
                <div className="alert alert-success mb-3">
                  {registerSuccess}
                </div>
              )}
              
              <Formik
                initialValues={{
                  firstName: '',
                  lastName: '',
                  email: '',
                  password: '',
                  confirmPassword: ''
                }}
                validationSchema={RegisterSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-4 text-center">
                      <div 
                        className="mb-3"
                        style={{
                          width: '120px',
                          height: '120px',
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
                            onClick={() => document.getElementById('avatarUpload').click()}
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
                            onClick={() => document.getElementById('avatarUpload').click()}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                              <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                            </svg>
                            <span className="mt-1">Click to upload avatar</span>
                          </div>
                        )}
                      </div>
                      <input
                        type="file"
                        id="avatarUpload"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        style={{ display: 'none' }}
                      />
                      <small className="text-muted">Supports JPG, PNG, GIF formats, max 5MB</small>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label htmlFor="firstName" className="form-label">First Name *</label>
                        <Field
                          type="text"
                          id="firstName"
                          name="firstName"
                          className="form-control"
                          placeholder="Enter your first name"
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
                          placeholder="Enter your last name"
                        />
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className="text-danger mt-1 small"
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email *</label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter your email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-danger mt-1 small"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password *</label>
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        placeholder="Set your password"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-danger mt-1 small"
                      />
                      <small className="text-muted mt-1">
                        Password must be at least 8 characters, including uppercase letters, lowercase letters, numbers and special characters
                      </small>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="confirmPassword" className="form-label">Confirm Password *</label>
                      <Field
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className="form-control"
                        placeholder="Enter password again"
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="text-danger mt-1 small"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary w-100 py-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Registering...
                        </>
                      ) : (
                        'Register'
                      )}
                    </button>
                  </Form>
                )}
              </Formik>

              <div className="mt-4 text-center">
                <p>
                  Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Login now</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;