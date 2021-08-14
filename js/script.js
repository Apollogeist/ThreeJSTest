'use strict';

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
    75,                                     // FOV
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1, 1000                               // Near/far plane
);
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("black");
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
});

var loader = new THREE.FontLoader();
var mesh = new THREE.Mesh();
loader.load("font.json", font => {
    let settings = {
        font: font,
        size: 40,
        height: 0,
        curveSegments: 12
    }

    let geometry = new THREE.TextGeometry("Python SUCKS!", settings)
    geometry.center();

    var material = new THREE.MeshBasicMaterial();
    material.color = new THREE.Color(0xFF0000);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, -200);

    scene.add(mesh);
});

var light = new THREE.PointLight(0xFFFFFF, 1, 500);
light.position.set(10, 0, 25);
scene.add(light);

var hue = 0;

var render = function() {
    requestAnimationFrame(render);

    // mesh.rotation.x += 0.05;
    mesh.rotation.y += 0.05;
    if (mesh.rotation.y > Math.PI * 0.5) mesh.rotation.y = -Math.PI * 0.5;

    mesh.material.color = new THREE.Color(`hsl(${hue * 360}, 50%, 50%)`);

    hue += 0.005;
    if (hue > 1) hue = 0;

    renderer.render(scene, camera);
};

render();