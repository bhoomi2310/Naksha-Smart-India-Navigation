import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthModal from '@/components/AuthModal';
import goddessImage from '@/assets/goddess.png';

const Register = () => {
  const navigate = useNavigate();
  const [authModalOpen, setAuthModalOpen] = useState(true);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');

  const handleClose = () => {
    setAuthModalOpen(false);
    // Redirect to landing if user closes without registering
    setTimeout(() => navigate('/'), 100);
  };

  return (
    <div 
      className="min-h-screen w-full max-w-full overflow-x-hidden relative"
      style={{
        backgroundImage: `url(${goddessImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/75"></div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <AuthModal
          isOpen={authModalOpen}
          onClose={handleClose}
          mode={authMode}
          onSwitchMode={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
        />
      </div>
    </div>
  );
};

export default Register;
