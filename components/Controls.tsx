import React from 'react';
import { Play, Pause, FastForward, Rewind, Box, Layers } from 'lucide-react';

interface ControlsProps {
  isPlaying: boolean;
  speed: number;
  is3D: boolean;
  onTogglePlay: () => void;
  onSpeedChange: (newSpeed: number) => void;
  onToggle3D: () => void;
}

const Controls: React.FC<ControlsProps> = ({ isPlaying, speed, is3D, onTogglePlay, onSpeedChange, onToggle3D }) => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-space-900/80 backdrop-blur-md border border-slate-700 p-4 rounded-full flex items-center gap-6 shadow-2xl z-20">
      
      {/* Speed Controls */}
      <div className="flex items-center gap-2">
         <span className="text-xs text-slate-400 uppercase font-bold mr-2 w-12 text-right">Speed {speed}x</span>
         <button 
           onClick={() => onSpeedChange(Math.max(1, speed - 10))}
           className="p-2 hover:bg-slate-700 rounded-full text-slate-200 transition-colors"
           title="Decrease Speed"
         >
           <Rewind size={20} fill="currentColor" />
         </button>
      </div>

      {/* Play/Pause */}
      <button 
        onClick={onTogglePlay}
        className="p-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg shadow-blue-900/50 transition-all hover:scale-105 active:scale-95"
        title={isPlaying ? "Pause Simulation" : "Start Simulation"}
      >
        {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
      </button>

      {/* Forward / 3D Toggle Group */}
      <div className="flex items-center gap-4">
        <button 
           onClick={() => onSpeedChange(Math.min(200, speed + 10))}
           className="p-2 hover:bg-slate-700 rounded-full text-slate-200 transition-colors"
           title="Increase Speed"
         >
           <FastForward size={20} fill="currentColor" />
         </button>

         <div className="w-px h-8 bg-slate-700 mx-1"></div>

         <button
          onClick={onToggle3D}
          className={`p-2 rounded-full transition-all ${is3D ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50' : 'hover:bg-slate-700 text-slate-200'}`}
          title="Toggle 2D/3D View"
         >
            {is3D ? <Box size={20} /> : <Layers size={20} />}
         </button>
      </div>

    </div>
  );
};

export default Controls;