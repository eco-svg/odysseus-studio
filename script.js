/* =====================================================
   VEYRA
   Main JavaScript
===================================================== */


/* ================= HEADER ================= */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* ================= SCROLL REVEAL ================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* ================= HERO PARALLAX ================= */

const heroContent =
    document.querySelector(".parallax");


window.addEventListener("scroll", () => {

    if (!heroContent) {
        return;
    }


    const scrollY =
        window.scrollY;


    /*
        Only apply the effect while
        the hero is near the top.
    */

    if (scrollY < window.innerHeight) {

        const movement =
            scrollY * 0.16;

        const opacity =
            1 - (scrollY / window.innerHeight) * 0.75;

        heroContent.style.transform =
            `translateY(${movement}px)`;

        heroContent.style.opacity =
            Math.max(opacity, 0);

    }

});


/* ================= PROJECT VISUAL PARALLAX ================= */

const projectVisual =
    document.querySelector(".project-visual");

const orbits =
    document.querySelectorAll(".visual-orbit");


window.addEventListener("scroll", () => {

    if (!projectVisual) {
        return;
    }


    const rect =
        projectVisual.getBoundingClientRect();


    const viewportCenter =
        window.innerHeight / 2;


    const distance =
        (rect.top + rect.height / 2)
        - viewportCenter;


    const movement =
        distance * -0.035;


    orbits.forEach((orbit, index) => {

        const multiplier =
            index + 1;

        orbit.style.transform =
            `translateY(${movement * multiplier}px)`;

    });

});


/* ================= SMOOTH ANCHORS ================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener("click", event => {

            const targetID =
                link.getAttribute("href");


            if (
                !targetID ||
                targetID === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetID);


            if (!target) {
                return;
            }


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


/* ================= CONTACT FORM ================= */

const contactForm =
    document.getElementById("contactForm");

const formNote =
    document.getElementById("formNote");


contactForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document
                .getElementById("name")
                .value
                .trim();


        const business =
            document
                .getElementById("business")
                .value
                .trim();


        const contact =
            document
                .getElementById("contactInfo")
                .value
                .trim();


        const requestType =
            document
                .getElementById("requestType")
                .value;


        const message =
            document
                .getElementById("message")
                .value
                .trim();


        if (!name || !contact) {

            formNote.textContent =
                "Please enter your name and contact details.";

            return;
        }


        const email =
            "veyrasupportus@gmail.com";


        const subject =
            `VEYRA enquiry — ${requestType}`;


        const body =

`Hello VEYRA,

Name:
${name}

Business / Organisation:
${business || "Not provided"}

Contact:
${contact}

Interested in:
${requestType}

Message:
${message || "No additional message provided."}

Regards,
${name}`;


        const mailto =
            `mailto:${email}` +
            `?subject=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(body)}`;


        formNote.textContent =
            "Opening your email client...";


        window.location.href =
            mailto;

    }
);