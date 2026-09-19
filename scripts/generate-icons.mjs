/**
 * Genera el juego de iconos a partir de public/favicon.svg.
 *
 * El SVG es la fuente: todo lo demás se deriva de él, así que para cambiar la
 * marca se edita ese archivo y se vuelve a ejecutar `npm run icons`.
 *
 * Qué sale y para qué:
 *   favicon.ico            navegadores viejos y rastreadores que no leen SVG
 *   favicon-16/32.png      respaldo del SVG
 *   apple-touch-icon.png   pantalla de inicio en iOS, 180px y sin transparencia
 *   icon-192/512.png       instalación como aplicación
 *   og-image.png           tarjeta de enlace: ninguna red social renderiza SVG,
 *                          con el fractal de Newton de fondo, calculado aquí
 *
 * La tarjeta usa las fuentes del sistema para el texto, así que el PNG puede
 * salir con otra letra en otra máquina. Se versiona el resultado, de modo que
 * eso solo importa cuando alguien vuelve a generarlo.
 */
import { Buffer } from 'node:buffer';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const PUBLIC_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const SOURCE = join(PUBLIC_DIR, 'favicon.svg');

// Los mismos tonos que el tema oscuro de src/index.css.
const INK = '#ece8df';
const TILE = '#13120f';
const MUTED = '#8f8a7e';

const PNGS = [
  { name: 'favicon-16.png', size: 16 },
  { name: 'favicon-32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
];

/** Rasteriza el SVG al tamaño pedido. `density` evita que el trazo salga sucio. */
async function render(svg, size) {
  return sharp(svg, { density: Math.max(72, Math.ceil((size / 32) * 72)) })
    .resize(size, size, { fit: 'contain' })
    .png({ compressionLevel: 9, palette: true })
    .toBuffer();
}

/**
 * Empaqueta varios PNG en un .ico. Desde Windows Vista el formato admite PNG
 * dentro del contenedor, así que basta con la cabecera y el directorio.
 */
function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reservado
  header.writeUInt16LE(1, 2); // 1 = icono
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + images.length * 16;
  const entries = [];
  for (const { size, data } of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // ancho, 0 significa 256
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // alto
    entry.writeUInt8(0, 2); // colores de la paleta
    entry.writeUInt8(0, 3); // reservado
    entry.writeUInt16LE(1, 4); // planos
    entry.writeUInt16LE(32, 6); // bits por píxel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += data.length;
  }

  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

/**
 * Fondo de la tarjeta: las cuencas de convergencia de Newton-Raphson sobre
 * z³ = 1. Cada píxel es un punto de partida; se itera hasta que cae en una de
 * las tres raíces, y el tono sale de cuál le tocó y de cuántos pasos tardó.
 * No es un adorno: es uno de los métodos de la aplicación, dibujado.
 */
function newtonField(width, height) {
  const raw = Buffer.alloc(width * height * 3);

  const [tr, tg, tb] = [0x13, 0x12, 0x0f];
  // El tono al que llega la filigrana. Un gris cálido, nunca el blanco del
  // texto: el fondo no debe competir con lo que hay escrito encima.
  const glow = [
    [150, 138, 116],
    [128, 120, 104],
    [166, 150, 122],
  ];

  const span = 5.2;
  const scale = span / width;
  const cx = width * 0.63;
  const cy = height * 0.5;
  const maxIter = 30;

  for (let py = 0; py < height; py += 1) {
    const zi0 = (py - cy) * scale;
    for (let px = 0; px < width; px += 1) {
      const zr0 = (px - cx) * scale;

      let zr = zr0;
      let zi = zi0;
      let iter = 0;
      for (; iter < maxIter; iter += 1) {
        // z - (z³ - 1) / (3z²), en aritmética compleja a mano.
        const r2 = zr * zr - zi * zi;
        const i2 = 2 * zr * zi;
        const r3 = r2 * zr - i2 * zi;
        const i3 = r2 * zi + i2 * zr;
        const dr = 3 * r2;
        const di = 3 * i2;
        const den = dr * dr + di * di;
        if (den < 1e-12) break;
        const nr = r3 - 1;
        const ni = i3;
        zr -= (nr * dr + ni * di) / den;
        zi -= (ni * dr - nr * di) / den;
        if (Math.abs(r3 - 1) + Math.abs(i3) < 1e-6) break;
      }

      // ¿En qué raíz cayó? Las tres son 1 y -1/2 ± i·(√3/2).
      let basin = 0;
      if (zr < -0.1) basin = zi > 0 ? 1 : 2;

      // Lo que brilla es tardar: donde Newton duda, en la frontera entre
      // cuencas, es donde está el dibujo. El interior se queda en el fondo.
      const t = Math.pow(Math.min(iter / 16, 1), 2.1);

      // Un degradado deja limpio el lecho del texto a la izquierda.
      const bed = Math.min(1, Math.max(0, (px - width * 0.2) / (width * 0.34)));

      const k = t * bed;
      const [gr, gg, gb] = glow[basin];
      const o = (py * width + px) * 3;
      raw[o] = Math.round(tr + (gr - tr) * k);
      raw[o + 1] = Math.round(tg + (gg - tg) * k);
      raw[o + 2] = Math.round(tb + (gb - tb) * k);
    }
  }

  return raw;
}
/** El texto que va encima del fondo. */
function ogText(markPath) {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <g transform="translate(96 168) scale(3.4)" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="butt" stroke-linejoin="miter">
    <path d="${markPath}"/>
  </g>
  <text x="96" y="382" fill="${INK}" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="74" font-weight="600" letter-spacing="-1.8">Métodos</text>
  <text x="96" y="456" fill="${INK}" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="74" font-weight="600" letter-spacing="-1.8">numéricos</text>
  <rect x="96" y="498" width="72" height="3" fill="${INK}"/>
  <text x="96" y="548" fill="${MUTED}" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="25">Teoría, calculadora y visualización, método a método.</text>
</svg>`);
}

const svg = await readFile(SOURCE);
const markPath = /<path d="([^"]+)"/.exec(svg.toString())?.[1];
if (!markPath) throw new Error('No encontré el trazado de la marca en favicon.svg');

const written = [];

for (const { name, size } of PNGS) {
  const data = await render(svg, size);
  await writeFile(join(PUBLIC_DIR, name), data);
  written.push([name, data.length]);
}

const icoSizes = [16, 32, 48];
const icoImages = await Promise.all(
  icoSizes.map(async (size) => ({ size, data: await render(svg, size) }))
);
const ico = buildIco(icoImages);
await writeFile(join(PUBLIC_DIR, 'favicon.ico'), ico);
written.push(['favicon.ico', ico.length]);

const OG = { width: 1200, height: 630 };
const og = await sharp(newtonField(OG.width, OG.height), {
  raw: { ...OG, channels: 3 },
})
  .composite([{ input: ogText(markPath) }])
  .png({ compressionLevel: 9 })
  .toBuffer();
await writeFile(join(PUBLIC_DIR, 'og-image.png'), og);
written.push(['og-image.png', og.length]);

const width = Math.max(...written.map(([name]) => name.length));
for (const [name, bytes] of written) {
  console.log(`${name.padEnd(width)}  ${(bytes / 1024).toFixed(1)} kB`);
}
