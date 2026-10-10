# AGENTS.md — portafolio-josue-solis

Instrucciones para agentes de IA que trabajen en este repositorio.

## Contexto del proyecto

Portafolio personal de **Josué Solís** (Chatbot Developer & AI Specialist). Sitio web
estático de una sola página, en español, publicado en GitHub Pages.

**No es un proyecto Node/Python.** No existe `package.json`, ni build step, ni
dependencias instalables. Todo el stack vive en CDNs (`<link>` / `<script>` en
`index.html`). Cualquier instrucción que asuma `npm install`, bundlers, tests o
linters **no aplica** aquí.

## Archivos

| Archivo | Contenido | Responsabilidad |
|---|---|---|
| `index.html` | Estructura y contenido (389 líneas) | Toda la copy y el marcado |
| `style.css` | Estilos completos (1951 líneas) | Toda la presentation,incluye responsive |
| `script.js` | Todo el JS en un solo bloque `DOMContentLoaded` (332 líneas) | Particles, scroll, menú, form |

Regla clave: **estos tres archivos son independientes**. CSS y JS no tienen
imports; los selects de JS apuntan a clases definidas en CSS.

## Convenciones obligatorias

### Idioma
- Todo el contenido visible al usuario está en **español** (copie, `placeholder`,
  mensajes de error del form, `alt`). No traducir al inglés.
- Comentarios de código y commits también en español, siguiendo el estilo ya
  existente (ver `git log`: `refactor: Modificar experiencia laborarl`).
- Nombres de variables, funciones e IDs: **inglés** (ya mezclado en el código
  original — no "corregir" esto, sólo seguir la convención existente al agregar).

### Estilos
- **Nunca escribir valores hexadecimales ni rgba literales.** Todo color, spacing
  tipográfico y transición sale de las custom properties de `:root`
  (`style.css:2-27`): `--accent`, `--bg-card`, `--text-secondary`, `--border`,
  `--transition`, etc.
- La paleta es **dark mode only**: fondo `#080808`, acento verde-teal `#00d4aa`.
  No agregar tema claro.
- Spatial: usar el bloque `.container` para todo contenido de sección.
- Responsive: los breakpoints son `1024px` y `768px` (`style.css:1792`, `1873`).
  Cualquier elemento nuevo necesita revisar ambos, y `prefers-reduced-motion`
  (`style.css:1945`).
- Mobile-first no aplica: el diseño es desktop-first y se degrada hacia abajo.

### JavaScript
- Todo el código vive dentro de un único `document.addEventListener('DOMContentLoaded', ...)`.
  Agregar features **dentro** de ese callback, no crear scripts nuevos ni
  `<script>` adicionales en el HTML.
- Vanilla JS puro. **Sin frameworks, sin npm, sin transpilar** (nada de `import`,
  `require`, arrow functions con sintaxis moderna ya está bien pero nada de
  async/await fuera del handler del form, que ya lo usa).
- Guardar siempre: `const el = document.querySelector(...)` y chequear
  `if (el)` antes de operar — patrón consistente en todo el archivo.
- Selectores de clase en kebab-case (`.project-card`, `.menu-btn`).

### Contenido
- Las secciones están ancladas por `id` en español: `#inicio`, `#sobre-mi`,
  `#skills`, `#proyectos`, `#experiencia`, `#contacto`.
  El nav y el smooth-scroll de `script.js:204` dependen de esos ids.
- Al agregar un `<a href="#...">` nuevo, el `id` destino debe existir.

## Verificación manual

No hay suite de tests ni linter. Verificar así:

```bash
# Servidor local (Python viene con el stack del usuario)
python3 -m http.server 8000
# abrir http://localhost:8000
```

Checklist antes de dar por terminado un cambio:

1. La página carga sin errores en la consola.
2. Navegar con el mouse **y** con Tab por teclado.
3. Revisar la sección modificada a `> 1024px`, `768-1024px` y `< 768px`.
4. Si se tocó `script.js`: el canvas de partículas sigue corriendo, el menú móvil
   abre/cierra, el scroll suave no queda tapado por el header, el form de
   contacto sigue enviando.

## Deploy

`origin` → `https://github.com/josue1dario2/portafolio-josue-solis.git`.
Publicación por GitHub Pages desde la rama por defecto. **Push a la rama por
defecto = deploy a producción.** No pedir confirmación para el push sólo si el
usuario lo pidió explícitamente.

## Formulario de contacto

Usa [Formspree](https://formspree.io) con el endpoint `mnpnrydn`. Está escrito
**dos veces**: en el `action` del `<form>` (`index.html:343`) y en el `fetch` de
`script.js:307`. **Cambiar uno sin el otro rompe el envío.** Si se rota el ID de
Formspree, actualizar ambos.

## Fuera de alcance

- No agregar dependencias, frameworks, bundlers ni pasos de build.
- No migrar a Astro/Next/Vite sin pedido explícito.
- No agregar un CMS, base de datos ni backend.
- No tocar `.git/` ni crear archivos de secrets.