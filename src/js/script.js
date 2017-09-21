import $ from 'jquery';
import * as THREE from 'three';
import CharsetEncoder from 'charset-encoder-js';
import * as MMDLoader from 'three-mmd-loader';
import LoadScreen from 'loadscreen';
import MMDParser from 'mmd-parser';
import * as Ammo from 'ammo.js';

const DISP_WIDTH = $(window).width();
const DISP_HEIGHT = $(window).height();

const renderer = new THREE.WebGLRenderer({antialias: true});
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, DISP_WIDTH / DISP_HEIGHT, 0.1, 10000);

const light = new THREE.DirectionalLight(0xFFFFFF);
const axis = new THREE.AxisHelper(20);
const planeGeom = new THREE.PlaneGeometry(5, 5);
const planeMat = new THREE.MeshLambertMaterial({
  color: 0xFFFFFF,
  side: THREE.DoubleSide
});// end MeshLambertMaterial
const plane = new THREE.Mesh(planeGeom, planeMat);

const loader = new MMDLoader.MMDLoader();
const helper = new MMDLoader.MMDHelper(renderer);

const drawing = () => {
  const loop = () => {
    // helper.render(scene, camera);

    window.requestAnimationFrame(loop);
  }// end loop

  window.requestAnimationFrame(loop);
}// end drawing

renderer.setSize(DISP_WIDTH, DISP_HEIGHT);
$('body').append(renderer.domElement);
camera.position.set(0, 3, 5);
light.position.set(1, 5, 1);
plane.rotation.x = Math.PI * 0.5;
renderer.setClearColor(0xFFFFAA);
scene.add(light);
scene.add(axis);
scene.add(plane);

light.castShadow = true;
plane.receiveShadow = true;
renderer.shadowMap.enabled = true;

let mesh;
const funcAsync = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      mesh = loader.loadModel('./../model/namakobushi.pmx');
      resolve('');
    }, 1000);
  });// end Promise
}// end 

funcAsync()
  .then(data => {
    scene.add(mesh);
  }).catch(data => {
    console.log('NG');
  });

drawing();
