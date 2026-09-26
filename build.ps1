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
    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($path, $content, $utf8NoBom)
}

function Render-Layout {
    param (
        [string]$title,
        [string]$content,
        [string]$metaDesc,
        [string]$basePath = "./"
    )
    return @"
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>$title | Maravillium</title>
  <meta name="description" content="$metaDesc">
  <link rel="stylesheet" href="${basePath}css/styles.css">
</head>
<body>
  <nav class="navbar">
    <a href="${basePath}index.html" class="nav-brand">maravillium.</a>
    <div class="nav-links">
      <a href="${basePath}nosotros.html">Nosotros</a>
      <a href="${basePath}servicios.html">Servicios</a>
      <a href="${basePath}blog/index.html">Estrategias</a>
    </div>
    <a href="$waLink" class="nav-cta" target="_blank">&#128242; Hablar con Ventas</a>
  </nav>

  $content

  <footer>
    <h2 style="font-size: 3rem; margin-bottom: 2rem; font-family: 'Fraunces', serif;">&iquest;Listo para aumentar tu facturacion?</h2>
    <a href="$waLink" class="btn-primary btn-large" target="_blank">AGENDA UNA LLAMADA HOY</a>
  </footer>

  <a href="$waLink" class="floating-wa" target="_blank">
    &#128172; Chatea con Nosotros
  </a>
</body>
</html>
"@
}

$pages = @(
    @{
        path = "index.html"
        title = "Sistemas de Adquisicion de Clientes"
        metaDesc = "Maravillium es tu agencia de marketing enfocada 100% en ventas."
        content = @"
      <section class="hero" style="background-color: var(--coral);">
        <div class="hero-content">
          <p class="badge">Agencia de Adquisicion de Clientes</p>
          <h1>Expertos en <span>Escalar Negocios</span></h1>
          <p class="hero-subtitle">Construimos embudos de venta y sistemas de publicidad predecibles para due&ntilde;os de negocio que buscan crecimiento solido, sin humo ni tecnicismos.</p>
          <div class="hero-buttons">
            <a href="$waLink" class="btn-primary btn-large" target="_blank">Agendar Sesion Estrategica</a>
            <a href="/servicios.html" class="btn-secondary btn-large">Ver Como Lo Hacemos</a>
          </div>
        </div>
      </section>

      <div class="marquee-container">
        <div class="marquee-content">
          CLIENTES CALIFICADOS &bull; CRECIMIENTO PREDECIBLE &bull; MAYOR RENTABILIDAD &bull; SISTEMAS PROBADOS &bull; CLIENTES CALIFICADOS &bull; CRECIMIENTO PREDECIBLE &bull; MAYOR RENTABILIDAD &bull; SISTEMAS PROBADOS
        </div>
      </div>

      <section class="section" style="background-color: var(--cream);">
        <h2 class="section-title">Nuestras Soluciones</h2>
        <div class="grid">
          <div class="card card-blue">
            <div class="card-icon">&#128187;</div>
            <h3>Embudos de Alta Conversion</h3>
            <p>Disenamos paginas de aterrizaje (Landing Pages) rapidas y directas. Optimizamos la experiencia de usuario para convertir la mayor cantidad de visitantes en prospectos comerciales.</p>
          </div>
          <div class="card card-coral">
            <div class="card-icon">&#128200;</div>
            <h3>Publicidad Digital Estrategica</h3>
            <p>Gestionamos campanas en Google y Meta enfocadas exclusivamente en Retorno de Inversion (ROI). Medimos cada centavo para garantizar rentabilidad y crecimiento continuo.</p>
          </div>
          <div class="card card-white">
            <div class="card-icon">&#128269;</div>
            <h3>Dominio en Buscadores (SEO)</h3>
            <p>Posicionamos tu empresa para que seas la opcion principal cuando tus clientes locales busquen los servicios que ofreces, generando trafico organico constante.</p>
          </div>
        </div>
      </section>

      <section class="section" style="background-color: var(--blue-bg);">
        <h2 class="section-title">&iquest;Por que muchos negocios no escalan?</h2>
        <div class="grid" style="grid-template-columns: 1fr; max-width: 800px; margin: 0 auto;">
          <div class="card card-white" style="display:flex; flex-direction:row; align-items:center; gap:2rem;">
            <div style="font-size:3rem;">&#10060;</div>
            <div>
              <h3>Falta de un sistema predictivo</h3>
              <p>Si dependes unicamente del "boca a boca" o de referencias, tu negocio no tiene el control sobre su propio crecimiento mensual.</p>
            </div>
          </div>
          <div class="card card-white" style="display:flex; flex-direction:row; align-items:center; gap:2rem;">
            <div style="font-size:3rem;">&#10060;</div>
            <div>
              <h3>Presencia web ineficaz</h3>
              <p>Una pagina web corporativa que no esta disenada para capturar datos ni cerrar ventas es simplemente un folleto digital costoso.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section" style="background-color: var(--cream);">
        <div class="cta-box" style="max-width: 900px; margin: 0 auto;">
          <h2>Hablemos de tu crecimiento.</h2>
          <p style="font-size:1.3rem; margin-bottom: 2rem;">Realizaremos una auditoria rapida y te propondremos un plan de adquisicion claro, sin compromisos ni metricas vanidosas. Solo resultados medibles.</p>
          <a href="$waLink" class="btn-primary btn-large" target="_blank">&#128242; Contactar por WhatsApp</a>
        </div>
      </section>
"@
    },
    @{
        path = "servicios.html"
        title = "Nuestros Servicios"
        metaDesc = "Descubre nuestras soluciones enfocadas en la adquisicion de clientes."
        content = @"
      <section class="hero" style="padding: 6rem 2rem 4rem; background-color: var(--coral);">
        <h1 style="font-size:4.5rem;">Soluciones de <span>Adquisicion</span></h1>
        <p class="hero-subtitle">Desarrollamos e implementamos sistemas integrales para atraer, nutrir y convertir prospectos en clientes fieles para tu negocio.</p>
      </section>
      
      <section class="section" style="padding-top:4rem; background-color: var(--cream);">
        <div class="blog-post card-white" style="margin-top:0;">
          <div style="font-size:4rem; margin-bottom: 1rem;">&#128187;</div>
          <h2>1. Embudos de Venta (Landing Pages)</h2>
          <p>La base de cualquier estrategia de marketing moderna no es una pagina web tradicional con 20 pestanas, sino una pagina de aterrizaje hiper-optimizada. Nosotros nos encargamos de todo el proceso:</p>
          <ul>
            <li><strong>Copywriting Persuasivo:</strong> Escribimos textos enfocados en resolver los dolores de tus clientes y resaltar tu propuesta de valor.</li>
            <li><strong>Diseno UX/UI para Conversion:</strong> Usamos colores, botones y jerarquias visuales probadas cientificamente para guiar la vista hacia la accion.</li>
            <li><strong>Velocidad Extrema:</strong> Aseguramos tiempos de carga menores a 2 segundos para no perder visitantes impacientes.</li>
          </ul>
        </div>

        <div class="blog-post card-blue">
          <div style="font-size:4rem; margin-bottom: 1rem;">&#128200;</div>
          <h2>2. Trafico de Pago y Publicidad (Ads)</h2>
          <p>De nada sirve tener el mejor producto si nadie lo conoce. Inyectamos trafico calificado hacia tus ofertas usando las plataformas publicitarias mas poderosas:</p>
          <ul>
            <li><strong>Google Ads:</strong> Capturamos la intencion directa. Anunciamos tu negocio justo cuando alguien busca tus servicios en Google.</li>
            <li><strong>Meta Ads (Facebook e Instagram):</strong> Creamos campanas de demanda, segmentando por intereses, comportamientos y datos demograficos para llegar a tu cliente ideal.</li>
            <li><strong>Retargeting:</strong> Perseguimos a los usuarios que visitaron tu pagina pero no compraron, aumentando las tasas de cierre hasta en un 40%.</li>
          </ul>
        </div>

        <div class="blog-post card-coral">
          <div style="font-size:4rem; margin-bottom: 1rem;">&#128269;</div>
          <h2>3. Posicionamiento SEO Local</h2>
          <p>Aseguramos el futuro de tu negocio dominando las busquedas organicas. Esto te proporciona un flujo de trafico constante por el que no tienes que pagar cada click:</p>
          <ul>
            <li><strong>Optimizacion de Google My Business:</strong> Hacemos que tu negocio aparezca en el mapa cuando alguien busca servicios "cerca de mi".</li>
            <li><strong>Auditoria Tecnica:</strong> Reparamos errores de codigo en tu sitio para que Google pueda indexarlo facilmente.</li>
            <li><strong>Creacion de Contenido (Blogs):</strong> Redactamos articulos enfocados en resolver preguntas que tus clientes realizan en Google, atrayendo trafico educado y con confianza en tu autoridad.</li>
          </ul>
        </div>
      </section>
"@
    },
    @{
        path = "nosotros.html"
        title = "Nuestra Filosofia"
        metaDesc = "Por que Maravillium."
        content = @"
      <section class="hero" style="padding: 6rem 2rem 4rem; background-color: var(--blue-bg);">
        <h1 style="font-size:4.5rem;">Transparencia y <span>Resultados</span></h1>
        <p class="hero-subtitle">Nuestra prioridad absoluta es el crecimiento de tu empresa.</p>
      </section>
      <section class="section" style="padding-top:4rem; max-width:800px; margin: 0 auto;">
        <div class="blog-post card-white">
          <h2>Basta de Agencias Tradicionales</h2>
          <p>Durante anos, las agencias de marketing han justificado sus altos costos mensuales entregando reportes de "alcance" e "impresiones", metricas que no se traducen en ventas reales. Nosotros entendemos que los "likes" no pagan las nominas de tus empleados.</p>
          <h2>El Enfoque Maravillium</h2>
          <p>Somos una agencia de performance. Todo lo que construimos, medimos y optimizamos tiene una sola brujula: el Retorno de Inversion (ROI). Si una tactica no genera un impacto positivo en tu facturacion, la descartamos inmediatamente.</p>
          <div class="cta-box card-coral">
            <h3>Conoce a tu futuro equipo de marketing</h3>
            <p>Escribenos hoy mismo y agenda una sesion de descubrimiento.</p>
            <a href="$waLink" class="btn-primary" target="_blank" style="background-color: var(--text-dark); color: var(--cream);">Hablar con un Asesor</a>
          </div>
        </div>
      </section>
"@
    }
)

