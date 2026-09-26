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
    <a href="$waLink" class="nav-cta" target="_blank">📲 Escríbenos por WhatsApp</a>
  </nav>

  $content

  <footer>
    <h2 style="font-size: 3rem; margin-bottom: 2rem;">¿Listo para escalar tus ventas de verdad?</h2>
    <a href="$waLink" class="btn-primary" target="_blank" style="font-size: 1.5rem; padding: 1.5rem 4rem;">HABLA CON UN EXPERTO HOY</a>
  </footer>

  <a href="$waLink" class="floating-wa" target="_blank">
    💬 Chatea con Nosotros
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
      <section class="hero">
        <p class="hero-subtitle">Basta de 'likes' y palabras técnicas. Aquí hablamos de ingresos.</p>
        <h1>la agencia enfocada en <span>multiplicar tus ventas</span></h1>
        <p class="hero-subtitle" style="margin-top: 2rem;">Ayudamos a dueños de negocio a dominar su mercado con embudos de venta comprobados y publicidad hiper-rentable.</p>
        <a href="$waLink" class="btn-primary" target="_blank">Contactar por WhatsApp</a>
      </section>

      <div class="marquee-container">
        <div class="marquee-content">
          MÁS CLIENTES | MÁS VENTAS | MAYOR RENTABILIDAD | ESCALABILIDAD TOTAL | MÁS CLIENTES | MÁS VENTAS | MAYOR RENTABILIDAD | ESCALABILIDAD TOTAL
        </div>
      </div>

      <section class="section">
        <h2 class="section-title">El Sistema Maravillium</h2>
        <div class="grid">
          <div class="card card-pink">
            <h3>Embudos que Convierten</h3>
            <p>Diseñamos páginas de aterrizaje (Landing Pages) ultra rápidas, persuasivas y optimizadas únicamente para generar clientes calificados.</p>
          </div>
          <div class="card card-green">
            <h3>Publicidad Rentable</h3>
            <p>Invertimos tu presupuesto en Google Ads y Meta Ads como si fuera nuestro. Cada campaña está diseñada para darte Retorno de Inversión (ROI).</p>
          </div>
          <div class="card">
            <h3>Crecimiento Local (SEO)</h3>
            <p>Dominamos los motores de búsqueda para que cuando tu cliente ideal busque tu servicio, tu negocio sea la única opción obvia en tu ciudad.</p>
          </div>
        </div>
      </section>
"@
    },
    @{
        path = "servicios.html"
        title = "Servicios Enfocados en Ventas"
        metaDesc = "Descubre nuestros servicios de embudos de venta, publicidad y SEO."
        content = @"
      <section class="hero" style="padding: 6rem 2rem 4rem;">
        <h1>Servicios <span>Rentables</span></h1>
        <p class="hero-subtitle">Sistemas diseñados exclusivamente para escalar tus ingresos.</p>
      </section>
      <section class="section" style="padding-top:0;">
        <div class="grid">
          <div class="card">
            <h3>Diseño de Embudos de Venta</h3>
            <p>No hacemos webs "bonitas" que no venden. Creamos máquinas de conversión que guían al usuario desde el click hasta la compra.</p>
          </div>
          <div class="card card-green">
            <h3>Tráfico de Pago (Ads)</h3>
            <p>Anuncios en Facebook, Instagram, LinkedIn y Google orientados a conseguir prospectos calificados dispuestos a comprar.</p>
          </div>
          <div class="card card-pink">
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
      <section class="hero" style="padding: 6rem 2rem 4rem;">
        <h1>No somos <span>tradicionales</span></h1>
        <p class="hero-subtitle">Odiamos las métricas vanidosas. Amamos el crecimiento real.</p>
      </section>
      <section class="section" style="padding-top:0; max-width:800px; margin: 0 auto;">
        <div class="blog-post">
          <h2>La verdad sobre las agencias</h2>
          <p>La mayoría de las agencias de marketing te cobran miles de dólares por entregarte reportes llenos de "impresiones" y "me gusta". Nosotros sabemos que los "likes" no pagan las nóminas de tus empleados.</p>
          <h2>Nuestra Promesa</h2>
          <p>Nos enfocamos 100% en el Retorno de Inversión. Si una estrategia no te trae prospectos calificados o ventas directas, la eliminamos. Somos tu brazo armado en la adquisición de clientes.</p>
          <div class="cta-box">
            <h3>Únete al club de ganadores</h3>
            <p>Escríbenos directamente y analizaremos tu negocio en 5 minutos.</p>
            <a href="$waLink" class="btn-primary" target="_blank">Hablar por WhatsApp</a>
          </div>
        </div>
      </section>
"@
    }
)

