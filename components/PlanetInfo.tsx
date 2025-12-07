import React from 'react';
import { Planet } from '../types';
import { X, Thermometer, Ruler, Clock, Calendar, Globe } from 'lucide-react';

interface PlanetInfoProps {
  planet: Planet | null;
  onClose: () => void;
}

const PlanetInfo: React.FC<PlanetInfoProps> = ({ planet, onClose }) => {
  if (!planet) return null;

  return (
    <div className="fixed top-4 right-4 w-80 bg-space-900/90 backdrop-blur-md border border-slate-700 text-white p-6 rounded-2xl shadow-2xl z-20 animate-in slide-in-from-right duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white uppercase tracking-wider">
          {planet.name}
        </h2>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-slate-700 rounded-full transition-colors"
        >
          <X size={20} className="text-slate-400 hover:text-white" />
        </button>
      </div>

      <div className="mb-6 flex justify-center">
        <div 
          className="rounded-full shadow-lg relative"
          style={{
            width: '120px',
            height: '120px',
            background: planet.textureGradient,
            boxShadow: `0 0 40px ${planet.color}40`
          }}
        >
            {/* Simple ring for Saturn visual in detail view */}
            {planet.id === 'saturn' && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[40px] border-[6px] border-[#cbb784]/60 rounded-[50%] skew-x-12" />
            )}
        </div>
      </div>

      <p className="text-slate-300 text-sm leading-relaxed mb-6 font-sans">
        {planet.description}
      </p>

      <div className="space-y-4">
        <DetailItem icon={<Ruler size={16} />} label="Diameter" value={planet.details.diameter} />
        <DetailItem icon={<Thermometer size={16} />} label="Avg. Temp" value={planet.details.temp} />
        <DetailItem icon={<Clock size={16} />} label="Day Length" value={planet.details.dayLength} />
        <DetailItem icon={<Calendar size={16} />} label="Year Length" value={planet.details.yearLength} />
        <DetailItem icon={<Globe size={16} />} label="Moons" value={planet.details.moons.toString()} />
      </div>
    </div>
  );
};

const DetailItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
    <div className="flex items-center text-slate-400 gap-2">
      {icon}
      <span className="text-xs uppercase tracking-wide font-semibold">{label}</span>
    </div>
    <span className="text-sm font-medium text-slate-100">{value}</span>
  </div>
);

export default PlanetInfo;