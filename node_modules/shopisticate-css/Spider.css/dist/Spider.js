(function () {
  // Helper function to apply spy animations
  function applySpyAttributes() {
    const elements = document.querySelectorAll('[spy]');
    elements.forEach((el) => {
      const attributes = el.getAttribute('spy').split(' ');

      attributes.forEach((attr) => {
        switch (attr) {
          case 'fade':
            el.classList.add('fade');
            break;
          case 'bounce':
            el.classList.add('bounce');
            break;
          case 'rounded':
            el.classList.add('rounded');
            break;
          case 'shadow':
            el.classList.add('shadow');
            break;
          case 'bg-primary':
            el.classList.add('bg-primary');
            break;
          case 'text-center':
            el.classList.add('text-center');
            break;
          case 'm1':
            el.classList.add('m-1');
            break;
          default:
            break;
        }
      });
    });
  }

  // Helper function to apply shop grid styles
  function applyShopAttributes() {
    const elements = document.querySelectorAll('[shop]');
    elements.forEach((el) => {
      const attributes = el.getAttribute('shop').split(' ');

      attributes.forEach((attr) => {
        if (attr === 'grid') {
          el.classList.add('d-grid');
          el.classList.add('grid-cols-3');
        }
      });
    });
  }

  // Handle Dark Mode Toggle
  function toggleDarkMode() {
    const darkModeButton = document.querySelector('[data-toggle="dark-mode"]');
    darkModeButton.addEventListener('click', () => {
      document.body.setAttribute('data-theme', document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }

  // Dynamic class toggling for responsive classes
  function toggleResponsiveClasses() {
    const elements = document.querySelectorAll('.d-flex');
    elements.forEach((el) => {
      if (el.classList.contains('d-flex')) {
        el.classList.add('flex-column');
      }
    });
  }

  // Initialize the framework
  document.addEventListener('DOMContentLoaded', () => {
    applySpyAttributes();
    applyShopAttributes();
    toggleDarkMode();
    toggleResponsiveClasses();
  });
})();
