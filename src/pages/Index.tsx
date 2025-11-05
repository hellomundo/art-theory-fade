import { useEffect, useState } from 'react';
import { ParticleBackground } from '@/components/ParticleBackground';

const Index = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);
    
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        
        // Add transitioning class for smooth fade
        document.documentElement.classList.add('transitioning');
        
        setIsDark(prev => {
          const newIsDark = !prev;
          if (newIsDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return newIsDark;
        });

        // Remove transitioning class after animation
        setTimeout(() => {
          document.documentElement.classList.remove('transitioning');
        }, 3000);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      <h1 
        className="relative z-10 text-6xl md:text-8xl lg:text-9xl font-light tracking-wider"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Art & Theory
      </h1>
    </div>
  );
};

export default Index;
