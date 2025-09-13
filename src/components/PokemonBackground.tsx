'use client';

import { useEffect, useRef } from 'react';

export default function PokemonBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);


    const particles = [
      { x: Math.random() * canvas.width, y: Math.random() * canvas.height, radius: 2, color: '#ffcdd2', speed: 0.3 }, // Vermelho claro
      { x: Math.random() * canvas.width, y: Math.random() * canvas.height, radius: 1, color: '#f8bbd0', speed: 0.2 }, // Rosa claro
      { x: Math.random() * canvas.width, y: Math.random() * canvas.height, radius: 2, color: '#c5cae9', speed: 0.4 }, // Azul claro
      { x: Math.random() * canvas.width, y: Math.random() * canvas.height, radius: 1, color: '#bbdefb', speed: 0.3 }, // Azul mais claro
      { x: Math.random() * canvas.width, y: Math.random() * canvas.height, radius: 2, color: '#b2ebf2', speed: 0.5 }, // Ciano claro
      { x: Math.random() * canvas.width, y: Math.random() * canvas.height, radius: 1, color: '#b2dfdb', speed: 0.2 }, // Verde água claro
    ];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.y -= particle.speed;
        if (particle.y < -10) {
          particle.y = canvas.height + 10;
          particle.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-50 opacity-30 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
}