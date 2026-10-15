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

Este projeto é uma página de links inspirada em ferramentas como o Linktree, sem planos pagos. Todo o conteúdo e a aparência são controlados pelo arquivo [`js/config.js`](js/config.js), sem precisar modificar a estrutura do HTML.

## Recursos

- Três layouts de topo: `classic`, `hero` e `banner`
- Foto de perfil e imagem de banner independentes
- Temas `dhampir`, `bronze` e `creme`
- Sistema modular de eixos: ícones, cards, fundo e hover escolhidos de forma independente
- Ícones para WhatsApp, Instagram, TikTok e Spotify, em três estilos
- Organização de links por grupos
- Visualização em grid ou carrossel
- Layout responsivo, pensado primeiro para celular
- Grid com duas colunas em telas maiores
- Pré-visualização de opções pela URL, sem editar arquivos
- Configuração simples usando HTML, CSS e JavaScript puro

## Configuração

Abra [`js/config.js`](js/config.js) e altere as opções do perfil:

```js
window.PERFIL = {
  layout: "hero",        // classic | hero | banner
  exibicao: "grid",      // grid | carousel
  tema: "dhampir",       // dhampir | bronze | creme
  icones: "traco",       // traco | preenchido | bolha
  cards: "vidro",        // vidro | solido | contorno | lista
  fundo: "foto-blur",    // foto-blur | gradiente | solido
  hover: "balanco",      // fundo | salto | brilho | balanco
  nome: "@DHAMPIRKID",
  foto: "assets/images/perfil.png",
  banner: "assets/images/banner.png",
  redes: [],
  grupos: []
};
```

### Eixos de personalização

Cada eixo muda um aspecto da página e pode ser combinado livremente com os outros.

| Eixo | Opções | O que muda |
| --- | --- | --- |
| `layout` | `classic`, `hero`, `banner` | Estrutura do topo (foto, banner, avatar) |
| `exibicao` | `grid`, `carousel` | Como as seções de cada grupo são dispostas |
| `tema` | `dhampir`, `bronze`, `creme` | Cores, fontes, raio e intensidade do blur |
| `icones` | `traco`, `preenchido`, `bolha` | Estilo dos ícones das redes |
| `cards` | `vidro`, `solido`, `contorno`, `lista` | Aparência dos cards de cada seção |
| `fundo` | `foto-blur`, `gradiente`, `solido` | Fundo da página |
| `hover` | `fundo`, `salto`, `brilho`, `balanco` | Animação dos ícones ao passar o mouse |

### Pré-visualizar pela URL

Os eixos `tema`, `icones`, `cards`, `fundo` e `hover` podem ser testados direto na URL, sem editar o `config.js`:

```text
?tema=creme&cards=lista&fundo=gradiente&icones=bolha&hover=brilho
```

### Adicionando uma rede social

Inclua um novo item dentro de `redes` (ou dentro de `redes` de uma seção):

```js
{
  tipo: "spotify",
  url: "https://open.spotify.com/seu-link"
}
```

O `tipo` precisa ter um arquivo com o mesmo nome em cada pasta de estilo de ícone, por exemplo `assets/icons/traco/spotify.svg`, `assets/icons/preenchido/spotify.svg` e `assets/icons/bolha/spotify.svg`.

### Adicionando um grupo

Os negócios e projetos ficam dentro de `grupos`:

```js
{
  titulo: "Meus projetos",
  secoes: [
    {
      titulo: "Nome do projeto",
      imagem: "assets/images/projeto.png",   // proporção 16:9
      texto: "Descrição opcional.",
      redes: []
    }
  ]
}
```

### Criando um tema

Cada tema é um bloco de variáveis em [`css/themes.css`](css/themes.css). Copie um bloco existente, mude o nome e os valores e use o nome novo em `tema`:

```css
[data-tema="meu-tema"] {
  --bg: #101010;
  --bg2: #2a2a2a;
  --texto: #f0f0f0;
  --destaque: #ff8a5c;
  /* ... demais variáveis, como nos outros temas */
}
```

## Estrutura

```text
linktree/
├── index.html
├── README.md
├── assets/
│   ├── images/
│   └── icons/
│       ├── traco/
│       ├── preenchido/
│       └── bolha/
├── css/
│   ├── style.css
│   └── themes.css
└── js/
    └── config.js
```

## Como executar

Use um servidor local, como o Live Server do VS Code ou `npx serve`. Abrir o `index.html` direto pelo navegador (`file://`) não funciona direito, porque os ícones são carregados por máscara CSS e o navegador bloqueia isso em arquivos locais.

## Gerar imagens Open Graph

Para gerar as imagens Open Graph, execute os seguintes comandos:

```bash
run npm install
npm run og
```

## Publicação

O projeto é um site estático. No Vercel, importe o repositório sem framework e sem comando de build. Cada push publica uma nova versão.

<!-- ## Créditos

Os ícones vêm do [SVG Repo](https://www.svgrepo.com). Cada conjunto tem sua própria licença, então liste aqui o autor e a licença de cada um:

- Traço: _autor e licença_
- Preenchido: _autor e licença_
- Bolha: _autor e licença_ -->

## Ideias de melhorias e Implementações

### Base e personalização

- [ ] Adicionar suporte a mais redes sociais
- [x] Adicionar suporte a mais layouts
- [x] Adicionar suporte a mais temas
- [x] Sistema modular de eixos (ícones, cards, fundo e hover)
- [ ] Cada tema definir os valores padrão dos eixos
- [ ] Eixo `fonte`, independente do tema
- [ ] Eixo `animacao` com entrada em cascata dos cards, respeitando `prefers-reduced-motion`
- [ ] Fundo com movimento lento como nova opção do eixo `fundo`
- [ ] Tema claro e escuro automático, ou botão para alternar

### Conteúdo e recursos

- [ ] Adicionar suporte a player de música
- [ ] Adicionar visualização das últimas fotos do Instagram
- [ ] Links simples em texto, além das seções com imagem
- [ ] Links agendados, com campos `desde` e `ate` para exibir por período
- [ ] Botão "Salvar contato" que baixa um vCard (`.vcf`)
- [ ] Botão de compartilhar com QR code gerado no navegador
- [ ] Estatísticas de cliques, por redirecionador em função serverless ou por analytics
- [ ] Adicionar suporte a privacidade e links adultos com confirmação de idade
- [ ] Adicionar internacionalização (i18n)
  - [ ] Adicionar suporte a inglês
  - [ ] Adicionar suporte a espanhol

### Desempenho, SEO e segurança

- [ ] Imagem de pré-visualização ao compartilhar (`og:image`, `og:title` e `og:description` direto no `index.html`)
- [ ] Converter imagens para WebP ou AVIF e redimensionar
- [ ] Gerar o HTML no deploy com um script Node que lê o `config.js`
- [ ] `vercel.json` com cabeçalhos de segurança (`Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy`) e cache longo para `assets/`
- [ ] Escapar o texto antes do `innerHTML` e aceitar apenas URLs `http(s)`, `mailto` e `wa.me`

### Acessibilidade

- [ ] `aria-label` descritivo nos ícones, como "WhatsApp da Axofix"
- [ ] Conferir o contraste de cores nos temas `bronze` e `creme`