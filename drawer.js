document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".car-card");

    let audioUnlocked = false;
    let currentSound = null;


    /*
        Unlock audio after the user clicks
        somewhere on the page.
    */

    document.addEventListener("click", () => {

        if (audioUnlocked) {
            return;
        }


        const sound =
            document.getElementById("p1-sound");


        if (!sound) {

            console.error(
                "p1-sound not found."
            );

            return;

        }


        sound.volume = 0;


        sound.play()
            .then(() => {

                sound.pause();

                sound.currentTime = 0;

                sound.volume = 1;

                audioUnlocked = true;


                console.log(
                    "Audio unlocked."
                );

            })
            .catch(error => {

                console.error(
                    "Could not unlock audio:",
                    error
                );

            });

    }, { once: true });



    /*
        Engine sounds.
    */

    cards.forEach(card => {


        const image =
            card.querySelector("img");


        if (!image) {
            return;
        }


        /*
            Match:

            p1 → p1-sound
            p2 → p2-sound
            p3 → p3-sound
            etc.
        */

        const sound =
            document.getElementById(
                image.id + "-sound"
            );


        if (!sound) {

            console.error(
                "No audio found for:",
                image.id
            );

            return;

        }



        /*
            Mouse enters card.
        */

        card.addEventListener(
            "mouseenter",
            () => {


                console.log(
                    "Hover:",
                    image.id
                );


                /*
                    Browser audio hasn't been
                    unlocked yet.
                */

                if (!audioUnlocked) {

                    console.log(
                        "Click somewhere on the page first."
                    );

                    return;

                }


                /*
                    Stop previous car sound.
                */

                if (
                    currentSound &&
                    currentSound !== sound
                ) {

                    currentSound.pause();

                    currentSound.currentTime = 0;

                }


                currentSound = sound;


                /*
                    Start current sound.
                */

                sound.currentTime = 0;

                sound.volume = 1;


                sound.play()
                    .then(() => {

                        console.log(
                            "Playing:",
                            sound.src
                        );

                    })
                    .catch(error => {

                        console.error(
                            "Audio error:",
                            error
                        );

                    });

            }
        );



        /*
            Mouse leaves card.
        */

        card.addEventListener(
            "mouseleave",
            () => {

                sound.pause();

                sound.currentTime = 0;

            }
        );



        /*
            3D card movement.
        */

        card.addEventListener(
            "mousemove",
            event => {


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rotateY =
                    ((x / rect.width) - 0.5) * 4;


                const rotateX =
                    ((y / rect.height) - 0.5) * -4;


                card.style.transform =
                    `translateY(-15px)
                     scale(1.015)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;

            }
        );



        /*
            Reset card.
        */

        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });

});

