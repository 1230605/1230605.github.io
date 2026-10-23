import sharp from 'sharp';
const lines = Array.from({ length: 33 }, (_, i) => {
  const t = i / 32;
  return `<path d="M ${170+t*130} ${100+t*30} C ${520-t*95} ${15+t*200}, ${510-t*290} ${460+t*65}, ${285-t*60} ${485-t*40} C ${55+t*125} ${420-t*180}, ${90+t*260} ${110-t*35}, ${170+t*130} ${100+t*30}"/>`;
}).join('');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#f6f4ef"/><path d="M65 65h1070M65 565h1070" stroke="#d5d3c9"/><text x="65" y="115" font-family="sans-serif" font-size="13" letter-spacing="3" fill="#686b61">RESEARCH &amp; NOTES</text><text x="60" y="280" font-family="Georgia,serif" font-size="63" fill="#292a27">A practice</text><text x="60" y="365" font-family="Georgia,serif" font-style="italic" font-size="63" fill="#292a27">of curiosity.</text><text x="65" y="515" font-family="sans-serif" font-size="14" letter-spacing="2" fill="#686b61">OBSERVE. REFLECT. CREATE.</text><g transform="translate(620 50) scale(.85)" fill="none" stroke="#4a5047" stroke-width=".8">${lines}<circle cx="417" cy="185" r="7" stroke="none" fill="#97523d"/></g></svg>`;
await sharp(Buffer.from(svg)).png().toFile('public/images/social.png');
