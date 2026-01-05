// script.js

document.addEventListener("DOMContentLoaded", function () {
  // ================= NAVBAR SCROLL =================
  const navItems = document.querySelectorAll(".nav-center li");
  const sections = {
    hero: document.getElementById("hero"),
    process: document.getElementById("process"),
    about: document.getElementById("about"),
    project: document.getElementById("project"),
  };

  // Fungsi untuk scroll ke section
  function scrollToSection(sectionId) {
    const section = sections[sectionId];
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Update active nav item
      updateActiveNav(sectionId);
    }
  }

  // Fungsi untuk update nav item yang aktif
  function updateActiveNav(targetId) {
    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("data-target") === targetId) {
        item.classList.add("active");
      }
    });
  }

  // Tambahkan event listener ke setiap nav item
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      const target = this.getAttribute("data-target");
      scrollToSection(target);
    });
  });

  // ================= OBSERVER UNTUK NAVBAR AKTIF SAAT SCROLL =================
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3, // 30% dari section terlihat
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        updateActiveNav(id);
      }
    });
  }, observerOptions);

  // Observ setiap section yang ada di navbar
  Object.values(sections).forEach((section) => {
    if (section) {
      observer.observe(section);
    }
  });

  // ================= FORM SUBMIT HANDLER =================
  const contactForm = document.querySelector(".contact-form form");
  const submitButton = document.querySelector(".btn-submit");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simulasi pengiriman form
      submitButton.innerHTML = "<span>Sending...</span>";
      submitButton.disabled = true;

      // Dalam implementasi nyata, di sini akan ada AJAX request
      setTimeout(() => {
        alert("Thank you for your message! We will contact you soon.");
        contactForm.reset();
        submitButton.innerHTML = "<span>→</span> Submit";
        submitButton.disabled = false;
      }, 1500);
    });
  }

  // ================= HERO STARS ANIMATION =================
  const heroStars = document.querySelector(".hero-stars");
  if (heroStars) {
    // Tambahkan efek bintang bergerak
    heroStars.style.backgroundImage = `
      radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
      radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)),
      radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0)),
      radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)),
      radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0)),
      radial-gradient(2px 2px at 160px 120px, #ddd, rgba(0,0,0,0))
    `;
    heroStars.style.backgroundRepeat = "repeat";
    heroStars.style.backgroundSize = "200px 200px";

    // Animasi pergerakan bintang
    let position = 0;
    function animateStars() {
      position = (position + 0.5) % 200;
      heroStars.style.backgroundPosition = `${position}px ${position}px`;
      requestAnimationFrame(animateStars);
    }
    animateStars();
  }

  // ================= CLOUD ANIMATION =================
  const clouds = document.querySelectorAll(".cloud img");
  clouds.forEach((cloud, index) => {
    cloud.style.animation = `float ${3 + index}s ease-in-out infinite alternate`;
  });

  // ================= NAVBAR SCROLL EFFECT =================
  const header = document.querySelector(".header");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Hide/show navbar saat scroll
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scroll down
      header.style.transform = "translateY(-100%)";
    } else {
      // Scroll up
      header.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;

    // Tambahkan shadow saat scroll
    if (scrollTop > 50) {
      header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
    } else {
      header.style.boxShadow = "none";
    }
  });

  // ================= RESPONSIVE NAVBAR TOGGLE (Untuk mobile) =================
  // Tambahkan toggle button untuk mobile
  const nav = document.querySelector(".nav");
  const toggleButton = document.createElement("button");
  toggleButton.className = "nav-toggle";
  toggleButton.innerHTML = '<i class="fas fa-bars"></i>';

  // Masukkan toggle button sebelum navbar
  const navLeft = document.querySelector(".nav-left");
  navLeft.parentNode.insertBefore(toggleButton, navLeft.nextSibling);

  // Toggle menu saat diklik
  toggleButton.addEventListener("click", function () {
    nav.classList.toggle("nav-active");
    this.innerHTML = nav.classList.contains("nav-active") ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  });

  // Tutup menu saat klik nav item di mobile
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      if (nav.classList.contains("nav-active")) {
        nav.classList.remove("nav-active");
        toggleButton.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  });

  // ================= ANIMASI SAAT SCROLL =================
  // Tambahkan class 'animate' ke elemen saat muncul di viewport
  const animateElements = document.querySelectorAll(".step, .platform, .form-group, .footer-col");

  const elementObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  animateElements.forEach((element) => {
    elementObserver.observe(element);
  });
});

// Tambahkan CSS untuk animasi float cloud
const style = document.createElement("style");
style.textContent = `
  @keyframes float {
    0% { transform: translateY(0px); }
    100% { transform: translateY(-20px); }
  }
  
  .nav-toggle {
    display: none;
    background: none;
    border: none;
    color: #333;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
  }
  
  @media (max-width: 768px) {
    .nav-toggle {
      display: block;
    }
    
    .nav-center {
      position: fixed;
      top: 70px;
      left: 0;
      right: 0;
      background: white;
      flex-direction: column;
      padding: 1rem;
      box-shadow: 0 5px 10px rgba(0,0,0,0.1);
      transform: translateY(-100%);
      opacity: 0;
      transition: all 0.3s ease;
    }
    
    .nav-active .nav-center {
      transform: translateY(0);
      opacity: 1;
    }
    
    .nav-center li {
      margin: 1rem 0;
    }
  }
  
  .step, .platform, .form-group, .footer-col {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s ease;
  }
  
  .step.animate, .platform.animate, .form-group.animate, .footer-col.animate {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);
