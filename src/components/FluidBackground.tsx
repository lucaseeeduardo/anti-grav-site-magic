import { useRef, useEffect } from 'react';

interface Particle {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
  opacity: number;
}

export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animationRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurações do efeito Antigravity
    const gridSpacing = 35;
    const mouseRadius = 180;
    const attractStrength = 0.015;
    const returnSpeed = 0.05;
    const friction = 0.92;
    const maxSpeed = 3;

    const initGrid = () => {
      particlesRef.current = [];
      const cols = Math.ceil(canvas.width / gridSpacing) + 1;
      const rows = Math.ceil(canvas.height / gridSpacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSpacing;
          const y = j * gridSpacing;
          const baseSize = Math.random() * 1 + 1; // Tamanho variado entre 1 e 2
          
          particlesRef.current.push({
            baseX: x,
            baseY: y,
            x: x,
            y: y,
            vx: 0,
            vy: 0,
            size: baseSize,
            baseSize: baseSize,
            opacity: Math.random() * 0.3 + 0.3, // Opacidade variada
          });
        }
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initGrid();
    };

    resizeCanvas();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: mouseX, y: mouseY } = mouseRef.current;

      particlesRef.current.forEach((particle) => {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Efeito de atração suave quando o mouse está próximo
        if (dist < mouseRadius && dist > 0) {
          const force = (1 - dist / mouseRadius) * attractStrength;
          const angle = Math.atan2(dy, dx);
          
          // Movimento em direção ao mouse de forma suave
          particle.vx += Math.cos(angle) * force * 5;
          particle.vy += Math.sin(angle) * force * 5;

          // Aumenta o tamanho e opacidade quando próximo do mouse
          const sizeFactor = 1 + (1 - dist / mouseRadius) * 2;
          particle.size = particle.baseSize * sizeFactor;
          particle.opacity = Math.min(0.8, particle.opacity + 0.02);
        } else {
          // Retorna ao tamanho e opacidade original
          particle.size += (particle.baseSize - particle.size) * 0.1;
          particle.opacity += (Math.random() * 0.3 + 0.3 - particle.opacity) * 0.05;
        }

        // Força de retorno à posição original (mais suave)
        const backDx = particle.baseX - particle.x;
        const backDy = particle.baseY - particle.y;
        particle.vx += backDx * returnSpeed;
        particle.vy += backDy * returnSpeed;

        // Aplicar fricção
        particle.vx *= friction;
        particle.vy *= friction;

        // Limitar velocidade máxima
        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
        if (speed > maxSpeed) {
          particle.vx = (particle.vx / speed) * maxSpeed;
          particle.vy = (particle.vy / speed) * maxSpeed;
        }

        // Atualizar posição
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Desenhar partícula com gradiente azul do Google
        const gradient = ctx.createRadialGradient(
          particle.x, 
          particle.y, 
          0, 
          particle.x, 
          particle.y, 
          particle.size * 2
        );
        gradient.addColorStop(0, `rgba(66, 133, 244, ${particle.opacity})`);
        gradient.addColorStop(0.5, `rgba(66, 133, 244, ${particle.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(66, 133, 244, 0)`);

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
}
