document.addEventListener("DOMContentLoaded", () => {

    const buttons =
        document.querySelectorAll(".neo-button");

    buttons.forEach(button => {

        button.addEventListener("mousemove", event => {

            const rect =
                button.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            button.style.setProperty(
                "--specular-x",
                `${x}px`
            );

            button.style.setProperty(
                "--specular-y",
                `${y}px`
            );

        });

        button.addEventListener("mouseleave", () => {

            button.style.setProperty(
                "--specular-x",
                "50%"
            );

            button.style.setProperty(
                "--specular-y",
                "50%"
            );

        });

    });

});