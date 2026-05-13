(function () {
      'use strict';

      // 1. Scroll Scrub Sequence for Words
      const scrollItems = document.querySelectorAll('.rev-svc-scroll-list li');
      if (scrollItems.length > 0) {
        let isTicking = false;

        function updateOpacities() {
          const vh = window.innerHeight;
          const centerLine = vh / 2;
          
          scrollItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const itemCenter = rect.top + rect.height / 2;
            
            // Distance from center of viewport
            const dist = Math.abs(itemCenter - centerLine);
            
            // Safe zone where opacity is 1
            const safeZone = vh * 0.05;
            // Transition zone where opacity fades from 1 to 0.03
            const fadeZone = vh * 0.15; 
            
            let targetOpacity = 0.03;
            
            if (dist <= safeZone) {
              targetOpacity = 1;
            } else if (dist < safeZone + fadeZone) {
              const progress = 1 - ((dist - safeZone) / fadeZone);
              // Ease in out
              const eased = progress * progress * (3 - 2 * progress);
              targetOpacity = 0.03 + (0.97 * eased);
            }
            
            item.style.opacity = targetOpacity.toFixed(3);
          });
          
          isTicking = false;
        }

        window.addEventListener('scroll', () => {
          if (!isTicking) {
            window.requestAnimationFrame(updateOpacities);
            isTicking = true;
          }
        }, { passive: true });
        
        window.addEventListener('resize', () => {
          if (!isTicking) {
            window.requestAnimationFrame(updateOpacities);
            isTicking = true;
          }
        }, { passive: true });

        // Initial paint
        updateOpacities();
      }

      // 2. Scroll Reveal (IntersectionObserver)
      const revEls = document.querySelectorAll('.r-rev');
      if ('IntersectionObserver' in window && revEls.length > 0) {
        const revObs = new IntersectionObserver((entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('r-visible');
              revObs.unobserve(e.target);
            }
          });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
        
        revEls.forEach((el) => { revObs.observe(el); });
      } else {
        // Fallback for browsers without IntersectionObserver
        revEls.forEach((el) => { el.classList.add('r-visible'); });
      }

      // 3. Mobile Menu Logic
      const navToggle = document.querySelector('.rev-nav-toggle');
      const mobileMenu = document.getElementById('rev-mobile-menu');
      const menuLinks = mobileMenu.querySelectorAll('a');
      let isMenuOpen = false;

      function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        navToggle.classList.toggle('is-open', isMenuOpen);
        mobileMenu.classList.toggle('is-open', isMenuOpen);
        navToggle.setAttribute('aria-expanded', isMenuOpen);
        mobileMenu.setAttribute('aria-hidden', !isMenuOpen);
        
        if (isMenuOpen) {
          document.body.style.overflow = 'hidden'; // lock scroll
          if (menuLinks.length > 0) menuLinks[0].focus();
        } else {
          document.body.style.overflow = '';
          navToggle.focus();
        }
      }

      navToggle.addEventListener('click', toggleMenu);

      menuLinks.forEach(link => {
        link.addEventListener('click', () => {
          if (isMenuOpen) toggleMenu();
        });
      });

      // Escape key to close
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
          toggleMenu();
        }
      });

      // Focus trap
      const focusableElements = mobileMenu.querySelectorAll('a, button');
      if (focusableElements.length > 0) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        mobileMenu.addEventListener('keydown', function(e) {
          if (e.key === 'Tab') {
            if (e.shiftKey) {
              if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
              }
            } else {
              if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
              }
            }
          }
        });
      }

    })();