import * as THREE from
"https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

const hero = document.querySelector(".hero");

if (!hero) {
    throw new Error("Hero section not found.");
}

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);

camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.domElement.style.position = "absolute";
renderer.domElement.style.inset = "0";
renderer.domElement.style.zIndex = "1";
renderer.domElement.style.pointerEvents = "none";

hero.appendChild(renderer.domElement);


/* =========================
   PARTICLES
========================= */

const particleCount = 500;

const positions = new Float32Array(
    particleCount * 3
);

for (let i = 0; i < particleCount; i++) {

    positions[i * 3] =
        (Math.random() - 0.5) * 12;

    positions[i * 3 + 1] =
        (Math.random() - 0.5) * 7;

    positions[i * 3 + 2] =
        (Math.random() - 0.5) * 8;
}

const geometry =
    new THREE.BufferGeometry();

geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
        positions,
        3
    )
);

const material =
    new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.025,
        transparent: true,
        opacity: 0.5
    });

const particles =
    new THREE.Points(
        geometry,
        material
    );

scene.add(particles);


/* =========================
   MOUSE MOVEMENT
========================= */

let mouseX = 0;
let mouseY = 0;

document.addEventListener(
    "mousemove",
    event => {

        mouseX =
            (event.clientX /
            window.innerWidth) - 0.5;

        mouseY =
            (event.clientY /
            window.innerHeight) - 0.5;
    }
);


/* =========================
   ANIMATION
========================= */

function animate() {

    requestAnimationFrame(animate);

    particles.rotation.y += 0.0008;
    particles.rotation.x += 0.0002;

    camera.position.x +=
        (mouseX * 0.4 -
        camera.position.x) * 0.02;

    camera.position.y +=
        (-mouseY * 0.3 -
        camera.position.y) * 0.02;

    camera.lookAt(0, 0, 0);

    renderer.render(
        scene,
        camera
    );
}

animate();


/* =========================
   RESIZE
========================= */

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );
    }
);