foreach ($p in $pages) {
    $html = Render-Layout -title $p.title -content $p.content -metaDesc $p.metaDesc -basePath "./"
    Save-Utf8 -path "$distDir\$($p.path)" -content $html
}

# 1000 pages
$prefixes = @("Como conseguir clientes usando", "Estrategias de", "La importancia de", "Guia de", "Casos de exito con", "Como crecer mediante", "El impacto de", "Mejores practicas de")
$services = @("publicidad en redes", "embudos de alta conversion", "SEO local y organico", "gestion de comunidades", "campanas publicitarias B2B", "automatizacion de marketing")
$niches = @("para clinicas dentales", "para bufetes de abogados", "para empresas de construccion", "para tiendas online", "para psicologos", "para gimnasios", "para academias y cursos", "para restaurantes")
$benefits = @("optimizando tu presupuesto", "para escalar tus ventas", "generando prospectos calificados")

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

$blogPosts = $allCombinations | Select-Object -First 1000

$groupedByNiche = @{}
foreach ($n in $niches) {
    $groupedByNiche[$n] = @()
}

Write-Output "Generating pages..."

foreach ($post in $blogPosts) {
    $title = "$($post.p) $($post.s) $($post.n) $($post.b)"
    $slug = $title.ToLower() -replace '[^a-z0-9]+', '-' -replace '^-|-$', ''
    
    $metaDesc = "Aprende sobre $($post.p) $($post.s) $($post.n). Estrategias enfocadas en adquisicion de clientes."
    
    $content = @"
        <div class="blog-post card-white">
          <p class="badge" style="margin-bottom: 1rem; display:inline-block;">Marketing y Estrategia</p>
          <h1>$title</h1>
          <p style="font-size:1.3rem; font-weight:500;">Si eres due&ntilde;o de negocio y te has preguntado <strong>$title</strong>, has llegado al lugar correcto. En este articulo, desglosamos como utilizar esta estrategia para captar clientes de forma eficiente.</p>
          
          <h2>El problema de las estrategias obsoletas</h2>
          <p>El mercado ha cambiado. Hoy en dia, simplemente tener presencia en redes o una web corporativa no es suficiente si no estas <strong>$($post.b)</strong>. Para las empresas $($post.n), la competencia digital es feroz y requiere sistemas probados.</p>

          <h2>Nuestra solucion de adquisicion</h2>
          <p>Implementar $($post.s) requiere un enfoque estrategico y basado en datos. Nuestro equipo se especializa en disenar e implementar campanas que atraen prospectos con alta intencion de compra, optimizando cada fase del embudo.</p>
          
          <div class="cta-box card-coral">
            <h3>&iquest;Buscas escalar de forma predecible?</h3>
            <p>Deja que los expertos analicen tu situacion. Dise&ntilde;aremos un plan de marketing estrategico especificamente $($post.n).</p>
            <a href="$waLink" class="btn-primary" target="_blank" style="background-color: var(--text-dark); color: var(--cream);">&#128242; Contactar a Maravillium</a>
          </div>
        </div>
"@
    $html = Render-Layout -title $title -content $content -metaDesc $metaDesc -basePath "../"
    Save-Utf8 -path "$blogDir\$slug.html" -content $html

    $groupedByNiche[$post.n] += @{ title = $title; slug = $slug; metaDesc = $metaDesc }
}

