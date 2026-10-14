<div align="center">
  <a href="index.html">
    <img src="assets/images/perfil.png" alt="DhampirKid Icon" width="100" height="100" />
  </a>
  <h1>DhampirKid Linktree</h1>
  <p>Uma página de links pessoal, responsiva e personalizável para reunir redes sociais, projetos e negócios.</p>
  <div>
    <img src="https://img.shields.io/badge/HTML5-131327.svg?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
    <img src="https://img.shields.io/badge/CSS3-131327.svg?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
    <img src="https://img.shields.io/badge/JavaScript-131327.svg?style=for-the-badge&logo=javascript&logoColor=white" alt="JavaScript" />
  </div>
  <div>
    <img src="https://img.shields.io/badge/Status-Active-131327.svg?style=flat" alt="Project Status" />
    <img src="https://img.shields.io/badge/Made%20by-Paule-131327.svg" alt="Made by" />
    <img src="https://img.shields.io/badge/Made%20with-%E2%9D%A4%EF%B8%8F-131327.svg" alt="Love" />
  </div>
</div>

## Sobre

Este projeto é uma página de links inspirada em ferramentas como Linktree. Todo o conteúdo pode ser alterado pelo arquivo [`js/config.js`](js/config.js), sem precisar modificar a estrutura do HTML.

## Recursos

- Três layouts: `classic`, `hero` e `banner`
- Foto de perfil e imagem de banner independentes
- Temas `dhampir`, `bronze` e `creme`
- Ícones para WhatsApp, Instagram, TikTok, Spotify e links genéricos
- Organização de links por grupos
- Visualização em grid ou carrossel
- Layout responsivo para celular, tablet e desktop
- Grid com duas colunas em telas maiores
- Configuração simples usando HTML, CSS e JavaScript puro

## Configuração

Abra [`js/config.js`](js/config.js) e altere as opções do perfil:

```js
window.PERFIL = {
  layout: "hero",
  exibicao: "grid",
  tema: "dhampir",
  nome: "@DHAMPIRKID",
  foto: "assets/images/perfil.png",
  banner: "assets/images/banner.png"
};
```

### Layouts

```js
layout: "classic"
layout: "hero"
layout: "banner"
```

### Grid ou carrossel

```js
exibicao: "grid"
```

ou:

```js
exibicao: "carousel"
```

### Adicionando uma rede social

Inclua um novo item dentro de `redes`:

```js
{
  tipo: "spotify",
  url: "https://open.spotify.com/seu-link"
}
```

### Adicionando um grupo

Os negócios e projetos ficam dentro de `grupos`:

```js
{
  titulo: "Meus projetos",
  secoes: [
    {
      titulo: "Nome do projeto",
      imagem: "assets/images/projeto.png",
      texto: "Descrição opcional.",
      redes: []
    }
  ]
}
```

## Estrutura

```text
linktree/
├── index.html
├── README.md
├── assets/
│   └── images/
├── css/
│   ├── style.css
│   └── themes.css
└── js/
    └── config.js
```

## Como executar

Abra o arquivo [`index.html`](index.html) diretamente no navegador ou use uma extensão de servidor local, como o Live Server do VS Code.