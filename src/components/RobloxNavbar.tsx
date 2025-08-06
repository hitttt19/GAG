import { Navbar, Container, Button } from 'react-bootstrap';
import { FaLeaf, FaUser } from 'react-icons/fa';
import { useState } from 'react';
import AuthModal from './AuthModal';

const RobloxNavbar = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleLoginClick = () => {
    setShowAuthModal(true);
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
              onClick={handleLoginClick}
            >
              <FaUser className="me-1" /> Login
            </Button>
            <Button variant="success" className="navbar-btn">
              <FaLeaf className="me-1" /> Play Now
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

export default RobloxNavbar;