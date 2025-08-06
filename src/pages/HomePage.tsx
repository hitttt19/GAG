import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import RobloxNavbar from '../components/RobloxNavbar';
import MissionCard from '../components/MissionCard';
import PetCard from '../components/PetCard';
import AuthModal from '../components/AuthModal';

const HomePage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const loggedIn = false; // Simplified since we never change this value

  const missions = [
    { id: 1, task: "Water 10 plants", reward: "Rainbow Egg" },
    { id: 2, task: "Harvest 5 crops", reward: "Common Pet" },
  ];

  const pets = [
    { id: 1, name: "", rarity: "Divine", image: "/src/assets/images/raccon.png" },
    { id: 2, name: "", rarity: "Divine", image: "/src/assets/images/dgfly.png" },
    { id: 3, name: "", rarity: "Divine", image: "/src/assets/images/mimic.png" },
    { id: 4, name: "", rarity: "Divine", image: "/src/assets/images/ds.png" },
  ];

  const handleClaimClick = () => {
    setShowLogin(true); // Show auth modal when claim button is clicked
  };

  return (
    <div className="roblox-theme">
      <RobloxNavbar />
      
      {/* Hero Section - Roblox Style */}
      <section className="roblox-hero py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="text-white">
              <h1 className="display-4 fw-bold mb-3 roblox-title">
                ADOPT MAGICAL PETS!
              </h1>
              <p className="lead mb-4 roblox-subtitle">
                Complete fun gardening missions to earn FREE pets!
              </p>
              <Button 
                variant="roblox-primary" 
                size="lg"
                className="roblox-main-btn"
                onClick={() => setShowLogin(true)}
              >
                START PLAYING
              </Button>
            </Col>
            <Col lg={6}>
              <img 
                src="/src/assets/images/ggsf.jpg" 
                alt="Game Preview" 
                className="img-fluid rounded-3 roblox-hero-img"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Missions Section */}
      <section className="py-5 roblox-section">
        <Container>
          <h2 className="text-center mb-5 roblox-section-title">🌱 DAILY MISSIONS</h2>
          <Row className="g-4">
            {missions.map(mission => (
              <Col key={mission.id} md={6}>
                <MissionCard 
                  {...mission} 
                  progress={loggedIn ? 0 : undefined}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Pets Section */}
      <section className="py-5 roblox-section-alt">
        <Container>
          <h2 className="text-center mb-5 roblox-section-title">✨ AVAILABLE PETS TO CLAIM</h2>
          <Row className="g-4">
            {pets.map(pet => (
              <Col key={pet.id} md={4} lg={3}>
                <PetCard 
                  {...pet} 
                  onClaimClick={handleClaimClick} // Pass the handler to PetCard
                />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <AuthModal 
        show={showLogin} 
        onHide={() => setShowLogin(false)}
      />
    </div>
  );
};

export default HomePage;