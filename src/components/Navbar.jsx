import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to log out?')) {
      logoutUser();
      navigate('/');
    }
  };

  // Get user role display name
  const getRoleName = (role) => {
    const roleMap = {
      'admin': 'Admin',
      'member': 'Member',
      'reader': 'Reader'
    };
    return roleMap[role] || role;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow-lg">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-newspaper" viewBox="0 0 16 16">
            <path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5v-11zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5H12z"/>
            <path d="M2 3h10v2H2V3zm0 3h4v3H2V6zm0 4h4v1H2v-1zm0 2h4v1H2v-1zm5-6h2v1H7V6zm3 0h2v1h-2V6zm-3 3h2v1H7V9zm3 0h2v1h-2V9zm-3 3h2v1H7v-1zm3 0h2v1h-2v-1z"/>
          </svg>
          <span className="ms-2">Social News</span>
        </Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
          </ul>

          {/* 用户登录状态显示 */}
          {isAuthenticated && user ? (
            <div className="navbar-nav dropdown show">
              <button 
                className="btn btn-primary dropdown-toggle" 
                type="button" 
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="true"
              >
                <div className="d-flex align-items-center">
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt="用户头像" 
                      className="rounded-circle me-2" 
                      style={{ width: '24px', height: '24px', objectFit: 'cover' }}
                    />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-circle me-2" viewBox="0 0 16 16">
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                      <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                    </svg>
                  )}
                  <span>{user.firstName} {user.lastName}</span>
                  <span className="mx-1">|</span>
                  <span className="text-xs">{getRoleName(user.role)}</span>
                </div>
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li>
                  <Link to="/profile" className="dropdown-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person me-2" viewBox="0 0 16 16">
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                    </svg>
                    Profile
                  </Link>
                </li>
                {(user.role === 'admin' || user.role === 'member') && (
                  <li>
                    <Link to="/create-news" className="dropdown-item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-newspaper me-2" viewBox="0 0 16 16">
                        <path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5v-11zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5H12z"/>
                        <path d="M2 3h10v2H2V3zm0 3h4v3H2V6zm0 4h4v1H2v-1zm0 2h4v1H2v-1zm5-6h2v1H7V6zm3 0h2v1h-2V6zm-3 3h2v1H7V9zm3 0h2v1h-2V9zm-3 3h2v1H7v-1zm3 0h2v1h-2v-1z"/>
                      </svg>
                      Publish News
                    </Link>
                  </li>
                )}
                {user.role === 'admin' && (
                  <li>
                    <Link to="/admin" className="dropdown-item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-shield-lock me-2" viewBox="0 0 16 16">
                        <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.257 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533a.744.744 0 0 0 .54.033l.054-.01c.152-.05.37-.209.646-.542l.613-1.835c.176-.52.304-1.065.37-1.605.126-.977-.04-1.519-.447-2.463a7.156 7.156 0 0 0-.84-1.295.456.456 0 0 0-.19-.163zm.257-.6a.5.5 0 0 0-.63-.32A61.68 61.68 0 0 0 2.995 2.9a.5.5 0 0 0-.512.37l-.236.907a29.407 29.407 0 0 0-1.823 5.29.5.5 0 0 0 .174.563c.166.19.418.308.691.398l.107.048c.406.19.84.333 1.296.333.452 0 .895-.143 1.296-.333l.107-.048c.273-.09.525-.208.691-.398a.5.5 0 0 0 .174-.563 29.533 29.533 0 0 0-1.823-5.29l-.236-.907a.5.5 0 0 0-.512-.37zm2.523 6.188a.5.5 0 0 0-.171-.055L4.943 8.062c.026-.06.06-.11.098-.155.07-.08.15-.155.24-.233.06-.057.125-.113.198-.163.1-.08.185-.166.294-.284l-.479-.479c-.53-.53-.838-1.17-.838-1.855a1.4 1.4 0 1 1 2.8 0c0 .685-.308 1.325-.838 1.855l-.479.479c.109.118.194.204.294.284.073.05.138.106.198.163.09.078.17.153.24.233.038.045.072.095.097.155l-2.078 1.283a.5.5 0 0 0-.17.516z"/>
                      </svg>
                      Admin Panel
                    </Link>
                  </li>
                )}
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a href="#" onClick={handleLogout} className="dropdown-item text-danger">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right me-2" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                      <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                    </svg>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <div className="d-flex">
              <Link to="/login" className="btn btn-outline-light me-2">
                Login
              </Link>
              <Link to="/register" className="btn btn-light">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;