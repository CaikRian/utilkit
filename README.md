# UTILKit — UX/Front-end Utility Playground (HTML/CSS/JS + Vue bonus)

Demonstra **interfaces dinâmicas com HTML, CSS e JavaScript puros**, foco em **responsividade, usabilidade e performance**, colaboração com UX (styleguide/tokens) e **bônus Vue**.

## ✨ Funcionalidades
- **UI Responsiva** (mobile-first) com grade fluida e tokens de design (CSS vars).
- **Interações JS**: filtro de cards, modal acessível, tabs, form validation, tema claro/escuro, ajuste de fonte.
- **Acessibilidade**: navegação por teclado, foco visível, semântica, **Contrast Checker** (WCAG) em `/pages/a11y.html`.
- **Performance**: HUD de **Web Vitals** (LCP, FID, CLS) via `PerformanceObserver` em tempo real.
- **Integração com “API”**: carrega dados de `/data/items.json` (simula backend).
- **Styleguide**: `/pages/styleguide.html` com cores, tipografia e componentes.
- **Vue (bônus)**: `/vue/index.html` com um mini widget reativo (via CDN).

## 🚀 Como rodar
### Opção 1 — Abrir direto
Dê **duplo clique** em `index.html`. (A página Vue requer internet para carregar a CDN.)

### Opção 2 — Servidor local (recomendado)
```bash
# usando Python 3
python -m http.server 5500
# ou (Node) npx serve
# depois abra http://localhost:5500
```

## 🧭 Páginas principais
- `index.html` — Home + cards filtráveis + HUD de performance + modal/tabs + formulário.
- `/pages/styleguide.html` — tokens, tipografia e exemplos de componentes.
- `/pages/a11y.html` — checklist + Contrast Checker (WCAG).
- `/vue/index.html` — componente em Vue (bônus).

## 🛠 Tech
HTML5 semântico, CSS3 (custom properties), JavaScript (ES Modules), **Vue 3 (bônus)**.

## 📂 Estrutura
```
utilkit/
├── index.html
├── assets/
│   ├── css/styles.css
│   └── js/{app.js, perf.js, a11y.js, utils.js}
├── pages/{styleguide.html, a11y.html}
├── data/items.json
└── vue/index.html
```

## 🧪 Testes realizados
- **HTML/CSS/JS dinâmicos**, **responsividade** forte, foco em **UX/UI**.
- **Usabilidade/performance**: métricas Web Vitals e micro ajustes.
- **Trabalho com protótipos/design tokens** (styleguide).
- **Bônus: Vue.js** (componente reativo simples).
