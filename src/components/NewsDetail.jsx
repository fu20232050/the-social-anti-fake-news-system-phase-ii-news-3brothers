import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { fetchNewsDetail, deleteNews, deleteComment } from '../services/newsService';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(true);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();
  const [commentDeleteError, setCommentDeleteError] = useState('');

  useEffect(() => {
    const loadNewsDetail = async () => {
      setLoading(true);
      try {
        const newsDetail = await fetchNewsDetail(Number(id));
        if (newsDetail) {
          setNews(newsDetail);
          setComments(newsDetail.comments || []);
        } else {
          // News not found or deleted and user is not admin
          alert('News item not found!');
          navigate('/');
        }
      } catch (error) {
        console.error('Failed to load news detail:', error);
        alert('Failed to load news detail');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    
    loadNewsDetail();
  }, [id, navigate]);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Calculate pagination for comments
  const totalCommentPages = Math.ceil(comments.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentComments = comments.slice(startIndex, endIndex);

  // Regularly update comments and vote data
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const updatedNews = await fetchNewsDetail(Number(id));
        if (updatedNews && updatedNews.comments) {
          setComments(updatedNews.comments);
          // 同时更新投票和其他新闻数据
          if (JSON.stringify(news) !== JSON.stringify(updatedNews)) {
            setNews(updatedNews);
          }
        }
      } catch (error) {
        console.error('Failed to update news data:', error);
      }
    }, 3000); // 每3秒检查一次

    return () => clearInterval(interval);
  }, [id, news]);

  // Removed handleDetermineNews function as per requirements

  // Delete news
  const handleDeleteNews = async () => {
    if (!isAdmin()) {
      alert('Only administrators can delete news');
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this news?')) {
      try {
        await deleteNews(Number(id));
        alert('News deleted successfully');
        navigate('/');
      } catch (error) {
        console.error('Failed to delete news:', error);
        alert(error.message || 'Failed to delete news');
      }
    }
  };

  // Delete comment
  const handleDeleteComment = async (commentId) => {
    if (!isAdmin()) {
      alert('Only administrators can delete comments');
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        setCommentDeleteError('');
        await deleteComment(Number(id), commentId);
        // 重新加载评论数据
        const updatedNews = await fetchNewsDetail(Number(id));
        if (updatedNews && updatedNews.comments) {
          setComments(updatedNews.comments);
        }
      } catch (error) {
        console.error('Failed to delete comment:', error);
        setCommentDeleteError(error.message || 'Failed to delete comment');
      }
    }
  };

  if (loading) {
    return <div className="container mt-5">Loading...</div>;
  }
  
  if (!news) {
    return <div className="container mt-5">News not found!</div>;
  }

  return (
    <div className="container mt-5">
      <button onClick={() => navigate('/')} className="btn btn-secondary mb-4">
        Back to News List
      </button>

      {/* News Details */}
      <div className="card mb-5">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start flex-wrap">
            <h1 className="card-title">
              {news.topic}
              {news.deleted && <span className="ml-3 text-danger">[DELETED]</span>}
            </h1>
            <span className={`badge ${news.status === 'fake' ? 'badge-danger' : 
                                  news.status === 'undetermined' ? 'badge-warning' : 'badge-success'} 
                                  text-lg ${news.deleted ? 'bg-gray' : ''}`}>
              {news.status === 'fake' ? 'Fake News' : 
               news.status === 'undetermined' ? 'Undetermined' : 'Not Fake News'}
            </span>
          </div>
          
          {news.image && (
            <img 
              src={news.image} 
              alt={news.topic} 
              className="img-fluid my-4 rounded"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/600x400?text=News+Image';
              }}
            />
          )}
          
          <p className="card-text lead">{news.fullDetail}</p>
          
          <div className="d-flex justify-content-between text-secondary mt-4">
            <div>
              <strong>Reported by:</strong> {news.reporter}
            </div>
            <div>
              <strong>Date:</strong> {formatDate(news.dateTime)}
            </div>
          </div>
          
          <div className="mt-4">
            <h5>Vote Results:</h5>
            <div className="d-flex flex-wrap gap-3">
              <div>
                <span className="badge badge-danger mr-2">Fake:</span> 
                <span>{news.votes.fake}</span>
              </div>
              <div>
                <span className="badge badge-success mr-2">Not Fake:</span> 
                <span>{news.votes.notFake}</span>
              </div>
              {news.votes.undetermined && (
                <div>
                  <span className="badge badge-warning mr-2">Undetermined:</span> 
                  <span>{news.votes.undetermined}</span>
                </div>
              )}
              <div className="ml-auto">
                <strong>Total Votes:</strong> {news.votes.fake + news.votes.notFake + (news.votes.undetermined || 0)}
              </div>
            </div>
          </div>
          
          {/* Admin Delete Button */}
          {isAdmin() && (
            <div className="mt-4">
              <button 
                onClick={handleDeleteNews}
                className="btn btn-danger"
              >
                Delete News
              </button>
            </div>
          )}
          
          {/* Removed determination section as per requirements */}
        </div>
      </div>

      {/* Comments Section */}
      <div className="card">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4>Comments and Votes</h4>
          <button 
            onClick={() => setShowComments(!showComments)}
            className="btn btn-light btn-sm"
          >
            {showComments ? 'Hide' : 'Show'} Comments
          </button>
        </div>
        
        {showComments && (
          <div className="card-body">
            {/* Vote and Comment Button */}
            <div className="d-flex justify-content-end mb-4">
              <button 
                onClick={() => navigate(`/vote/${id}`)}
                className="btn btn-primary"
              >
                Vote & Comment
              </button>
            </div>

            {/* Comments List */}
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Comments ({comments.length})</h5>
                <div>
                  <label htmlFor="commentPageSize" className="mr-2">Comments per page:</label>
                  <select 
                    id="commentPageSize" 
                    className="form-control form-control-sm" 
                    value={pageSize} 
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                </div>
              </div>
              
              {currentComments.length > 0 ? (
                <div className="comment-list">
                  {currentComments.map(comment => (
                    <div key={comment.id} className="border p-3 rounded mb-3">
                      <div className="d-flex justify-content-between">
                        <strong>{comment.user}</strong>
                        <span className={`badge ${comment.vote === 'fake' ? 'badge-danger' : comment.vote === 'undetermined' ? 'badge-warning' : 'badge-success'}`}>
                          {comment.vote === 'fake' ? 'Fake' : comment.vote === 'undetermined' ? 'Undetermined' : 'Not Fake'}
                        </span>
                      </div>
                      <p className="mt-2">{comment.comment}</p>
                      {comment.image && (
                        <img 
                          src={comment.image} 
                          alt="Comment attachment" 
                          className="img-fluid mt-2 rounded"
                          style={{ maxHeight: '200px' }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                          }}
                        />
                      )}
                      <div className="text-right text-muted text-sm mt-2">
                        {formatDate(comment.dateTime)}
                      </div>
                      {isAdmin() && (
                        <button 
                          className="btn btn-sm btn-danger mt-2"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          Delete Comment
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="alert alert-info">No comments yet. Be the first to comment!</div>
              )}

              {/* Comment Pagination */}
              {commentDeleteError && (
                <div className="alert alert-danger mb-3">{commentDeleteError}</div>
              )}
              {totalCommentPages > 1 && (
                <nav className="mt-4" aria-label="Comment navigation">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button 
                        className="page-link" 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                    </li>
                    {Array.from({ length: totalCommentPages }, (_, index) => index + 1).map(page => (
                      <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                        <button 
                          className="page-link" 
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalCommentPages ? 'disabled' : ''}`}>
                      <button 
                        className="page-link" 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalCommentPages))}
                        disabled={currentPage === totalCommentPages}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsDetail;