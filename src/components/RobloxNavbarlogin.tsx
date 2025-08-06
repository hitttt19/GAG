import { Navbar, Container, Button } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { useState } from 'react';
import AuthModal from './AuthModal';
import { useNavigate } from 'react-router-dom';

const RobloxNavbarlogin = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    // Add any logout logic here (like clearing tokens, etc.)
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
          <Navbar.Brand href="#" className="d-flex align-items-center">
            <img 
              src="/images/gaglogo.png" 
              alt="Grow a Garden Logo"
              className="navbar-logo me-2"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Button 
              variant="outline-light" 
              className="me-2 navbar-btn"
              onClick={handleLogoutClick}
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