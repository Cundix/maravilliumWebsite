$distDir = ".\dist"
$blogDir = "$distDir\blog"

if (Test-Path $distDir) {
    Remove-Item -Recurse -Force $distDir
}
New-Item -ItemType Directory -Force -Path $distDir | Out-Null
New-Item -ItemType Directory -Force -Path $blogDir | Out-Null
New-Item -ItemType Directory -Force -Path "$distDir\css" | Out-Null

Copy-Item -Path ".\src\styles.css" -Destination "$distDir\css\styles.css"

$waLink = "https://wa.me/5491122334455?text=Hola,%20estoy%20listo%20para%20aumentar%20mis%20ventas"

function Save-Utf8 {
    param ([string]$path, [string]$content)
    # Using .NET class to enforce UTF-8 without BOM issues in PowerShell 5
    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($path, $content, $utf8NoBom)
}

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
  <title>$title | Maravillium - Agencia de Ventas</title>
  <meta name="description" content="$metaDesc">
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <nav class="navbar">
    <a href="/" class="nav-brand">maravillium.</a>
    <div class="nav-links">
      <a href="/nosotros.html">Nosotros</a>
      <a href="/servicios.html">Servicios</a>
      <a href="/blog/index.html">Blog SEO</a>
    </div>
    <a href="$waLink" class="nav-cta" target="_blank">📲 Escríbenos</a>
  </nav>

  $content

  <footer>
    <h2 style="font-size: 3rem; margin-bottom: 2rem; font-family: 'Fraunces', serif;">¿Listo para escalar tus ventas de verdad?</h2>
    <a href="$waLink" class="btn-primary btn-large" target="_blank">HABLA CON UN EXPERTO HOY</a>
  </footer>

  <a href="$waLink" class="floating-wa" target="_blank">
    💬 Chatea
  </a>
</body>
</html>
"@
}

