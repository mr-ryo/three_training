import $ from 'jquery';
import * as THREE from 'three';
import * as MMDLoader from 'three-mmd-loader';
import OrbitControls from 'three-orbitcontrols';
import CharsetEncoder from 'charset-encoder-js';
import LoadScreen from 'loadscreen';
import MMDParser from 'mmd-parser';
import Ammo from 'ammo.js';

const DISP_WIDTH = $(window).width();
const DISP_HEIGHT = $(window).height();

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(DISP_WIDTH, DISP_HEIGHT);
renderer.setClearColor(0xFFFFAA);
$('body').append(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, DISP_WIDTH / DISP_HEIGHT, 1, 2000);
camera.position.set(0, 3, 5);

const controls = new OrbitControls(camera, renderer.domElement);

const light = new THREE.DirectionalLight(0xFFFFFF);
light.position.set(-1, 1, 1);

const axis = new THREE.AxisHelper(20);
const planeGeom = new THREE.PlaneGeometry(5, 5);
const planeMat = new THREE.MeshLambertMaterial({
  color: 0xFFFFFF,
  side: THREE.DoubleSide
});// end MeshLambertMaterial
const plane = new THREE.Mesh(planeGeom, planeMat);
plane.rotation.x = Math.PI * 0.5;

const loader = new MMDLoader.MMDLoader();
const helper = new MMDLoader.MMDHelper();

const render = () => {
  const loop = () => {
    renderer.render(scene, camera);

    window.requestAnimationFrame(loop);
  }// end loop

  window.requestAnimationFrame(loop);
}// end drawing

scene.add(light);
scene.add(axis);
scene.add(plane);

light.castShadow = true;
plane.receiveShadow = true;
renderer.shadowMap.enabled = true;

let mesh;
const asyncLoad = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      mesh = loader.loadModel('./../model/wargreymon.pmx');
      resolve(mesh);
    }, 1000);// end setTimeout
  });// end Promise
}// end  asyncLoad

const sceneAdd = (mesh) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      scene.add(mesh);
      resolve(mesh);
    }, 1000);// end setTimeout
  });// end Promise
}// end sceneAdd

const helperAdd = (mesh) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      helper.add(mesh);
      resolve('');
    }, 1000);// end setTimeout
  });// end Promise
}// end helperAdd

asyncLoad()
  .then(sceneAdd)
  .then(helperAdd)
  .then(() => {
    console.log('comp');
  }).catch((e) => {
    console.log(e);
  });

render();