Write-Output "Generating Index Directories..."

$blogIndexContent = @"
  <section class="hero" style="padding: 6rem 2rem 2rem; background-color: var(--blue-bg);">
    <h1 style="font-size:4.5rem;">Directorio de <span>Estrategias</span></h1>
    <p class="hero-subtitle">Selecciona tu industria y descubre guias detalladas sobre adquisicion de clientes.</p>
  </section>
  <section class="section" style="padding-top:4rem; background-color: var(--cream);">
    <div class="grid" style="max-width: 1200px; margin: 0 auto;">
"@

foreach ($n in $niches) {
    $nicheSlug = $n.ToLower() -replace '[^a-z0-9]+', '-' -replace '^-|-$', ''
    $capitalizedNiche = $n.Substring(0,1).ToUpper() + $n.Substring(1)
    
    $blogIndexContent += @"
      <a href="./niche-$nicheSlug.html" class="card card-white" style="text-align:center; padding: 4rem 2rem; justify-content:center; align-items:center;">
        <div style="font-size:2.5rem; margin-bottom:1rem;">&#128188;</div>
        <h3 style="font-size:1.8rem; margin-bottom:0.5rem;">Estrategias<br>$capitalizedNiche</h3>
        <p style="font-size:1.1rem; color:var(--text-dark); font-weight:900; margin:0; text-decoration:underline;">Leer Articulos &rarr;</p>
      </a>
"@

    $nicheIndexContent = @"
  <section class="hero" style="padding: 4rem 2rem 2rem; background-color: var(--blue-bg);">
    <h1 style="font-size:3.5rem;">Estrategias <span>$capitalizedNiche</span></h1>
    <p class="hero-subtitle">Como mejorar la adquisicion de clientes en tu sector.</p>
  </section>
  <section class="section" style="padding-top:4rem; background-color: var(--cream);">
    <div class="blog-list card-white" style="padding: 3rem; border-radius: 16px;">
"@
    foreach ($p in $groupedByNiche[$n]) {
        $nicheIndexContent += @"
        <div class="blog-item">
          <h3><a href="./$($p.slug).html">$($p.title)</a></h3>
          <p>$($p.metaDesc)</p>
        </div>
"@
    }
    $nicheIndexContent += @"
    </div>
  </section>
"@
    $nicheHtml = Render-Layout -title "Estrategias $capitalizedNiche" -content $nicheIndexContent -metaDesc "Estrategias para $n." -basePath "../"
    Save-Utf8 -path "$blogDir\niche-$nicheSlug.html" -content $nicheHtml
}

$blogIndexContent += @"
    </div>
  </section>
"@

$mainIndexHtml = Render-Layout -title 'Directorio de Estrategias' -content $blogIndexContent -metaDesc 'Descubre estrategias para tu nicho.' -basePath "../"
Save-Utf8 -path "$blogDir\index.html" -content $mainIndexHtml

Write-Output "Site generated with fixed copy and 1000 pages."
