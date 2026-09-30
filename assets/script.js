const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');

if (menuToggle && primaryNav) {
  const closeMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Avaa valikko');
    primaryNav.classList.remove('is-open');
  };

  menuToggle.addEventListener('click', () => {
    const opening = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(opening));
    menuToggle.setAttribute('aria-label', opening ? 'Sulje valikko' : 'Avaa valikko');
    primaryNav.classList.toggle('is-open', opening);
  });
  primaryNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

const dialog = document.querySelector('.image-dialog');
if (dialog) {
  const dialogImage = dialog.querySelector('img');
  const dialogCaption = dialog.querySelector('.dialog-caption');
  const closeButton = dialog.querySelector('.dialog-close');
  let opener = null;

  document.querySelectorAll('.gallery-open').forEach((button) => {
    button.addEventListener('click', () => {
      opener = button;
      dialogImage.src = button.dataset.full;
      dialogImage.alt = button.querySelector('img')?.alt || '';
      dialogCaption.textContent = button.dataset.caption || '';
      dialog.showModal();
      closeButton.focus();
    });
  });
  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    dialogImage.removeAttribute('src');
    opener?.focus();
  });
}

document.querySelector('#demo-form')?.addEventListener('submit', (event) => event.preventDefault());
