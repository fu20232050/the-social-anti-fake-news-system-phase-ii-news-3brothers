import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { fetchNewsList, deleteNews } from '../services/newsService';

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [filter, setFilter] = useState('all');
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      try {
        // Get news list
        const newsList = await fetchNewsList();
        
        // 应用过滤器
        let filteredNews = newsList;
        if (filter === 'fake') {
          filteredNews = newsList.filter(item => item.status === 'fake');
        } else if (filter === 'notFake') {
          filteredNews = newsList.filter(item => item.status === 'notFake' || item.status === 'not fake');
        } else if (filter === 'undetermined') {
          filteredNews = newsList.filter(item => item.status === 'undetermined');
        }
        
        setNews(filteredNews);
        setCurrentPage(1); // 重置到第一页
      } catch (error) {
        console.error('Failed to load news:', error);
        alert('Failed to load news. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    loadNews();
  }, [filter]);

  // Calculate pagination
  const totalPages = Math.ceil(news.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentNews = news.slice(startIndex, endIndex);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  // Delete news
  const handleDeleteNews = async (newsId, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAdmin()) {
      alert('Only administrators can delete news');
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this news?')) {
      try {
        await deleteNews(newsId);
        // Reload news list
        const newsList = await fetchNewsList();
        setNews(newsList.filter(item => {
          if (filter === 'fake') return item.status === 'fake';
          if (filter === 'notFake') return item.status === 'notFake' || item.status === 'not fake';
          if (filter === 'undetermined') return item.status === 'undetermined';
          return true;
        }));
      } catch (error) {
        console.error('Failed to delete news:', error);
        alert(error.message || 'Failed to delete news');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Social Anti-Fake News System</h1>
      
      {/* Filter controls */}
      <div className="row mb-4">
        <div className="col-md-6">
          <label htmlFor="filter" className="mr-2">Filter by status:</label>
          <select 
            id="filter" 
            className="form-control" 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All News</option>
            <option value="fake">Fake News</option>
            <option value="notFake">Not Fake News</option>
            <option value="undetermined">Undetermined News</option>
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="pageSize" className="mr-2">News per page:</label>
          <select 
            id="pageSize" 
            className="form-control" 
            value={pageSize} 
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1); // Reset to first page when page size changes
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      {/* News list */}
      <div className="list-group">
        {loading ? (
          <div className="text-center py-5">Loading news...</div>
        ) : currentNews.length > 0 ? (
          currentNews.map(item => (
            <div key={item.id} className="list-group-item mb-3 shadow-sm rounded">
              <div className="d-flex justify-content-between">
                <h2 className="h5">
                  <Link to={`/news/${item.id}`}>{item.topic}</Link>
                  {item.deleted && <span className="ml-2 text-danger">[DELETED]</span>}
                </h2>
                <span className={`badge ${item.status === 'fake' ? 'badge-danger' : item.status === 'undetermined' ? 'badge-warning' : 'badge-success'} ${item.deleted ? 'bg-gray' : ''}`}>
                    {item.status === 'fake' ? 'Fake News' : item.status === 'undetermined' ? 'Undetermined' : 'Not Fake News'}
                  </span>
              </div>
              <p className="text-muted mt-2">{item.shortDetail}</p>
              <div className="d-flex justify-content-between text-sm text-secondary mt-3">
                <span>Reported by: {item.reporter}</span>
                <span>Date: {formatDate(item.dateTime)}</span>
                <span>Votes: {item.votes.fake + item.votes.notFake + (item.votes.undetermined || 0)}</span>
              </div>
              <div className="mt-2 d-flex gap-2">
                <Link to={`/news/${item.id}`} className="btn btn-primary btn-sm">View Details</Link>
                {isAdmin() && (
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={(e) => handleDeleteNews(item.id, e)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="alert alert-info">No news found matching the criteria.</div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-4" aria-label="Page navigation">
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
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
              <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                <button 
                  className="page-link" 
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button 
                className="page-link" 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default NewsList;