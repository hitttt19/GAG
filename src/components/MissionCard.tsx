import { Card, Button, ProgressBar } from 'react-bootstrap';
import { FaLock, FaCoins } from 'react-icons/fa';

interface MissionProps {
  id: number;
  task: string;
  reward: string;
  progress?: number;
}

const MissionCard = ({ task, reward, progress = 0 }: MissionProps) => {
  return (
    <Card className="mission-card h-100">
      <Card.Body>
        <Card.Title>{task}</Card.Title>
        <Card.Text className="text-success">
          <FaCoins /> Reward: {reward}
        </Card.Text>
        {progress > 0 ? (
          <>
            <ProgressBar now={progress} label={`${progress}%`} />
            <Button variant="warning" className="mt-2 w-100">
              Continue Mission
            </Button>
          </>
        ) : (
          <Button variant="secondary" disabled className="w-100">
            <FaLock /> Login Required
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default MissionCard;