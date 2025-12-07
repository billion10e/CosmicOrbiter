export interface Planet {
  id: string;
  name: string;
  color: string;
  size: number; // Relative visual size
  distance: number; // Distance from sun (scaled)
  orbitPeriod: number; // Relative orbit speed (Earth = 1)
  description: string;
  details: {
    diameter: string;
    dayLength: string;
    yearLength: string;
    moons: number;
    temp: string;
  };
  textureGradient: string;
}

export interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}