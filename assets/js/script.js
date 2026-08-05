const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu-principal');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const menuLinks = [...document.querySelectorAll('.menu a[href^="#"]')];
const linkedSections = menuLinks
  .map((link) => ({ link, section: document.querySelector(link.getAttribute('href')) }))
  .filter(({ section }) => section);

if (linkedSections.length) {
  const setActiveLink = (activeLink) => {
    menuLinks.forEach((link) => link.removeAttribute('aria-current'));
    activeLink.setAttribute('aria-current', 'location');
  };

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;
    const current = linkedSections.find(({ section }) => section === visible.target);
    if (current) setActiveLink(current.link);
  }, { rootMargin: '-28% 0px -62% 0px', threshold: [0.1, 0.35, 0.6] });

  linkedSections.forEach(({ section }) => observer.observe(section));
}
