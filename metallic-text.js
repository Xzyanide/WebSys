document.addEventListener("DOMContentLoaded", () => {

    const titles = document.querySelectorAll(
        ".hero h1, .logo"
    );

    titles.forEach(title => {

        title.addEventListener("mousemove", event => {

            const rect =
                title.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width;

            const y =
                (event.clientY - rect.top) /
                rect.height;

            const moveX =
                50 + (x - 0.5) * 8;

            const moveY =
                50 + (y - 0.5) * 4;

            title.style.backgroundPosition =
                `${moveX}% ${moveY}%`;
        });

        title.addEventListener("mouseleave", () => {

            title.style.backgroundPosition =
                "50% 50%";

        });

    });

});