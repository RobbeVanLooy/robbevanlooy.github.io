var scene, camera, renderer, cube;
var meshFloor;

var keyboard = {};

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 6;
camera.position.y = 1;

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("#e6fffd");
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial({
  color: "#a3d0ff",
});
var cube = new THREE.Mesh(geometry, material);

var material2 = new THREE.MeshLambertMaterial({
  color: "#ffa29c",
});
var cube2 = new THREE.Mesh(geometry, material2);
scene.add(cube2);

cube2.position.x = 5;

scene.add(cube);

var light = new THREE.PointLight(0xffffff, 1, 500);
light.position.set(10, 0, 25);
scene.add(light);

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

var render = function () {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  animate();
};

render();

this.tl = new TimelineMax({ paused: true });
this.tl.to(this.cube2.scale, 1, { x: 2, ease: Expo.easeOut });
this.tl.to(this.cube2.scale, 0.5, { x: 0.5, ease: Expo.easeOut });
this.tl.to(this.cube2.position, 0.5, { x: 2, ease: Expo.easeOut });
this.tl.to(
  this.cube2.rotation,
  0.5,
  { x: Math.PI * 0.5, ease: Expo.easeOut },
  "=-1.5"
);

function animate() {
  requestAnimationFrame(animate);

  // Keyboard movement inputs
  if (keyboard[87]) {
    // W key
    cube.position.z -= 0.0001;
    camera.position.z -= 0.0001;
  }
  if (keyboard[83]) {
    // S keys
    cube.position.z += 0.0001;
    camera.position.z += 0.0001;
  }
  if (keyboard[65]) {
    // A key
    // Redirect motion by 90 degrees
    //cube.rotation.y += 0.0003;
    cube.position.x -= 0.0001;
    camera.position.x -= 0.0001;
  }
  if (keyboard[68]) {
    // D key
    //cube.rotation.y -= 0.0003;
    cube.position.x += 0.0001;
    camera.position.x += 0.0001;
  }

  // Keyboard turn inputs
  if (keyboard[37]) {
    // left arrow key
    camera.rotation.y -= 0.0001;
  }
  if (keyboard[39]) {
    // right arrow key
    camera.rotation.y += 0.0001;
  }
}

function keyDown(event) {
  keyboard[event.keyCode] = true;
}

function keyUp(event) {
  keyboard[event.keyCode] = false;
}

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
});

window.onload = init;
