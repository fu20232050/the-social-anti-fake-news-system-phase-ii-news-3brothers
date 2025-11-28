import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService.js';
import { useAuth } from '../contexts/AuthContext.jsx';

// Define login form validation rules
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginSuccess } = useAuth();
  const [loginError, setLoginError] = useState('');

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      setLoginError('');
      
      // 调用登录服务
      const { user } = await loginUser(values.email, values.password);
      
      // 更新认证上下文
      loginSuccess(user);
      
      // 登录成功后跳转到首页
      navigate('/');
      
    } catch (error) {
      console.error('Login failed:', error);
      setLoginError(error.message || 'Login failed, please check your email and password');
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white text-center">
              <h2>User Login</h2>
            </div>
            <div className="card-body">
              {loginError && (
                <div className="alert alert-danger mb-3">
                  {loginError}
                </div>
              )}
              
              <Formik
                initialValues={{
                  email: '',
                  password: ''
                }}
                validationSchema={LoginSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
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

                    <div className="mb-4">
                      <label htmlFor="password" className="form-label">Password *</label>
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter your password"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-danger mt-1 small"
                      />
                    </div>

                    <div className="mb-4 form-check">
                      <Field
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                        className="form-check-input"
                      />
                      <label htmlFor="rememberMe" className="form-check-label">
                        Remember me
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary w-100 py-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Logging in...
                        </>
                      ) : (
                        'Login'
                      )}
                    </button>
                  </Form>
                )}
              </Formik>

              <div className="mt-4 text-center">
                <p>
                  Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); navigate('/register'); }}>Register now</a>
                </p>
              </div>

              <div className="mt-3 text-center">
                <p>Test accounts:</p>
                <div className="bg-light p-3 rounded">
                  <p><strong>Admin:</strong> admin@example.com / Admin123!</p>
                  <p><strong>Member:</strong> member@example.com / Member123!</p>
                  <p><strong>Reader:</strong> reader@example.com / Reader123!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;