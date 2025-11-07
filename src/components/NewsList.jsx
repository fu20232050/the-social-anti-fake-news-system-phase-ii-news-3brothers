import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockNews } from '../data/mockData';

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [filter, setFilter] = useState('all');
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Filter news based on selected filter
    let filteredNews = mockNews;
    if (filter === 'fake') {
      filteredNews = mockNews.filter(item => item.status === 'fake');
    } else if (filter === 'notFake') {
      filteredNews = mockNews.filter(item => item.status === 'notFake' || item.status === 'not fake');
    } else if (filter === 'undetermined') {
      filteredNews = mockNews.filter(item => item.status === 'undetermined');
    }
    setNews(filteredNews);
    setCurrentPage(1); // Reset to first page when filter changes
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
        {currentNews.length > 0 ? (
          currentNews.map(item => (
            <div key={item.id} className="list-group-item mb-3 shadow-sm rounded">
              <div className="d-flex justify-content-between">
                <h2 className="h5">
                  <Link to={`/news/${item.id}`}>{item.topic}</Link>
                </h2>
                <span className={`badge ${item.status === 'fake' ? 'badge-danger' : item.status === 'undetermined' ? 'badge-warning' : 'badge-success'}`}>
                    {item.status === 'fake' ? 'Fake News' : item.status === 'undetermined' ? 'Undetermined' : 'Not Fake News'}
                  </span>
              </div>
              <p className="text-muted mt-2">{item.shortDetail}</p>
              <div className="d-flex justify-content-between text-sm text-secondary mt-3">
                <span>Reported by: {item.reporter}</span>
                <span>Date: {formatDate(item.dateTime)}</span>
                <span>Votes: {item.votes.fake + item.votes.notFake + (item.votes.undetermined || 0)}</span>
              </div>
              <div className="mt-2">
                <Link to={`/news/${item.id}`} className="btn btn-primary btn-sm">View Details</Link>
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