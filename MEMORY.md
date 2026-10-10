# MEMORY.md

Contexto persistente para sesiones de trabajo en este repositorio. Complementa
a `AGENTS.md` (que tiene las reglas); acá va el **estado actual** y el historial
de decisiones.

---

## Identidad

- **Dueño del proyecto /developer:** Josué Solís — Chatbot Developer & AI
  Specialist.LinkedIn: <https://www.linkedin.com/in/josue-dario-solis/>.
- **Deploy:** GitHub Pages → <https://josue1dario2.github.io/portafolio-josue-solis/>
- **Remote:** `https://github.com/josue1dario2/portafolio-josue-solis.git`

## Estado actual (a Oct 2026)

- Sitio completo y funcional, deployed, sin tests ni CI.
- Último cambio: `a625f03 refactor: Modificar experiencia laborarl` — se actualizó
  la sección de trayectoria.
- Sección de **Proyectos**: 1 destacada (plataforma prestoBots) + 3 cards
  (Centrovisión/IRIS, La Segunda Seguros, Grupo CITO).
- Sección de **Experiencia**: 3 entradas (La Segunda Seguros → actual,
  prestoBots, Semillero Latam).
- **Educación**: presente (UTN, Tecnicatura en programación) pero **no tiene `id`**
  ni entrada en el nav.
- **Contacto**: form con Formspree + LinkedIn + GitHub. No hay email de contacto
  directo en la página.

## Decisiones tomadas (no revertirlas sin motivo)

1. **HTML/CSS/JS vanilla, cero build.** Elegido explícitamente para que el repo
   sea desplegable con drag-and-drop. No "mejorar" agregando React/Vite.
2. **Dark mode only.** Sin toggle de tema claro a propósito.
3. **Acento `#00d4aa` (verde-teal).** Identidad visual definida, replicada en
   JS: `script.js:14` tiene un array `colors` con los 4 tonos del acento para las
   partículas. Si se cambia `--accent`, cambiar también ese array.
4. **Todo el JS dentro de un solo `DOMContentLoaded`.** Ganó sobre módulos ES
   para mantener el "un archivo, un script" — no desarmar esto al agregar features.
5. **Sin `package.json`.** Es intencional, no un olvido.

## Deuda técnica conocida

No está pendiente de un ticket, pero está registrado:

- `script.js:156-183` — **dos `IntersectionObserver` redundantes** sobre los
  mismos elementos. Ambos se disparan y hacen el mismo trabajo.
- `script.js:230-245` — listeners de `.skill-card` que **nunca ejecutan**: la
  clase `.skill-card` ya no existe en el HTML (se reemplazó por `.skills-simple`
  con `<span>`). Código muerto.
- `script.js:247-253` — handler de `mailto:` sin efectos en el HTML actual.
- `style.css` — quedan bloques de clases que el HTML ya no usa
  (`.skills-grid`, `.project-mockup`, `.chat-message`, `.hero-label`,
  `.scroll-indicator`). CSS muerto.
- `body` tiene `padding-left/right: 40px` fijo (`style.css:56-57`) — revisar en
  viewport angosto.
- Imágenes de proyectos viajan por URLs hotlinkeadas de Google/CDN que pueden
  caerse (`encrypted-tbn0.gstatic.com`). Considerar `assets/` local.
- Sin `alt` descriptivo en varias imágenes de proyecto.

## Cómo hacer cambios comunes

**Agregar un proyecto:** duplicar un `<article class="project-card">` en
`index.html` dentro de `.projects-grid`. Mantener la estructura
`project-card-visual > mockup-overlay > mockup-badge` + `project-card-info`.

**Agregar un skill:** un `<span>` en `.skills-simple` (`index.html:118-136`).
Son chips con icono FontAwesome inline, no cards.

**Cambiar textos del hero:** `index.html:44-58`. Los delays de animación van en
`style="--delay: Xs"` inline, en orden ascendente.

**Cambiar textos de trayectoria:** `.timeline` (`index.html:258-286`). Cada
`timeline-item` = `timeline-marker` + `timeline-content`.

**Deploy:** commitear en la rama por defecto y push. No hay build ni environment
variables que configurar.

## Frases útil para revisar trabajo en este repo

- *"El form manda a dos lados: `index.html:343` y `script.js:307`."*
- *"Usá `var(--accent)`, no el hex."*
- *"El canvas corre en `requestAnimationFrame` infinito — no lo rompas."*