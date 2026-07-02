/* 
   Mibest Beauty Salon & Wig Website
   Custom JS - Interactive UI Features
*/

function init() {
  // Mobile Navigation Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      
      // Accessibility states
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
      menuToggle.setAttribute('aria-expanded', !expanded);
    });

    // Close menu when clicking navigation link
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // FAQ Accordion Toggle
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close other active FAQ items
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });

  // Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.reveal, .reveal-image, .reveal-card');
  
  if (revealElements.length > 0) {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
      // Add the reveal-ready class via JS so elements only hide if JS is active and observer will run
      revealElements.forEach(element => {
        element.classList.add('reveal-ready');
      });

      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.12 // trigger when 12% of the element is visible
      };

      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      revealElements.forEach(element => {
        revealObserver.observe(element);
      });
    } else {
      // Fallback: if browser doesn't support IntersectionObserver, keep elements visible
      revealElements.forEach(element => {
        element.classList.add('active');
      });
    }
  }
}

// Bulletproof execution resolving DOMContentLoaded race conditions
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
