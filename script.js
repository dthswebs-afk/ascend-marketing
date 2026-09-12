(function () {
  // Nav dropdowns open via CSS :hover/:focus-within. Escape just needs to
  // drop focus so a keyboard user can close one without tabbing away.
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.activeElement.closest('.nav-item')) {
      document.activeElement.blur();
    }
  });

  // Mobile hamburger menu.
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.querySelector('.main-nav');
  if (menuToggle && mainNav) {
    const closeMenu = () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      mainNav.classList.remove('nav-open');
    };
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('nav-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
    mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  // Contact form: no backend on a static site, so this hands the message
  // off to the visitor's own email client via a mailto: link.
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!contactForm.reportValidity()) return;

      const data = new FormData(contactForm);
      const lines = [
        `Name: ${data.get('name')}`,
        `Email: ${data.get('email')}`,
        `Company: ${data.get('company') || '—'}`,
        `Monthly ad spend: ${data.get('spend') || '—'}`,
        '',
        data.get('message'),
      ];
      const subject = encodeURIComponent(`Growth audit request — ${data.get('name')}`);
      const body = encodeURIComponent(lines.join('\n'));
      window.location.href = `mailto:ascendmarketingstrategies@gmail.com?subject=${subject}&body=${body}`;

      const note = document.getElementById('formNote');
      if (note) {
        note.textContent = 'Opening your email client with this message pre-filled...';
        note.classList.add('success');
      }
    });
  }
})();
