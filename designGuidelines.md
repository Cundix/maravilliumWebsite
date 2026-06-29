# Maravillium UI Integration & Design Guidelines

This document provides a comprehensive blueprint for integrating **Maravillium's** premium, Apple-inspired, Bento-grid, motion-driven aesthetic into the **ObraSegura AI** dashboard application.

---

## 1. Core Visual Architecture & Philosophy

Maravillium combines the premium clean lines of Apple interfaces with a dark-mode-first **Bento Grid** structure, glassmorphic overlays, and fluid micro-interactions. 

### Design Principles:
1. **Depth & Glassmorphism**: Use translucent surfaces (`backdrop-filter: blur()`) with highly subtle, dynamic borders to represent physical layering.
2. **Typography Hierarchy**: Bold sans-serif headings (**Archivo**) paired with tech-minimalistic body text (**Space Grotesk**).
3. **Motion-Driven Feedback**: Smooth transitions (150-450ms) on all states. No layout-shifting transforms.
4. **Dynamic Spotlights**: Interactive mouse-tracking hover highlights on cards.
5. **No Emojis as Icons**: Use clean, modern SVG stroke icons (from Lucide or Heroicons) to maintain a premium corporate-tech character.

---

## 2. Global Design Tokens (Theme Variables)

To establish theme consistency between the two apps, replace the variables in ObraSegura's `index.css` with this system. It includes support for a premium light mode (Silver) and dark mode (Midnight), driven by a `data-theme` attribute.

```css
/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

:root {
  /* Default Dark Mode (Sleek Midnight) */
  --bg-color: #09090B;
  --bg-surface: rgba(20, 20, 23, 0.6);
  --bg-surface-opaque: #141417;
  --bg-surface-hover: rgba(30, 30, 35, 0.8);
  
  --color-primary: #FFFFFF;
  --color-secondary: #E4E4E7;
  
  --color-accent: #2563EB; /* Deep Blue */
  --color-accent-rgb: 37, 99, 235;
  --color-accent-hover: #1D4ED8;
  
  /* Semantic Colors mapping to ObraSegura Alerts */
  --color-success: #34C759;
  --color-warning: #FF9500;
  --color-danger: #FF3B30;
  --color-info: #007AFF;
  
  --color-text-muted: #A1A1AA;
  --color-text-subtle: #71717A;
  --color-border: rgba(255, 255, 255, 0.08);
  --color-border-hover: rgba(255, 255, 255, 0.16);
  --color-glow: rgba(37, 99, 235, 0.15);

  --font-heading: 'Archivo', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-body: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
  
  /* Border Radius System */
  --radius-sm: 12px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-xl: 32px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.5);
  --shadow-md: 0 4px 20px rgba(0,0,0,0.4);
  --shadow-lg: 0 8px 30px rgba(0,0,0,0.6);
  --shadow-xl: 0 20px 60px rgba(0,0,0,0.8);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 450ms cubic-bezier(0.16, 1, 0.3, 1);
}

[data-theme="light"] {
  /* Premium Light Mode (Silver/Apple-inspired) */
  --bg-color: #F5F5F7;
  --bg-surface: rgba(255, 255, 255, 0.75);
  --bg-surface-opaque: #FFFFFF;
  --bg-surface-hover: rgba(240, 240, 243, 0.9);
  
  --color-primary: #09090B;
  --color-secondary: #27272A;
  
  --color-text-muted: #52525B;
  --color-text-subtle: #8F8F99;
  --color-border: rgba(0, 0, 0, 0.06);
  --color-border-hover: rgba(0, 0, 0, 0.12);
  --color-glow: rgba(37, 99, 235, 0.05);

  --shadow-sm: 0 1px 2px rgba(0,0,0,0.02);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.04);
  --shadow-lg: 0 8px 30px rgba(0,0,0,0.06);
  --shadow-xl: 0 20px 60px rgba(0,0,0,0.08);
}
```

---

## 3. Global CSS Refactoring

