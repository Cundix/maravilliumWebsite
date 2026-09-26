const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const blogDir = path.join(distDir, 'blog');

// Cleanup and setup
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir);
fs.mkdirSync(blogDir);
fs.mkdirSync(path.join(distDir, 'css'));

// Copy CSS
fs.copyFileSync(
  path.join(__dirname, 'styles.css'),
  path.join(distDir, 'css', 'styles.css')
);

// Layout Template
function renderLayout(title, content, metaDesc) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | Maravillium - Agencia de Marketing</title>
  <meta name="description" content="${metaDesc}">
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <nav class="navbar">
    <a href="/" class="nav-brand">maravillium.</a>
    <div class="nav-links">
      <a href="/nosotros.html">Nosotros</a>
      <a href="/servicios.html">Servicios</a>
      <a href="/blog/index.html">Blog</a>
      <a href="/contacto.html">Contacto</a>
    </div>
    <a href="/contacto.html" class="nav-cta">Trabaja con nosotros</a>
  </nav>

  ${content}

  <footer>
    <h2>¿Listo para aumentar tus ventas?</h2>
    <p>Únete a la lista de clientes exitosos.</p>
    <br>
    <a href="/contacto.html" class="btn-primary">Hablemos</a>
  </footer>
</body>
</html>`;
}

// Pages
const pages = [
  {
    path: 'index.html',
    title: 'La Agencia Para Aumentar Tus Ventas',
    metaDesc: 'Maravillium es tu agencia de marketing enfocada en mejorar tus ventas y conseguir clientes. Diseño web, redes sociales, ads.',
    content: `
      <section class="hero">
        <p class="hero-subtitle">Donde el marketing se hace simple y tus ventas crecen</p>
        <h1>la agencia de <span>marketing</span> para tu negocio</h1>
        <p class="hero-subtitle" style="margin-top: 2rem;">Ayudamos a dueños de negocio a simplificar su estrategia, aumentar sus ventas y destacarse en internet.</p>
        <a href="/contacto.html" class="btn-primary">Agenda una Llamada</a>
      </section>

      <div class="marquee-container">
        <div class="marquee-content">
          AUMENTANDO VENTAS | CRECIMIENTO DIGITAL | DISEÑO WEB | REDES SOCIALES | AUMENTANDO VENTAS | CRECIMIENTO DIGITAL | DISEÑO WEB | REDES SOCIALES | AUMENTANDO VENTAS
        </div>
      </div>

      <section class="section">
        <h2 class="section-title">Lo que hacemos para ti</h2>
        <div class="grid">
          <div class="card card-pink">
            <h3>Páginas Web</h3>
            <p>Creamos sitios web rápidos, atractivos y diseñados específicamente para convertir visitantes en clientes.</p>
          </div>
          <div class="card card-green">
            <h3>Redes Sociales</h3>
            <p>Manejamos tus redes sociales para construir una comunidad fiel y atraer la atención correcta hacia tu marca.</p>
          </div>
          <div class="card">
            <h3>Publicidad (Ads)</h3>
            <p>Campañas de anuncios rentables en Google y Meta para que obtengas un retorno directo de tu inversión.</p>
          </div>
        </div>
      </section>
    `
  },
  {
    path: 'servicios.html',
    title: 'Nuestros Servicios',
    metaDesc: 'Conoce nuestros servicios de creación de páginas web, gestión de redes sociales, publicidad, relaciones públicas y filmación.',
    content: `
      <section class="hero" style="padding: 4rem 2rem;">
        <h1>Nuestros <span>Servicios</span></h1>
        <p class="hero-subtitle">Todo lo que necesitas para escalar tus ventas en un solo lugar.</p>
      </section>
      <section class="section" style="padding-top:0;">
        <div class="grid">
          <div class="card">
            <h3>Creación de Sitios Web</h3>
            <p>Desarrollamos páginas web a medida que no solo se ven increíbles, sino que están optimizadas para buscadores (SEO) y para generar contactos y ventas.</p>
          </div>
          <div class="card">
            <h3>Gestión de Redes Sociales</h3>
            <p>Estrategias de contenido, publicación constante y manejo de tu comunidad en Instagram, TikTok, Facebook y LinkedIn.</p>
          </div>
          <div class="card">
            <h3>Campañas de Publicidad (Ads)</h3>
            <p>Gestión de presupuestos publicitarios. Optimizamos cada centavo para traerte clientes potenciales reales.</p>
          </div>
          <div class="card card-pink">
            <h3>Relaciones Públicas</h3>
            <p>Conectamos tu marca con medios y personas clave para aumentar tu reputación y autoridad en tu industria.</p>
          </div>
          <div class="card card-green">
            <h3>Producción y Filmación</h3>
            <p>Videos corporativos, comerciales y contenido corto (Reels/TikToks) de alta calidad para captar la atención de tu audiencia.</p>
          </div>
          <div class="card">
            <h3>Proyectos a Medida</h3>
            <p>¿Necesitas una solución tecnológica específica? Nuestro equipo de desarrollo puede crear herramientas exclusivas para ti.</p>
          </div>
        </div>
      </section>
    `
  },
  {
    path: 'nosotros.html',
    title: 'Sobre Nosotros',
    metaDesc: 'Conoce a Maravillium, la agencia de marketing enfocada 100% en aumentar los resultados y ventas de sus clientes.',
    content: `
      <section class="hero" style="padding: 4rem 2rem;">
        <h1>Sobre <span>Nosotros</span></h1>
        <p class="hero-subtitle">Somos una agencia que habla claro y busca resultados.</p>
      </section>
      <section class="section" style="padding-top:0; max-width:800px; margin: 0 auto;">
        <div class="blog-post">
          <h2>Nuestra Misión</h2>
          <p>En Maravillium, entendemos que el marketing sin ventas no sirve. Nos alejamos de las palabras complicadas y nos enfocamos en lo que importa: hacer que tu negocio crezca.</p>
          <h2>¿Por qué elegirnos?</h2>
          <p>Porque somos tu aliado estratégico. No somos solo proveedores; somos un equipo dedicado a entender tu mercado y aplicar estrategias efectivas de diseño web, publicidad y redes sociales.</p>
        </div>
      </section>
    `
  },
  {
    path: 'contacto.html',
    title: 'Contacto',
    metaDesc: 'Contacta a Maravillium para empezar a trabajar juntos y llevar tus ventas al siguiente nivel.',
    content: `
      <section class="hero" style="padding: 4rem 2rem;">
        <h1>Hablemos de <span>Ventas</span></h1>
        <p class="hero-subtitle">Déjanos tus datos y nos pondremos en contacto contigo lo antes posible.</p>
      </section>
      <section class="section" style="padding-top:0; max-width:600px; margin: 0 auto;">
        <div class="card">
          <form style="display:flex; flex-direction:column; gap:1rem;">
            <input type="text" placeholder="Tu Nombre" style="padding:1rem; border:2px solid var(--text-dark); border-radius:8px;" required>
            <input type="email" placeholder="Tu Email" style="padding:1rem; border:2px solid var(--text-dark); border-radius:8px;" required>
            <textarea placeholder="Cuéntanos sobre tu negocio y cómo podemos ayudarte a vender más" rows="5" style="padding:1rem; border:2px solid var(--text-dark); border-radius:8px; font-family:inherit;" required></textarea>
            <button type="submit" class="btn-primary" style="border:none; cursor:pointer;">Enviar Mensaje</button>
          </form>
        </div>
      </section>
    `
  }
];

// Generate Main Pages
pages.forEach(p => {
  const html = renderLayout(p.title, p.content, p.metaDesc);
  fs.writeFileSync(path.join(distDir, p.path), html);
});

// Blog Generation (100 posts)
const topics = [
  "Cómo aumentar tus ventas", "Estrategias de marketing para", "Por qué necesitas una página web para",
  "Secretos de redes sociales para", "Errores comunes en publicidad de", "Guía de SEO local para",
  "El impacto del diseño web en", "Cómo conseguir más clientes en"
];
const niches = [
  "restaurantes", "clínicas dentales", "abogados", "tiendas online", "gimnasios",
  "inmobiliarias", "agencias de viajes", "salones de belleza", "talleres mecánicos", "hoteles",
  "colegios", "empresas de limpieza", "arquitectos"
];

let blogPosts = [];
let count = 1;

for (let t of topics) {
  for (let n of niches) {
    if (count > 100) break;
    let title = \`\${t} \${n}\`;
    let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    blogPosts.push({
      slug,
      title,
      metaDesc: \`Descubre \${title.toLowerCase()} y cómo mejorar los resultados de tu negocio con Maravillium.\`,
      content: \`
        <div class="blog-post">
          <h1>\${title}</h1>
          <p>Si eres dueño de un negocio en el sector de \${n}, sabes lo importante que es mantener un flujo constante de nuevos clientes. En Maravillium, como agencia de marketing experta, queremos compartir contigo las mejores tácticas sobre \${title.toLowerCase()}.</p>
          
          <h2>1. Conoce a tu cliente ideal</h2>
          <p>Antes de lanzar cualquier campaña de publicidad o diseñar tu página web, necesitas saber a quién le hablas. El principal error que cometen muchos negocios es intentar venderle a todo el mundo.</p>

          <h2>2. Tu página web es tu mejor vendedor</h2>
          <p>Tener un sitio web no es un lujo, es una necesidad. Una página rápida, fácil de usar y diseñada para captar datos puede aumentar tus ventas drásticamente, trabajando para ti las 24 horas del día.</p>
          
          <h2>3. Usa las redes sociales estratégicamente</h2>
          <p>No se trata de publicar todos los días, sino de publicar contenido que resuelva los problemas de tu audiencia y los invite a contactarte.</p>

          <h2>4. Invierte en publicidad inteligente</h2>
          <p>Plataformas como Google Ads y Facebook Ads te permiten llegar exactamente a las personas que buscan tus servicios en tu ciudad.</p>

          <p><strong>¿Quieres implementar esto sin dolores de cabeza?</strong> En Maravillium nos encargamos de todo esto por ti. <a href="/contacto.html" style="color:var(--pink); font-weight:bold;">Contáctanos hoy mismo</a> y veamos cómo podemos escalar tus ventas.</p>
        </div>
      \`
    });
    count++;
  }
}

// Generate Blog Pages
blogPosts.forEach(post => {
  const html = renderLayout(post.title, post.content, post.metaDesc);
  fs.writeFileSync(path.join(blogDir, \`\${post.slug}.html\`), html);
});

// Generate Blog Index
const blogIndexContent = \`
  <section class="hero" style="padding: 4rem 2rem 2rem;">
    <h1>Nuestro <span>Blog</span></h1>
    <p class="hero-subtitle">Consejos, estrategias y guías para hacer crecer tu negocio y aumentar tus ventas.</p>
  </section>
  <section class="section" style="padding-top:0;">
    <div class="blog-list">
      \${blogPosts.map(p => \`
        <div class="blog-item">
          <h3><a href="/blog/\${p.slug}.html">\${p.title}</a></h3>
          <p>\${p.metaDesc}</p>
        </div>
      \`).join('')}
    </div>
  </section>
\`;

const blogIndexHtml = renderLayout('Blog de Marketing y Ventas', blogIndexContent, 'Lee nuestro blog con 100 artículos sobre cómo hacer crecer tu negocio y conseguir más clientes.');
fs.writeFileSync(path.join(blogDir, 'index.html'), blogIndexHtml);

console.log('Site generated successfully in /dist with ' + blogPosts.length + ' blog posts.');
