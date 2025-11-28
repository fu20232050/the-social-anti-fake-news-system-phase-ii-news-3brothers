import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { publishNews } from '../services/newsService';
import { useAuth } from "../contexts/AuthContext";
import './CreateNews.css';

const CreateNews = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isMember } = useAuth();
  
  // 表单状态
  const [formData, setFormData] = useState({
    topic: '',
    shortDetail: '',
    fullDetail: '',
    image: null
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  // 检查用户权限
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/create-news' } });
    } else if (!isMember()) {
      navigate('/', { state: { error: 'You must be a member to create news' } });
    }
  }, [isAuthenticated, isMember, navigate]);

  // 处理输入变化
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // 清除对应字段的错误
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // 处理文件上传
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // 验证文件类型
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setErrors(prev => ({ ...prev, image: 'Invalid image type. Please upload JPG, PNG, or GIF files.' }));
      setImagePreview(null);
      return;
    }
    
    // 验证文件大小（最大5MB）
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setErrors(prev => ({ ...prev, image: 'File too large. Maximum size is 5MB.' }));
      setImagePreview(null);
      return;
    }
    
    // 清除错误并生成预览
    setErrors(prev => ({ ...prev, image: '' }));
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFormData(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // 清除图片
  const clearImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setImagePreview(null);
    setErrors(prev => ({ ...prev, image: '' }));
    document.getElementById('image-upload').value = '';
  };

  // 验证表单
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.topic.trim()) {
      newErrors.topic = 'Title cannot be empty';
    } else if (formData.topic.length < 5) {
      newErrors.topic = 'Title must be at least 5 characters';
    }
    
    if (!formData.shortDetail.trim()) {
      newErrors.shortDetail = 'Short description cannot be empty';
    } else if (formData.shortDetail.length < 10) {
      newErrors.shortDetail = 'Short description must be at least 10 characters';
    }
    
    if (!formData.fullDetail.trim()) {
      newErrors.fullDetail = 'Full content cannot be empty';
    } else if (formData.fullDetail.length < 20) {
      newErrors.fullDetail = 'Full content must be at least 20 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 提交表单
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const newsData = {
        topic: formData.topic.trim(),
        shortDetail: formData.shortDetail.trim(),
        fullDetail: formData.fullDetail.trim(),
        image: formData.image
      };
      
      await publishNews(newsData);
      setSubmitSuccess(true);
      
      // 3秒后重定向到新闻列表页
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      setSubmitError(error.message || '发布新闻失败，请重试');
      console.error('发布新闻失败:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cancel publishing
  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel publishing? Unsaved content will be lost.')) {
      navigate('/');
    }
  };

  return (
    <div className="container create-news-container mt-5">
      <h1 className="text-center mb-4">Publish News</h1>
      
      {submitSuccess ? (
        <div className="success-message card bg-success text-white p-5 text-center">
          <h2>Published Successfully!</h2>
          <p>Your news has been successfully submitted and is awaiting review.</p>
          <p>Redirecting to news list...</p>
        </div>
      ) : (
        <div className="card p-5 shadow-lg">
          {submitError && (
            <div className="alert alert-danger mb-4">
              {submitError}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {/* 标题 */}
            <div className="mb-4">
              <label htmlFor="topic" className="form-label">News Title *</label>
              <input
                type="text"
                id="topic"
                name="topic"
                className={`form-control ${errors.topic ? 'is-invalid' : ''}`}
                value={formData.topic}
                onChange={handleChange}
                placeholder="Enter news title"
                maxLength={100}
              />
              {errors.topic && (
                <div className="invalid-feedback">{errors.topic}</div>
              )}
              <small className="form-text text-muted">{formData.topic.length}/100</small>
            </div>
            
            {/* 简短描述 */}
            <div className="mb-4">
              <label htmlFor="shortDetail" className="form-label">Short Description *</label>
              <textarea
                id="shortDetail"
                name="shortDetail"
                className={`form-control ${errors.shortDetail ? 'is-invalid' : ''}`}
                value={formData.shortDetail}
                onChange={handleChange}
                placeholder="Enter a short description"
                rows={3}
                maxLength={200}
              />
              {errors.shortDetail && (
                <div className="invalid-feedback">{errors.shortDetail}</div>
              )}
              <small className="form-text text-muted">{formData.shortDetail.length}/200</small>
            </div>
            
            {/* 详细内容 */}
            <div className="mb-4">
              <label htmlFor="fullDetail" className="form-label">Full Content *</label>
              <textarea
                id="fullDetail"
                name="fullDetail"
                className={`form-control ${errors.fullDetail ? 'is-invalid' : ''}`}
                value={formData.fullDetail}
                onChange={handleChange}
                placeholder="Enter full content"
                rows={10}
                maxLength={2000}
              />
              {errors.fullDetail && (
                <div className="invalid-feedback">{errors.fullDetail}</div>
              )}
              <small className="form-text text-muted">{formData.fullDetail.length}/2000</small>
            </div>
            
            {/* 图片上传 */}
            <div className="mb-4">
              <label htmlFor="image-upload" className="form-label">News Image (Optional)</label>
              <input
                type="file"
                id="image-upload"
                className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                accept="image/*"
                onChange={handleImageUpload}
              />
              {errors.image && (
                <div className="invalid-feedback">{errors.image}</div>
              )}
              <small className="form-text text-muted">支持JPG、PNG、GIF格式，最大5MB</small>
              
              {/* 图片预览 */}
              {imagePreview && (
                <div className="image-preview mt-3">
                  <img src={imagePreview} alt="预览" className="preview-img" />
                  <button 
                    type="button" 
                    className="btn btn-sm btn-danger mt-2"
                    onClick={clearImage}
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>
            
            {/* 按钮组 */}
            <div className="button-group d-flex justify-content-between">
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Publish News'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateNews;