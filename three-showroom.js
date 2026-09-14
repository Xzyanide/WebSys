import * as THREE from
"https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

import { GLTFLoader } from
"https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/GLTFLoader.js";


const showroom =
    document.querySelector(".showroom");

if (!showroom) {
    throw new Error("Showroom section not found.");
}


/* =========================
   SCENE
========================= */

const scene =
    new THREE.Scene();

const camera =
    new THREE.PerspectiveCamera(
        45,
        window.innerWidth / 500,
        0.1,
        100
    );

camera.position.set(
    0,
    1.2,
    6
);


/* =========================
   RENDERER
========================= */

const renderer =
    new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.setSize(
    window.innerWidth,
    500
);
renderer.domElement.style.position =
    "absolute";

renderer.domElement.style.left =
    "0";

renderer.domElement.style.top =
    "0";

renderer.domElement.style.transform =
    "none";

renderer.domElement.style.width =
    "100%";

renderer.domElement.style.height =
    "500px";

renderer.domElement.style.zIndex =
    "1";

renderer.domElement.style.pointerEvents =
    "none";

showroom.appendChild(
    renderer.domElement
);


/* =========================
   LIGHTING
========================= */

const ambientLight =
    new THREE.AmbientLight(
        0xffffff,
        2
    );

scene.add(ambientLight);


const keyLight =
    new THREE.DirectionalLight(
        0xffffff,
        4
    );

keyLight.position.set(
    4,
    5,
    5
);

scene.add(keyLight);


const redLight =
    new THREE.PointLight(
        0xe30613,
        5,
        10
    );

redLight.position.set(
    -4,
    2,
    4
);

scene.add(redLight);


/* =========================
   LOAD PORSCHE
========================= */

const loader =
    new GLTFLoader();

let porsche = null;

loader.load(
    "models/porsche.glb",

    gltf => {

        porsche =
            gltf.scene;

        porsche.scale.set(
            1.5,
            1.5,
            1.5
        );

        porsche.position.set(
            0,
            -0.7,
            0
        );

        scene.add(
            porsche
        );

        console.log(
            "Porsche model loaded."
        );
    },

    undefined,

    error => {

        console.error(
            "Could not load Porsche model:",
            error
        );
    }
);


/* =========================
   MOUSE
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

let scrollRotation = 0;
let scrollMovement = 0;

window.addEventListener(
    "scroll",
    () => {

        scrollRotation =
            window.scrollY * 0.0015;

        scrollMovement =
            window.scrollY * 0.0008;

    }
);


function animate() {

    requestAnimationFrame(
        animate
    );

    if (porsche) {

        /* Mouse movement */

        const targetRotation =
            mouseX * 0.8 +
            scrollRotation;

        porsche.rotation.y +=
            (
                targetRotation -
                porsche.rotation.y
            ) * 0.03;

        porsche.rotation.x +=
            (
                mouseY * 0.15 -
                porsche.rotation.x
            ) * 0.02;


        /* Floating */

        porsche.position.y =
            -0.7 +
            Math.sin(
                Date.now() * 0.001
            ) * 0.04;


        /* Small scroll movement */

        porsche.position.x =
            Math.sin(
                scrollMovement
            ) * 0.35;
    }

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
            window.innerWidth / 500;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            500
        );
    }
);