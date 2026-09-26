/* ============================================
   AI SITEMAP CREATOR — Application Logic
   Purely Client-Side SEO Audit & Sitemap Builder
   ============================================ */

(function () {
  'use strict';

  // --- State Variables ---
  let pages = [];
  let crawledPaths = new Set();
  let crawlQueue = [];
  let isCrawling = false;
  let currentFormat = 'xml';
  let currentLang = localStorage.getItem('maravillium-lang') || 'en';
  let currentTheme = localStorage.getItem('maravillium-theme') || 'dark';

  // --- Translation Dictionary ---
  const translations = {
    en: {
      back_home: 'Back to Maravillium',
      app_title: 'AI Sitemap Creator',
      source_header: '1. Import Website',
      source_tab_directory: 'Local Directory',
      source_tab_crawler: 'Live Crawl',
      source_tab_manual: 'Paste URLs',
      drop_text_folder: 'Drag & drop your website project folder here',
      or: 'or',
      btn_choose_folder: 'Choose Folder',
      privacy_note: '100% private. Files never leave your browser.',
      crawler_desc: 'Input your live website URL. We will recursively scan links using a CORS proxy.',
      btn_crawl: 'Start Crawl',
      btn_stop: 'Stop',
      manual_desc: 'Paste a list of URLs (one per line) to generate a sitemap directly.',
      btn_add_urls: 'Add URLs',
      seo_header: 'SEO Health Audit',
      seo_score_label: 'Health',
      metric_pages: 'Pages Detected',
      metric_images: 'Images Mapped',
      metric_broken: 'Broken Links',
      audit_checklist_title: 'SEO Improvements Checklist',
      checklist_empty: 'Import a website to audit SEO metadata.',
      editor_header: '2. Review Page Nodes',
      btn_add_page: '+ Add Page',
      th_route: 'Route Path',
      th_title: 'Meta Title',
      th_images: 'Images',
      th_priority: 'Priority',
      th_freq: 'Frequency',
      th_status: 'SEO Status',
      th_actions: 'Actions',
      table_empty_state: 'No pages analyzed yet. Drag a folder or crawl a URL to begin.',
      btn_clear_all: 'Clear All Pages',
      config_header: '3. Configuration',
      cfg_base_url: 'Website Base URL',
      cfg_image_sitemap: 'Include Image Tags',
      cfg_image_sitemap_desc: 'Generate <image:image> for Google Image SEO.',
      cfg_lastmod: 'Include Lastmod Date',
      cfg_lastmod_desc: 'Add last modification tags using generation date.',
      cfg_default_freq: 'Default Change Frequency',
      cfg_default_priority: 'Default Priority',
      console_header: '4. Generated Files',
      btn_copy: 'Copy Code',
      btn_download_sitemap: 'Download Sitemap',
      footer_text: '© 2026 Maravillium. Built with obsession.',
      modal_add_title: 'Add Page Node',
      modal_add_subtitle: 'Manually add a page path to generate in the sitemap output.',
      form_label_path: 'Relative Route Path',
      form_label_title: 'Page Meta Title (Optional)',
      form_label_priority: 'Priority',
      form_label_freq: 'Change Frequency',
      btn_save_node: 'Save Page Node',
      
      // Dynamic strings
      log_crawling: 'Crawling: ',
      log_found: 'Found link: ',
      log_error: 'Error loading: ',
      log_done: 'Crawl completed! Total pages found: ',
      log_stopped: 'Crawl stopped by user.',
      audit_pass_title: 'All page titles configured.',
      audit_warn_title: 'Title tag missing or sub-optimal length (30-60 chars) on some pages.',
      audit_pass_desc: 'All pages have meta descriptions.',
      audit_warn_desc: 'Meta description missing or sub-optimal length (120-160 chars) on some pages.',
      audit_pass_images: 'All images have alt attributes.',
      audit_warn_images: 'Some images are missing alt attributes (hurts accessibility & SEO).',
      audit_pass_links: 'No broken links detected.',
      audit_warn_links: 'Broken relative links detected (links pointing to missing files).',
      confirm_clear: 'Are you sure you want to clear all pages?',
      notify_copied: 'Code copied to clipboard!',
      placeholder_add_success: 'Page node added successfully.',
      placeholder_invalid_url: 'Please enter a valid website URL.'
    },
    es: {
      back_home: 'Volver a Maravillium',
      app_title: 'Creador de Sitemap IA',
      source_header: '1. Importar Sitio Web',
      source_tab_directory: 'Carpeta Local',
      source_tab_crawler: 'Rastreador Web',
      source_tab_manual: 'Pegar URLs',
      drop_text_folder: 'Arrastrá y soltá la carpeta de tu sitio web acá',
      or: 'o',
      btn_choose_folder: 'Seleccionar Carpeta',
      privacy_note: '100% privado. Los archivos nunca salen de tu navegador.',
      crawler_desc: 'Ingresá la URL de tu sitio. Lo escanearemos recursivamente usando un proxy CORS.',
      btn_crawl: 'Empezar Escaneo',
      btn_stop: 'Detener',
      manual_desc: 'Pegá una lista de URLs (una por línea) para generar el sitemap directamente.',
      btn_add_urls: 'Agregar URLs',
      seo_header: 'Auditoría SEO',
      seo_score_label: 'Salud',
      metric_pages: 'Páginas Detectadas',
      metric_images: 'Imágenes Mapeadas',
      metric_broken: 'Enlaces Rotos',
      audit_checklist_title: 'Lista de Mejoras SEO',
      checklist_empty: 'Importá un sitio web para auditar sus metadatos SEO.',
      editor_header: '2. Revisar Páginas',
      btn_add_page: '+ Agregar Página',
      th_route: 'Ruta de Página',
      th_title: 'Título Meta',
      th_images: 'Imágenes',
      th_priority: 'Prioridad',
      th_freq: 'Frecuencia',
      th_status: 'Estado SEO',
      th_actions: 'Acciones',
      table_empty_state: 'Aún no se analizaron páginas. Arrastrá una carpeta o escaneá una URL.',
      btn_clear_all: 'Limpiar Todo',
      config_header: '3. Configuración',
      cfg_base_url: 'URL Base del Sitio',
      cfg_image_sitemap: 'Incluir Imágenes',
      cfg_image_sitemap_desc: 'Generá etiquetas <image:image> para SEO de Google Imágenes.',
      cfg_lastmod: 'Incluir Fecha Mod',
      cfg_lastmod_desc: 'Agregá la fecha del día actual como última modificación.',
      cfg_default_freq: 'Frecuencia por Defecto',
      cfg_default_priority: 'Prioridad por Defecto',
      console_header: '4. Archivos Generados',
      btn_copy: 'Copiar Código',
      btn_download_sitemap: 'Descargar Sitemap',
      footer_text: '© 2026 Maravillium. Construido con obsesión.',
      modal_add_title: 'Agregar Página',
      modal_add_subtitle: 'Agregá una ruta manualmente para incluirla en el sitemap.',
      form_label_path: 'Ruta de Página Relativa',
      form_label_title: 'Título Meta de Página (Opcional)',
      form_label_priority: 'Prioridad',
      form_label_freq: 'Frecuencia de Cambio',
      btn_save_node: 'Guardar Página',

      log_crawling: 'Rastreando: ',
      log_found: 'Enlace encontrado: ',
      log_error: 'Error al cargar: ',
      log_done: 'Escaneo terminado! Total de páginas: ',
      log_stopped: 'Escaneo detenido por el usuario.',
      audit_pass_title: 'Todos los títulos de página configurados.',
      audit_warn_title: 'Faltan títulos o la longitud no es óptima (30-60 caracteres).',
      audit_pass_desc: 'Todas las páginas tienen meta descripción.',
      audit_warn_desc: 'Faltan meta descripciones o no tienen la longitud óptima (120-160 caracteres).',
      audit_pass_images: 'Todas las imágenes tienen etiqueta alt.',
      audit_warn_images: 'Faltan etiquetas alt en algunas imágenes (afecta accesibilidad y SEO).',
      audit_pass_links: 'No se detectaron enlaces rotos.',
      audit_warn_links: 'Se detectaron enlaces relativos rotos (apuntan a archivos inexistentes).',
      confirm_clear: '¿Estás seguro de que querés borrar todas las páginas?',
      notify_copied: 'Código copiado al portapapeles!',
      placeholder_add_success: 'Página agregada correctamente.',
      placeholder_invalid_url: 'Por favor, ingresá una URL válida.'
    }
  };

  // --- Translation Helpers ---
  function applyTranslations(lang) {
    currentLang = lang;
    localStorage.setItem('maravillium-lang', lang);
    const t = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) {
        el.textContent = t[key];
      }
    });
    // Set custom page titles/placeholders if needed
    const baseInput = document.getElementById('config-base-url');
    if (baseInput) baseInput.placeholder = lang === 'en' ? 'https://www.mywebsite.com' : 'https://www.misitioweb.com';
    
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) langBtn.textContent = lang === 'en' ? 'ES' : 'EN';
    
    document.documentElement.lang = lang;
    updateFileConsole(); // Update console download buttons
    runSeoAudit(); // Update audit checklists wording
  }

  // --- Theme Helpers ---
  function applyTheme(theme) {
    currentTheme = theme;
    localStorage.setItem('maravillium-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    
    const darkIcon = document.querySelector('.theme-icon-dark');
    const lightIcon = document.querySelector('.theme-icon-light');
    
    if (theme === 'light') {
      if (darkIcon) darkIcon.style.display = 'none';
      if (lightIcon) lightIcon.style.display = 'block';
    } else {
      if (darkIcon) darkIcon.style.display = 'block';
      if (lightIcon) lightIcon.style.display = 'none';
    }
  }

  // --- Bento Spotlights ---
  function initSpotlights() {
    const cards = document.querySelectorAll('.bento-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }

  // --- Core Logic: HTML Scraper & Parser ---
  
  // Convert standard file path to clean SEO route path
  function cleanRoutePath(relativePath) {
    // Normalise slashes
    let path = relativePath.replace(/\\/g, '/');
    
    // Remove top level folder name if present (from folder uploads)
    const firstSlash = path.indexOf('/');
    if (firstSlash !== -1 && path.includes('.html')) {
      path = path.substring(firstSlash);
    }
    
    // Prefix slash
    if (!path.startsWith('/')) {
      path = '/' + path;
    }
    
    // Remove index.html / index.htm
    path = path.replace(/\/index\.html?$/, '/');
    
    // Remove extension .html / .htm
    path = path.replace(/\.html?$/, '');
    
    // Ensure trailing slash is clean or remove it for clean look
    if (path.length > 1 && path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    
    return path;
  }

  // Process a list of File objects uploaded locally
  async function processLocalFiles(filesList) {
    const htmlFiles = filesList.filter(f => f.name.endsWith('.html') || f.name.endsWith('.htm'));
    if (htmlFiles.length === 0) return;

    // Reset current state
    pages = [];
    crawledPaths.clear();

    const defaultFreq = document.getElementById('config-default-freq').value;
    const defaultPriority = document.getElementById('config-default-priority').value;

    for (const file of htmlFiles) {
      try {
        const htmlText = await file.text();
        const relativePath = file.customRelativePath || file.webkitRelativePath || file.name;
        const routePath = cleanRoutePath(relativePath);
        
        // Skip duplicate paths
        if (crawledPaths.has(routePath)) continue;
        crawledPaths.add(routePath);

        const doc = new DOMParser().parseFromString(htmlText, 'text/html');
        
        // Extract SEO tag elements
        const title = doc.querySelector('title')?.innerText || doc.querySelector('meta[property="og:title"]')?.content || '';
        const description = doc.querySelector('meta[name="description"]')?.content || doc.querySelector('meta[property="og:description"]')?.content || '';
        
        // Extract Images
        const imgElements = doc.querySelectorAll('img');
        const images = Array.from(imgElements).map(img => {
          let src = img.getAttribute('src') || '';
          // Resolve relative path roughly
          if (src && !src.startsWith('http') && !src.startsWith('data:')) {
            // Resolve relative to page
            const pathParts = routePath.split('/').slice(0, -1);
            if (src.startsWith('/')) {
              src = src;
            } else if (src.startsWith('./')) {
              src = pathParts.join('/') + src.substring(1);
            } else {
              src = pathParts.join('/') + '/' + src;
            }
          }
          return {
            src: src,
            alt: img.getAttribute('alt') || ''
          };
        }).filter(img => img.src !== '');

        // Extract Links for integrity audit
        const aElements = doc.querySelectorAll('a[href]');
        const links = Array.from(aElements).map(a => a.getAttribute('href')).filter(href => {
          // Keep only local, non-anchor relative links
          return href && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('#') && !href.startsWith('javascript:');
        }).map(href => {
          // Clean the target path
          let target = href;
          if (target.startsWith('./')) target = target.substring(2);
          // Resolve relative to current page route
          const currentParts = routePath.split('/').slice(0, -1);
          if (target.startsWith('/')) {
            // Absolute path from site root
            return target.split('#')[0].split('?')[0];
          } else {
            // Relative path
            const combined = [...currentParts, target].join('/');
            return ('/' + combined).replace(/\/+/g, '/').split('#')[0].split('?')[0];
          }
        });

        // Set priority logic (Homepage is 1.0, sub-pages are defaults)
        const priority = routePath === '/' ? '1.0' : defaultPriority;

        pages.push({
          path: routePath,
          title: title.trim(),
          description: description.trim(),
          priority: parseFloat(priority),
          changefreq: defaultFreq,
          images: images,
          links: links,
          status: 'success',
          issues: []
        });

      } catch (err) {
        console.error('Error parsing file:', file.name, err);
      }
    }

    onDataUpdated();
  }

  // --- Core Logic: Web Crawler ---

  async function startCrawl(url) {
    if (isCrawling) return;
    isCrawling = true;
    
    const startBtn = document.getElementById('btn-start-crawl');
    const stopBtn = document.getElementById('btn-stop-crawl');
    const progressBox = document.getElementById('crawler-progress-box');
    const logEl = document.getElementById('crawler-log');
    
    if (startBtn) startBtn.style.display = 'none';
    if (progressBox) progressBox.style.display = 'flex';
    logEl.innerHTML = '';
    
    pages = [];
    crawledPaths.clear();
    crawlQueue = [];

    // Parse domain boundaries
    let baseDomain;
    try {
      if (!url.startsWith('http')) {
        url = 'https://' + url;
      }
      const parsedUrl = new URL(url);
      baseDomain = parsedUrl.origin;
      // Set the config base URL to this live URL
      const configBaseUrlInput = document.getElementById('config-base-url');
      if (configBaseUrlInput) configBaseUrlInput.value = baseDomain;
    } catch (e) {
      alert(translations[currentLang].placeholder_invalid_url);
      isCrawling = false;
      if (startBtn) startBtn.style.display = 'inline-flex';
      if (progressBox) progressBox.style.display = 'none';
      return;
    }

    crawlQueue.push('/');
    
    const defaultFreq = document.getElementById('config-default-freq').value;
    const defaultPriority = document.getElementById('config-default-priority').value;
    const errorsCountEl = document.getElementById('crawl-stat-errors');
    const pagesCountEl = document.getElementById('crawl-stat-pages');
    const queueCountEl = document.getElementById('crawl-stat-queue');
    const progressFill = document.getElementById('crawler-progress-bar');
    
    let errorCount = 0;
    
    // Proxy URLs for fallback
    const corsProxy = 'https://api.allorigins.win/get?url=';

    while (crawlQueue.length > 0 && isCrawling) {
      // Dequeue
      const currentPath = crawlQueue.shift();
      if (crawledPaths.has(currentPath)) continue;
      crawledPaths.add(currentPath);

      // Update crawler dashboard
      pagesCountEl.textContent = crawledPaths.size;
      queueCountEl.textContent = crawlQueue.length;
      errorsCountEl.textContent = errorCount;
      const progressPercent = Math.min(100, Math.floor((crawledPaths.size / (crawledPaths.size + crawlQueue.length)) * 100));
      progressFill.style.width = `${progressPercent}%`;

      const targetFetchUrl = baseDomain + currentPath;
      logEl.innerHTML += `<div>${translations[currentLang].log_crawling} ${currentPath}</div>`;
      logEl.scrollTop = logEl.scrollHeight;

      try {
        // Fetch via CORS Proxy
        const res = await fetch(corsProxy + encodeURIComponent(targetFetchUrl));
        if (!res.ok) throw new Error('HTTP error ' + res.status);
        
        const data = await res.json();
        const htmlText = data.contents;
        
        const doc = new DOMParser().parseFromString(htmlText, 'text/html');

        // Extract metadata tags
        const title = doc.querySelector('title')?.innerText || doc.querySelector('meta[property="og:title"]')?.content || '';
        const description = doc.querySelector('meta[name="description"]')?.content || doc.querySelector('meta[property="og:description"]')?.content || '';

        // Extract Images
        const imgElements = doc.querySelectorAll('img');
        const images = Array.from(imgElements).map(img => {
          let src = img.getAttribute('src') || '';
          if (src && !src.startsWith('http') && !src.startsWith('data:')) {
            src = new URL(src, targetFetchUrl).pathname;
          }
          return {
            src: src,
            alt: img.getAttribute('alt') || ''
          };
        }).filter(img => img.src !== '');

        // Extract internal links to traverse
        const aElements = doc.querySelectorAll('a[href]');
        const links = [];
        
        aElements.forEach(a => {
          let href = a.getAttribute('href');
          if (!href) return;

          // Normalize links
          try {
            const absoluteUrl = new URL(href, targetFetchUrl);
            // Check if same origin domain
            if (absoluteUrl.origin === baseDomain) {
              const relPath = absoluteUrl.pathname;
              links.push(relPath);
              
              if (!crawledPaths.has(relPath) && !crawlQueue.includes(relPath)) {
                // Ignore hash jumps or query parameters (keep routes clean)
                const cleanRelPath = relPath.split('#')[0].split('?')[0];
                if (cleanRelPath && !crawledPaths.has(cleanRelPath) && !crawlQueue.includes(cleanRelPath)) {
                  // Skip binary assets
                  if (!/\.(png|jpe?g|gif|webp|svg|pdf|zip|css|js)$/i.test(cleanRelPath)) {
                    crawlQueue.push(cleanRelPath);
                    logEl.innerHTML += `<div style="color:var(--color-text-subtle)">  → ${translations[currentLang].log_found} ${cleanRelPath}</div>`;
                  }
                }
              }
            }
          } catch (e) {
            // Anchor link or invalid format - ignore
          }
        });

        const priority = currentPath === '/' ? '1.0' : defaultPriority;

        pages.push({
          path: currentPath,
          title: title.trim(),
          description: description.trim(),
          priority: parseFloat(priority),
          changefreq: defaultFreq,
          images: images,
          links: links,
          status: 'success',
          issues: []
        });

      } catch (err) {
        errorCount++;
        logEl.innerHTML += `<div style="color:var(--color-danger)">${translations[currentLang].log_error} ${currentPath} (${err.message})</div>`;
      }

      // Add a slight rate-limit delay
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    // Done crawling
    isCrawling = false;
    logEl.innerHTML += `<div style="color:var(--color-success);font-weight:bold;margin-top:8px">${translations[currentLang].log_done} ${pages.length}</div>`;
    logEl.scrollTop = logEl.scrollHeight;

    if (startBtn) startBtn.style.display = 'inline-flex';
    document.getElementById('crawler-status-text').textContent = 'Completed';
    onDataUpdated();
  }

  // Stop current crawling session
  function stopCrawl() {
    if (!isCrawling) return;
    isCrawling = false;
    document.getElementById('crawler-status-text').textContent = 'Stopped';
    const logEl = document.getElementById('crawler-log');
    if (logEl) {
      logEl.innerHTML += `<div style="color:var(--color-warning);font-weight:bold">${translations[currentLang].log_stopped}</div>`;
      logEl.scrollTop = logEl.scrollHeight;
    }
    const startBtn = document.getElementById('btn-start-crawl');
    if (startBtn) startBtn.style.display = 'inline-flex';
    onDataUpdated();
  }

  // --- SEO Audit Engine ---

  function runSeoAudit() {
    if (pages.length === 0) {
      document.getElementById('seo-score-value').textContent = '--';
      const scoreBar = document.getElementById('score-bar');
      scoreBar.style.strokeDashoffset = 351.8; // reset circle
      
      const checklistContainer = document.getElementById('audit-checklist-items');
      checklistContainer.innerHTML = `<li class="checklist-empty" data-i18n="checklist_empty">${translations[currentLang].checklist_empty}</li>`;
      return;
    }

    let totalScore = 100;
    let missingTitles = 0;
    let badTitles = 0;
    let missingDesc = 0;
    let badDesc = 0;
    let missingAlts = 0;
    let brokenLinks = 0;
    let totalImages = 0;

    // Build routes set for relative path check
    const routesSet = new Set(pages.map(p => p.path));

    pages.forEach(page => {
      page.issues = [];
      
      // Title checks
      if (!page.title) {
        missingTitles++;
        page.issues.push('Missing <title> tag');
      } else if (page.title.length < 30 || page.title.length > 60) {
        badTitles++;
        page.issues.push(`Sub-optimal title length (${page.title.length} chars)`);
      }

      // Description checks
      if (!page.description) {
        missingDesc++;
        page.issues.push('Missing meta description');
      } else if (page.description.length < 120 || page.description.length > 160) {
        badDesc++;
        page.issues.push(`Sub-optimal meta description length (${page.description.length} chars)`);
      }

      // Alt text checks
      let hasMissingAlt = false;
      totalImages += page.images.length;
      page.images.forEach(img => {
        if (!img.alt.trim()) {
          missingAlts++;
          hasMissingAlt = true;
        }
      });
      if (hasMissingAlt) {
        page.issues.push('Image missing alt attribute');
      }

      // Relative links integrity checks
      let hasBrokenLink = false;
      page.links.forEach(linkPath => {
        // Find if target route path is present in parsed files
        const cleanLinkPath = linkPath.replace(/\/$/, '') || '/';
        const exists = pages.some(p => {
          const cleanP = p.path.replace(/\/$/, '') || '/';
          return cleanP === cleanLinkPath;
        });

        if (!exists) {
          brokenLinks++;
          hasBrokenLink = true;
        }
      });
      if (hasBrokenLink) {
        page.issues.push('Broken internal link detected');
      }

      // Determine page status
      if (page.issues.some(issue => issue.includes('Missing <title>') || issue.includes('Missing meta description') || issue.includes('Broken internal'))) {
        page.status = 'danger';
      } else if (page.issues.length > 0) {
        page.status = 'warning';
      } else {
        page.status = 'success';
      }
    });

    // Score deduction math
    totalScore -= (missingTitles * 6);
    totalScore -= (badTitles * 2);
    totalScore -= (missingDesc * 6);
    totalScore -= (badDesc * 2);
    totalScore -= (missingAlts * 2);
    totalScore -= (brokenLinks * 8);

    // Keep score bounded
    totalScore = Math.max(10, Math.min(100, totalScore));

    // Update numbers on screen
    document.getElementById('seo-score-value').textContent = totalScore;
    document.getElementById('stat-total-pages').textContent = pages.length;
    document.getElementById('stat-total-images').textContent = totalImages;
    document.getElementById('stat-broken-links').textContent = brokenLinks;

    // Animate Score Ring
    const scoreBar = document.getElementById('score-bar');
    const radius = 56;
    const circumference = 2 * Math.PI * radius; // ~351.85
    const offset = circumference - (totalScore / 100) * circumference;
    scoreBar.style.strokeDashoffset = offset;

    // Apply color depending on score
    if (totalScore >= 90) {
      scoreBar.style.stroke = 'var(--color-success)';
    } else if (totalScore >= 70) {
      scoreBar.style.stroke = 'var(--color-warning)';
    } else {
      scoreBar.style.stroke = 'var(--color-danger)';
    }

    // Build Audit checklist
    const checklist = document.getElementById('audit-checklist-items');
    checklist.innerHTML = '';

    const t = translations[currentLang];

    // Checklist item 1: Titles
    const titleStatus = (missingTitles + badTitles) === 0 ? 'success' : 'warning';
    checklist.appendChild(createChecklistItem(
      titleStatus, 
      titleStatus === 'success' ? t.audit_pass_title : t.audit_warn_title
    ));

    // Checklist item 2: Descriptions
    const descStatus = (missingDesc + badDesc) === 0 ? 'success' : 'warning';
    checklist.appendChild(createChecklistItem(
      descStatus, 
      descStatus === 'success' ? t.audit_pass_desc : t.audit_warn_desc
    ));

    // Checklist item 3: Image alt
    const imgStatus = missingAlts === 0 ? 'success' : 'warning';
    checklist.appendChild(createChecklistItem(
      imgStatus, 
      imgStatus === 'success' ? t.audit_pass_images : t.audit_warn_images + ` (${missingAlts} missing alt)`
    ));

    // Checklist item 4: Broken links
    const linkStatus = brokenLinks === 0 ? 'success' : 'danger';
    checklist.appendChild(createChecklistItem(
      linkStatus, 
      linkStatus === 'success' ? t.audit_pass_links : t.audit_warn_links + ` (${brokenLinks} broken links)`
    ));
  }

  function createChecklistItem(status, text) {
    const li = document.createElement('li');
    li.className = `checklist-item ${status}`;
    
    let svgIcon = '';
    if (status === 'success') {
      svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" width="14" height="14"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
    } else if (status === 'warning') {
      svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" width="14" height="14"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>`;
    } else {
      svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" width="14" height="14"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
    }

    li.innerHTML = `${svgIcon} <span>${text}</span>`;
    return li;
  }

  // --- Review Table & Node Editing ---

  function renderPagesTable() {
    const tbody = document.getElementById('pages-table-body');
    tbody.innerHTML = '';

    if (pages.length === 0) {
      tbody.innerHTML = `<tr>
        <td colspan="7" class="table-empty" data-i18n="table_empty_state">${translations[currentLang].table_empty_state}</td>
      </tr>`;
      return;
    }

    pages.forEach((page, index) => {
      const tr = document.createElement('tr');
      
      // Status pill classes
      let statusClass = 'success';
      if (page.status === 'warning') statusClass = 'warning';
      if (page.status === 'danger') statusClass = 'danger';

      // Images count badge
      const imgCount = page.images ? page.images.length : 0;

      // Render Row
      tr.innerHTML = `
        <td>
          <div class="editable-cell text-route" data-index="${index}" data-field="path">${escapeHTML(page.path)}</div>
        </td>
        <td>
          <div class="editable-cell text-title" data-index="${index}" data-field="title">${escapeHTML(page.title) || '<span style="color:var(--color-text-subtle);font-style:italic">Empty</span>'}</div>
        </td>
        <td>${imgCount}</td>
        <td>
          <select class="select-inline select-priority" data-index="${index}">
            <option value="1.0" ${page.priority === 1.0 ? 'selected' : ''}>1.0</option>
            <option value="0.8" ${page.priority === 0.8 ? 'selected' : ''}>0.8</option>
            <option value="0.5" ${page.priority === 0.5 ? 'selected' : ''}>0.5</option>
            <option value="0.3" ${page.priority === 0.3 ? 'selected' : ''}>0.3</option>
          </select>
        </td>
        <td>
          <select class="select-inline select-freq" data-index="${index}">
            <option value="always" ${page.changefreq === 'always' ? 'selected' : ''}>always</option>
            <option value="hourly" ${page.changefreq === 'hourly' ? 'selected' : ''}>hourly</option>
            <option value="daily" ${page.changefreq === 'daily' ? 'selected' : ''}>daily</option>
            <option value="weekly" ${page.changefreq === 'weekly' ? 'selected' : ''}>weekly</option>
            <option value="monthly" ${page.changefreq === 'monthly' ? 'selected' : ''}>monthly</option>
            <option value="yearly" ${page.changefreq === 'yearly' ? 'selected' : ''}>yearly</option>
            <option value="never" ${page.changefreq === 'never' ? 'selected' : ''}>never</option>
          </select>
        </td>
        <td>
          <span class="status-pill ${statusClass}" title="${page.issues.join(', ')}">${statusClass}</span>
        </td>
        <td>
          <button class="btn-icon btn-delete-row" data-index="${index}">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="14" height="14"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Attach inline listeners
    tbody.querySelectorAll('.editable-cell').forEach(cell => {
      cell.addEventListener('dblclick', function () {
        const idx = this.getAttribute('data-index');
        const field = this.getAttribute('data-field');
        const originalVal = pages[idx][field];
        
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'cell-input';
        input.value = originalVal;
        
        const saveEdit = () => {
          const newVal = input.value.trim();
          if (newVal !== originalVal) {
            pages[idx][field] = newVal;
            onDataUpdated();
          } else {
            this.textContent = originalVal || 'Empty';
          }
        };

        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') saveEdit();
          if (e.key === 'Escape') {
            input.removeEventListener('focusout', saveEdit);
            this.textContent = originalVal || 'Empty';
          }
        });

        input.addEventListener('focusout', saveEdit);
        this.innerHTML = '';
        this.appendChild(input);
        input.focus();
      });
    });

    // Dropdowns
    tbody.querySelectorAll('.select-priority').forEach(sel => {
      sel.addEventListener('change', function () {
        const idx = this.getAttribute('data-index');
        pages[idx].priority = parseFloat(this.value);
        onDataUpdated();
      });
    });

    tbody.querySelectorAll('.select-freq').forEach(sel => {
      sel.addEventListener('change', function () {
        const idx = this.getAttribute('data-index');
        pages[idx].changefreq = this.value;
        onDataUpdated();
      });
    });

    // Delete
    tbody.querySelectorAll('.btn-delete-row').forEach(btn => {
      btn.addEventListener('click', function () {
        const idx = this.getAttribute('data-index');
        pages.splice(idx, 1);
        onDataUpdated();
      });
    });
  }

  // --- XML & File Generation ---

  function updateFileConsole() {
    const codeEl = document.getElementById('code-output-element');
    const dlBtn = document.getElementById('btn-download-file');
    const dlBtnText = document.getElementById('download-btn-text');

    const baseUrl = document.getElementById('config-base-url').value.replace(/\/$/, '');
    const includeImages = document.getElementById('cfg-include-images').checked;
    const includeLastmod = document.getElementById('cfg-include-lastmod').checked;

    const dateStr = new Date().toISOString().split('T')[0];

    if (pages.length === 0) {
      codeEl.textContent = '<!-- ' + (currentLang === 'en' ? 'Sitemaps XML will load here' : 'El sitemap XML se cargará acá') + ' -->';
      return;
    }

    if (currentFormat === 'xml') {
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';
      if (includeImages) {
        xml += '\n        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"';
      }
      xml += '>\n';

      pages.forEach(page => {
        const fullUrl = baseUrl + page.path;
        xml += `  <url>\n`;
        xml += `    <loc>${escapeHTML(fullUrl)}</loc>\n`;
        if (includeLastmod) {
          xml += `    <lastmod>${dateStr}</lastmod>\n`;
        }
        xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
        xml += `    <priority>${page.priority.toFixed(1)}</priority>\n`;
        
        if (includeImages && page.images && page.images.length > 0) {
          page.images.forEach(img => {
            let imgLoc = img.src;
            if (!imgLoc.startsWith('http')) {
              imgLoc = baseUrl + imgLoc;
            }
            xml += `    <image:image>\n`;
            xml += `      <image:loc>${escapeHTML(imgLoc)}</image:loc>\n`;
            if (img.alt) {
              xml += `      <image:title>${escapeHTML(img.alt)}</image:title>\n`;
            }
            xml += `    </image:image>\n`;
          });
        }
        
        xml += `  </url>\n`;
      });

      xml += '</urlset>';
      codeEl.textContent = xml;
      dlBtnText.textContent = currentLang === 'en' ? 'Download sitemap.xml' : 'Descargar sitemap.xml';

    } else if (currentFormat === 'txt') {
      let txt = '';
      pages.forEach(page => {
        txt += baseUrl + page.path + '\n';
      });
      codeEl.textContent = txt;
      dlBtnText.textContent = currentLang === 'en' ? 'Download sitemap.txt' : 'Descargar sitemap.txt';

    } else if (currentFormat === 'json') {
      const exportJson = pages.map(page => {
        return {
          loc: baseUrl + page.path,
          changefreq: page.changefreq,
          priority: page.priority,
          title: page.title,
          images: page.images.map(img => {
            return {
              loc: img.src.startsWith('http') ? img.src : baseUrl + img.src,
              title: img.alt
            };
          })
        };
      });
      codeEl.textContent = JSON.stringify(exportJson, null, 2);
      dlBtnText.textContent = currentLang === 'en' ? 'Download sitemap.json' : 'Descargar sitemap.json';

    } else if (currentFormat === 'robots') {
      let robots = `# https://www.robotstxt.org/db.html\n\n`;
      robots += `User-agent: *\n`;
      robots += `Allow: /\n\n`;
      robots += `# Sitemap Link\n`;
      robots += `Sitemap: ${baseUrl}/sitemap.xml\n`;
      codeEl.textContent = robots;
      dlBtnText.textContent = currentLang === 'en' ? 'Download robots.txt' : 'Descargar robots.txt';
    }
  }

  function downloadGeneratedFile() {
    if (pages.length === 0) return;
    const content = document.getElementById('code-output-element').textContent;
    let filename = 'sitemap.xml';
    let mimeType = 'application/xml';

    if (currentFormat === 'txt') {
      filename = 'sitemap.txt';
      mimeType = 'text/plain';
    } else if (currentFormat === 'json') {
      filename = 'sitemap.json';
      mimeType = 'application/json';
    } else if (currentFormat === 'robots') {
      filename = 'robots.txt';
      mimeType = 'text/plain';
    }

    const blob = new Blob([content], { type: mimeType + ';charset=utf-8;' });
    const link = document.createElement('a');
    
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', filename);
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  function onDataUpdated() {
    runSeoAudit();
    renderPagesTable();
    updateFileConsole();
  }

  // --- DOM Event Listeners & Bootstrapping ---

  function initListeners() {
    
    // Tab switching: Source Picker
    const sourceTabs = document.querySelectorAll('.source-tab');
    sourceTabs.forEach(tab => {
      tab.addEventListener('click', function () {
        sourceTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        const target = this.getAttribute('data-tab');
        document.querySelectorAll('.tab-content').forEach(content => {
          content.classList.remove('active');
        });
        document.getElementById(`content-${target}`).classList.add('active');
        
        // Stop crawls if switching tabs
        if (target !== 'crawler' && isCrawling) {
          stopCrawl();
        }
      });
    });

    // Tab switching: Code Output Formats
    const formatTabs = document.querySelectorAll('.format-tab');
    formatTabs.forEach(tab => {
      tab.addEventListener('click', function () {
        formatTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        currentFormat = this.getAttribute('data-format');
        updateFileConsole();
      });
    });

    // Theme Switcher
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
      });
    }

    // Language Toggle
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        applyTranslations(currentLang === 'en' ? 'es' : 'en');
      });
    }

    // Config parameters modification auto-trigger
    const inputsToWatch = [
      'config-base-url',
      'cfg-include-images',
      'cfg-include-lastmod',
      'config-default-freq',
      'config-default-priority'
    ];
    inputsToWatch.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => updateFileConsole());
        el.addEventListener('change', () => updateFileConsole());
      }
    });

    // File Input selection trigger
    const fileInput = document.getElementById('dir-upload-input');
    if (fileInput) {
      fileInput.addEventListener('change', function (e) {
        if (this.files.length > 0) {
          processLocalFiles(Array.from(this.files));
        }
      });
    }

    // Drag & Drop event bindings
    const dropZone = document.getElementById('drop-zone');
    if (dropZone) {
      dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
      });

      dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
      });

      dropZone.addEventListener('drop', async (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        
        const items = e.dataTransfer.items;
        if (!items) return;
        const filesList = [];
        
        const traverseDirectory = async (entry, path = '') => {
          if (entry.isFile) {
            const file = await new Promise(resolve => entry.file(resolve));
            file.customRelativePath = path + entry.name;
            filesList.push(file);
          } else if (entry.isDirectory) {
            const dirReader = entry.createReader();
            const entries = await new Promise(resolve => {
              dirReader.readEntries(resolve);
            });
            for (const childEntry of entries) {
              await traverseDirectory(childEntry, path + entry.name + '/');
            }
          }
        };

        const traversePromises = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (item.kind === 'file') {
            const entry = item.webkitGetAsEntry();
            if (entry) {
              traversePromises.push(traverseDirectory(entry));
            }
          }
        }
        await Promise.all(traversePromises);
        
        if (filesList.length > 0) {
          processLocalFiles(filesList);
        }
      });
    }

    // Live crawling actions
    const crawlBtn = document.getElementById('btn-start-crawl');
    if (crawlBtn) {
      crawlBtn.addEventListener('click', () => {
        const urlVal = document.getElementById('crawl-url-input').value.trim();
        if (urlVal) {
          startCrawl(urlVal);
        } else {
          alert(translations[currentLang].placeholder_invalid_url);
        }
      });
    }

    const stopCrawlBtn = document.getElementById('btn-stop-crawl');
    if (stopCrawlBtn) {
      stopCrawlBtn.addEventListener('click', stopCrawl);
    }

    // Manual add action
    const addManualBtn = document.getElementById('btn-add-manual');
    if (addManualBtn) {
      addManualBtn.addEventListener('click', () => {
        const textarea = document.getElementById('manual-urls-input');
        const rawUrls = textarea.value.split('\n');
        
        const defaultFreq = document.getElementById('config-default-freq').value;
        const defaultPriority = parseFloat(document.getElementById('config-default-priority').value);
        
        let addedCount = 0;
        rawUrls.forEach(url => {
          let clean = url.trim();
          if (!clean) return;
          if (!clean.startsWith('/')) clean = '/' + clean;
          
          if (!crawledPaths.has(clean)) {
            crawledPaths.add(clean);
            pages.push({
              path: clean,
              title: '',
              description: '',
              priority: clean === '/' ? 1.0 : defaultPriority,
              changefreq: defaultFreq,
              images: [],
              links: [],
              status: 'success',
              issues: []
            });
            addedCount++;
          }
        });

        if (addedCount > 0) {
          textarea.value = '';
          onDataUpdated();
        }
      });
    }

    // Clear All Pages Action
    const clearBtn = document.getElementById('btn-clear-pages');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (pages.length === 0) return;
        if (confirm(translations[currentLang].confirm_clear)) {
          pages = [];
          crawledPaths.clear();
          onDataUpdated();
        }
      });
    }

    // Copy Code Action
    const copyBtn = document.getElementById('btn-copy-code');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const content = document.getElementById('code-output-element').textContent;
        navigator.clipboard.writeText(content).then(() => {
          const originalText = copyBtn.textContent;
          copyBtn.textContent = translations[currentLang].notify_copied;
          setTimeout(() => {
            copyBtn.textContent = originalText;
          }, 1500);
        });
      });
    }

    // Download File Action
    const dlBtn = document.getElementById('btn-download-file');
    if (dlBtn) {
      dlBtn.addEventListener('click', downloadGeneratedFile);
    }

    // Modal Control listeners
    const modal = document.getElementById('add-page-modal');
    const openModalBtn = document.getElementById('btn-add-page-modal');
    const closeModalBtn = document.getElementById('modal-close-btn');
    const modalOverlay = document.getElementById('modal-overlay');

    if (openModalBtn && modal) {
      openModalBtn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }

    const hideModal = () => {
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    };

    if (closeModalBtn) closeModalBtn.addEventListener('click', hideModal);
    if (modalOverlay) modalOverlay.addEventListener('click', hideModal);

    // Save Manually Form Submission
    const addPageForm = document.getElementById('add-page-form');
    if (addPageForm) {
      addPageForm.addEventListener('submit', function (e) {
        e.preventDefault();
        let path = document.getElementById('form-path').value.trim();
        const title = document.getElementById('form-title').value.trim();
        const priority = parseFloat(document.getElementById('form-priority').value);
        const freq = document.getElementById('form-freq').value;

        if (!path.startsWith('/')) {
          path = '/' + path;
        }

        if (crawledPaths.has(path)) {
          // Remove existing first to replace
          pages = pages.filter(p => p.path !== path);
        } else {
          crawledPaths.add(path);
        }

        pages.push({
          path: path,
          title: title,
          description: '',
          priority: priority,
          changefreq: freq,
          images: [],
          links: [],
          status: 'success',
          issues: []
        });

        // Clear and close
        addPageForm.reset();
        hideModal();
        onDataUpdated();
      });
    }
  }

  // --- XML / HTML Escaping ---
  function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  // --- Bootloader ---
  function init() {
    applyTheme(currentTheme);
    applyTranslations(currentLang);
    initSpotlights();
    initListeners();
    onDataUpdated();
  }

  window.addEventListener('DOMContentLoaded', init);

})();
