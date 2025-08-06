import { Card, Button } from 'react-bootstrap';

interface PetProps {
  id: number;
  name: string;
  rarity: string;
  image: string;
  onClaimClick: () => void; // Add this prop
}

const PetCard = ({ name, rarity, image, onClaimClick }: PetProps) => {
  const rarityClass = `rarity-${rarity.toLowerCase()}`;
  
  const handleClaim = () => {
    onClaimClick(); // Call the parent handler instead of local console.log
  };

  return (
    <Card className="pet-card h-100 d-flex flex-column">
      <div 
        className="pet-image-container"
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
          variant="success" 
          className="mt-auto align-self-center"
          onClick={handleClaim}
          style={{
            width: '80%',
            marginTop: '1rem'
          }}
        >
          Claim Pet
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PetCard;