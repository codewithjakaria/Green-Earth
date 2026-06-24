
    const navbar = document.querySelector("#navbar");
    const menuToggle = document.querySelector("#menuToggle");
    const navLinks = document.querySelector("#navLinks");
    const navAnchors = document.querySelectorAll(".nav-links a");
    const revealItems = document.querySelectorAll(".reveal");
    const counters = document.querySelectorAll("[data-count]");
    const faqItems = document.querySelectorAll(".faq-item");
    const joinForm = document.querySelector("#joinForm");
    const formMessage = document.querySelector("#formMessage");

    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 20);
    });

    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      const icon = menuToggle.querySelector("i");
      icon.className = navLinks.classList.contains("open") ? "fa-solid fa-xmark" : "fa-solid fa-bars";
    });

    navAnchors.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.querySelector("i").className = "fa-solid fa-bars";
      });
    });

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.16 });

    revealItems.forEach((item) => revealObserver.observe(item));

    const countObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = Number(counter.dataset.count);
        const duration = 1300;
        const start = performance.now();

        const update = (time) => {
          const progress = Math.min((time - start) / duration, 1);
          const value = Math.floor(progress * target);
          counter.textContent = value.toLocaleString();

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            counter.textContent = target.toLocaleString();
          }
        };

        requestAnimationFrame(update);
        observer.unobserve(counter);
      });
    }, { threshold: 0.8 });

    counters.forEach((counter) => countObserver.observe(counter));

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute("id");

        navAnchors.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      });
    }, { rootMargin: "-38% 0px -58% 0px" });

    document.querySelectorAll("header[id], section[id]").forEach((section) => {
      sectionObserver.observe(section);
    });

    faqItems.forEach((item) => {
      const button = item.querySelector(".faq-question");
      const icon = button.querySelector("i");

      button.addEventListener("click", () => {
        item.classList.toggle("open");
        icon.className = item.classList.contains("open") ? "fa-solid fa-minus" : "fa-solid fa-plus";
      });
    });

    joinForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.querySelector("#nameInput").value.trim();
      const activity = document.querySelector("#activityInput").value;

      formMessage.textContent = name
        ? `Thank you, ${name}! You are listed for ${activity}.`
        : "Please write your name first.";

      if (name) {
        joinForm.reset();
      }
    });