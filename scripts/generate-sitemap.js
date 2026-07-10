const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://maravillium.com';
const EXCLUDE_DIRS = ['.git', '.github', '.agent', 'node_modules'];

function getHtmlFiles(dir, files = []) {
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);
    if (stat.isDirectory()) {
      if (!EXCLUDE_DIRS.includes(item)) {
        getHtmlFiles(itemPath, files);
      }
    } else if (stat.isFile() && (item.endsWith('.html') || item.endsWith('.htm'))) {
      files.push(itemPath);
    }
  }
  return files;
}

function parseHtml(filePath, rootDir) {
  const content = fs.readFileSync(filePath, 'utf-8');
  let relPath = path.relative(rootDir, filePath).replace(/\\/g, '/');
  
  // Clean route path
  let route = '/' + relPath;
  route = route.replace(/\/index\.html?$/, '/');
  route = route.replace(/\.html?$/, '');
  if (route.length > 1 && route.endsWith('/')) {
    route = route.slice(0, -1);
  }

  // Extract title
  let title = '';
  const titleMatch = content.match(/<title[^>]*>(.*?)<\/title>/i);
  if (titleMatch) {
    title = titleMatch[1].trim();
  }

  // Extract images
  const images = [];
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    let src = match[1];
    if (src && !src.startsWith('http') && !src.startsWith('data:')) {
      // Resolve relative path to route path
      const dirParts = route.split('/').slice(0, -1);
      if (src.startsWith('/')) {
        // Absolute from root
      } else if (src.startsWith('./')) {
        src = dirParts.join('/') + src.substring(1);
      } else {
        src = dirParts.join('/') + '/' + src;
      }
      src = src.replace(/\/+/g, '/');
      
      // Extract alt if present
      let alt = '';
      const imgTag = match[0];
      const altMatch = imgTag.match(/alt=["']([^"']*)["']/i);
      if (altMatch) {
        alt = altMatch[1].trim();
      }
      images.push({ src, alt });
    }
  }

  return {
    path: route,
    title,
    images
  };
}

const rootDir = path.join(__dirname, '..');
const htmlFiles = getHtmlFiles(rootDir);
const pages = htmlFiles.map(file => parseHtml(file, rootDir));

// Generate sitemap.xml
const dateStr = new Date().toISOString().split('T')[0];
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

pages.forEach(page => {
  const fullUrl = BASE_URL + page.path;
  const priority = page.path === '/' ? '1.0' : '0.5';
  const changefreq = 'weekly';
  
  xml += `  <url>\n`;
  xml += `    <loc>${fullUrl}</loc>\n`;
  xml += `    <lastmod>${dateStr}</lastmod>\n`;
  xml += `    <changefreq>${changefreq}</changefreq>\n`;
  xml += `    <priority>${priority}</priority>\n`;
  
  if (page.images && page.images.length > 0) {
    page.images.forEach(img => {
      let imgLoc = img.src;
      if (!imgLoc.startsWith('http')) {
        imgLoc = BASE_URL + imgLoc;
      }
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${imgLoc}</image:loc>\n`;
      if (img.alt) {
        xml += `      <image:title>${img.alt.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</image:title>\n`;
      }
      xml += `    </image:image>\n`;
    });
  }
  
  xml += `  </url>\n`;
});
xml += '</urlset>';

fs.writeFileSync(path.join(rootDir, 'sitemap.xml'), xml, 'utf-8');
console.log('Generated sitemap.xml with', pages.length, 'pages.');

// Generate robots.txt
let robots = `# https://www.robotstxt.org/db.html\n\n`;
robots += `User-agent: *\n`;
robots += `Allow: /\n\n`;
robots += `# Sitemap Link\n`;
robots += `Sitemap: ${BASE_URL}/sitemap.xml\n`;

fs.writeFileSync(path.join(rootDir, 'robots.txt'), robots, 'utf-8');
console.log('Generated robots.txt.');
