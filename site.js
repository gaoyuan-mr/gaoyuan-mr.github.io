(() => {
  const links = [...document.querySelectorAll('.nav-link')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if (!links.length || !sections.length) return;

  const setActive = (id) => {
    links.forEach(link => {
      const active = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };

  let scheduled = false;
  const updateNavigation = () => {
    const threshold = Math.min(window.innerHeight * 0.3, 180);
    let current = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= threshold) current = section;
    }
    const pageIsScrollable = document.documentElement.scrollHeight > window.innerHeight + 2;
    if (pageIsScrollable && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 3) {
      current = sections[sections.length - 1];
    }
    setActive(current.id);
    scheduled = false;
  };

  window.addEventListener('scroll', () => {
    if (!scheduled) {
      scheduled = true;
      window.requestAnimationFrame(updateNavigation);
    }
  }, { passive: true });
  window.addEventListener('resize', updateNavigation);
  window.addEventListener('hashchange', updateNavigation);
  updateNavigation();

  const year = document.getElementById('copyright-year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
