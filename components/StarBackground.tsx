import React, { useMemo } from 'react';
import { Star } from '../types';

const StarBackground: React.FC = () => {
  const stars: Star[] = useMemo(() => {
    const starCount = 400;
    const generatedStars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      generatedStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.7 + 0.3
      });
    }
    return generatedStars;
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `pulse ${Math.random() * 3 + 2}s infinite ease-in-out`
          }}
        />
      ))}
    </div>
  );
};

export default StarBackground;