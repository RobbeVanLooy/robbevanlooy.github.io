var scene, camera, renderer, cube;
var meshFloor;

var keyboard = {};
var player = {
  height: 1.8,
  speed: 0.2,
  turnSpeed: Math.PI * 0.02,
};

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    10
  );

  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshBasicMaterial({
    color: "white",
    border: "black",
  });
  cube = new THREE.Mesh(geometry, material);
  cube.position.y += 1; // Move the mesh up 1 meter
  scene.add(cube);

  meshFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30, 30, 30),
    new THREE.MeshBasicMaterial({
      color: "green",
    })
  );
  meshFloor.height = 3;
  meshFloor.rotation.x -= Math.PI / 2; // Rotate the floor 90 degrees
  scene.add(meshFloor);

  camera.position.set(0, player.height, -5);
  camera.lookAt(new THREE.Vector3(0, player.height, 0));

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor("#e6fffd");
  document.body.appendChild(renderer.domElement);

  animate();
}

function animate() {
  requestAnimationFrame(animate);

  //cube.rotation.x += 0.01;
  //cube.rotation.y += 0.02;

  // Keyboard movement inputs
  if (keyboard[87]) {
    // W key
    cube.position.x -= Math.sin(cube.rotation.y) * player.speed;
    cube.position.z -= -Math.cos(cube.rotation.y) * player.speed;
  }
  if (keyboard[83]) {
    // S keys
    cube.position.x += Math.sin(cube.rotation.y) * player.speed;
    cube.position.z += -Math.cos(cube.rotation.y) * player.speed;
  }
  if (keyboard[65]) {
    // A key
    // Redirect motion by 90 degrees
    cube.position.x += Math.sin(cube.rotation.y + Math.PI / 2) * player.speed;
    cube.position.z += -Math.cos(cube.rotation.y + Math.PI / 2) * player.speed;
  }
  if (keyboard[68]) {
    // D key
    cube.position.x += Math.sin(cube.rotation.y - Math.PI / 2) * player.speed;
    cube.position.z += -Math.cos(cube.rotation.y - Math.PI / 2) * player.speed;
  }

  // Keyboard turn inputs
  if (keyboard[37]) {
    // left arrow key
    camera.rotation.y -= player.turnSpeed;
  }
  if (keyboard[39]) {
    // right arrow key
    camera.rotation.y += player.turnSpeed;
  }

  renderer.render(scene, camera);
}

function keyDown(event) {
  keyboard[event.keyCode] = true;
}

function keyUp(event) {
  keyboard[event.keyCode] = false;
}

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);

window.onload = init;
