import { Navbar, Container, Button } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { useState } from 'react';
import AuthModal from './AuthModal';
import { useNavigate } from 'react-router-dom';
import logoImage from '../assets/images/gaglogo.png'; // Import the logo image

const RobloxNavbarlogin = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    // Add any logout logic here (like clearing tokens, etc.)
    localStorage.removeItem('authToken'); // Example: Clear auth token
    // Then redirect to homepage
    navigate('/');
  };

  const handleAuthModalClose = () => {
    setShowAuthModal(false);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="custom-navbar">
        <Container>
          <Navbar.Brand 
            href="#" 
            className="d-flex align-items-center"
            onClick={() => navigate('/')} // Make logo clickable to home
            style={{ cursor: 'pointer' }}
          >
            <img 
              src={logoImage} // Use imported image
              alt="Grow a Garden Logo"
              className="navbar-logo me-2"
              style={{ height: '40px' }} // Consistent sizing
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Button 
              variant="outline-light" 
              className="me-2 navbar-btn"
              onClick={handleLogoutClick}
              aria-label="Logout" // Better accessibility
            >
              <FaUser className="me-1" /> Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <AuthModal 
        show={showAuthModal} 
        onHide={handleAuthModalClose} 
      />
    </>
  );
};

export default RobloxNavbarlogin;