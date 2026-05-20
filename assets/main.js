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

      // 1.5 Idle Autoplay for Scroll Sequences
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion && scrollItems.length > 0) {
        const scrollSeqs = document.querySelectorAll('.rev-svc-scroll-seq');
        let activeSeq = null;
        
        // Determine which sequence is currently active (in center of viewport)
        const seqObs = new IntersectionObserver((entries) => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              activeSeq = e.target;
            } else {
              if (activeSeq === e.target) activeSeq = null;
            }
          });
        }, { rootMargin: '-40% 0px -40% 0px' });
        
        scrollSeqs.forEach(seq => seqObs.observe(seq));

        let idleTimer = null;
        let autoPlayRaf = null;
        let lastTime = 0;
        let isAutoScrolling = false;
        let velocity = 0;
        const targetVelocity = 100; // px per second
        
        function stopAutoPlay() {
          if (autoPlayRaf) {
            cancelAnimationFrame(autoPlayRaf);
            autoPlayRaf = null;
          }
          isAutoScrolling = false;
          velocity = 0;
        }
        
        function autoPlayLoop(time) {
          if (!lastTime) lastTime = time;
          const delta = time - lastTime;
          lastTime = time;

          if (activeSeq) {
            isAutoScrolling = true;

            if (velocity < targetVelocity) {
               velocity += (targetVelocity * delta / 1000);
               if (velocity > targetVelocity) velocity = targetVelocity;
            }

            const progress = velocity / targetVelocity;
            const ease = progress * progress * (3 - 2 * progress);

            const scrollStep = targetVelocity * (delta / 1000) * ease;

            const items = activeSeq.querySelectorAll('.rev-svc-scroll-list li');
            const lastItem = items[items.length - 1];

            if (lastItem) {
              const lastItemCenter = lastItem.getBoundingClientRect().top + lastItem.getBoundingClientRect().height / 2;
              const vhCenter = window.innerHeight / 2;

              if (lastItemCenter <= vhCenter) {
                stopAutoPlay();
                return;
              } else {
                window.scrollBy(0, scrollStep);
              }
            }
          }

          autoPlayRaf = requestAnimationFrame(autoPlayLoop);
        }

        function startAutoPlay() {
          if (!activeSeq) return;

          const items = activeSeq.querySelectorAll('.rev-svc-scroll-list li');
          if (items.length > 0) {
            const lastItem = items[items.length - 1];
            const lastItemCenter = lastItem.getBoundingClientRect().top + lastItem.getBoundingClientRect().height / 2;
            const vhCenter = window.innerHeight / 2;
            if (lastItemCenter <= vhCenter) return;
          }
          lastTime = performance.now();
          velocity = 0;
          autoPlayRaf = requestAnimationFrame(autoPlayLoop);
        }
        
        function resetTimer(e) {
          // Ignore the scroll events that are generated by our own programmatic scrolling
          if (e && e.type === 'scroll' && isAutoScrolling) return;
          
          stopAutoPlay();
          clearTimeout(idleTimer);
          
          idleTimer = setTimeout(() => {
            if (activeSeq) startAutoPlay();
          }, 3000);
        }

        // Listen for all specified interactions on the window
        ['scroll', 'mousemove', 'touchmove', 'keydown', 'mousedown', 'wheel'].forEach(evt => {
          window.addEventListener(evt, resetTimer, { passive: true });
        });
        
        // Initial timer start
        resetTimer();
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
      if (navToggle && mobileMenu) {
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
      }

    })();
// pipeline-test-1779221212
