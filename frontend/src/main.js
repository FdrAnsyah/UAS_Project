// Script untuk hamburger menu
document.addEventListener('DOMContentLoaded', function () {
  const burgerMenu = document.getElementById('burgerMenu');
  const navbarMenu = document.getElementById('navbarMenu');

  burgerMenu.addEventListener('click', function () {
    navbarMenu.classList.toggle('hidden');
  });

  // Menutup menu saat klik di luar
  document.addEventListener('click', function (e) {
    if (!navbarMenu.contains(e.target) && !burgerMenu.contains(e.target)) {
      navbarMenu.classList.add('hidden');
    }
  });

  // Handling mobile dropdown
  const dropdownButtons = document.querySelectorAll('[data-dropdown-toggle]');
  dropdownButtons.forEach((button) => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      const dropdownId = this.getAttribute('data-dropdown-toggle');
      const dropdown = document.getElementById(dropdownId);
      dropdown.classList.toggle('hidden');
    });
  });
});
