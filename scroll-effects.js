document.addEventListener("DOMContentLoaded", () => {

    /* ================================
       SCROLL REVEAL
    ================================= */

    const revealElements =
        document.querySelectorAll(
            ".reveal, .reveal-left, .reveal-right"
        );

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(
                            entry.target
                        );
                    }

                });

            },
            {
                threshold: 0.15
            }
        );

    revealElements.forEach(element => {
        observer.observe(element);
    });


    /* ================================
       HERO PARALLAX
    ================================= */

    const heroImage =
        document.querySelector(".hero-image");

    if (heroImage) {

        window.addEventListener(
            "scroll",
            () => {

                const scroll =
                    window.scrollY;

                heroImage.style.transform =
                    `scale(1.05)
                     translateY(${scroll * 0.15}px)`;
            }
        );
    }


    /* ================================
       IMAGE PARALLAX
    ================================= */

    const parallaxImages =
        document.querySelectorAll(
            ".parallax-image"
        );

    window.addEventListener(
        "scroll",
        () => {

            parallaxImages.forEach(image => {

                const rect =
                    image.getBoundingClientRect();

                const movement =
                    (window.innerHeight / 2 -
                    rect.top) * 0.08;

                image.style.transform =
                    `translateY(${movement}px)`;
            });

        }
    );

});