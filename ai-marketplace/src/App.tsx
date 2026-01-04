import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import ResultsPage from './components/ResultsPage';
import Navigation from './components/Navigation';
import SignInModal from './components/SignInModal';

type Theme = 'light' | 'dark';

function App() {
  const [theme, setTheme] = useState<Theme>('light');
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userName, setUserName] = useState<string>('');

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Save theme to localStorage and apply to document
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const handleSignIn = () => {
    setIsSignInModalOpen(true);
  };

  const handleSignInSubmit = (email: string, password: string) => {
    // Simulate sign in - in a real app, this would make an API call
    console.log('Sign in attempt:', { email, password });
    setIsSignedIn(true);
    setUserName(email.split('@')[0]); // Use email prefix as username
    setIsSignInModalOpen(false);
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    setUserName('');
  };

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <Navigation
          theme={theme}
          onThemeToggle={handleThemeToggle}
          onSignIn={handleSignIn}
          isSignedIn={isSignedIn}
          userName={userName}
        />
        
        <Routes>
          <Route path="/" element={<SearchPage theme={theme} />} />
          <Route path="/results" element={<ResultsPage theme={theme} />} />
        </Routes>

        <SignInModal
          isOpen={isSignInModalOpen}
          onClose={() => setIsSignInModalOpen(false)}
          onSignIn={handleSignInSubmit}
          theme={theme}
        />
      </div>
    </Router>
  );
}

export default App;