$pages = @(
    @{
        path = "index.html"
        title = "La Agencia Para Multiplicar Tus Ventas"
        metaDesc = "Maravillium es tu agencia de marketing enfocada 100% en ventas y retorno de inversión."
        content = @"
      <section class="hero" style="background-color: var(--coral);">
        <div class="hero-content">
          <p class="badge">Agencia de Crecimiento</p>
          <h1>Encuentra el camino hacia tus <span>Ventas Soñadas</span></h1>
          <p class="hero-subtitle">Ayudamos a dueños de negocio a dominar su mercado con embudos de venta comprobados y publicidad hiper-rentable. Basta de 'likes', aquí hablamos de ingresos.</p>
          <div class="hero-buttons">
            <a href="$waLink" class="btn-primary btn-large" target="_blank">Agendar Llamada</a>
            <a href="/servicios.html" class="btn-secondary btn-large">Ver Servicios</a>
          </div>
        </div>
      </section>

      <div class="marquee-container">
        <div class="marquee-content">
          MÁS CLIENTES ✦ MÁS VENTAS ✦ MAYOR RENTABILIDAD ✦ ESCALABILIDAD TOTAL ✦ MÁS CLIENTES ✦ MÁS VENTAS ✦ MAYOR RENTABILIDAD ✦ ESCALABILIDAD TOTAL
        </div>
      </div>

      <section class="section" style="background-color: var(--cream);">
        <h2 class="section-title">El Sistema Maravillium</h2>
        <div class="grid">
          <div class="card card-blue">
            <div class="card-icon">💸</div>
            <h3>Embudos que Convierten</h3>
            <p>Diseñamos páginas de aterrizaje (Landing Pages) ultra rápidas, persuasivas y optimizadas únicamente para generar clientes calificados. Convertimos visitantes curiosos en compradores obsesionados.</p>
          </div>
          <div class="card card-coral">
            <div class="card-icon">🎯</div>
            <h3>Publicidad Rentable</h3>
            <p>Invertimos tu presupuesto en Google Ads y Meta Ads como si fuera nuestro. Cada campaña está diseñada para darte Retorno de Inversión (ROI) positivo desde la primera semana.</p>
          </div>
          <div class="card card-white">
            <div class="card-icon">🔍</div>
            <h3>Dominio Local (SEO)</h3>
            <p>Dominamos los motores de búsqueda para que cuando tu cliente ideal busque tu servicio, tu negocio sea la única opción obvia en tu ciudad. Tráfico orgánico, gratis y recurrente.</p>
          </div>
          <div class="card card-blue">
            <div class="card-icon">📱</div>
            <h3>Contenido Magnético</h3>
            <p>Dejamos de lado los posts aburridos y corporativos. Creamos contenido viral para TikTok e Instagram Reels que capta la atención y genera confianza masiva en tu marca.</p>
          </div>
        </div>
      </section>

      <section class="section" style="background-color: var(--blue-bg);">
        <h2 class="section-title">¿Por qué pierdes ventas actualmente?</h2>
        <div class="grid" style="grid-template-columns: 1fr; max-width: 800px; margin: 0 auto;">
          <div class="card card-white" style="display:flex; flex-direction:row; align-items:center; gap:2rem;">
            <div style="font-size:3rem;">❌</div>
            <div>
              <h3>Tu web es un folleto digital, no un vendedor</h3>
              <p>Si tu página web solo dice "quiénes somos" y no captura datos ni persuade a la compra, estás perdiendo el 90% de tus clientes potenciales.</p>
            </div>
          </div>
          <div class="card card-white" style="display:flex; flex-direction:row; align-items:center; gap:2rem;">
            <div style="font-size:3rem;">❌</div>
            <div>
              <h3>Compras 'likes' en lugar de atención de calidad</h3>
              <p>Subir fotos bonitas a Instagram no sirve si no hay una estrategia detrás para convertir a esos seguidores en compradores recurrentes.</p>
            </div>
          </div>
          <div class="card card-white" style="display:flex; flex-direction:row; align-items:center; gap:2rem;">
            <div style="font-size:3rem;">❌</div>
            <div>
              <h3>No mides tu Retorno de Inversión (ROI)</h3>
              <p>Si inviertes $500 en publicidad y no sabes exactamente cuántas ventas te trajo, estás jugando a la lotería con tu presupuesto.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section" style="background-color: var(--cream);">
        <div class="cta-box" style="max-width: 900px; margin: 0 auto;">
          <h2>No somos la típica agencia.</h2>
          <p style="font-size:1.3rem; margin-bottom: 2rem;">Nosotros no te vendemos "branding" ni "posicionamiento abstracto". Te vendemos un sistema que mete dinero en tu caja registradora. Trabajamos con clientes ambiciosos que quieren dominar su sector.</p>
          <a href="$waLink" class="btn-primary btn-large" target="_blank">📲 Quiero un Análisis Gratuito</a>
        </div>
      </section>
"@
    },
    @{
        path = "servicios.html"
        title = "Servicios Enfocados en Ventas"
        metaDesc = "Descubre nuestros servicios de embudos de venta, publicidad y SEO."
        content = @"
      <section class="hero" style="padding: 6rem 2rem 4rem; background-color: var(--coral);">
        <h1 style="font-size:4.5rem;">Servicios <span>Rentables</span></h1>
        <p class="hero-subtitle">Sistemas diseñados exclusivamente para escalar tus ingresos.</p>
      </section>
      <section class="section" style="padding-top:4rem; background-color: var(--cream);">
        <div class="grid">
          <div class="card card-blue">
            <h3>Diseño de Embudos de Venta</h3>
            <p>No hacemos webs "bonitas" que no venden. Creamos máquinas de conversión que guían al usuario desde el click hasta la compra.</p>
          </div>
          <div class="card card-white">
            <h3>Tráfico de Pago (Ads)</h3>
            <p>Anuncios en Facebook, Instagram, LinkedIn y Google orientados a conseguir prospectos calificados dispuestos a comprar.</p>
          </div>
          <div class="card card-coral">
            <h3>Dominio SEO Local</h3>
            <p>Estrategias avanzadas de posicionamiento orgánico para que recibas tráfico gratuito todos los meses de clientes buscando tus soluciones.</p>
          </div>
        </div>
      </section>
"@
    },
    @{
        path = "nosotros.html"
        title = "Por qué Maravillium"
        metaDesc = "Por qué elegir Maravillium para escalar las ventas de tu negocio."
        content = @"
      <section class="hero" style="padding: 6rem 2rem 4rem; background-color: var(--blue-bg);">
        <h1 style="font-size:4.5rem;">No somos <span>tradicionales</span></h1>
        <p class="hero-subtitle">Odiamos las métricas vanidosas. Amamos el crecimiento real.</p>
      </section>
      <section class="section" style="padding-top:4rem; max-width:800px; margin: 0 auto;">
        <div class="blog-post card-white">
          <h2>La verdad sobre las agencias</h2>
          <p>La mayoría de las agencias de marketing te cobran miles de dólares por entregarte reportes llenos de "impresiones" y "me gusta". Nosotros sabemos que los "likes" no pagan las nóminas de tus empleados.</p>
          <h2>Nuestra Promesa</h2>
          <p>Nos enfocamos 100% en el Retorno de Inversión. Si una estrategia no te trae prospectos calificados o ventas directas, la eliminamos. Somos tu brazo armado en la adquisición de clientes.</p>
          <div class="cta-box card-coral">
            <h3>Únete al club de ganadores</h3>
            <p>Escríbenos directamente y analizaremos tu negocio en 5 minutos.</p>
            <a href="$waLink" class="btn-primary" target="_blank" style="background-color: var(--text-dark); color: var(--cream);">Hablar por WhatsApp</a>
          </div>
        </div>
      </section>
"@
    }
)

foreach ($p in $pages) {
    $html = Render-Layout -title $p.title -content $p.content -metaDesc $p.metaDesc
    Save-Utf8 -path "$distDir\$($p.path)" -content $html
}

# Generate 10,000 Long Tail Keywords
$prefixes = @(
    "Cómo conseguir más clientes con", "Estrategias comprobadas de", "Por qué no funciona tu", 
    "Guía paso a paso de", "Cuánto cuesta realmente hacer", "El secreto mejor guardado de",
    "Cómo evitar perder dinero en", "La forma más rápida de escalar con", "Qué es y por qué necesitas", 
    "Los mayores errores en", "Cómo duplicar tus ventas usando", "Casos de éxito de", 
    "El impacto oculto de", "Cómo dominar tu mercado con", "Mejores prácticas para"
)
$services = @(
    "publicidad en Instagram y Facebook", "marketing digital orientado a ventas", 
    "un rediseño de página web", "posicionamiento SEO local en Google", 
    "gestión profesional de redes sociales", "publicidad B2B en LinkedIn",
    "creación de embudos de venta", "email marketing automatizado",
    "campañas de Google Ads", "optimización de la tasa de conversión",
    "creación de contenido viral en TikTok", "estrategias de retención de clientes",
    "generación de leads B2B", "copywriting persuasivo", "automatización de ventas"
)
$niches = @(
    "para clínicas dentales", "para despachos de abogados", "para empresas de construcción", 
    "para tiendas de e-commerce", "para negocios locales B2B", "para psicólogos",
    "para empresas de logística", "para academias online", "para concesionarios de coches",
    "para gimnasios y centros fitness", "para agencias de bienes raíces", "para consultoras de software", 
    "para clínicas estéticas", "para restaurantes de alta gama", "para estudios de arquitectura"
)
$benefits = @(
    "sin gastar una fortuna", "para multiplicar tus ingresos este año", "generando prospectos calificados a diario"
)

$allCombinations = @()

foreach ($p in $prefixes) {
    foreach ($s in $services) {
        foreach ($n in $niches) {
            foreach ($b in $benefits) {
                $allCombinations += @{ p = $p; s = $s; n = $n; b = $b }
            }
        }
    }
}

# Take 10,000 combinations
$blogPosts = $allCombinations | Select-Object -First 10000

$groupedByNiche = @{}
foreach ($n in $niches) {
    $groupedByNiche[$n] = @()
}

Write-Output "Generating 10,000 pages..."

foreach ($post in $blogPosts) {
    $title = "$($post.p) $($post.s) $($post.n) $($post.b)"
    # Clean slug mapping
    $slugBytes = [System.Text.Encoding]::GetEncoding("ISO-8859-8").GetBytes($title.ToLower())
    $slugStr = [System.Text.Encoding]::UTF8.GetString($slugBytes)
    $slug = $slugStr -replace '[^a-z0-9]+', '-' -replace '^-|-$', ''
    
    $metaDesc = "Domina tu industria. Aprende sobre $($post.p) $($post.s) $($post.n). Estrategias 100% enfocadas en ventas."
    
    $content = @"
        <div class="blog-post card-white">
          <p class="badge" style="margin-bottom: 1rem; display:inline-block;">Estrategia de Ventas</p>
          <h1>$title</h1>
          <p style="font-size:1.3rem; font-weight:500;">Si eres dueño de un negocio y te has preguntado <strong>$($post.p) $($post.s) $($post.n)</strong>, estás en el sitio indicado. Olvídate de los tecnicismos, aquí te explicamos cómo esto se traduce en dinero en tu cuenta bancaria.</p>
          
          <h2>El problema de la industria convencional</h2>
          <p>Muchas agencias te venderán humo. Te prometerán alcance e impresiones. Pero si esas métricas no te están <strong>$($post.b)</strong>, estás tirando tu dinero a la basura. Cuando se trata de soluciones $($post.n), el único KPI que importa es la venta final.</p>

          <h2>El Sistema de Ventas de Maravillium</h2>
          <p>Implementar $($post.s) requiere un sistema predictivo. Nosotros construimos activos digitales. Es decir, embudos, anuncios y posicionamiento que trabajan 24/7 para traerte prospectos listos para comprar.</p>
          
          <div class="cta-box card-coral">
            <h3>¿Estás harto de no tener resultados?</h3>
            <p>Deja de jugar a la prueba y error. Nuestro equipo diseñará una estrategia agresiva de ventas específicamente $($post.n).</p>
            <a href="$waLink" class="btn-primary" target="_blank" style="background-color: var(--text-dark); color: var(--cream);">📲 Quiero Multiplicar Mis Ventas</a>
          </div>
        </div>
"@
    $html = Render-Layout -title $title -content $content -metaDesc $metaDesc
    Save-Utf8 -path "$blogDir\$slug.html" -content $html

    $groupedByNiche[$post.n] += @{ title = $title; slug = $slug; metaDesc = $metaDesc }
}

