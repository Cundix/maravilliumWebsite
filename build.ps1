$distDir = ".\dist"
$blogDir = "$distDir\blog"

if (Test-Path $distDir) {
    Remove-Item -Recurse -Force $distDir
}
New-Item -ItemType Directory -Force -Path $distDir | Out-Null
New-Item -ItemType Directory -Force -Path $blogDir | Out-Null
New-Item -ItemType Directory -Force -Path "$distDir\css" | Out-Null

Copy-Item -Path ".\src\styles.css" -Destination "$distDir\css\styles.css"

function Render-Layout {
    param (
        [string]$title,
        [string]$content,
        [string]$metaDesc
    )
    return @"
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>$title | Maravillium - Agencia de Marketing</title>
  <meta name="description" content="$metaDesc">
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

  $content

  <footer>
    <h2>¿Listo para aumentar tus ventas?</h2>
    <p>Únete a la lista de clientes exitosos.</p>
    <br>
    <a href="/contacto.html" class="btn-primary">Hablemos</a>
  </footer>
</body>
</html>
"@
}

$pages = @(
    @{
        path = "index.html"
        title = "La Agencia Para Aumentar Tus Ventas"
        metaDesc = "Maravillium es tu agencia de marketing enfocada en mejorar tus ventas y conseguir clientes. Diseño web, redes sociales, ads."
        content = @"
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
"@
    },
    @{
        path = "servicios.html"
        title = "Nuestros Servicios"
        metaDesc = "Conoce nuestros servicios de creación de páginas web, gestión de redes sociales, publicidad, relaciones públicas y filmación."
        content = @"
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
"@
    },
    @{
        path = "nosotros.html"
        title = "Sobre Nosotros"
        metaDesc = "Conoce a Maravillium, la agencia de marketing enfocada 100% en aumentar los resultados y ventas de sus clientes."
        content = @"
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
"@
    },
    @{
        path = "contacto.html"
        title = "Contacto"
        metaDesc = "Contacta a Maravillium para empezar a trabajar juntos y llevar tus ventas al siguiente nivel."
        content = @"
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
"@
    }
)

foreach ($p in $pages) {
    $html = Render-Layout -title $p.title -content $p.content -metaDesc $p.metaDesc
    Set-Content -Path "$distDir\$($p.path)" -Value $html -Encoding UTF8
}

# Generate 500 Long Tail Keywords
$prefixes = @(
    "Cómo conseguir más clientes con", "Estrategias comprobadas de", "Por qué no funciona tu", 
    "Guía paso a paso de", "Cuánto cuesta realmente hacer", "El secreto mejor guardado de",
    "Cómo evitar perder dinero en", "La forma más rápida de escalar con"
)
$services = @(
    "publicidad en Instagram y Facebook", "marketing digital orientado a ventas", 
    "un rediseño de página web", "posicionamiento SEO local en Google", 
    "gestión profesional de redes sociales", "publicidad B2B en LinkedIn",
    "creación de embudos de venta", "email marketing automatizado"
)
$niches = @(
    "para clínicas dentales", "para despachos de abogados", "para empresas de construcción", 
    "para tiendas de e-commerce", "para negocios locales B2B", "para psicólogos",
    "para empresas de logística", "para academias online", "para concesionarios de coches",
    "para gimnasios y centros fitness"
)
$benefits = @(
    "sin gastar una fortuna", "para multiplicar tus ingresos este año", 
    "y superar a tu competencia", "explicado desde cero y de forma sencilla",
    "con resultados visibles en 30 días", "sin necesidad de contratar más empleados",
    "para dominar tu mercado local", "generando prospectos calificados a diario"
)

$allCombinations = @()

foreach ($p in $prefixes) {
    foreach ($s in $services) {
        foreach ($n in $niches) {
            foreach ($b in $benefits) {
                $title = "$p $s $n $b"
                $slug = $title.ToLower() -replace '[^a-z0-9]+', '-' -replace '^-|-$', ''
                $allCombinations += @{
                    niche = $n
                    slug = $slug
                    title = $title
                    metaDesc = "Descubre $p $s $n. Lee nuestra guía detallada enfocada en mejorar tus ventas sin tecnicismos."
                    content = @"
        <div class="blog-post">
          <h1>$title</h1>
          <p>Si alguna vez te has preguntado <strong>$p $s $n</strong>, estás en el lugar correcto. En Maravillium, sabemos que tu objetivo final no es tener 'likes', sino ventas reales y medibles.</p>
          
          <h2>El problema de la mayoría de las estrategias</h2>
          <p>Muchos negocios invierten tiempo y dinero en tácticas que no están diseñadas para su industria específica. Cuando hablamos de soluciones $n, el enfoque debe estar 100% en entender los dolores del cliente final.</p>

          <h2>Nuestra metodología probada</h2>
          <p>Aplicar $s requiere de experiencia y optimización constante. Nuestro equipo se encarga de estructurar campañas, diseñar páginas de aterrizaje y crear embudos de venta que funcionan, especialmente con el objetivo de lograr resultados $b.</p>
          
          <h2>¿Por qué elegir Maravillium?</h2>
          <p>No usamos palabras raras ni métricas vanidosas. Hablamos de Retorno de Inversión (ROI) y crecimiento. Si buscas implementar estas estrategias de forma eficiente y <strong>$b</strong>, somos tu mejor opción.</p>

          <div class="cta-box">
            <h3>¿Listo para aumentar tus ventas de verdad?</h3>
            <p>Deja de experimentar con tu presupuesto. Déjanos diseñar la estrategia perfecta para tu negocio $n.</p>
            <a href="/contacto.html" class="btn-primary">Hablemos hoy mismo</a>
          </div>
        </div>
"@
                }
            }
        }
    }
}

# Shuffle array and take 500
$blogPosts = $allCombinations | Sort-Object {Get-Random} | Select-Object -First 500

foreach ($post in $blogPosts) {
    $html = Render-Layout -title $post.title -content $post.content -metaDesc $post.metaDesc
    Set-Content -Path "$blogDir\$($post.slug).html" -Value $html -Encoding UTF8
}

# Group for Index
$groupedPosts = $blogPosts | Group-Object -Property niche | Sort-Object Name

$blogIndexContent = @"
  <section class="hero" style="padding: 4rem 2rem 2rem;">
    <h1>Nuestro <span>Blog</span></h1>
    <p class="hero-subtitle">Guías detalladas para aprender a captar más clientes en tu industria.</p>
  </section>
  <section class="section" style="padding-top:0;">
    <div class="blog-list">
"@

foreach ($group in $groupedPosts) {
    $nicheTitle = $group.Name
    $blogIndexContent += @"
      <h2 style="margin-top: 3rem; margin-bottom: 1rem; border-bottom: 2px solid var(--text-dark); padding-bottom: 0.5rem;">Estrategias $nicheTitle</h2>
"@
    foreach ($p in $group.Group) {
        $blogIndexContent += @"
        <div class="blog-item">
          <h3><a href="/blog/$($p.slug).html">$($p.title)</a></h3>
          <p>$($p.metaDesc)</p>
        </div>
"@
    }
}

$blogIndexContent += @"
    </div>
  </section>
"@

$blogIndexHtml = Render-Layout -title 'Blog de Marketing y Ventas' -content $blogIndexContent -metaDesc 'Artículos en profundidad sobre cómo aumentar las ventas en distintas industrias usando diseño web y publicidad.'
Set-Content -Path "$blogDir\index.html" -Value $blogIndexHtml -Encoding UTF8

Write-Output "Site generated successfully in /dist with $($blogPosts.Count) long-tail SEO blog posts."
