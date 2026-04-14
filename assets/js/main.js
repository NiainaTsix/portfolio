const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");
const mobileMenu = document.getElementById("mobile-menu");
const links = document.querySelectorAll(".menu-link");

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a[href^='#']");

const items = document.querySelectorAll(".formation-item");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("translate-x-full");
});

closeBtn.addEventListener("click", () => {
  mobileMenu.classList.add("translate-x-full");
});

// Fermer quand on clique sur un lien
links.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("translate-x-full");
  });
});

const LinkObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.remove("text-white");
          link.classList.add("text-gray-400");

          if (link.getAttribute("href") === "#" + entry.target.id) {
            link.classList.remove("text-gray-400");
            link.classList.add("text-white");
          }
        });
      }
    });
  },
  {
    rootMargin: "-30% 0px -50% 0px",
  },
);

sections.forEach((section) => {
  LinkObserver.observe(section);
});

document.querySelectorAll("a[href^='#']").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    target.scrollIntoView({
      behavior: "smooth",
    });
  });
});

const formationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.remove("opacity-0", "translate-y-10");
          entry.target.classList.add("opacity-100", "translate-y-0");
        }, index * 200); // effet delay
      }
    });
  },
  {
    threshold: 0.3,
  },
);

function flipCard(id) {
  document.getElementById(id).classList.toggle("rotate-y-180");
}

//emailjs

items.forEach((item) => formationObserver.observe(item));

emailjs.init("EcJtVePEJao4T3PIo"); // public key

const form = document.getElementById("contact-form");
const btn = document.getElementById("submit-btn");
const loader = document.getElementById("loader");
const btnText = document.getElementById("btn-text");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // UI loading
  btn.disabled = true;
  btnText.textContent = "Envoi en cours...";
  loader.classList.remove("hidden");

  emailjs
    .sendForm(
      "service_lj1hqgk", //service key
      "template_zktuham", //template key
      this,
    )
    .then(
      () => {
        btn.disabled = false;
        btnText.textContent = "Envoyer le message";
        loader.classList.add("hidden");
        alert("Message envoyé avec succès !");
        this.reset();
      },
      (error) => {
        btn.disabled = false;
        btnText.textContent = "Envoyer le message";
        loader.classList.add("hidden");
        alert("Erreur lors de l'envoi");
        console.log(error);
      },
    );
});
