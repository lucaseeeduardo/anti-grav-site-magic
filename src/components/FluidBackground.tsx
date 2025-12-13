import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ===== CONFIGURATION =====
const CONFIG = {
  particleCount: 1000,
  // Wave effect parameters - TWEAK THESE
  waveFrequency: 0.015,    // How tight the wave ripples are (higher = more rings)
  waveSpeed: 2.5,          // How fast the wave propagates outward
  waveAmplitude: 2.0,      // How much rotation the wave causes
  waveRadius: 400,         // Maximum distance the wave affects
  // Idle animation
  idleDriftSpeed: 0.3,
  idleDriftAmount: 0.5,
  // Mouse smoothing
  mouseSmoothing: 0.08,    // Lower = smoother but slower response
};

// Particle colors - Google Blue with variations
const COLORS = [
  new THREE.Color('#4285F4'), // Google Blue
  new THREE.Color('#5A9CF4'), // Lighter blue
  new THREE.Color('#3B78E7'), // Darker blue
  new THREE.Color('#6BA3F5'), // Cyan-ish
  new THREE.Color('#8AB4F8'), // Light gray-blue
];

interface ParticleFieldProps {
  mousePosition: React.MutableRefObject<THREE.Vector2>;
}

function ParticleField({ mousePosition }: ParticleFieldProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { viewport, camera } = useThree();
  
  // Smoothed mouse position for buttery smooth animation
  const smoothMouse = useRef(new THREE.Vector3(0, 0, 0));
  const timeRef = useRef(0);
  
  // Store initial particle data
  const particles = useMemo(() => {
    const temp = [];
    const spread = Math.max(viewport.width, viewport.height) * 1.5;
    
    for (let i = 0; i < CONFIG.particleCount; i++) {
      // Random position in 3D space
      const x = (Math.random() - 0.5) * spread;
      const y = (Math.random() - 0.5) * spread;
      const z = (Math.random() - 0.5) * spread * 0.3; // Less depth variation
      
      // Random initial rotation
      const rotationX = Math.random() * Math.PI * 2;
      const rotationY = Math.random() * Math.PI * 2;
      const rotationZ = Math.random() * Math.PI * 2;
      
      // Random scale variation for the batons
      const scale = 0.03 + Math.random() * 0.05;
      
      // Color from our palette
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      
      // Noise offset for idle animation
      const noiseOffset = Math.random() * Math.PI * 2;
      
      temp.push({
        position: new THREE.Vector3(x, y, z),
        basePosition: new THREE.Vector3(x, y, z),
        rotation: new THREE.Euler(rotationX, rotationY, rotationZ),
        baseRotation: new THREE.Euler(rotationX, rotationY, rotationZ),
        scale,
        color,
        noiseOffset,
      });
    }
    return temp;
  }, [viewport]);
  
  // Create elongated tetrahedron geometry (baton shape)
  const geometry = useMemo(() => {
    const geo = new THREE.TetrahedronGeometry(1, 0);
    // Stretch on Y axis to create baton/shard shape
    geo.scale(0.3, 1.5, 0.3);
    return geo;
  }, []);
  
  // Initialize instance colors
  useEffect(() => {
    if (!meshRef.current) return;
    
    const colorArray = new Float32Array(CONFIG.particleCount * 3);
    
    particles.forEach((particle, i) => {
      colorArray[i * 3] = particle.color.r;
      colorArray[i * 3 + 1] = particle.color.g;
      colorArray[i * 3 + 2] = particle.color.b;
    });
    
    meshRef.current.instanceColor = new THREE.InstancedBufferAttribute(colorArray, 3);
  }, [particles]);
  
  // Animation loop
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    timeRef.current += delta;
    const time = timeRef.current;
    
    // ===== MOUSE SMOOTHING (Lerp) =====
    // Convert normalized mouse coords to world space
    const targetX = mousePosition.current.x * viewport.width * 0.5;
    const targetY = mousePosition.current.y * viewport.height * 0.5;
    
    // Linear interpolation for buttery smooth movement
    smoothMouse.current.x += (targetX - smoothMouse.current.x) * CONFIG.mouseSmoothing;
    smoothMouse.current.y += (targetY - smoothMouse.current.y) * CONFIG.mouseSmoothing;
    
    const dummy = new THREE.Object3D();
    
    particles.forEach((particle, i) => {
      // ===== IDLE DRIFT ANIMATION =====
      // Subtle sine wave movement to feel alive
      const idleX = Math.sin(time * CONFIG.idleDriftSpeed + particle.noiseOffset) * CONFIG.idleDriftAmount;
      const idleY = Math.cos(time * CONFIG.idleDriftSpeed * 0.7 + particle.noiseOffset) * CONFIG.idleDriftAmount;
      const idleZ = Math.sin(time * CONFIG.idleDriftSpeed * 0.5 + particle.noiseOffset * 2) * CONFIG.idleDriftAmount * 0.3;
      
      // Apply idle drift to position
      particle.position.x = particle.basePosition.x + idleX;
      particle.position.y = particle.basePosition.y + idleY;
      particle.position.z = particle.basePosition.z + idleZ;
      
      // ===== WAVE ROTATION LOGIC =====
      // Calculate distance from this particle to the smoothed mouse position
      const dx = particle.position.x - smoothMouse.current.x;
      const dy = particle.position.y - smoothMouse.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // ===== THE WAVE FORMULA =====
      // rotation = base + sin(distance * frequency - time * speed) * amplitude * falloff
      // 
      // - dist * frequency: Creates the ripple rings (higher freq = more rings)
      // - time * speed: Makes the wave propagate outward over time
      // - amplitude: How much rotation each particle gets
      // - falloff: Reduces effect at distance (1 - dist/maxRadius)
      
      const falloff = Math.max(0, 1 - dist / CONFIG.waveRadius);
      const wavePhase = dist * CONFIG.waveFrequency - time * CONFIG.waveSpeed;
      const waveRotation = Math.sin(wavePhase) * CONFIG.waveAmplitude * falloff;
      
      // Apply wave rotation on multiple axes for 3D tumbling effect
      const rotX = particle.baseRotation.x + waveRotation;
      const rotY = particle.baseRotation.y + waveRotation * 0.7;
      const rotZ = particle.baseRotation.z + waveRotation * 0.5;
      
      // Update dummy object for instancing
      dummy.position.copy(particle.position);
      dummy.rotation.set(rotX, rotY, rotZ);
      dummy.scale.setScalar(particle.scale);
      dummy.updateMatrix();
      
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });
  
  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, CONFIG.particleCount]}>
      <meshStandardMaterial 
        vertexColors
        roughness={0.4}
        metalness={0.1}
      />
    </instancedMesh>
  );
}

export default function FluidBackground() {
  const mousePosition = useRef(new THREE.Vector2(0, 0));
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to 1
      mousePosition.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    
    const handleMouseLeave = () => {
      // Move mouse position far away
      mousePosition.current.set(-10, -10);
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mousePosition.current.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        mousePosition.current.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseLeave);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: '#FFFFFF' }}
    >
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lighting for 3D depth perception */}
        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={0.8}
          castShadow
        />
        <directionalLight 
          position={[-5, -5, 5]} 
          intensity={0.3}
        />
        
        <ParticleField mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
}
