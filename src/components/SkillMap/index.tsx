'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { skillMapData, SkillNode } from '@/utils/constants';

export default function SkillMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      1,
      1000
    );
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(width, height);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0';
    labelRenderer.domElement.style.left = '0';
    labelRenderer.domElement.style.pointerEvents = 'none';
    container.appendChild(labelRenderer.domElement);

    const gradientCount = 6;
    const gradients: THREE.Mesh[] = [];
    const gradientColors = ['#e8a87c', '#c38d9e', '#7db8b5', '#e59966', '#d4756a', '#8fa3a3'];
    
    for (let i = 0; i < gradientCount; i++) {
      const geometry = new THREE.CircleGeometry(350 + Math.random() * 200, 64);
      const material = new THREE.MeshBasicMaterial({
        color: gradientColors[i],
        transparent: true,
        opacity: 0.12,
      });
      const gradient = new THREE.Mesh(geometry, material);
      gradient.position.set(
        (Math.random() - 0.5) * width * 0.8,
        (Math.random() - 0.5) * height * 0.8,
        -2
      );
      scene.add(gradient);
      gradients.push(gradient);
    }

    const nodes: THREE.Mesh[] = [];
    const nodeDataMap = new Map<THREE.Mesh, SkillNode>();

    const createNode = (node: SkillNode) => {
      let mesh: THREE.Mesh;
      let glow: THREE.Mesh;

      if (node.id === 'core') {
        const geometry = new THREE.CircleGeometry(40, 32);
        const material = new THREE.MeshBasicMaterial({
          color: node.color,
          transparent: true,
          opacity: 0.6,
        });
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(node.x, node.y, 0);
        scene.add(mesh);
        nodes.push(mesh);
        nodeDataMap.set(mesh, node);

        const glowGeometry = new THREE.RingGeometry(45, 100, 64);
        const glowMaterial = new THREE.MeshBasicMaterial({
          color: node.color,
          transparent: true,
          opacity: 0.25,
          side: THREE.DoubleSide,
        });
        glow = new THREE.Mesh(glowGeometry, glowMaterial);
        glow.position.set(node.x, node.y, 0);
        scene.add(glow);
      } else {
        const geometry = new THREE.CircleGeometry(15, 32);
        const material = new THREE.MeshBasicMaterial({
          color: node.color,
          transparent: true,
          opacity: 0.55,
        });
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(node.x, node.y, 0);
        scene.add(mesh);
        nodes.push(mesh);
        nodeDataMap.set(mesh, node);

        const glowGeometry = new THREE.RingGeometry(19, 50, 64);
        const glowMaterial = new THREE.MeshBasicMaterial({
          color: node.color,
          transparent: true,
          opacity: 0.18,
          side: THREE.DoubleSide,
        });
        glow = new THREE.Mesh(glowGeometry, glowMaterial);
        glow.position.set(node.x, node.y, 0);
        scene.add(glow);
      }

      const labelDiv = document.createElement('div');
      labelDiv.className = node.id === 'core' 
        ? 'text-lg md:text-xl font-semibold whitespace-nowrap' 
        : 'text-xs md:text-sm font-medium whitespace-nowrap';
      labelDiv.style.color = node.color;
      labelDiv.style.opacity = node.id === 'core' ? '1' : '0.85';
      labelDiv.style.textShadow = `0 0 15px ${node.color}, 0 0 30px ${node.color}`;
      labelDiv.style.fontFamily = 'Palatino, Georgia, serif';
      labelDiv.style.padding = '4px 8px';
      labelDiv.style.borderRadius = '4px';
      labelDiv.style.background = 'rgba(0,0,0,0.4)';
      labelDiv.textContent = node.label;

      const label = new CSS2DObject(labelDiv);
      if (node.id === 'core') {
        label.position.set(node.x, node.y - 90, 1);
      } else {
        const distance = 85;
        const angle = Math.atan2(node.y, node.x);
        label.position.set(
          node.x + Math.cos(angle) * distance,
          node.y + Math.sin(angle) * distance,
          1
        );
      }
      scene.add(label);

      return { mesh, glow, label };
    };

    const nodeObjects = new Map<string, { mesh: THREE.Mesh; glow: THREE.Mesh; label: CSS2DObject }>();
    skillMapData.forEach((node) => {
      const objects = createNode(node);
      nodeObjects.set(node.id, objects);
    });

    const lines: THREE.Line[] = [];
    skillMapData.forEach((node) => {
      node.connections.forEach((targetId) => {
        if (node.id < targetId) {
          const targetNode = skillMapData.find((n) => n.id === targetId);
          if (targetNode) {
            const points = [
              new THREE.Vector2(node.x, node.y),
              new THREE.Vector2(targetNode.x, targetNode.y),
            ];
            const geometry = new THREE.BufferGeometry().setFromPoints(
              points.map((p) => new THREE.Vector3(p.x, p.y, 0))
            );
            const material = new THREE.LineBasicMaterial({
              color: 0x8b8b93,
              transparent: true,
              opacity: 0.4,
            });
            const line = new THREE.Line(geometry, material);
            scene.add(line);
            lines.push(line);
          }
        }
      });
    });

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const currentWidth = rect.width;
      const currentHeight = rect.height;
      mouse.x = ((event.clientX - rect.left) / currentWidth) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / currentHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodes);
      if (intersects.length > 0) {
        const node = nodeDataMap.get(intersects[0].object as THREE.Mesh);
        if (node) {
          setSelectedNode(selectedNode?.id === node.id ? null : node);
        }
      } else {
        setSelectedNode(null);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const currentWidth = rect.width;
      const currentHeight = rect.height;
      mouse.x = ((event.clientX - rect.left) / currentWidth) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / currentHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodes);

      nodes.forEach((node) => {
        const material = node.material as THREE.MeshBasicMaterial;
        material.opacity = nodeDataMap.get(node)?.id === 'core' ? 0.5 : 0.55;
      });

      nodeObjects.forEach((obj, id) => {
        if (obj.label.element) {
          obj.label.element.style.opacity = id === 'core' ? '1' : '0.8';
        }
        if (obj.glow) {
          const glowMaterial = obj.glow.material as THREE.MeshBasicMaterial;
          glowMaterial.opacity = id === 'core' ? 0.3 : 0.25;
        }
      });

      if (intersects.length > 0) {
        const hovered = intersects[0].object as THREE.Mesh;
        const nodeData = nodeDataMap.get(hovered);
        if (nodeData) {
          setHoveredNode(nodeData.id);
          (hovered.material as THREE.MeshBasicMaterial).opacity = 1;
          const obj = nodeObjects.get(nodeData.id);
          if (obj && obj.label.element) {
            obj.label.element.style.opacity = '1';
            obj.label.element.style.background = 'rgba(0,0,0,0.6)';
          }
          if (obj && obj.glow) {
            const glowMaterial = obj.glow.material as THREE.MeshBasicMaterial;
            glowMaterial.opacity = 0.5;
          }
        }
      } else {
        setHoveredNode(null);
        nodeObjects.forEach((obj) => {
          if (obj.label.element) {
            obj.label.element.style.background = 'rgba(0,0,0,0.4)';
          }
        });
      }
    };

    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.left = newWidth / -2;
      camera.right = newWidth / 2;
      camera.top = newHeight / 2;
      camera.bottom = newHeight / -2;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      labelRenderer.setSize(newWidth, newHeight);
    };

    container.addEventListener('click', handleClick);
    container.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    let animationId: number;
    let time = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.015;

      gradients.forEach((gradient, i) => {
        gradient.position.x += Math.sin(time + i * 0.5) * 1;
        gradient.position.y += Math.cos(time + i * 0.3) * 1;
        const material = gradient.material as THREE.MeshBasicMaterial;
        material.opacity = 0.08 + Math.sin(time + i * 0.8) * 0.06;
        gradient.scale.setScalar(1 + Math.sin(time + i * 0.6) * 0.08);
      });

      nodeObjects.forEach((obj, id) => {
        if (obj.glow) {
          const glowMaterial = obj.glow.material as THREE.MeshBasicMaterial;
          const baseOpacity = id === 'core' ? 0.25 : 0.18;
          glowMaterial.opacity = baseOpacity + Math.sin(time + parseInt(id, 36) * 0.7) * 0.12;
          obj.glow.scale.setScalar(1 + Math.sin(time + parseInt(id, 36) * 0.9) * 0.06);
        }
      });

      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
    };
    animate();

    return () => {
      container.removeEventListener('click', handleClick);
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      container.removeChild(renderer.domElement);
      container.removeChild(labelRenderer.domElement);
      renderer.dispose();
      gradients.forEach((g) => {
        g.geometry.dispose();
        (g.material as THREE.Material).dispose();
      });
      nodes.forEach((node) => {
        node.geometry.dispose();
        (node.material as THREE.Material).dispose();
      });
      lines.forEach((line) => {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      });
    };
  }, [selectedNode]);

  const getAccentColor = (color: string) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    const l = (max + min) / 2;
    
    let newR = r, newG = g, newB = b;
    
    if (delta < 40 && l > 120) {
      if (max === r) { newR = Math.min(255, r + 60); }
      if (max === g) { newG = Math.min(255, g + 60); }
      if (max === b) { newB = Math.min(255, b + 60); }
    } else if (l < 150) {
      newR = Math.min(255, r + 40);
      newG = Math.min(255, g + 40);
      newB = Math.min(255, b + 40);
    } else {
      newR = Math.min(255, r + 30);
      newG = Math.min(255, g + 30);
      newB = Math.min(255, b + 30);
    }
    
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  };

  return (
    <section id="skills" className="min-h-screen py-16 px-4 bg-dark-800">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            Capability Network
          </h2>
          <motion.p
            animate={{
              color: ['#9ca3af', '#85cdca', '#9ca3af'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-lg max-w-2xl mx-auto font-medium"
          >
            Click the circles to explore my interconnected capabilities
          </motion.p>
        </motion.div>

        <div className="relative h-[600px] md:h-[700px]">
          <div ref={containerRef} className="absolute inset-0" />
        </div>

        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="mt-8"
            >
              <div className="glass-card rounded-xl p-8">
                {selectedNode.id === 'core' ? (
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-600 shadow-lg">
                      <img 
                        src="/perriluo.jpg" 
                        alt="Perri Luo" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-3xl font-semibold text-white mb-2">
                        {selectedNode.label}
                      </h3>
                      <span className="px-3 py-1 rounded-full text-sm bg-dark-600 text-gray-400 mb-4 inline-block">
                        {selectedNode.content.type}
                      </span>
                      <p className="text-gray-300 text-base leading-relaxed">
                        {selectedNode.content.items[0]?.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                        <span className="px-3 py-1 rounded-full text-xs bg-accent-mint/20 text-accent-mint">
                          {selectedNode.content.items[0]?.contribution}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs bg-accent-rose/20 text-accent-rose">
                          {selectedNode.content.items[0]?.capability}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: selectedNode.color }}
                      />
                      <h3 className="text-2xl font-semibold text-white">
                        {selectedNode.label}
                      </h3>
                      <span className="px-3 py-1 rounded-full text-sm bg-dark-600 text-gray-400">
                        {selectedNode.content.type}
                      </span>
                    </div>

                    <div className="space-y-6">
                      {selectedNode.content.items.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-6 rounded-xl bg-dark-700/50 hover:bg-dark-700 transition-all duration-300 border border-dark-600/50 hover:border-dark-500"
                        >
                          <h4 className="text-white font-semibold text-lg mb-3">
                            {item.title}
                          </h4>
                          <p className="text-gray-300 text-sm leading-relaxed mb-4">
                            {item.description}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-3 rounded-lg bg-dark-800/80">
                              <span 
                                className="text-xs font-medium uppercase tracking-wider"
                                style={{ 
                                  color: getAccentColor(selectedNode.color),
                                  textShadow: `0 0 10px ${getAccentColor(selectedNode.color)}`
                                }}
                              >
                                Key Contribution
                              </span>
                              <p className="text-gray-400 text-sm mt-1">
                                {item.contribution}
                              </p>
                            </div>
                            <div className="p-3 rounded-lg bg-dark-800/80">
                              <span 
                                className="text-xs font-medium uppercase tracking-wider"
                                style={{ 
                                  color: getAccentColor(selectedNode.color),
                                  textShadow: `0 0 10px ${getAccentColor(selectedNode.color)}`
                                }}
                              >
                                Capability Demonstrated
                              </span>
                              <p className="text-gray-400 text-sm mt-1">
                                {item.capability}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}