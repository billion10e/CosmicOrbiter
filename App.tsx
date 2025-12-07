import React, { useState, useEffect, useRef } from 'react';
import { PLANETS } from './constants';
import { Planet } from './types';
import StarBackground from './components/StarBackground';
import PlanetInfo from './components/PlanetInfo';
import Controls from './components/Controls';
import { Info } from 'lucide-react';

const App: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(20);
  const [time, setTime] = useState(0);
  const [is3D, setIs3D] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  // Animation Loop
  const animate = (timestamp: number) => {
    if (previousTimeRef.current !== undefined && isPlaying) {
      const deltaTime = timestamp - previousTimeRef.current;
      setTime(prevTime => prevTime + (deltaTime * 0.005 * speed));
    }
    previousTimeRef.current = timestamp;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, speed]);

  // Handle Zoom Wheel
  const handleWheel = (e: React.WheelEvent) => {
    const delta = e.deltaY * -0.001;
    setZoom(prev => Math.min(Math.max(0.4, prev + delta), 2.5));
  };

  // Styles for 3D/2D transforms
  const tiltAngle = 60; // Degrees to tilt in 3D mode
  
  // The main plane rotates X. 
  // Planets rotate -X to "billboard" (face the camera)
  const planeStyle: React.CSSProperties = {
    transform: `scale(${zoom}) rotateX(${is3D ? tiltAngle : 0}deg)`,
    transformStyle: 'preserve-3d',
    transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const billboardStyle: React.CSSProperties = {
    transform: `rotateX(${is3D ? -tiltAngle : 0}deg)`,
    transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  return (
    <div className="relative w-full h-screen bg-space-950 overflow-hidden select-none font-sans text-white">
      <StarBackground />
      
      {/* Header / Title */}
      <div className="absolute top-6 left-8 z-10 pointer-events-none">
        <h1 className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-200">
          CosmicOrbiter
        </h1>
        <p className="text-slate-400 text-sm mt-1">Interactive Solar System Simulation</p>
      </div>

      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 text-slate-500 text-xs flex flex-col items-center gap-1">
         <span>Use Mouse Wheel to Zoom</span>
         {is3D && <span className="text-purple-400 font-bold animate-pulse">3D Mode Active</span>}
      </div>

      {/* Main Solar System Container */}
      {/* Perspective wrapper */}
      <div 
        ref={containerRef}
        className="w-full h-full relative cursor-move flex items-center justify-center"
        onWheel={handleWheel}
        style={{ perspective: '1200px', overflow: 'hidden' }} 
      >
        {/* Transform Container for Zoom/Pan/Tilt */}
        <div 
          style={planeStyle}
          className="relative w-[1000px] h-[1000px] flex items-center justify-center"
        >
          
          {/* The Sun */}
          <div className="absolute z-10" style={billboardStyle}>
            <div className="w-24 h-24 rounded-full bg-yellow-400 shadow-[0_0_60px_#fbbf24] animate-pulse relative">
              <div className="absolute inset-0 bg-orange-500 rounded-full opacity-30 animate-ping" />
            </div>
          </div>

          {/* Orbits and Planets */}
          {PLANETS.map((planet) => {
            const angle = (time / planet.orbitPeriod) % 360;
            const radians = (angle * Math.PI) / 180;
            
            const x = Math.cos(radians) * planet.distance * 3.5; 
            const y = Math.sin(radians) * planet.distance * 3.5;

            const isSelected = selectedPlanet?.id === planet.id;

            return (
              <React.Fragment key={planet.id}>
                {/* Orbit Path (Ring) - These lie flat on the plane */}
                <div 
                  className="absolute rounded-full border border-slate-800/50 hover:border-slate-700 transition-colors pointer-events-none"
                  style={{
                    width: `${planet.distance * 7}px`,
                    height: `${planet.distance * 7}px`,
                    // No billboard style here, we want them to tilt with the plane
                  }}
                />

                {/* Planet Group (Positioned on the plane) */}
                <div 
                  className="absolute group"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                    transformStyle: 'preserve-3d', // Important for children to billboard
                    cursor: 'pointer',
                    zIndex: 20 // Ensure planets are above orbit lines
                  }}
                  onClick={() => setSelectedPlanet(planet)}
                >
                  {/* Planet Body & Label Container - This "Stands Up" in 3D */}
                  <div style={billboardStyle} className="relative flex flex-col items-center justify-center">
                    
                    {/* Label */}
                    <div className={`absolute -top-8 text-xs font-bold uppercase tracking-wider transition-opacity whitespace-nowrap ${isSelected ? 'opacity-100 text-blue-300' : 'opacity-0 group-hover:opacity-100 text-slate-300'}`}>
                      {planet.name}
                    </div>

                    {/* Planet Sprite */}
                    <div 
                      className={`rounded-full shadow-lg transition-all duration-300 relative ${isSelected ? 'ring-4 ring-blue-500/50 scale-110' : 'hover:scale-110'}`}
                      style={{
                        width: `${planet.size * 2}px`,
                        height: `${planet.size * 2}px`,
                        background: planet.textureGradient,
                        boxShadow: `inset -4px -4px 10px rgba(0,0,0,0.7), 0 0 10px ${planet.color}40`
                      }}
                    >
                      {/* Saturn's Ring Special Case - Moves with the planet body */}
                      {planet.id === 'saturn' && (
                        <div 
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border-[4px] border-[#cbb784]/60 pointer-events-none"
                          style={{
                            width: `${planet.size * 4}px`,
                            height: `${planet.size * 1.2}px`,
                            boxShadow: '0 0 0 2px rgba(0,0,0,0.1)'
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* UI Elements */}
      <Controls 
        isPlaying={isPlaying} 
        speed={speed} 
        is3D={is3D}
        onTogglePlay={() => setIsPlaying(!isPlaying)} 
        onSpeedChange={setSpeed}
        onToggle3D={() => setIs3D(!is3D)}
      />

      <PlanetInfo 
        planet={selectedPlanet} 
        onClose={() => setSelectedPlanet(null)} 
      />
      
      {/* Intro Overlay */}
      {!isPlaying && time === 0 && (
         <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="text-center">
               <div className="inline-block p-4 rounded-full bg-blue-500/20 mb-4 animate-bounce">
                  <Info className="text-blue-400" size={32} />
               </div>
               <h2 className="text-3xl font-bold mb-2">Welcome to the Solar System</h2>
               <p className="text-slate-300 mb-6 max-w-md mx-auto">Click 'Play' to start the orbital simulation. Use the 3D button to toggle perspective.</p>
               <button 
                 onClick={() => setIsPlaying(true)}
                 className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors"
               >
                 Start Simulation
               </button>
            </div>
         </div>
      )}
    </div>
  );
};

export default App;