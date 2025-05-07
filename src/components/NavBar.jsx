import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setMenuOpen(false);
    localStorage.removeItem('jwt');
    navigate('/');
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };
  
  React.useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    document.addEventListener('click', closeMenu);
    
    return () => {
      document.removeEventListener('click', closeMenu);
    };
  }, []);

  return (
    <header>
      <nav className="navbar">
       
        <div className="navbar-center">
          <Link to="/home" className="navbar-link active">Home</Link>
          {user?.role && user.role.map(role => role.toLowerCase()).includes('role_admin') && (
            <Link to="/admin/users" className="navbar-link">Admin Console</Link>
          )}
        </div>
        
        <div className="navbar-user-menu">
          <span className="navbar-username">
            {user?.username ? user.username : 'Guess'}
          </span>
          
          <div className="navbar-dropdown" onClick={(e) => e.stopPropagation()}>
            <button 
              className="navbar-dropdown-button" 
              onClick={toggleMenu}
              aria-label="User menu"
              aria-expanded={menuOpen}
            >
              <i className="gear-icon">⚙</i>
            </button>
            
            <div className={`navbar-dropdown-content ${menuOpen ? 'open' : ''}`}>
              <Link to="/change-password" className="navbar-dropdown-item">
                Change password
              </Link>
              <button onClick={handleLogout} className="navbar-dropdown-item">
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;