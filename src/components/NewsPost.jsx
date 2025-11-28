import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PrivateComponent from './PrivateComponent';
import { mockNews, setMockNews } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

// Define form validation rules
const NewsSchema = Yup.object().shape({
  topic: Yup.string()
    .required('Title is required')
    .min(5, 'Title must be at least 5 characters')
    .max(200, 'Title cannot exceed 200 characters'),
  shortDetail: Yup.string()
    .required('Short description is required')
    .min(10, 'Short description must be at least 10 characters')
    .max(500, 'Short description cannot exceed 500 characters'),
  fullDetail: Yup.string()
    .required('Full content is required')
    .min(20, 'Full content must be at least 20 characters'),
  image: Yup.string()
    .url('Please enter a valid image URL')
    .optional()
});

const NewsPostBase = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [postingError, setPostingError] = useState('');
  const [postingSuccess, setPostingSuccess] = useState('');

  // Generate unique ID
  const generateId = () => {
    return Date.now() + Math.floor(Math.random() * 1000);
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      setPostingError('');
      setPostingSuccess('');

      // 准备新闻数据
      const newNews = {
        id: generateId(),
        topic: values.topic,
        shortDetail: values.shortDetail,
        fullDetail: values.fullDetail,
        status: 'undetermined', // 初始状态为未确定
        reporter: user ? `${user.firstName} ${user.lastName}` : 'Anonymous User', // Use current logged-in user info
        dateTime: new Date().toISOString(),
        image: values.image || 'https://via.placeholder.com/600x300?text=No+Image',
        votes: {
          fake: 0,
          notFake: 0
        },
        comments: []
      };

      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 更新模拟数据
      const updatedNews = [newNews, ...mockNews];
      setMockNews(updatedNews);

      // 保存到localStorage
      localStorage.setItem('mockNews', JSON.stringify(updatedNews));

      setPostingSuccess('News published successfully! Redirecting to news detail page...');

      // 2秒后跳转到新发布的新闻详情页
      setTimeout(() => {
        navigate(`/news/${newNews.id}`);
      }, 2000);

    } catch (error) {
      console.error('Failed to publish news:', error);
      setPostingError('Failed to publish, please try again later');
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white">
              <h2>Post News</h2>
            </div>
            <div className="card-body">
              {postingError && (
                <div className="alert alert-danger mb-3">
                  {postingError}
                </div>
              )}
              {postingSuccess && (
                <div className="alert alert-success mb-3">
                  {postingSuccess}
                </div>
              )}

              <Formik
                initialValues={{
                  topic: '',
                  shortDetail: '',
                  fullDetail: '',
                  image: ''
                }}
                validationSchema={NewsSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-3">
                      <label htmlFor="topic" className="form-label">Title *</label>
                      <Field
                        type="text"
                        id="topic"
                        name="topic"
                        className="form-control"
                        placeholder="Enter news title"
                        disabled={isSubmitting}
                      />
                      <ErrorMessage
                        name="topic"
                        component="div"
                        className="text-danger mt-1 small"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="shortDetail" className="form-label">Short Description *</label>
                      <Field
                        as="textarea"
                        id="shortDetail"
                        name="shortDetail"
                        className="form-control"
                        rows={3}
                        placeholder="Enter news short description"
                        disabled={isSubmitting}
                      />
                      <ErrorMessage
                        name="shortDetail"
                        component="div"
                        className="text-danger mt-1 small"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="fullDetail" className="form-label">Full Content *</label>
                      <Field
                        as="textarea"
                        id="fullDetail"
                        name="fullDetail"
                        className="form-control"
                        rows={8}
                        placeholder="Enter news full content"
                        disabled={isSubmitting}
                      />
                      <ErrorMessage
                        name="fullDetail"
                        component="div"
                        className="text-danger mt-1 small"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="image" className="form-label">Image URL (Optional)</label>
                      <Field
                        type="text"
                        id="image"
                        name="image"
                        className="form-control"
                        placeholder="Enter news image URL"
                        disabled={isSubmitting}
                      />
                      <ErrorMessage
                        name="image"
                        component="div"
                        className="text-danger mt-1 small"
                      />
                      <small className="text-muted">If no image is provided, a default placeholder will be used</small>
                    </div>

                    <div className="d-flex justify-content-between">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate(-1)}
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
                            Posting...
                          </>
                        ) : (
                          'Post News'
                        )}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Create member-exclusive posting page component
// Only members and administrators can access
const NewsPost = PrivateComponent(NewsPostBase, {
  requiredRole: 'member', // Or 'admin', but our authContext already handles admin permissions
  fallbackComponent: () => (
    <div className="container mt-5">
      <div className="alert alert-warning text-center" role="alert">
        <h4 className="alert-heading">Insufficient Permissions</h4>
        <p>Your account does not have sufficient permissions to publish news. Only members and administrators can publish news.</p>
        <hr />
        <p className="mb-0">If you need this functionality, please contact the administrator to upgrade your account permissions.</p>
      </div>
    </div>
  )
});

export default NewsPost;