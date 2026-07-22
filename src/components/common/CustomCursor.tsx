'use client';
import { useEffect, useState, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  opacity: number;
  size: number;
  speedX: number;
  speedY: number;
}

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);

  const addParticle = useCallback((x: number, y: number) => {
    const newParticle: Particle = {
      x,
      y,
      opacity: 1,
      size: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2 - 2,
    };
    setParticles((prev) => [...prev.slice(-15), newParticle]);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (Math.random() > 0.6) {
        addParticle(e.clientX, e.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [addParticle]);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.speedX,
            y: p.y + p.speedY,
            opacity: p.opacity - 0.03,
            size: p.size * 0.98,
          }))
          .filter((p) => p.opacity > 0)
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        * {
          cursor: none;
        }
        .custom-cursor {
          pointer-events: none;
          z-index: 9999;
        }
      `}</style>

      <div
        className="custom-cursor fixed top-0 left-0"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        }}
      >
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
          style={{
            width: '32px',
            height: '32px',
            borderColor: 'rgba(133, 205, 202, 0.5)',
            boxShadow: '0 0 20px rgba(133, 205, 202, 0.3)',
          }}
        />
        
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: '12px',
            height: '12px',
            backgroundColor: 'rgba(133, 205, 202, 0.3)',
            boxShadow: '0 0 10px rgba(133, 205, 202, 0.5)',
          }}
        />

        {particles.map((particle, index) => (
          <div
            key={index}
            className="absolute rounded-full"
            style={{
              left: particle.x - mousePosition.x,
              top: particle.y - mousePosition.y,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
              backgroundColor: '#85cdca',
              boxShadow: `0 0 ${particle.size * 2}px rgba(133, 205, 202, ${particle.opacity})`,
            }}
          />
        ))}
      </div>
    </>
  );
}