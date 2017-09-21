import $ from 'jquery';
import * as THREE from 'THREE';

const DISP_WIDTH = $(window).width();
const DISP_HEIGHT = $(window).height();

const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, DISP_WIDTH / DISP_HEIGHT, 1, 10000);

const geometry = new THREE.BoxGeometry(500, 500, 500);
const material = new THREE.MeshPhongMaterial({color: 0x0000FF});
const box = new THREE.Mesh(geometry, material);
const light = new THREE.DirectionalLight(0xFFFFFF);

const drawing = () => {
  const loop = () => {
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;
    renderer.render(scene, camera);

    window.requestAnimationFrame(loop);
  }// end loop

  window.requestAnimationFrame(loop);
}// end drawing

renderer.setSize(DISP_WIDTH, DISP_HEIGHT);
$('body').append(renderer.domElement);
camera.position.set(0, 0, +1000);
light.position.set(1, 1, 1);
scene.add(box);
scene.add(light);

drawing();
