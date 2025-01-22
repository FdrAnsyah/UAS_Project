// main.js
document.addEventListener('DOMContentLoaded', function () {
  // Get DOM elements
  const burgerMenu = document.getElementById('burgerMenu');
  const navbarMenu = document.getElementById('navbarMenu');
  const dropdownElements = document.querySelectorAll('[data-dropdown]');

  let activeDropdown = null;
  let isTransitioning = false;

  // Add scroll event for navbar shadow
  function handleScroll() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 0) {
      nav.classList.add('shadow-lg');
    } else {
      nav.classList.remove('shadow-lg');
    }
  }

  window.addEventListener('scroll', handleScroll);

  // Burger menu animation
  function toggleBurgerAnimation(isOpen) {
    const spans = burgerMenu.querySelectorAll('span');
    if (isOpen) {
      spans[0].classList.add('rotate-45', 'translate-y-2');
      spans[1].classList.add('opacity-0');
      spans[2].classList.add('-rotate-45', '-translate-y-2');
    } else {
      spans[0].classList.remove('rotate-45', 'translate-y-2');
      spans[1].classList.remove('opacity-0');
      spans[2].classList.remove('-rotate-45', '-translate-y-2');
    }
  }

  // Toggle mobile menu
  burgerMenu.addEventListener('click', function (e) {
    e.stopPropagation();
    const isOpen = !navbarMenu.classList.contains('hidden');
    navbarMenu.classList.toggle('hidden');
    toggleBurgerAnimation(!isOpen);
  });

  // Handle dropdowns
  dropdownElements.forEach((dropdown) => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');
    const arrow = toggle.querySelector('svg');

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();

      // Prevent rapid clicking
      if (isTransitioning) return;
      isTransitioning = true;

      // Close active dropdown if it's not the current one
      if (activeDropdown && activeDropdown !== menu) {
        const activeToggle = activeDropdown.parentElement.querySelector('.dropdown-toggle');
        const activeArrow = activeToggle.querySelector('svg');

        activeToggle.classList.remove('text-lime-500');
        activeArrow.classList.remove('rotate-180');
        activeDropdown.classList.add('hidden');
      }

      // Toggle current dropdown
      toggle.classList.toggle('text-lime-500');
      arrow.classList.toggle('rotate-180');
      menu.classList.toggle('hidden');

      // Update active dropdown reference
      activeDropdown = menu.classList.contains('hidden') ? null : menu;

      // Reset transitioning state after animation
      setTimeout(() => {
        isTransitioning = false;
      }, 1000);
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function (e) {
    if (activeDropdown && !activeDropdown.contains(e.target)) {
      const activeToggle = activeDropdown.parentElement.querySelector('.dropdown-toggle');
      const activeArrow = activeToggle.querySelector('svg');

      activeToggle.classList.remove('text-lime-500');
      activeArrow.classList.remove('rotate-180');
      activeDropdown.classList.add('hidden');
      activeDropdown = null;
    }
  });

  // Handle mobile menu outside clicks
  document.addEventListener('click', function (e) {
    if (!navbarMenu.contains(e.target) && !burgerMenu.contains(e.target) && window.innerWidth < 768) {
      navbarMenu.classList.add('hidden');
      toggleBurgerAnimation(false);
    }
  });

  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (window.innerWidth >= 768) {
        // Desktop view
        navbarMenu.classList.remove('hidden');

        // Close all dropdowns
        dropdownElements.forEach((dropdown) => {
          const toggle = dropdown.querySelector('.dropdown-toggle');
          const menu = dropdown.querySelector('.dropdown-menu');
          const arrow = toggle.querySelector('svg');

          toggle.classList.remove('text-lime-500');
          arrow.classList.remove('rotate-180');
          menu.classList.add('hidden');
        });

        activeDropdown = null;
        toggleBurgerAnimation(false);
      } else {
        // Mobile view
        navbarMenu.classList.add('hidden');
      }
    }, 250);
  });

  // Handle dropdown hover on desktop
  if (window.innerWidth >= 768) {
    dropdownElements.forEach((dropdown) => {
      const toggle = dropdown.querySelector('.dropdown-toggle');
      const menu = dropdown.querySelector('.dropdown-menu');

      // Hover events for desktop only
      dropdown.addEventListener('mouseenter', function () {
        if (window.innerWidth >= 768) {
          menu.classList.remove('hidden');
        }
      });

      dropdown.addEventListener('mouseleave', function () {
        if (window.innerWidth >= 768) {
          menu.classList.add('hidden');
        }
      });
    });
  }
});
