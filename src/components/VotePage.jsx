import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockNews } from '../data/mockData';

const VotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [userVote, setUserVote] = useState('');
  const [userComment, setUserComment] = useState('');
  const [userImage, setUserImage] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Find the news item by ID
    const foundNews = mockNews.find(item => item.id === Number(id));
    if (foundNews) {
      setNews(foundNews);
    } else {
      // News not found
      alert('News item not found!');
      navigate('/');
    }
  }, [id, navigate]);

  // Handle vote and comment submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      alert('Please enter your name');
      return;
    }
    
    if (!userVote) {
      alert('Please select a vote');
      return;
    }

    // Create new comment
    const newComment = {
      id: Date.now(), // Unique ID using timestamp
      user: username,
      vote: userVote,
      comment: userComment,
      dateTime: new Date().toISOString(),
      image: userImage
    };

    // Update the news item with the new comment and vote
    if (news) {
      // Ensure userVote is valid - only allow fake or notFake from form
      const formVoteTypes = ['fake', 'notFake'];
      if (!formVoteTypes.includes(userVote)) {
        console.error('Invalid vote type:', userVote);
        return;
      }
      
      // Update votes count
      const updatedVotes = {
        ...news.votes,
        [userVote]: (news.votes[userVote] || 0) + 1
      };
      
      // Add the new comment to the comments array
      const updatedComments = [...(news.comments || []), newComment];
      
      // Find the index of the news item in mockNews
      const newsIndex = mockNews.findIndex(item => item.id === Number(id));
      if (newsIndex !== -1) {
        // Update the mockNews array
        mockNews[newsIndex] = {
          ...mockNews[newsIndex],
          votes: updatedVotes,
          comments: updatedComments
        };
      }
    }

    // Navigate back to the news detail page
    navigate(`/news/${id}`);
  };

  if (!news) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <button onClick={() => navigate(`/news/${id}`)} className="btn btn-secondary mb-4">
        Back to News
      </button>

      <div className="card shadow-lg p-5 rounded-lg" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 className="text-center mb-4">Vote and Comment on News</h2>
        
        <div className="mb-4 border-bottom pb-3">
          <h4>{news.topic}</h4>
          <p className="text-muted">{news.shortDetail}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label className="font-weight-bold">How would you evaluate this news?</label>
            <div className="mt-2">
              <div className="form-check">
                <input 
                  type="radio" 
                  id="fake" 
                  name="vote" 
                  value="fake" 
                  checked={userVote === 'fake'}
                  onChange={(e) => setUserVote(e.target.value)}
                  className="form-check-input"
                  required
                />
                <label htmlFor="fake" className="form-check-label ml-2">This is Fake News</label>
              </div>
              <div className="form-check">
                <input 
                  type="radio" 
                  id="notFake" 
                  name="vote" 
                  value="notFake" 
                  checked={userVote === 'notFake'}
                  onChange={(e) => setUserVote(e.target.value)}
                  className="form-check-input"
                />
                <label htmlFor="notFake" className="form-check-label ml-2">This is Not Fake News</label>
              </div>

            </div>
          </div>
          
          <div className="form-group mb-4">
            <label htmlFor="comment" className="font-weight-bold">Explain your evaluation</label>
            <textarea 
              id="comment" 
              className="form-control" 
              rows="4" 
              value={userComment} 
              onChange={(e) => setUserComment(e.target.value)}
              placeholder="Explain your reasoning (what evidence, why you think so, any links)..."
              required
            ></textarea>
            <small className="form-text text-muted mt-1">
              Be respectful and specific. Aim for 1-2 sentences. Include links, screenshots, or sources if possible.
            </small>
          </div>
          
          <div className="form-group mb-4">
            <label htmlFor="image" className="font-weight-bold">Evidence image URL (optional)</label>
            <input 
              type="text" 
              id="image" 
              className="form-control" 
              value={userImage} 
              onChange={(e) => setUserImage(e.target.value)}
              placeholder="https://..."
            />
          </div>
          
          <div className="form-group mb-4">
            <label htmlFor="username" className="font-weight-bold">Display Name</label>
            <input 
              type="text" 
              id="username" 
              className="form-control" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g., ABCD"
              required
            />
          </div>
          
          <div className="d-flex justify-content-end gap-3">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={() => navigate(`/news/${id}`)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
        
        <div className="mt-4 text-center text-muted text-sm">
          <p>Note: This app stores new votes/comments locally in memory only (mock single-page app). Reloading the page will clear them.</p>
        </div>
      </div>
    </div>
  );
};

export default VotePage;