'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const particlesCount = 250;
    const posArray = new Float32Array(particlesCount * 3);
    const originalPosArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 8;
      posArray[i + 1] = (Math.random() - 0.5) * 8;
      posArray[i + 2] = (Math.random() - 0.5) * 4;

      originalPosArray[i] = posArray[i];
      originalPosArray[i + 1] = posArray[i + 1];
      originalPosArray[i + 2] = posArray[i + 2];

      const colorChoice = Math.random();
      if (colorChoice < 0.6) {
        colorArray[i] = 0.65;
        colorArray[i + 1] = 0.90;
        colorArray[i + 2] = 0.88;
      } else {
        colorArray[i] = 0.88;
        colorArray[i + 1] = 0.65;
        colorArray[i + 2] = 0.75;
      }
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 1,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x85cdca,
      transparent: true,
      opacity: 0.15,
    });

    const lines: THREE.Line[] = [];
    const maxDistance = 1.2;

    for (let i = 0; i < particlesCount; i++) {
      for (let j = i + 1; j < particlesCount; j++) {
        const dx = posArray[i * 3] - posArray[j * 3];
        const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
        const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < maxDistance) {
          const lineGeometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(posArray[i * 3], posArray[i * 3 + 1], posArray[i * 3 + 2]),
            new THREE.Vector3(posArray[j * 3], posArray[j * 3 + 1], posArray[j * 3 + 2]),
          ]);
          const line = new THREE.Line(lineGeometry, lineMaterial);
          scene.add(line);
          lines.push(line);
        }
      }
    }

    camera.position.z = 5;

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const animate = () => {
      requestAnimationFrame(animate);

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const positions = particles.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        const dx = positions[i] - originalPosArray[i];
        const dy = positions[i + 1] - originalPosArray[i + 1];
        
        positions[i] += (mouse.x * 2 - positions[i] * 0.01) * 0.08 - dx * 0.02;
        positions[i + 1] += (mouse.y * 2 - positions[i + 1] * 0.01) * 0.08 - dy * 0.02;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      lines.forEach(line => {
        line.visible = false;
      });

      let lineIdx = 0;
      for (let i = 0; i < particlesCount; i++) {
        for (let j = i + 1; j < particlesCount; j++) {
          const dx = positions[i * 3] - positions[j * 3];
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance < maxDistance && lineIdx < lines.length) {
            const linePositions = lines[lineIdx].geometry.attributes.position.array as Float32Array;
            linePositions[0] = positions[i * 3];
            linePositions[1] = positions[i * 3 + 1];
            linePositions[2] = positions[i * 3 + 2];
            linePositions[3] = positions[j * 3];
            linePositions[4] = positions[j * 3 + 1];
            linePositions[5] = positions[j * 3 + 2];
            lines[lineIdx].geometry.attributes.position.needsUpdate = true;
            lines[lineIdx].visible = true;
            (lines[lineIdx].material as THREE.Material).opacity = 0.15 * (1 - distance / maxDistance);
            lineIdx++;
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeChild(renderer.domElement);
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      lines.forEach(line => {
        line.geometry.dispose();
        if (Array.isArray(line.material)) {
          line.material.forEach(m => m.dispose());
        } else {
          line.material.dispose();
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
    />
  );
}
