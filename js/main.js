/* ============================================
   MARAVILLIUM — Main JavaScript
   Scroll animations, navbar, language toggle
   ============================================ */

(function () {
  'use strict';

  // --- Respect reduced motion ---
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- i18n ---
  const translations = {
    en: {
      nav_services: 'Services',
      nav_tools: 'Tools',
      nav_about: 'About',
      nav_contact: 'Contact',
      hero_badge: 'Available for projects',
      hero_title_1: 'We build things',
      hero_title_2: 'with AI.',
      hero_desc: 'Maravillium is a small team that designs websites, builds AI integrations, and automates the boring stuff.',
      hero_cta: 'Our services',
      hero_scroll: 'Scroll',
      services_label: 'Services',
      services_title: 'What we do.',
      services_subtitle: 'Three pillars — one goal: make technology work for you.',
      svc1_title: 'AI & Automation',
      svc1_desc: 'Custom AI tools, workflow automation, and integrations that save hours of repetitive work. From chatbots to full pipelines.',
      svc1_tags: 'GPT Integration,Workflow Automation,Computer Vision,Data Processing',
      svc2_title: 'Web Development',
      svc2_desc: 'Websites and web apps that look incredible and load fast. No bloat, no templates — built from scratch.',
      svc2_tags: 'Landing Pages,Web Apps,E-commerce,Responsive Design',
      svc3_title: 'Strategy & Growth',
      svc3_desc: 'Digital presence, analytics, and marketing strategies that actually move the needle. Data-driven decisions.',
      svc3_tags: 'SEO,Analytics,Digital Marketing,Growth Hacking',
      tools_label: 'Tools',
      tools_title: 'Mini web apps & tools.',
      tools_subtitle: 'Small utilities we built for fun.',
      tool_badge_free: 'FREE',
      tool_action_open: 'Open Tool →',
      tool_pomodoro_title: 'Pomodoro Focus',
      tool_pomodoro_desc: 'A premium Bento-style pomodoro timer with integrated tasks and ambient sounds to boost focus.',
      tool_generator_title: 'Brand Image Generator',
      tool_generator_desc: 'Generate high-quality social media posts and branding assets matching your visual identity using AI.',
      tool_sitemap_title: 'AI Sitemap Creator',
      tool_sitemap_desc: 'Generate XML sitemaps, robots.txt, and run an SEO audit on your AI-generated static websites instantly.',
      about_label: 'About',
      about_title: 'Who is Maravillium?',
      about_p1: '<strong>Honestly?</strong> We are a small team of developers who get bored easily and build things to scratch that itch.',
      about_p2: 'Maravillium started as an excuse to experiment with AI, build websites for fun, and automate everything that annoyed us. Some of those experiments turned into real projects for real clients.',
      about_p3: 'The philosophy is simple: <strong>technology should be invisible</strong>. It should just work, look beautiful, and save you time.',
      stat1_num: '15+',
      stat1_label: 'Projects shipped',
      stat2_num: '∞',
      stat2_label: 'Coffees consumed',
      stat3_num: '24/7',
      stat3_label: 'Building stuff',
      stat4_num: '0',
      stat4_label: 'Templates used',
      contact_label: 'Contact',
      contact_title: 'Let\'s build something.',
      contact_subtitle: 'Got an idea? Need AI magic? Want a website that doesn\'t suck? Let\'s talk.',
      contact_wa: 'WhatsApp',
      contact_email: 'Email',
      footer_copy: '© 2026 Maravillium. Built with obsession.',
      footer_link1: 'GitHub',
      footer_link2: 'LinkedIn',
      tech_label: 'Tech Stack',
      tech_title: 'Our tools of choice.',
      tech_subtitle: 'Modern frameworks, artificial intelligence APIs, and high-performance libraries.',
    },
    es: {
      nav_services: 'Servicios',
      nav_tools: 'Herramientas',
      nav_about: 'Nosotros',
      nav_contact: 'Contacto',
      hero_badge: 'Disponible para proyectos',
      hero_title_1: 'Construimos cosas',
      hero_title_2: 'con IA.',
      hero_desc: 'Maravillium es un equipo pequeño que diseña sitios web, construye integraciones con IA y automatiza lo aburrido.',
      hero_cta: 'Nuestros servicios',
      hero_scroll: 'Scroll',
      services_label: 'Servicios',
      services_title: 'Lo que hacemos.',
      services_subtitle: 'Tres pilares — un objetivo: hacer que la tecnología trabaje para vos.',
      svc1_title: 'IA & Automatización',
      svc1_desc: 'Herramientas de IA a medida, automatización de flujos y integraciones que ahorran horas de trabajo repetitivo. Desde chatbots hasta pipelines completos.',
      svc1_tags: 'Integración GPT,Automatización,Visión Artificial,Procesamiento de Datos',
      svc2_title: 'Desarrollo Web',
      svc2_desc: 'Sitios web y apps que se ven increíbles y cargan rápido. Sin bloat, sin templates — construidos desde cero.',
      svc2_tags: 'Landing Pages,Web Apps,E-commerce,Diseño Responsive',
      svc3_title: 'Estrategia & Crecimiento',
      svc3_desc: 'Presencia digital, analytics y estrategias de marketing que realmente mueven la aguja. Decisiones basadas en datos.',
      svc3_tags: 'SEO,Analytics,Marketing Digital,Growth Hacking',
      tools_label: 'Herramientas',
      tools_title: 'Mini web apps y herramientas.',
      tools_subtitle: 'Pequeñas utilidades que construimos por diversión.',
      tool_badge_free: 'GRATIS',
      tool_action_open: 'Abrir Herramienta →',
      tool_pomodoro_title: 'Foco Pomodoro',
      tool_pomodoro_desc: 'Un temporizador pomodoro premium estilo bento con tareas integradas y sonidos ambientales.',
      tool_generator_title: 'Generador de Imagen de Marca',
      tool_generator_desc: 'Crea recursos cohesivos para redes sociales y gráficos de marketing que coincidan con tu identidad de marca al instante con IA.',
      tool_sitemap_title: 'Creador de Sitemap IA',
      tool_sitemap_desc: 'Generá sitemaps XML, robots.txt y realizá una auditoría SEO en tus sitios estáticos creados con IA de forma instantánea.',
      about_label: 'Nosotros',
      about_title: '¿Quién es Maravillium?',
      about_p1: '<strong>¿La verdad?</strong> Somos un equipo pequeño de desarrolladores que se aburren fácil y construyen cosas para matar el aburrimiento.',
      about_p2: 'Maravillium empezó como excusa para experimentar con IA, hacer sitios web por diversión y automatizar todo lo que nos molestaba. Algunos de esos experimentos se convirtieron en proyectos reales para clientes reales.',
      about_p3: 'La filosofía es simple: <strong>la tecnología debería ser invisible</strong>. Debería simplemente funcionar, verse hermosa y ahorrarte tiempo.',
      stat1_num: '15+',
      stat1_label: 'Proyectos entregados',
      stat2_num: '∞',
      stat2_label: 'Cafés consumidos',
      stat3_num: '24/7',
      stat3_label: 'Construyendo cosas',
      stat4_num: '0',
      stat4_label: 'Plantillas usadas',
      contact_label: 'Contacto',
      contact_title: 'Construyamos algo.',
      contact_subtitle: '¿Tenés una idea? ¿Necesitás magia IA? ¿Querés un sitio web que no apeste? Hablemos.',
      contact_wa: 'WhatsApp',
      contact_email: 'Email',
      footer_copy: '© 2026 Maravillium. Construido con obsesión.',
      footer_link1: 'GitHub',
      footer_link2: 'LinkedIn',
      tech_label: 'Tech Stack',
      tech_title: 'Nuestras herramientas.',
      tech_subtitle: 'Frameworks modernos, APIs de inteligencia artificial y librerías de alto rendimiento.',
    }
  };

  let currentLang = localStorage.getItem('maravillium-lang') || 'en';

  function applyTranslations(lang) {
    currentLang = lang;
    localStorage.setItem('maravillium-lang', lang);
    const t = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) {
        if (el.hasAttribute('data-i18n-html')) {
          el.innerHTML = t[key];
        } else {
          el.textContent = t[key];
        }
      }
    });
    // Update tags (comma-separated)
    document.querySelectorAll('[data-i18n-tags]').forEach(el => {
      const key = el.getAttribute('data-i18n-tags');
      if (t[key]) {
        el.innerHTML = t[key].split(',').map(tag =>
          `<span class="service-card__tag">${tag.trim()}</span>`
        ).join('');
      }
    });
    // Update lang button
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) langBtn.textContent = lang === 'en' ? 'ES' : 'EN';
    const mobileLangBtn = document.getElementById('lang-toggle-mobile');
    if (mobileLangBtn) mobileLangBtn.textContent = lang === 'en' ? 'ES' : 'EN';
    document.documentElement.lang = lang;
  }

  // --- Language toggle ---
  document.addEventListener('click', (e) => {
    if (e.target.closest('#lang-toggle') || e.target.closest('#lang-toggle-mobile')) {
      applyTranslations(currentLang === 'en' ? 'es' : 'en');
    }
  });

  // --- Navbar scroll behavior ---
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;
  let ticking = false;

  function handleNavScroll() {
    const currentScroll = window.scrollY;
    if (currentScroll <= 100) {
      navbar.classList.remove('hidden');
    } else if (currentScroll > lastScroll && currentScroll > 200) {
      navbar.classList.add('hidden');
    } else if (currentScroll < lastScroll) {
      navbar.classList.remove('hidden');
    }
    lastScroll = currentScroll;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(handleNavScroll);
      ticking = true;
    }
  }, { passive: true });

  // --- Mobile menu ---
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.getElementById('mobile-close');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    const closeMenu = () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    };

    if (mobileClose) mobileClose.addEventListener('click', closeMenu);
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // --- Scroll reveal ---
  if (!prefersReducedMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } else {
    // If reduced motion, make everything visible immediately
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  // --- Smooth scroll for nav links ---
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    });
  });

  // --- Theme toggle ---
  let currentTheme = localStorage.getItem('maravillium-theme') || 'dark';

  function applyTheme(theme) {
    currentTheme = theme;
    localStorage.setItem('maravillium-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    
    // Toggle icon visibility in all buttons
    const darkIcons = document.querySelectorAll('.theme-icon-dark');
    const lightIcons = document.querySelectorAll('.theme-icon-light');
    
    if (theme === 'light') {
      darkIcons.forEach(icon => icon.style.display = 'none');
      lightIcons.forEach(icon => icon.style.display = 'block');
    } else {
      darkIcons.forEach(icon => icon.style.display = 'block');
      lightIcons.forEach(icon => icon.style.display = 'none');
    }
  }

  document.addEventListener('click', (e) => {
    if (e.target.closest('#theme-toggle') || e.target.closest('#theme-toggle-mobile')) {
      applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    }
  });

  // --- Bento Card Mouse Track Glow ---
  const bentoCards = document.querySelectorAll('.bento__card');
  bentoCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // --- Spotlight glow for tool cards ---
  const toolCards = document.querySelectorAll('.tool-card');
  toolCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // --- Tool Action logic ---
  toolCards.forEach(card => {
    card.addEventListener('click', () => {
      const tool = card.getAttribute('data-tool');
      if (tool === 'pomodoro') {
        window.location.href = 'pomodoroTimerApp/';
      } else if (tool === 'generator') {
        window.open('https://generator.maravillium.com', '_blank');
      } else if (tool === 'sitemap-creator') {
        window.location.href = 'sitemapCreatorApp/';
      }
    });
  });


  // --- Init translations & theme ---
  applyTheme(currentTheme);
  applyTranslations(currentLang);

})();