Map ObraSegura's classes to use the updated variables. Modify `index.css` to align with the core mechanics:

### Reset & Typography Rules
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background-color: var(--bg-color);
  color: var(--color-primary);
  min-height: 100vh;
  transition: background-color var(--transition-base), color var(--transition-base);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-primary);
}
```

### Background Glowing Blobs
Introduce the dynamic ambient glow behind the dashboard. Place this HTML at the very top of `App.jsx`:
```html
<div className="bg-glows">
  <div className="bg-glow bg-glow--1"></div>
  <div className="bg-glow bg-glow--2"></div>
</div>
```
And add this to `index.css`:
```css
.bg-glows {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}

.bg-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.12;
  mix-blend-mode: screen;
  transition: background var(--transition-slow), opacity var(--transition-slow);
}

[data-theme="light"] .bg-glow {
  mix-blend-mode: multiply;
  opacity: 0.04;
}

.bg-glow--1 {
  top: -10%;
  right: -5%;
  width: 50vw;
  height: 50vw;
  background: radial-gradient(circle, var(--color-accent) 0%, transparent 70%);
}

.bg-glow--2 {
  bottom: -10%;
  left: -5%;
  width: 45vw;
  height: 45vw;
  background: radial-gradient(circle, #7C3AED 0%, transparent 70%);
}
```

---

## 4. Bento Grid Implementation for ObraSegura Dashboard

Instead of separate grids for KPIs and layouts, integrate the entire dashboard into a structured **Bento Layout**.

### CSS Grid Definition
```css
.bento-dashboard {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
  max-width: var(--container-wide, 1400px);
  margin: 0 auto;
  padding: 30px;
}

/* Card Base Structure */
.bento-card {
  background: var(--bg-surface);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 24px;
  position: relative;
  overflow: hidden;
  transition: transform var(--transition-slow), border-color var(--transition-slow), box-shadow var(--transition-slow);
}

.bento-card:hover {
  transform: scale(1.01);
  border-color: var(--color-border-hover);
  box-shadow: var(--shadow-xl);
}

/* Layout Mapping overrides for components */
.bento-card.kpi {
  grid-column: span 3;
}

.bento-card.video-feed {
  grid-column: span 8;
  grid-row: span 2;
}

.bento-card.alerts-sidebar {
  grid-column: span 4;
  grid-row: span 3;
}

.bento-card.chart-panel {
  grid-column: span 8;
}

.bento-card.summary-panel {
  grid-column: span 8;
}

.bento-card.audits-panel {
  grid-column: span 8;
}

@media (max-width: 1200px) {
  .bento-card.kpi { grid-column: span 6; }
  .bento-card.video-feed { grid-column: span 12; }
  .bento-card.alerts-sidebar { grid-column: span 12; grid-row: auto; }
  .bento-card.chart-panel, .bento-card.summary-panel, .bento-card.audits-panel { grid-column: span 12; }
}

@media (max-width: 600px) {
  .bento-card.kpi { grid-column: span 12; }
}
```

---

## 5. Spotlight Hover Effect (React Hook & Component Integration)

One of Maravillium's most premium effects is the cursor-tracking spotlight. To implement this in React for the Bento cards:

### Create a Custom React Hook: `useSpotlight.js`
```javascript
import { useEffect, useRef } from 'react';

export function useSpotlight() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      container.style.setProperty('--mouse-x', `${x}px`);
      container.style.setProperty('--mouse-y', `${y}px`);
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return containerRef;
}
```

### Apply Spotlight to Bento Cards
In `Dashboard.jsx` or your card wrappers, wrap cards with this spotlight handler:
```jsx
import React from 'react';
import { useSpotlight } from '../hooks/useSpotlight';

