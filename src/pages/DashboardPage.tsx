import { useState } from 'react';
import { Container, Row, Col, Card, ProgressBar, Button, Modal } from 'react-bootstrap';
import RobloxNavbar from '../components/RobloxNavbarlogin';
import { FaLeaf, FaTrophy, FaSeedling } from 'react-icons/fa';

// Import all images
import racconImg from '../assets/images/raccon.png';
import dgflyImg from '../assets/images/dgfly.png';
import mimicImg from '../assets/images/mimic.png';
import dsImg from '../assets/images/ds.png';
import profileImg from '../assets/images/av.png';

interface User {
  name: string;
  level: number;
  xp: number;
  xpNeeded: number;
  plantsPlanted: number;
  petsCollected: number;
  profileImage: string;
}

interface Mission {
  id: number;
  task: string;
  progress: number;
  total: number;
  reward: string;
}

interface Pet {
  id: number;
  name: string;
  rarity: string;
  image: string;
}

interface PetCardProps {
  id: number;
  name: string;
  rarity: string;
  image: string;
  claimedPets: number[];
  handleClaimClick: (petId: number) => void;
}

const PetCard = ({ id, name, rarity, image, claimedPets, handleClaimClick }: PetCardProps) => {
  const rarityClass = `rarity-${rarity.toLowerCase()}`;
  const isClaimed = claimedPets.includes(id);
  
  return (
    <Card className="h-100 d-flex flex-column">
      <div className="pet-image-container"
        style={{
          backgroundColor: '#fff',
          padding: '1rem',
          borderRadius: '0.25rem 0.25rem 0 0',
          height: '180px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Card.Img 
          variant="top" 
          src={image} 
          style={{ 
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain' 
          }}
        />
      </div>
      <Card.Body className="text-center d-flex flex-column">
        <div>
          <Card.Title>{name}</Card.Title>
          <Card.Text className={rarityClass}>
            {rarity}
          </Card.Text>
        </div>
        <Button 
          variant={isClaimed ? "secondary" : "success"}
          className="mt-auto align-self-center"
          onClick={isClaimed ? undefined : () => handleClaimClick(id)}
          disabled={isClaimed}
          style={{
            width: '80%',
            marginTop: '1rem'
          }}
        >
          {isClaimed ? "Claimed" : "Claim Pet"}
        </Button>
      </Card.Body>
    </Card>
  );
};

const DashboardPage = () => {
  // Sample user data
  const user: User = {
    name: "Gardener123",
    level: 5,
    xp: 1200,
    xpNeeded: 2000,
    plantsPlanted: 42,
    petsCollected: 7,
    profileImage: profileImg
  };

  // Sample active missions
  const activeMissions: Mission[] = [
    { id: 1, task: "Water 10 plants", progress: 0, total: 10, reward: "Rainbow Egg" },
    { id: 2, task: "Harvest 3 crops", progress: 0, total: 3, reward: "Common Pet Egg" }
  ];

  // Sample available pets
  const availablePets: Pet[] = [
    { id: 1, name: "Raccoon", rarity: "Divine", image: racconImg },
    { id: 2, name: "Dragonfly", rarity: "Divine", image: dgflyImg },
    { id: 3, name: "Mimic", rarity: "Divine", image: mimicImg },
    { id: 4, name: "Disco Bee", rarity: "Divine", image: dsImg }
  ];

  // State for modal and claimed pets
  const [showModal, setShowModal] = useState(false);
  const [claimedPets, setClaimedPets] = useState<number[]>([]);

  const handleClaimClick = (petId: number) => {
    setShowModal(true);
    setClaimedPets([...claimedPets, petId]);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="roblox-theme">
      <RobloxNavbar />
      
      {/* Claim Success Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Pet Claimed Successfully!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You have successfully claimed your pet. Please wait for 30 minutes to receive it.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      {/* User Profile Section - Updated with profile image */}
      <section className="roblox-hero py-4">
        <Container>
          <Row className="align-items-center">
            <Col md={2} className="text-center">
              <div className="bg-white rounded-circle p-3 d-inline-block" style={{ overflow: 'hidden' }}>
                <img 
                  src={user.profileImage} 
                  alt="Profile" 
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'cover',
                    borderRadius: '50%'
                  }}
                />
              </div>
            </Col>
            <Col md={10} className="text-white">
              <h2 className="fw-bold mb-1">{user.name}</h2>
              <div className="d-flex align-items-center mb-2">
                <span className="me-2">Level {user.level}</span>
                <ProgressBar 
                  now={(user.xp / user.xpNeeded) * 100} 
                  style={{ width: '200px', height: '10px' }} 
                  variant="success"
                />
                <small className="ms-2">{user.xp}/{user.xpNeeded} XP</small>
              </div>
              <div className="d-flex">
                <div className="me-4">
                  <FaSeedling className="me-1" /> {user.plantsPlanted} Plants
                </div>
                <div>
                  <FaTrophy className="me-1" /> {user.petsCollected} Pets
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Active Missions Section */}
      <section className="py-4 roblox-section">
        <Container>
          <h3 className="mb-4 roblox-section-title">
            <FaLeaf className="me-2" /> Active Missions
          </h3>
          <Row className="g-3">
            {activeMissions.map(mission => (
              <Col key={mission.id} md={6}>
                <Card className="h-100">
                  <Card.Body>
                    <Card.Title>{mission.task}</Card.Title>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <ProgressBar 
                        now={(mission.progress / mission.total) * 100} 
                        style={{ width: '60%', height: '10px' }} 
                        variant="info"
                      />
                      <span>{mission.progress}/{mission.total}</span>
                    </div>
                    <Card.Text className="text-muted">
                      Reward: {mission.reward}
                    </Card.Text>
                    <Button variant="primary" size="sm">
                      Continue Mission
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Available Pets Section */}
      <section className="py-5 roblox-section-alt">
        <Container>
          <h2 className="text-center mb-5 roblox-section-title">✨ AVAILABLE PETS TO CLAIM</h2>
          <Row className="g-4">
            {availablePets.map(pet => (
              <Col key={pet.id} md={4} lg={3}>
                <PetCard 
                  id={pet.id}
                  name={pet.name}
                  rarity={pet.rarity}
                  image={pet.image}
                  claimedPets={claimedPets}
                  handleClaimClick={handleClaimClick}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default DashboardPage;