// script2.js

document.addEventListener('DOMContentLoaded', function() {
  // ================= NAVBAR SCROLL =================
  const navItems = document.querySelectorAll('.nav-center li');
  const sections = {
    hero: document.getElementById('hero'),
    process: document.getElementById('process'),
    about: document.getElementById('about'),
    project: document.getElementById('project')
  };

  // Fungsi untuk scroll ke section
  function scrollToSection(sectionId) {
    const section = sections[sectionId];
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Update active nav item
      updateActiveNav(sectionId);
    }
  }

  // Fungsi untuk update nav item yang aktif
  function updateActiveNav(targetId) {
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-target') === targetId) {
        item.classList.add('active');
      }
    });
  }

  // Tambahkan event listener ke setiap nav item
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      const target = this.getAttribute('data-target');
      scrollToSection(target);
    });
  });

  // ================= OBSERVER UNTUK NAVBAR AKTIF SAAT SCROLL =================
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        updateActiveNav(id);
      }
    });
  }, observerOptions);

  // Observ setiap section yang ada di navbar
  Object.values(sections).forEach(section => {
    if (section) {
      observer.observe(section);
    }
  });

  // ================= FORM SUBMIT HANDLER =================
  const contactForm = document.querySelector('.contact-form form');
  const submitButton = document.querySelector('.btn-submit');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validasi form sederhana
      const inputs = this.querySelectorAll('input[required], textarea[required]');
      let isValid = true;
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#ff4757';
        } else {
          input.style.borderColor = '';
        }
      });
      
      if (!isValid) {
        alert('Please fill in all required fields.');
        return;
      }
      
      // Simulasi pengiriman form
      const originalText = submitButton.innerHTML;
      submitButton.innerHTML = '<span>Sending...</span>';
      submitButton.disabled = true;
      
      // Dalam implementasi nyata, di sini akan ada AJAX request
      setTimeout(() => {
        alert('Thank you for your message! Our social media team will contact you soon.');
        contactForm.reset();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
      }, 1500);
    });
  }

  // ================= HERO ANIMATIONS =================
  const heroStars = document.querySelector('.hero-stars');
  if (heroStars) {
    // Efek bintang yang lebih dinamis untuk tema social media
    heroStars.style.backgroundImage = `
      radial-gradient(2px 2px at 10px 20px, rgba(255, 255, 255, 0.9), transparent),
      radial-gradient(3px 3px at 60px 40px, rgba(255, 215, 0, 0.8), transparent),
      radial-gradient(2px 2px at 110px 80px, rgba(255, 255, 255, 0.7), transparent),
      radial-gradient(2px 2px at 150px 30px, rgba(135, 206, 250, 0.8), transparent),
      radial-gradient(3px 3px at 180px 90px, rgba(255, 105, 180, 0.7), transparent),
      radial-gradient(2px 2px at 220px 60px, rgba(255, 255, 255, 0.9), transparent)
    `;
    heroStars.style.backgroundRepeat = 'repeat';
    heroStars.style.backgroundSize = '250px 250px';
    
    // Animasi pergerakan bintang
    let position = 0;
    function animateStars() {
      position = (position + 0.3) % 250;
      heroStars.style.backgroundPosition = `${position}px ${position}px`;
      requestAnimationFrame(animateStars);
    }
    animateStars();
  }

  // ================= CLOUD ANIMATIONS =================
  const clouds = document.querySelectorAll('.cloud img');
  clouds.forEach((cloud, index) => {
    // Animasi berbeda untuk setiap awan
    const duration = 4 + index;
    const delay = index * 0.5;
    cloud.style.animation = `floatSocial ${duration}s ease-in-out ${delay}s infinite alternate`;
  });

  // ================= NAVBAR SCROLL EFFECT =================
  const header = document.querySelector('.header');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Hide/show navbar saat scroll
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scroll down
      header.style.transform = 'translateY(-100%)';
      header.style.transition = 'transform 0.3s ease';
    } else {
      // Scroll up
      header.style.transform = 'translateY(0)';
      header.style.transition = 'transform 0.3s ease';
    }
    
    lastScrollTop = scrollTop;
    
    // Tambahkan shadow saat scroll
    if (scrollTop > 50) {
      header.style.boxShadow = '0 2px 15px rgba(0,0,0,0.15)';
      header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
      header.style.boxShadow = 'none';
      header.style.backgroundColor = '';
    }
  });

  // ================= RESPONSIVE NAVBAR TOGGLE =================
  const nav = document.querySelector('.nav');
  const toggleButton = document.createElement('button');
  toggleButton.className = 'nav-toggle';
  toggleButton.innerHTML = '<i class="fas fa-bars"></i>';
  toggleButton.setAttribute('aria-label', 'Toggle navigation menu');
  
  // Masukkan toggle button
  const navLeft = document.querySelector('.nav-left');
  if (navLeft) {
    navLeft.parentNode.insertBefore(toggleButton, navLeft.nextSibling);
  }
  
  // Toggle menu saat diklik
  toggleButton.addEventListener('click', function() {
    nav.classList.toggle('nav-active');
    this.innerHTML = nav.classList.contains('nav-active') 
      ? '<i class="fas fa-times"></i>' 
      : '<i class="fas fa-bars"></i>';
  });
  
  // Tutup menu saat klik nav item di mobile
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      if (nav.classList.contains('nav-active')) {
        nav.classList.remove('nav-active');
        toggleButton.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  });

  // ================= ANIMASI STEP PROCESS =================
  const stepElements = document.querySelectorAll('.step');
  
  const stepObserver = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate-step');
        }, index * 200); // Delay bertahap
      }
    });
  }, {
    threshold: 0.2
  });
  
  stepElements.forEach(step => {
    stepObserver.observe(step);
  });

  // ================= SOCIAL MEDIA ICON EFFECTS =================
  const socialIcons = document.querySelectorAll('.nav-right a');
  socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px)';
      this.style.transition = 'all 0.3s ease';
    });
    
    icon.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // ================= BUTTON HOVER EFFECTS =================
  const buttons = document.querySelectorAll('.btn-outline, .btn-submit');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
      this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '';
    });
  });

  // ================= RECTANGLE ANIMATION =================
  const rectangle = document.querySelector('.rectangle');
  if (rectangle) {
    // Animasi muncul dari kiri
    setTimeout(() => {
      rectangle.style.transform = 'translateX(0)';
      rectangle.style.opacity = '1';
    }, 500);
  }

  // ================= PLATFORM IMAGE ANIMATION =================
  const platformImage = document.querySelector('.platform img');
  if (platformImage) {
    // Efek hover khusus untuk image platform
    platformImage.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05) rotate(1deg)';
      this.style.transition = 'all 0.5s ease';
    });
    
    platformImage.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1) rotate(0)';
    });
  }

  // ================= TYPING EFFECT FOR HERO TEXT =================
  const heroText = document.querySelector('.hero-text h1:first-child');
  if (heroText && heroText.textContent.includes('Social Media & Content')) {
    const originalText = heroText.textContent;
    heroText.textContent = '';
    let i = 0;
    
    function typeWriter() {
      if (i < originalText.length) {
        heroText.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    }
    
    // Mulai efek typing setelah delay
    setTimeout(typeWriter, 1000);
  }
});

