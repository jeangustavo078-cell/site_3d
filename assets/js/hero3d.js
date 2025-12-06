import * as THREE from "three";

const canvas = document.getElementById("hero-bg");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x030518); // fundo azul bem escuro
scene.fog = new THREE.FogExp2(0x080a20, 0.35); // névoa azul escuro mais clara

// Camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(0, 0, 6);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Luz bem profissional estilo “foto de produto”
const light1 = new THREE.PointLight(0xff3355, 4, 20);
light1.position.set(4, 2, 5);
scene.add(light1);

const light2 = new THREE.PointLight(0x3355ff, 3, 20);
light2.position.set(-4, -2, 5);
scene.add(light2);

const rimLight = new THREE.DirectionalLight(0xffffff, 1.5);
rimLight.position.set(0, 0, -5);
scene.add(rimLight);

// GEO – esfera fragmentada estilo "shards"
const sphere = new THREE.IcosahedronGeometry(2.2, 2);

// Material com aspecto metálico cinematográfico
const material = new THREE.MeshPhysicalMaterial({
  color: 0xff0022,
  metalness: 0.8,
  roughness: 0.25,
  clearcoat: 1,
  clearcoatRoughness: 0.2,
  flatShading: true,
});

// Mesh original
const baseMesh = new THREE.Mesh(sphere, material);
scene.add(baseMesh);

// Criar fragmentos que flutuam
const shards = [];
for (let i = 0; i < 320; i++) {
  const g = new THREE.TetrahedronGeometry(0.12, 0);
  const m = new THREE.MeshPhysicalMaterial({
    color: 0x4455aa, // azul mais claro, destacando-se do fundo
    metalness: 0.6,
    roughness: 0.4,
    flatShading: true,
  });

  const shard = new THREE.Mesh(g, m);

  const phi = Math.random() * Math.PI * 2;
  const theta = Math.random() * Math.PI;

  const radius = 2.6 + Math.random() * 0.4;

  shard.position.set(
    radius * Math.sin(theta) * Math.cos(phi),
    radius * Math.sin(theta) * Math.sin(phi),
    radius * Math.cos(theta)
  );

  shard.rotation.set(Math.random(), Math.random(), Math.random());
  scene.add(shard);
  shards.push(shard);
}

// Mouse parallax
let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove", (e) => {
  mouseX = (e.clientX - window.innerWidth / 2) * 0.0005;
  mouseY = (e.clientY - window.innerHeight / 2) * 0.0005;
});

// Animate
function animate() {
  requestAnimationFrame(animate);

  baseMesh.rotation.x += 0.003;
  baseMesh.rotation.y += 0.004;

  shards.forEach((s, i) => {
    s.rotation.x += 0.002 + i * 0.00001;
    s.rotation.y += 0.003 + i * 0.00001;
  });

  camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
  camera.position.y += (-mouseY * 5 - camera.position.y) * 0.05;
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
}

animate();

// Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
