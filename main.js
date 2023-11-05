import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as dat from "dat.gui";
const scene = new THREE.Scene();
const width = window.innerWidth;
const height = window.innerHeight;
// const camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );
// In the perspective view (the default), objects which are far away are smaller than those nearby. In the orthographic view, all objects appear at the same scale.

const camera = new THREE.OrthographicCamera(
  width / -100,
  width / 100,
  height / 100,
  height / -100,
  1,
  1000
);

// const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(128, {
//   generateMipmaps: true,
//   minFilter: THREE.LinearMipmapLinearFilter,
// });
// const camera = new THREE.CubeCamera(1, 100000, cubeRenderTarget);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const planeGeometry = new THREE.PlaneGeometry(5, 5, 10, 10);
const planeMaterial = new THREE.MeshPhongMaterial({
  color: 0xff0000,
  side: THREE.DoubleSide,
  flatShading: THREE.FlatShading,
});
// using meshphongmaterial which needs lights to view it and it can use same arguments that are in meshbasic materials
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(planeMesh);
console.log(planeMesh.geometry.attributes.position.array);

const { array } = planeMesh.geometry.attributes.position;

for (let i = 0; i < array.length; i += 3) {
  const x = array[i];
  const y = array[i + 1];
  const z = array[i + 2];

  array[i + 2] = z + Math.random();
}

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 1);
scene.add(light);

const backLight = new THREE.DirectionalLight(0xffffff, 1);
backLight.position.set(0, 0, -1);
scene.add(backLight);

new OrbitControls(camera, renderer.domElement);
camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);

  // planeMesh.rotation.x += 0.01;

  renderer.render(scene, camera);
}

animate();