foreach ($p in $pages) {
    $html = Render-Layout -title $p.title -content $p.content -metaDesc $p.metaDesc
    Set-Content -Path "$distDir\$($p.path)" -Value $html -Encoding UTF8
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
    $slug = $title.ToLower() -replace '[^a-z0-9]+', '-' -replace '^-|-$', ''
    $metaDesc = "Domina tu industria. Aprende sobre $($post.p) $($post.s) $($post.n). Estrategias 100% enfocadas en ventas."
    
    $content = @"
        <div class="blog-post">
          <h1>$title</h1>
          <p>Si eres dueño de un negocio y te has preguntado <strong>$($post.p) $($post.s) $($post.n)</strong>, estás en el sitio indicado. Olvídate de los tecnicismos, aquí te explicamos cómo esto se traduce en dinero en tu cuenta bancaria.</p>
          
          <h2>El problema de la industria convencional</h2>
          <p>Muchas agencias te venderán humo. Te prometerán alcance e impresiones. Pero si esas métricas no te están <strong>$($post.b)</strong>, estás tirando tu dinero a la basura. Cuando se trata de soluciones $($post.n), el único KPI que importa es la venta final.</p>

          <h2>El Sistema de Ventas de Maravillium</h2>
          <p>Implementar $($post.s) requiere un sistema predictivo. Nosotros construimos activos digitales. Es decir, embudos, anuncios y posicionamiento que trabajan 24/7 para traerte prospectos listos para comprar.</p>
          
          <div class="cta-box">
            <h3>¿Estás harto de no tener resultados?</h3>
            <p>Deja de jugar a la prueba y error. Nuestro equipo diseñará una estrategia agresiva de ventas específicamente $($post.n).</p>
            <a href="$waLink" class="btn-primary" target="_blank">📲 Quiero Multiplicar Mis Ventas</a>
          </div>
        </div>
"@
    $html = Render-Layout -title $title -content $content -metaDesc $metaDesc
    Set-Content -Path "$blogDir\$slug.html" -Value $html -Encoding UTF8

    $groupedByNiche[$post.n] += @{ title = $title; slug = $slug; metaDesc = $metaDesc }
}

Write-Output "Pages generated. Generating Index Directories..."

# Main Blog Index
$blogIndexContent = @"
  <section class="hero" style="padding: 6rem 2rem 2rem;">
    <h1>El Hub de <span>Ventas</span></h1>
    <p class="hero-subtitle">Selecciona tu industria y descubre las estrategias exactas para dominar tu mercado.</p>
  </section>
  <section class="section" style="padding-top:0;">
    <div class="grid" style="max-width: 1200px; margin: 0 auto;">
"@

foreach ($n in $niches) {
    $nicheSlug = $n.ToLower() -replace '[^a-z0-9]+', '-' -replace '^-|-$', ''
    $capitalizedNiche = $n.Substring(0,1).ToUpper() + $n.Substring(1)
    
    $blogIndexContent += @"
      <a href="/blog/niche-$nicheSlug.html" class="card card-pink" style="text-align:center; padding: 4rem 2rem;">
        <h3 style="font-size:2rem;">Estrategias $capitalizedNiche</h3>
        <p style="font-size:1.2rem; color:var(--text-dark); font-weight:700;">Ver Artículos →</p>
      </a>
"@

    # Generate Individual Niche Index Page
    $nicheIndexContent = @"
  <section class="hero" style="padding: 4rem 2rem 2rem;">
    <h1>Estrategias <span>$capitalizedNiche</span></h1>
    <p class="hero-subtitle">Descubre cómo escalar tu negocio y conseguir clientes diarios.</p>
  </section>
  <section class="section" style="padding-top:0;">
    <div class="blog-list">
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
    Set-Content -Path "$blogDir\niche-$nicheSlug.html" -Value $nicheHtml -Encoding UTF8
}

$blogIndexContent += @"
    </div>
  </section>
"@

$mainIndexHtml = Render-Layout -title 'Directorio de Estrategias de Ventas' -content $blogIndexContent -metaDesc 'Descubre miles de estrategias de ventas específicas para tu nicho de mercado.'
Set-Content -Path "$blogDir\index.html" -Value $mainIndexHtml -Encoding UTF8

Write-Output "Site generated successfully in /dist with 10000 long-tail SEO blog posts and distributed category indices."