export function BentoCard({ children, className = '', ...props }) {
  const cardRef = useSpotlight();
  return (
    <div ref={cardRef} className={`bento-card ${className}`} {...props}>
      <div className="bento-card__spotlight" />
      <div className="bento-card__content">
        {children}
      </div>
    </div>
  );
}
```

Add the CSS helper overlay to `index.css`:
```css
.bento-card__spotlight {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    300px circle at var(--mouse-x, 0px) var(--mouse-y, 0px),
    rgba(255, 255, 255, 0.04),
    transparent 80%
  );
  z-index: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity var(--transition-base);
}

.bento-card:hover .bento-card__spotlight {
  opacity: 1;
}

[data-theme="light"] .bento-card__spotlight {
  background: radial-gradient(
    300px circle at var(--mouse-x, 0px) var(--mouse-y, 0px),
    rgba(37, 99, 235, 0.05),
    transparent 80%
  );
}

.bento-card__content {
  position: relative;
  z-index: 2;
  height: 100%;
}
```

---

## 6. Specific Component Integrations

### A. KPI Cards
Update `.kpi-card` to use the premium variables and a subtle label glow:
```css
.kpi-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 120px;
  border-radius: var(--radius-md);
}

.kpi-value {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-primary);
  letter-spacing: -0.04em;
  line-height: 1;
}

.kpi-label {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-text-muted);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* Accent Indicators */
.kpi-card.primary .kpi-label { color: var(--color-info); }
.kpi-card.success .kpi-label { color: var(--color-success); }
.kpi-card.warning .kpi-label { color: var(--color-warning); }
.kpi-card.danger .kpi-label { color: var(--color-danger); }
```

### B. Glass Header (Sticky Navigation)
Integrate the clean, floating pill aesthetic of Maravillium's header:
```css
.glass-header {
  position: sticky;
  top: 16px;
  width: calc(100% - 32px);
  max-width: var(--container-wide);
  margin: 0 auto;
  z-index: 100;
  height: 64px;
  padding: 0 24px;
  border-radius: var(--radius-xl);
  background: var(--bg-surface);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

### C. Premium Buttons & Action Elements
Refactor buttons with micro-bounces and consistent scaling behavior:
```css
.btn {
  padding: 10px 20px;
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.875rem;
  transition: all var(--transition-fast);
  cursor: pointer;
}

.btn-primary {
  background: var(--color-primary);
  color: var(--bg-color);
  box-shadow: var(--shadow-sm);
}

.btn-primary:hover {
  background: var(--color-accent);
  color: white;
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn-glass {
  background: var(--bg-surface-hover);
  color: var(--color-primary);
  border: 1px solid var(--color-border);
}

.btn-glass:hover {
  background: var(--color-primary);
  color: var(--bg-color);
  border-color: var(--color-primary);
}

.btn-glass.active {
  background: var(--color-accent) !important;
  color: white !important;
  border-color: var(--color-accent);
}
```

### D. Playback & Settings Modals
Inject heavy backdrop blur and smooth exit scaling:
```css
.video-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.video-modal-content {
  background: var(--bg-surface-opaque);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  max-width: 900px;
  width: 100%;
  box-shadow: var(--shadow-xl);
  overflow: hidden;
  animation: modalEnter 350ms cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modalEnter {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
```

---

## 7. Integration Verification Checklist

Ensure you satisfy the styling metrics during rollout:
- [ ] **Contrast Verification**: Light mode text contrast meets WCAG 4.5:1 parameters. Use `--color-primary` (`#09090B`) for headings and `--color-text-muted` (`#52525B`) minimum for secondary labels.
- [ ] **Icons**: Confirm no emojis exist within the UI components. Replace items like `🚪 Entrada`, `📹 Monitoreo`, `📱 Teléfono`, `⚠️ Seguridad` with Lucide/Heroicon SVG nodes.
- [ ] **Cursor State**: Add `cursor-pointer` to timeline events, toggle filters, and select lists.
- [ ] **Layout Shifts**: Verify that spotlight mouse-tracking uses absolute placements or CSS custom property modifications so standard layouts do not experience structural shifts.
- [ ] **Scrollbars**: Customize scrollbar panels inside `.timeline-list` to avoid heavy default OS styling on Windows.
