document.addEventListener("DOMContentLoaded", () => {
  /* ========= DOM ELEMENTS ========= */
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const destinationCards = document.querySelectorAll(".destination-card");
  const prevSlide = document.getElementById("prevSlide");
  const nextSlide = document.getElementById("nextSlide");
  const dots = document.querySelectorAll(".dot");
  const citySlides = document.querySelectorAll(".city-slide");
  const contactForm = document.getElementById("contactForm");

  /* ========= NAVBAR SCROLL ========= */
  window.addEventListener("scroll", () => {
    if (!navbar) return;
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });

  /* ========= MOBILE MENU ========= */
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });
  }

  /* ========= ACTIVE LINK ON SCROLL ========= */
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      if (scrollY >= section.offsetTop - 200) {
        current = section.id;
      }
    });

    navItems.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`,
      );
    });
  });

  /* ========= FILTER DESTINATIONS ========= */
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      destinationCards.forEach((card) => {
        const show = filter === "all" || card.dataset.category === filter;
        card.style.display = show ? "block" : "none";
        if (show) card.style.animation = "fadeInUp 0.5s ease";
      });
    });
  });

  /* ========= SLIDER ========= */
  let currentSlide = 0;

  function showSlide(index) {
    citySlides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
      if (dots[i]) dots[i].classList.toggle("active", i === index);
    });
    currentSlide = index;
  }

  if (citySlides.length) {
    prevSlide?.addEventListener("click", () => {
      showSlide((currentSlide - 1 + citySlides.length) % citySlides.length);
    });

    nextSlide?.addEventListener("click", () => {
      showSlide((currentSlide + 1) % citySlides.length);
    });

    dots.forEach((dot, i) => dot.addEventListener("click", () => showSlide(i)));

    setInterval(() => {
      showSlide((currentSlide + 1) % citySlides.length);
    }, 5000);
  }

  /* ========= COUNTERS ========= */
  const counters = document.querySelectorAll(".counter");
  const statsSection = document.querySelector(".stats");
  let animated = false;

  function animateCounter(counter) {
    const target = +counter.dataset.target;
    let count = 0;
    const step = target / 100;

    const update = () => {
      count += step;
      if (count < target) {
        counter.innerText = target % 1 ? count.toFixed(1) : Math.ceil(count);
        requestAnimationFrame(update);
      } else {
        counter.innerText = target;
      }
    };
    update();
  }

  if (statsSection) {
    new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated) {
          counters.forEach(animateCounter);
          animated = true;
        }
      },
      { threshold: 0.5 },
    ).observe(statsSection);
  }

  /* ========= CONTACT FORM ========= */
  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const { name, email, message } = contactForm;
    if (name.value && email.value && message.value) {
      alert("Рахмет! Хабарлама қабылданды 😊");
      contactForm.reset();
    } else {
      alert("Барлық міндетті өрістерді толтырыңыз!");
    }
  });

  /* ========= SMOOTH SCROLL ========= */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  /* ========= IMAGE FADE IN ========= */
  document.querySelectorAll("img").forEach((img) => {
    img.style.opacity = "0";
    img.style.transition = "opacity 0.5s ease";

    if (img.complete) img.style.opacity = "1";
    img.addEventListener("load", () => (img.style.opacity = "1"));
  });

  /* ========= REVEAL ON SCROLL ========= */
  const revealItems = document.querySelectorAll(
    ".destination-card, .about-list li, .contact-item",
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 },
  );

  revealItems.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "0.6s ease";
    revealObserver.observe(el);
  });

  console.log("Қазақстан Туризмі сайты іске қосылды 🇰🇿");
});
