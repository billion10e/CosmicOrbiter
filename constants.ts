import { Planet } from './types';

// NOTE: Distances and Sizes are not to scale (Schematic view) to ensure visibility on screen.
// Orbit Period is relatively accurate to give a feel of different speeds.

export const PLANETS: Planet[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    color: '#A5A5A5',
    size: 8,
    distance: 60,
    orbitPeriod: 0.24,
    textureGradient: 'radial-gradient(circle at 30% 30%, #e2e2e2, #737373)',
    description: "The smallest planet in our solar system and closest to the Sun—is only slightly larger than Earth's Moon.",
    details: {
      diameter: "4,880 km",
      dayLength: "59 Earth days",
      yearLength: "88 Earth days",
      moons: 0,
      temp: "-180°C to 430°C"
    }
  },
  {
    id: 'venus',
    name: 'Venus',
    color: '#E3BB76',
    size: 14,
    distance: 90,
    orbitPeriod: 0.61,
    textureGradient: 'radial-gradient(circle at 30% 30%, #ffdfba, #b8860b)',
    description: "Venus spins slowly in the opposite direction from most planets. Its thick atmosphere traps heat, making it the hottest planet.",
    details: {
      diameter: "12,104 km",
      dayLength: "243 Earth days",
      yearLength: "225 Earth days",
      moons: 0,
      temp: "471°C"
    }
  },
  {
    id: 'earth',
    name: 'Earth',
    color: '#22A6B3',
    size: 15,
    distance: 130,
    orbitPeriod: 1.0,
    textureGradient: 'radial-gradient(circle at 30% 30%, #4facfe, #00f2fe, #0052d4)',
    description: "Our home planet is the third planet from the Sun, and the only place we know of so far that's inhabited by living things.",
    details: {
      diameter: "12,742 km",
      dayLength: "24 hours",
      yearLength: "365.25 days",
      moons: 1,
      temp: "-88°C to 58°C"
    }
  },
  {
    id: 'mars',
    name: 'Mars',
    color: '#EB4D4B',
    size: 10,
    distance: 170,
    orbitPeriod: 1.88,
    textureGradient: 'radial-gradient(circle at 30% 30%, #ff6b6b, #8b0000)',
    description: "Mars is a dusty, cold, desert world with a very thin atmosphere. There is strong evidence that Mars was—billions of years ago—wetter and warmer.",
    details: {
      diameter: "6,779 km",
      dayLength: "24.6 hours",
      yearLength: "687 Earth days",
      moons: 2,
      temp: "-62°C"
    }
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    color: '#F9CA24',
    size: 35,
    distance: 240,
    orbitPeriod: 11.86,
    textureGradient: 'linear-gradient(45deg, #b78755 0%, #d4a373 20%, #b78755 40%, #e8cba8 60%, #b78755 80%, #9c6644 100%)',
    description: "Jupiter is more than twice as massive as the other planets of our solar system combined. The Great Red Spot is a giant storm.",
    details: {
      diameter: "139,820 km",
      dayLength: "9.9 hours",
      yearLength: "11.86 Earth years",
      moons: 95,
      temp: "-110°C"
    }
  },
  {
    id: 'saturn',
    name: 'Saturn',
    color: '#F0DF90',
    size: 28,
    distance: 310,
    orbitPeriod: 29.45,
    textureGradient: 'radial-gradient(circle at 30% 30%, #fae17d, #d4af37)',
    description: "Adorned with a dazzling, complex system of icy rings, Saturn is unique in our solar system. The other giant planets have rings, but none are as spectacular.",
    details: {
      diameter: "116,460 km",
      dayLength: "10.7 hours",
      yearLength: "29 Earth years",
      moons: 146,
      temp: "-140°C"
    }
  },
  {
    id: 'uranus',
    name: 'Uranus',
    color: '#7DE3F4',
    size: 20,
    distance: 370,
    orbitPeriod: 84.0,
    textureGradient: 'radial-gradient(circle at 30% 30%, #a1ffce, #00ced1)',
    description: "Uranus rotates at a nearly 90-degree angle from the plane of its orbit. This unique tilt makes Uranus appear to spin on its side.",
    details: {
      diameter: "50,724 km",
      dayLength: "17 hours",
      yearLength: "84 Earth years",
      moons: 27,
      temp: "-195°C"
    }
  },
  {
    id: 'neptune',
    name: 'Neptune',
    color: '#30336B',
    size: 19,
    distance: 430,
    orbitPeriod: 164.8,
    textureGradient: 'radial-gradient(circle at 30% 30%, #4b6cb7, #182848)',
    description: "Neptune is dark, cold and whipped by supersonic winds. It was the first planet located through mathematical calculations.",
    details: {
      diameter: "49,244 km",
      dayLength: "16 hours",
      yearLength: "165 Earth years",
      moons: 14,
      temp: "-200°C"
    }
  }
];
