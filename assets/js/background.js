import * as THREE from "three";
import { ImprovedNoise } from "three/examples/jsm/math/ImprovedNoise.js";

const canvas = document.getElementById("bg");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 100);
camera.position.z = 7;

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true
});
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);

// Criar esfera deformada por ruído
const geometry = new THREE.SphereGeometry(3, 128, 128);
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.7,
  metalness: 0.05
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const light = new THREE.PointLight(0xffffff, 1.2);
light.position.set(5, 5, 5);
scene.add(light);

const noise = new ImprovedNoise();
let time = 0;

// Animando a deformação
function updateNoise() {
  const pos = geometry.attributes.position;

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);

    const n = noise.noise(x + time, y + time, z + time);
    const dist = 0.3;

    pos.setXYZ(i,
      x + n * dist,
      y + n * dist,
      z + n * dist
    );
  }

  pos.needsUpdate = true;
}

function animate() {
  requestAnimationFrame(animate);

  time += 0.003;

  mesh.rotation.y += 0.003;
  mesh.rotation.x += 0.002;

  updateNoise();
  renderer.render(scene, camera);
}

animate();

addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