Write-Output "Pages generated. Generating Index Directories..."

# Main Blog Index
$blogIndexContent = @"
  <section class="hero" style="padding: 6rem 2rem 2rem; background-color: var(--blue-bg);">
    <h1 style="font-size:4.5rem;">El Hub de <span>Ventas</span></h1>
    <p class="hero-subtitle">Selecciona tu industria y descubre las estrategias exactas para dominar tu mercado.</p>
  </section>
  <section class="section" style="padding-top:4rem; background-color: var(--cream);">
    <div class="grid" style="max-width: 1200px; margin: 0 auto;">
"@

foreach ($n in $niches) {
    $nicheSlugBytes = [System.Text.Encoding]::GetEncoding("ISO-8859-8").GetBytes($n.ToLower())
    $nicheSlugStr = [System.Text.Encoding]::UTF8.GetString($nicheSlugBytes)
    $nicheSlug = $nicheSlugStr -replace '[^a-z0-9]+', '-' -replace '^-|-$', ''
    
    $capitalizedNiche = $n.Substring(0,1).ToUpper() + $n.Substring(1)
    
    $blogIndexContent += @"
      <a href="/blog/niche-$nicheSlug.html" class="card card-white" style="text-align:center; padding: 4rem 2rem; justify-content:center; align-items:center;">
        <div style="font-size:2.5rem; margin-bottom:1rem;">📂</div>
        <h3 style="font-size:1.8rem; margin-bottom:0.5rem;">Estrategias<br>$capitalizedNiche</h3>
        <p style="font-size:1.1rem; color:var(--text-dark); font-weight:700; margin:0; text-decoration:underline;">Ver Artículos →</p>
      </a>
"@

    # Generate Individual Niche Index Page
    $nicheIndexContent = @"
  <section class="hero" style="padding: 4rem 2rem 2rem; background-color: var(--blue-bg);">
    <h1 style="font-size:3.5rem;">Estrategias <span>$capitalizedNiche</span></h1>
    <p class="hero-subtitle">Descubre cómo escalar tu negocio y conseguir clientes diarios.</p>
  </section>
  <section class="section" style="padding-top:4rem; background-color: var(--cream);">
    <div class="blog-list card-white" style="padding: 3rem; border-radius: 16px;">
"@
    foreach ($p in $groupedByNiche[$n]) {
        $nicheIndexContent += @"
        <div class="blog-item">
          <h3><a href="/blog/$($p.slug).html">$($p.title)</a></h3>
          <p>$($p.metaDesc)</p>
        </div>
"@
    }
    $nicheIndexContent += @"
    </div>
  </section>
"@
    $nicheHtml = Render-Layout -title "Estrategias $capitalizedNiche" -content $nicheIndexContent -metaDesc "Todas las estrategias de ventas $n."
    Save-Utf8 -path "$blogDir\niche-$nicheSlug.html" -content $nicheHtml
}

$blogIndexContent += @"
    </div>
  </section>
"@

$mainIndexHtml = Render-Layout -title 'Directorio de Estrategias de Ventas' -content $blogIndexContent -metaDesc 'Descubre miles de estrategias de ventas específicas para tu nicho de mercado.'
Save-Utf8 -path "$blogDir\index.html" -content $mainIndexHtml

Write-Output "Site generated successfully in /dist with 10000 long-tail SEO blog posts and fixed UTF-8 encoding."
