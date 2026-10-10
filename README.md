# portafolio-josue-solis

Portafolio personal de **Josué Solís** — Chatbot Developer & AI Specialist
especializado en Dialogflow CX, Python y FastAPI.

Sitio web estático de una sola página, en español, con tema oscuro. Sin
frameworks, sin build step, sin dependencias: HTML, CSS y JavaScript vanilla
servidos directamente por GitHub Pages.

**Demo:** <https://josue1dario2.github.io/portafolio-josue-solis/>

## Stack

- HTML5 semántico
- CSS3 con custom properties (dark mode, acento verde-teal)
- JavaScript vanilla (canvas de partículas, menú móvil, animaciones on-scroll, form)
- [Font Awesome 6.5](https://fontawesome.com/) + Google Fonts (Inter, Space Grotesk)
- [Formspree](https://formspree.io) para el formulario de contacto
- GitHub Pages para el deploy

## Estructura

```
.
├── index.html   # Estructura y contenido (389 líneas)
├── style.css    # Estilos completos y responsive (1951 líneas)
├── script.js    # Interacciones (332 líneas)
├── AGENTS.md    # Instrucciones para agentes de IA
└── MEMORY.md    # Contexto y decisiones del proyecto
```

## Desarrollo local

No hay nada que instalar ni compilar. Sólo serví la carpeta:

```bash
python3 -m http.server 8000
```

Abrí <http://localhost:8000>. Un `file://` directo también funciona, pero el
form necesita un origen real para hablar con Formspree.

### Verificación

No hay suite de tests ni linter. Antes de dar por terminado un cambio:

1. La página carga sin errores en la consola.
2. Navegá con mouse y con Tab por teclado.
3. Revisá a `> 1024px`, `768-1024px` y `< 768px`.
4. Si tocaste `script.js`: canvas corriendo, menú móvil, scroll suave, form OK.

## Secciones

| Sección | `id` | Contenido |
|---|---|---|
| Hero | `#inicio` | Nombre, título, CTAs, avatar, badges de stack |
| Sobre mí | `#sobre-mi` | Copy + 3 stats (años, proyectos, tecnologías) |
| Skills | `#skills` | 18 chips de tecnologías |
| Proyectos | `#proyectos` | 1 destacado + 3 cards con link externo |
| Experiencia | `#experiencia` | Timeline de 3 empleos |
| Educación | *(sin id)* | UTN + plataformas de certificación |
| Contacto | `#contacto` | Form Formspree + LinkedIn + GitHub |

## Contacto

El formulario postea a Formspree y se maneja con `fetch` + validación en cliente
(`script.js:255-331`). El endpoint está duplicado en `index.html:343` y
`script.js:307` — si lo cambiás, cambiá los dos.

## Deploy

Todo está en la rama por defecto y GitHub Pages publica desde ahí. Para desplegar:

```bash
git add .
git commit -m "refactor: <descripción en español>"
git push origin main
```

No hay paso de build, ni variables de entorno, ni configuración en GitHub
Actions.

## Convenciones

- Todo el contenido visible al usuario está en **español**.
- Identificadores y clases en español (`#sobre-mi`, `.experiencia`) — es
  intencional, no lo "corregas".
- El CSS usa custom properties: usá `var(--accent)`, `var(--text-secondary)`,
  etc. en lugar de hexadecimales literales.
- Detalles completos en [`AGENTS.md`](AGENTS.md).

## Contacto del autor

- [LinkedIn](https://www.linkedin.com/in/josue-dario-solis/)
- [GitHub](https://github.com/josue1dario2)