// Gera assets/og.jpg (1200x630, padrão Open Graph 1,91:1) a partir do js/config.js e do tema escolhido.
// Uso: npm run og
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import opentype from "opentype.js";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const arq = p => path.join(raiz, p);
const L = 1200, A = 630, D = 240; // largura, altura, diâmetro do ícone

// 1. Lê o config.js (ele define window.PERFIL)
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(arq("js/config.js"), "utf8"), ctx);
const P = ctx.window.PERFIL;
const og = P.og || {}; // opcional: { fundo, fonte, arquivo }

// 2. Pega as cores do tema ativo em css/themes.css
const css = fs.readFileSync(arq("css/themes.css"), "utf8");
const bloco = css.match(new RegExp(`\\[data-tema="${P.tema}"\\]\\s*\\{([^}]*)\\}`))?.[1] || "";
const v = Object.fromEntries([...bloco.matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)].map(m => [m[1], m[2].trim()]));
const bg = v.bg || "#140f22";
const destaque = v.destaque || "#ffffff";

// 3. Fundo: "blur" (banner desfocado), "imagem" (banner puro) ou "solido" (cor do tema)
const fundo = og.fundo || "blur";
let base;
if (fundo === "solido") {
  base = sharp({ create: { width: L, height: A, channels: 3, background: bg } });
} else {
  base = sharp(arq(P.banner || P.foto)).resize(L, A, { fit: "cover" });
  if (fundo === "blur") base = base.blur(40);
}
const escurecer = fundo === "solido" ? "" : `<rect width="${L}" height="${A}" fill="${bg}" fill-opacity="0.45"/>`;
const camadaFundo = Buffer.from(`<svg width="${L}" height="${A}" xmlns="http://www.w3.org/2000/svg">${escurecer}</svg>`);

// 4. Ícone redondo
const mascara = Buffer.from(`<svg width="${D}" height="${D}"><circle cx="${D / 2}" cy="${D / 2}" r="${D / 2}"/></svg>`);
const icone = await sharp(arq(P.foto))
  .resize(D, D, { fit: "cover", position: sharp.strategy.attention })
  .composite([{ input: mascara, blend: "dest-in" }])
  .png().toBuffer();

// 5. Nome: vira curva se houver fonte .ttf/.otf; senão usa a fonte do sistema
const cx = L / 2;
const nome = P.nome;
const arqFonte = arq(og.fonte || "assets/fonts/Oxanium-Bold.ttf");
let tam = 72, fonte = null;
if (fs.existsSync(arqFonte)) {
  const dados = fs.readFileSync(arqFonte);
  fonte = opentype.parse(dados.buffer.slice(dados.byteOffset, dados.byteOffset + dados.byteLength));
  while (fonte.getAdvanceWidth(nome, tam) > L - 160 && tam > 40) tam -= 4;
} else {
  console.warn("Aviso: fonte não encontrada, usando a fonte padrão do sistema.");
}
// o conjunto ícone + nome fica centralizado na altura
const topo = Math.round((A - (D + 36 + tam * 0.8)) / 2);
const cy = topo + D / 2;
const y = topo + D + 36 + tam * 0.8;
const xml = nome.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const texto = fonte
  ? `<path fill="${destaque}" d="${fonte.getPath(nome, (L - fonte.getAdvanceWidth(nome, tam)) / 2, y, tam).toPathData(2)}"/>`
  : `<text x="${cx}" y="${y}" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="${tam}" fill="${destaque}">${xml}</text>`;
const camadaTexto = Buffer.from(
  `<svg width="${L}" height="${A}" xmlns="http://www.w3.org/2000/svg">
     <circle cx="${cx}" cy="${cy}" r="${D / 2 + 8}" fill="none" stroke="${destaque}" stroke-width="8"/>
     ${texto}
   </svg>`
);

// 6. Junta tudo (JPEG leve: previews muito pesados podem não aparecer no WhatsApp)
const saida = arq(og.arquivo || "assets/og.jpg");
fs.mkdirSync(path.dirname(saida), { recursive: true });
await base
  .composite([
    { input: camadaFundo },
    { input: icone, left: (L - D) / 2, top: topo },
    { input: camadaTexto }
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(saida);

console.log(`OK: ${path.relative(raiz, saida)} (${Math.round(fs.statSync(saida).size / 1024)} KB)`);