// ================= CSS ANIMATIONS =================
const style = document.createElement('style');
style.textContent = `
  @keyframes floatSocial {
    0% { 
      transform: translateY(0px) translateX(0); 
    }
    100% { 
      transform: translateY(-25px) translateX(10px); 
    }
  }
  
  @keyframes heartbeat {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
  
  @keyframes floatUp {
    0% { 
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }
    100% { 
      transform: translateY(-100px) rotate(10deg);
      opacity: 0;
    }
  }
  
  .nav-toggle {
    display: none;
    background: none;
    border: none;
    color: #333;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
    z-index: 1001;
  }
  
  .social-heart {
    position: absolute;
    color: #ff4757;
    animation: floatUp 3s ease-in-out forwards;
    z-index: 1;
    pointer-events: none;
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
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(10px);
      flex-direction: column;
      padding: 1.5rem;
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
      transform: translateY(-100%);
      opacity: 0;
      transition: all 0.4s ease;
      z-index: 1000;
    }
    
    .nav-active .nav-center {
      transform: translateY(0);
      opacity: 1;
    }
    
    .nav-center li {
      margin: 1.2rem 0;
      font-size: 1.1rem;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 8px;
      transition: all 0.3s ease;
    }
    
    .nav-center li:hover {
      background: rgba(0, 0, 0, 0.05);
      transform: translateX(5px);
    }
    
    .nav-center li.active {
      color: #ff6b6b;
      font-weight: bold;
      background: rgba(255, 107, 107, 0.1);
    }
  }
  
  .step {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .step.animate-step {
    opacity: 1;
    transform: translateY(0);
  }
  
  .rectangle {
    transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    transform: translateX(-100%);
    opacity: 0;
  }
  
  .clients-grid img {
    transition: all 0.3s ease;
  }
  
  .btn-outline, .btn-submit {
    transition: all 0.3s ease !important;
  }
  
  /* Animasi untuk social media icons di navbar */
  .nav-right a {
    position: relative;
    transition: all 0.3s ease;
  }
  
  .nav-right a:hover {
    color: #ff6b6b;
  }
  
  .nav-right a::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    width: 0;
    height: 2px;
    background: #ff6b6b;
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }
  
  .nav-right a:hover::after {
    width: 100%;
  }
  
  /* Animasi untuk form inputs */
  .form-group input, .form-group textarea {
    transition: all 0.3s ease;
  }
  
  .form-group input:focus, .form-group textarea:focus {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
  
  /* Animasi untuk hasil section */
  .results h2, .results h3, .results p {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease;
  }
  
  .results.animate h2,
  .results.animate h3,
  .results.animate p {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);

// ================= OBSERVER UNTUK RESULTS SECTION =================
document.addEventListener('DOMContentLoaded', function() {
  const resultsSection = document.querySelector('.results');
  if (resultsSection) {
    const resultsObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, { threshold: 0.3 });
    
    resultsObserver.observe(resultsSection);
  }
});