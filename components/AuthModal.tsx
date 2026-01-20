
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
  setMode: (mode: 'login' | 'signup') => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode, setMode }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, signup } = useAuth();

  // Reset fields when mode changes
  useEffect(() => {
    setUsername('');
    setPassword('');
  }, [mode]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    if (mode === 'login') {
      if (login(username, password)) {
        onClose();
      }
    } else {
      if (signup(username, password)) {
        setMode('login');
      }
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div 
        className="bg-gray-800 rounded-lg p-8 w-full max-w-sm border border-gray-700 shadow-2xl shadow-purple-500/20 transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes fade-in-up {
            from { opacity: 0; transform: scale(0.95) translateY(10px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
          .animate-fade-in-up { animation: fade-in-up 0.3s forwards ease-out; }
        `}</style>
        <div className="flex justify-between items-center mb-6">
          <h2 id="auth-modal-title" className="text-2xl font-bold">{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-2xl leading-none" aria-label="Close modal">&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
              required
              autoComplete="username"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
              required
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </div>
          <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-200">
            {mode === 'login' ? 'Login' : 'Create Account'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-6">
          {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
          <button onClick={switchMode} className="text-purple-400 hover:underline ml-1 font-semibold">
            {mode === 'login' ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
