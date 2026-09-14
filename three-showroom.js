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
   CANVAS SIZE
========================= */

const canvasWidth = 800;
const canvasHeight = 500;


/* =========================
   SCENE
========================= */

const scene =
    new THREE.Scene();


const camera =
    new THREE.PerspectiveCamera(
        45,
        canvasWidth / canvasHeight,
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
        antialias: true,
        powerPreference: "high-performance"
    });


renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 1.25)
);


renderer.setSize(
    canvasWidth,
    canvasHeight
);


renderer.domElement.style.position =
    "absolute";

renderer.domElement.style.left =
    "50%";

renderer.domElement.style.top =
    "0";

renderer.domElement.style.transform =
    "translateX(-50%)";

renderer.domElement.style.width =
    canvasWidth + "px";

renderer.domElement.style.height =
    canvasHeight + "px";

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

scene.add(
    ambientLight
);


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

scene.add(
    keyLight
);


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

scene.add(
    redLight
);


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

let showroomVisible = false;


document.addEventListener(
    "mousemove",
    event => {

        if (!showroomVisible) {
            return;
        }

        mouseX =
            (event.clientX /
            window.innerWidth) - 0.5;

        mouseY =
            (event.clientY /
            window.innerHeight) - 0.5;
    }
);


/* =========================
   SHOWROOM VISIBILITY
========================= */

const visibilityObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                showroomVisible =
                    entry.isIntersecting;

            });

        },
        {
            threshold: 0.05
        }
    );


visibilityObserver.observe(
    showroom
);


/* =========================
   SCROLL
========================= */

let scrollRotation = 0;
let scrollMovement = 0;


window.addEventListener(
    "scroll",
    () => {

        if (!showroomVisible) {
            return;
        }

        scrollRotation =
            window.scrollY * 0.0015;

        scrollMovement =
            window.scrollY * 0.0008;

    },
    {
        passive: true
    }
);


/* =========================
   ANIMATION
========================= */

let lastFrame = 0;


function animate(time) {

    requestAnimationFrame(
        animate
    );


    if (!showroomVisible || !porsche) {
        return;
    }


    /* =========================
       FRAME LIMIT
    ========================= */

    if (
        time - lastFrame < 33
    ) {
        return;
    }

    lastFrame = time;


    /* =========================
       MOUSE + SCROLL ROTATION
    ========================= */

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


    /* =========================
       FLOATING
    ========================= */

    porsche.position.y =
        -0.7 +
        Math.sin(
            time * 0.001
        ) * 0.04;


    /* =========================
       SCROLL MOVEMENT
    ========================= */

    porsche.position.x =
        Math.sin(
            scrollMovement
        ) * 0.35;


    /* =========================
       RENDER
    ========================= */

    renderer.render(
        scene,
        camera
    );
}


requestAnimationFrame(
    animate
);


/* =========================
   RESIZE
========================= */

window.addEventListener(
    "resize",
    () => {

        const width =
            Math.min(
                canvasWidth,
                window.innerWidth
            );


        camera.aspect =
            width / canvasHeight;

        camera.updateProjectionMatrix();


        renderer.setSize(
            width,
            canvasHeight
        );


        renderer.domElement.style.width =
            width + "px";

    }
);