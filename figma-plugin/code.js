// Plugin Figma : importe la phase de conception (docs/figma/*) dans le fichier courant.
// Crée les pages, les variables (couleurs, espacements, rayons), les styles de texte,
// le brainstorming, les personas, l'arborescence, le moodboard, les wireframes et
// les premiers composants. Peut être relancé : il remplace ce qu'il a lui-même créé.

const MARK = 'neuf-lunes-import';

// ---------- Données (issues de docs/figma/05-design-system.md) ----------

const COLORS = {
  'primary': '#C9826B',
  'primary-dark': '#A9624C',
  'secondary': '#8FA68E',
  'secondary-light': '#E4ECE3',
  'accent': '#F4D6C6',
  'background': '#FBF7F2',
  'surface': '#FFFFFF',
  'text': '#2F2A26',
  'text-muted': '#6E645C',
  'border': '#E8DFD5',
  'success': '#4F7A5A',
  'warning': '#B7791F',
  'error': '#B3413A',
  'stage/preconception': '#B9A7D6',
  'stage/trimestre-1': '#F4D6C6',
  'stage/trimestre-2': '#C9826B',
  'stage/trimestre-3': '#8FA68E',
  'stage/allaitement': '#A7C4D6',
};

const SPACING = { '1': 4, '2': 8, '3': 12, '4': 16, '6': 24, '8': 32, '12': 48, '16': 64, '24': 96, '32': 128 };
const RADIUS = { 'field': 8, 'card': 16, 'pill': 999 };

// [nom, famille (heading|body), poids, taille desktop, taille mobile, interligne %]
const TEXT_STYLES = [
  ['H1', 'heading', 600, 56, 36, 110],
  ['H2', 'heading', 600, 40, 30, 120],
  ['H3', 'heading', 500, 28, 24, 125],
  ['H4', 'body', 700, 20, 18, 130],
  ['Texte large', 'body', 400, 20, 18, 150],
  ['Texte', 'body', 400, 16, 16, 160],
  ['Petit', 'body', 400, 14, 14, 150],
  ['Bouton', 'body', 500, 15, 15, 100],
];

const PAGES = [
  '00 · Cover',
  '01 · Brainstorming',
  '02 · Moodboard',
  '03 · Wireframes',
  '04 · Design system',
  '05 · Maquettes Desktop',
  '06 · Maquettes Mobile',
  '07 · Prototype',
];

// ---------- Utilitaires ----------

function rgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return { r: ((n >> 16) & 255) / 255, g: ((n >> 8) & 255) / 255, b: (n & 255) / 255 };
}
function solid(hex) {
  return [{ type: 'SOLID', color: rgb(hex) }];
}

const FONTS = {};
async function pickFont(family, styles) {
  for (const style of styles) {
    try {
      await figma.loadFontAsync({ family, style });
      return { family, style };
    } catch (e) { /* style indisponible, on essaie le suivant */ }
  }
  return null;
}
async function loadFonts() {
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  const inter = async (s) => (await pickFont('Inter', [s, 'Regular']));
  FONTS.heading600 = (await pickFont('Fraunces', ['SemiBold', 'Semi Bold'])) || (await inter('Semi Bold'));
  FONTS.heading500 = (await pickFont('Fraunces', ['Medium'])) || (await inter('Medium'));
  FONTS.body400 = (await pickFont('DM Sans', ['Regular'])) || (await inter('Regular'));
  FONTS.body500 = (await pickFont('DM Sans', ['Medium'])) || (await inter('Medium'));
  FONTS.body700 = (await pickFont('DM Sans', ['Bold'])) || (await inter('Bold'));
}
function font(family, weight) {
  return FONTS[family + weight] || FONTS.body400;
}

function text(content, opts = {}) {
  const t = figma.createText();
  t.fontName = opts.font || FONTS.body400;
  t.characters = content;
  t.fontSize = opts.size || 16;
  t.fills = solid(opts.color || COLORS.text);
  if (opts.lineHeight) t.lineHeight = { unit: 'PERCENT', value: opts.lineHeight };
  if (opts.width) {
    t.textAutoResize = 'HEIGHT';
    t.resize(opts.width, t.height);
  }
  return t;
}
function heading(content, size = 32) {
  return text(content, { font: FONTS.heading600, size, lineHeight: 115 });
}

function frame(name, opts = {}) {
  const f = figma.createFrame();
  f.name = name;
  f.layoutMode = opts.direction || 'VERTICAL';
  f.primaryAxisSizingMode = 'AUTO';
  f.counterAxisSizingMode = opts.width ? 'FIXED' : 'AUTO';
  if (opts.width) f.resize(opts.width, 100);
  f.itemSpacing = opts.gap != null ? opts.gap : 16;
  const p = opts.padding != null ? opts.padding : 24;
  f.paddingTop = f.paddingBottom = f.paddingLeft = f.paddingRight = p;
  f.fills = opts.fill ? solid(opts.fill) : [];
  f.cornerRadius = opts.radius || 0;
  if (opts.stroke) {
    f.strokes = solid(opts.stroke);
    f.strokeWeight = 1;
  }
  if (opts.wrap) f.layoutWrap = 'WRAP';
  return f;
}
// Ajoute un enfant à un frame en Auto Layout, éventuellement en largeur « Fill ».
function add(parent, child, fill) {
  parent.appendChild(child);
  if (fill) {
    child.layoutSizingHorizontal = 'FILL';
    if (child.type === 'TEXT') child.textAutoResize = 'HEIGHT';
  }
  return child;
}
function placeholder(name, w, h, label) {
  const f = frame(name, { padding: 0, fill: '#D9D9D9', radius: 8 });
  f.layoutMode = 'VERTICAL';
  f.primaryAxisAlignItems = 'CENTER';
  f.counterAxisAlignItems = 'CENTER';
  f.primaryAxisSizingMode = 'FIXED';
  f.counterAxisSizingMode = 'FIXED';
  f.resize(w, h);
  if (label) f.appendChild(text(label, { size: 13, color: '#7A7A7A' }));
  return f;
}
// Carte type post-it : titre + liste de lignes.
function card(title, lines, opts = {}) {
  const c = frame(title, { width: opts.width || 360, fill: opts.fill || COLORS.surface, radius: 16, gap: 10, padding: 24, stroke: COLORS.border });
  add(c, text(title, { font: FONTS.body700, size: 18 }), true);
  for (const l of lines) add(c, text(l, { size: 14, lineHeight: 150, color: COLORS.text }), true);
  return c;
}
function section(page, title, subtitle, x, y) {
  const s = frame(title, { gap: 24, padding: 48, fill: COLORS.background, radius: 24 });
  s.setPluginData(MARK, '1');
  s.x = x;
  s.y = y;
  add(s, heading(title, 40));
  if (subtitle) add(s, text(subtitle, { size: 16, color: COLORS['text-muted'] }));
  page.appendChild(s);
  return s;
}
function row(name, gap = 24) {
  return frame(name, { direction: 'HORIZONTAL', gap, padding: 0, wrap: false });
}

// ---------- Pages ----------

async function getPages() {
  await figma.loadAllPagesAsync();
  const result = {};
  const existing = figma.root.children;
  // La première page vide d'un nouveau fichier (« Page 1 ») est réutilisée comme Cover.
  if (existing.length === 1 && existing[0].children.length === 0 && !PAGES.includes(existing[0].name)) {
    existing[0].name = PAGES[0];
  }
  for (const name of PAGES) {
    let page = figma.root.children.find((p) => p.name === name);
    if (!page) {
      page = figma.createPage();
      page.name = name;
    }
    // Nettoie ce que le plugin a créé lors d'une exécution précédente.
    for (const node of [...page.children]) {
      if (node.getPluginData(MARK) === '1') node.remove();
    }
    result[name] = page;
  }
  return result;
}

// ---------- Variables & styles ----------

async function createVariables() {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const allVars = await figma.variables.getLocalVariablesAsync();

  function getCollection(name) {
    return collections.find((c) => c.name === name) || figma.variables.createVariableCollection(name);
  }
  function upsert(collection, name, type, value) {
    let v = allVars.find((x) => x.name === name && x.variableCollectionId === collection.id);
    if (!v) v = figma.variables.createVariable(name, collection, type);
    v.setValueForMode(collection.modes[0].modeId, value);
    return v;
  }

  const colorCol = getCollection('Couleurs');
  const colorVars = {};
  for (const [name, hex] of Object.entries(COLORS)) colorVars[name] = upsert(colorCol, name, 'COLOR', rgb(hex));

  const sizeCol = getCollection('Espacements & rayons');
  for (const [k, v] of Object.entries(SPACING)) upsert(sizeCol, 'spacing/' + k, 'FLOAT', v);
  for (const [k, v] of Object.entries(RADIUS)) upsert(sizeCol, 'radius/' + k, 'FLOAT', v);

  return colorVars;
}

async function createTextStyles() {
  const existing = await figma.getLocalTextStylesAsync();
  const styles = {};
  for (const [name, family, weight, desktop, mobile, lh] of TEXT_STYLES) {
    for (const [suffix, size] of [['Desktop', desktop], ['Mobile', mobile]]) {
      const fullName = suffix + '/' + name;
      let s = existing.find((x) => x.name === fullName);
      if (!s) s = figma.createTextStyle();
      s.name = fullName;
      s.fontName = font(family, weight);
      s.fontSize = size;
      s.lineHeight = { unit: 'PERCENT', value: lh };
      styles[fullName] = s;
    }
  }
  return styles;
}

function boundFill(variable, hex) {
  const paint = { type: 'SOLID', color: rgb(hex) };
  return [figma.variables.setBoundVariableForPaint(paint, 'color', variable)];
}

// ---------- Contenu des pages ----------

function buildCover(page) {
  const f = frame('Cover', { width: 1920, padding: 160, gap: 32, fill: COLORS.accent });
  f.setPluginData(MARK, '1');
  add(f, text('NEUF LUNES', { font: FONTS.body700, size: 24, color: COLORS['primary-dark'] }));
  add(f, text('Site e-commerce — compléments alimentaires pour femmes enceintes', { font: FONTS.heading600, size: 72, lineHeight: 110, width: 1400 }));
  add(f, text('Webflow Ecommerce · Conception Figma · v0.1 — statut : brainstorming → wireframes', { size: 24, color: COLORS['text-muted'] }));
  page.appendChild(f);
}

function buildBrainstorming(page) {
  // 1. Concept & noms
  const s1 = section(page, '1. Concept & nom de marque', 'Docs : docs/figma/01-brainstorming.md', 0, 0);
  add(s1, text('« Une boutique de compléments formulés pour la conception, la grossesse et l\'allaitement, qui rassure les futures mamans par la transparence et un accompagnement trimestre par trimestre. »', { font: FONTS.heading500, size: 24, lineHeight: 140, width: 1200 }));
  const names = row('Noms');
  for (const [n, d] of [['Maternelle', 'Douceur, très français'], ['Neuf Lunes ✅', '9 mois — nom de travail'], ['Bump & Bloom', 'International'], ['Mamaé', 'Court, bon pour un logo'], ['Doux Début', 'Rassurant']]) {
    names.appendChild(card(n, [d, 'Votes : ●●○○○'], { width: 220, fill: '#FFF3B0' }));
  }
  add(s1, names);

  // 2. Mind map (sous forme de colonnes)
  const s2 = section(page, '2. Mind map', 'Centre : compléments grossesse', 0, 700);
  const mm = row('Mind map');
  mm.appendChild(card('Étapes', ['Préconception (B9, iode)', '1er trimestre (B9, B6, gingembre)', '2e / 3e trimestre (fer, DHA, vit. D, magnésium)', 'Post-partum / allaitement'], { fill: '#FFF3B0' }));
  mm.appendChild(card('Produits', ['Multivitamines prénatales', 'DHA · Fer · Vit. D · Magnésium', 'Probiotiques', 'Packs / cures', 'Abonnement mensuel'], { fill: '#FFD6C9' }));
  mm.appendChild(card('Confiance', ['Composition transparente', 'Dosages clairs', 'Labels (bio, vegan)', 'Avis de sages-femmes', 'Analyses labo'], { fill: '#D7EBD5' }));
  mm.appendChild(card('Contenu', ['Blog par trimestre', 'Quiz « quel complément ? »', 'FAQ', 'Calendrier de grossesse'], { fill: '#D6E4F5' }));
  mm.appendChild(card('Business', ['Abonnement', 'Packs trimestre', 'Parrainage', 'Box cadeau naissance', 'Livraison offerte dès X €'], { fill: '#E6DCF5' }));
  add(s2, mm);

  // 3. Problèmes → solutions
  const s3 = section(page, '3. Problèmes → solutions', null, 0, 1300);
  const ps = row('Problèmes');
  for (const [p, sol] of [
    ['« Est-ce sans danger pour mon bébé ? »', 'Composition complète, dosages vs apports recommandés, avertissement médical'],
    ['« Je ne sais pas quoi prendre selon mon mois »', 'Quiz + filtres par trimestre'],
    ['« Trop de produits »', 'Gamme courte (6–8), packs prêts à l\'emploi'],
    ['« J\'oublie de racheter »', 'Abonnement + rappel'],
    ['« Pas confiance en ligne »', 'Avis vérifiés, comité santé, labels'],
    ['Nausées, fatigue, peu de temps', 'Mobile-first, achat en 3 clics'],
  ]) ps.appendChild(card(p, ['→ ' + sol], { width: 260, fill: '#FFD6C9' }));
  add(s3, ps);

  // 4. Positionnement & SWOT
  const s4 = section(page, '4. Positionnement & SWOT', 'Premium accessible, entre médical et lifestyle — bienveillant, rassurant, jamais culpabilisant', 0, 1800);
  const sw = row('SWOT');
  sw.appendChild(card('Forces', ['Niche précise, besoin récurrent', 'Revenu récurrent (abonnement)', 'Contenu éducatif → SEO'], { fill: '#D7EBD5' }));
  sw.appendChild(card('Faiblesses', ['Marque nouvelle', 'Budget marketing limité', 'Contraintes sur le discours'], { fill: '#FFD6C9' }));
  sw.appendChild(card('Opportunités', ['Demande de produits « clean »', 'Communautés de mamans (Insta, TikTok)', 'Partenariats sages-femmes'], { fill: '#D6E4F5' }));
  sw.appendChild(card('Menaces', ['Pharmacies & grandes marques', 'Réglementation des allégations santé', 'Méfiance envers les compléments'], { fill: '#E6DCF5' }));
  add(s4, sw);

  // 5. Réglementation
  const s5 = section(page, '5. ⚠️ Contraintes réglementaires', 'À intégrer dès les maquettes — à faire valider par un professionnel', 0, 2350);
  const rg = row('Réglementation');
  rg.appendChild(card('Allégations santé', ['Uniquement allégations autorisées (UE : CE 1924/2006)', 'Jamais « guérit », « prévient », « traite »'], { fill: '#FFF3B0' }));
  rg.appendChild(card('Mentions fiche produit', ['Ingrédients + quantités / dose', '% valeurs de référence', 'Ne pas dépasser la dose recommandée', 'Ne remplace pas une alimentation variée', 'Tenir hors de portée des enfants'], { fill: '#FFF3B0' }));
  rg.appendChild(card('Avertissement', ['« Demandez conseil à votre médecin ou sage-femme avant toute prise pendant la grossesse ou l\'allaitement. »'], { fill: '#FFF3B0' }));
  rg.appendChild(card('RGPD', ['Grossesse = donnée de santé', 'Consentement explicite (quiz, newsletter)', 'Cookies, confidentialité, CGV, mentions légales'], { fill: '#FFF3B0' }));
  add(s5, rg);

  // 6. MoSCoW
  const s6 = section(page, '6. Périmètre (MoSCoW)', null, 0, 2900);
  const ms = row('MoSCoW');
  ms.appendChild(card('Must (V1)', ['Catalogue + fiches produits', 'Panier + paiement', 'Filtres par étape', 'Pages légales, FAQ, contact', 'Newsletter'], { fill: '#D7EBD5' }));
  ms.appendChild(card('Should', ['Quiz', 'Packs par trimestre', 'Blog / guides', 'Avis clientes', 'Abonnement (outil tiers)'], { fill: '#D6E4F5' }));
  ms.appendChild(card('Could', ['Calendrier de grossesse', 'Parrainage', 'Box cadeau', 'Multilingue'], { fill: '#E6DCF5' }));
  ms.appendChild(card('Won\'t (V1)', ['App mobile', 'Marketplace', 'Téléconsultation'], { fill: '#EEEEEE' }));
  add(s6, ms);

  // 7. Personas
  const s7 = section(page, '7. Personas', 'Docs : docs/figma/02-personas-parcours.md', 0, 3450);
  const pr = row('Personas');
  for (const [n, lines] of [
    ['Sarah, 29 ans — enceinte de 3 mois', ['« Je veux être sûre que ce que je prends est adapté à mon bébé. »', 'Mobile 80 %, achète le soir', 'Besoin : quiz, filtres trimestre, fiche claire']],
    ['Inès, 33 ans — projet bébé', ['« On m\'a dit de commencer l\'acide folique avant. »', 'Google + Instagram', 'Besoin : gamme Préconception, blog, abonnement']],
    ['Amira, 31 ans — allaite', ['« Je veux recommander en 2 clics. »', 'Mobile d\'une main, la nuit', 'Besoin : réachat rapide, compte, abonnement']],
    ['Yanis, 34 ans — l\'entourage', ['Veut offrir un cadeau utile', 'Besoin : box / carte cadeau, page Offrir']],
  ]) {
    const c = card(n, lines, { width: 320 });
    c.insertChild(0, placeholder('Photo', 80, 80, 'photo'));
    pr.appendChild(c);
  }
  add(s7, pr);

  // 8. Customer journey
  const s8 = section(page, '8. Customer journey — Sarah', null, 0, 4050);
  const cj = row('Journey', 16);
  for (const [step, lines] of [
    ['Découverte 😟', ['Google / Instagram', 'Article SEO avec CTA produit']],
    ['Considération 🤔', ['Fiche, avis, quiz', 'Bloc sages-femmes, composition, avertissement']],
    ['Achat 🙂', ['Panier, checkout', 'Checkout court, frais visibles tôt']],
    ['Après-achat 😊', ['Email, colis', 'Email « comment prendre votre complément »']],
    ['Fidélisation 😍', ['Rappel, compte', 'Rappel J-7, parrainage']],
  ]) cj.appendChild(card(step, lines, { width: 240, fill: COLORS.accent }));
  add(s8, cj);

  // 9. Arborescence
  const s9 = section(page, '9. Arborescence', 'Docs : docs/figma/03-arborescence-userflows.md', 0, 4500);
  const home = frame('Accueil', { padding: 16, fill: COLORS['primary-dark'], radius: 12 });
  home.appendChild(text('Accueil (/)', { font: FONTS.body700, size: 18, color: '#FFFFFF' }));
  add(s9, home);
  const tree = row('Niveau 1', 16);
  for (const [name, children] of [
    ['Boutique', ['Préconception', 'Grossesse (T1 · T2 · T3)', 'Allaitement', 'Packs & cures', 'Fiche produit (template)']],
    ['Quiz', ['Questions (×4)', 'Résultat']],
    ['Abonnement', []],
    ['Offrir', ['Coffrets', 'Carte cadeau']],
    ['Conseils / Blog', ['Catégories', 'Article (template)']],
    ['Notre engagement', []],
    ['À propos · FAQ · Contact', []],
    ['Compte · Panier · Checkout', ['Confirmation']],
    ['Légal (footer)', ['Mentions légales', 'CGV', 'Confidentialité', 'Livraison & retours']],
  ]) {
    const col = frame(name, { gap: 8, padding: 0 });
    const head = frame(name, { padding: 12, fill: COLORS.primary, radius: 10 });
    head.appendChild(text(name, { font: FONTS.body700, size: 14, color: COLORS.text }));
    col.appendChild(head);
    for (const ch of children) {
      const b = frame(ch, { padding: 10, fill: COLORS.surface, radius: 8, stroke: COLORS.border });
      b.appendChild(text(ch, { size: 13 }));
      col.appendChild(b);
    }
    tree.appendChild(col);
  }
  add(s9, tree);

  // 10. User flows
  const s10 = section(page, '10. User flows', null, 0, 5000);
  for (const [name, steps] of [
    ['A — Quiz', ['Accueil', 'Quiz Q1 : étape', 'Q2 : trimestre', 'Q3 : besoins', 'Q4 : préférences', 'Résultat', 'Panier', 'Checkout', 'Confirmation']],
    ['B — Catégorie', ['Accueil', 'Boutique', 'Filtre T2', 'Fiche produit', 'Unique / abonnement', 'Mini-panier', 'Checkout', 'Confirmation']],
    ['C — SEO', ['Google', 'Article', 'Bloc produit lié', 'Fiche produit', 'Panier']],
    ['D — Réachat', ['Email J-7', 'Panier pré-rempli', 'Checkout express']],
  ]) {
    const r = row('Flow ' + name, 8);
    r.counterAxisAlignItems = 'CENTER';
    const lab = text('Flow ' + name, { font: FONTS.body700, size: 16 });
    lab.textAutoResize = 'WIDTH_AND_HEIGHT';
    r.appendChild(lab);
    steps.forEach((st, i) => {
      if (i > 0) r.appendChild(text('→', { size: 18, color: COLORS['text-muted'] }));
      const b = frame(st, { padding: 10, fill: i === steps.length - 1 ? COLORS['secondary-light'] : COLORS.surface, radius: 8, stroke: COLORS.border });
      b.appendChild(text(st, { size: 13 }));
      r.appendChild(b);
    });
    add(s10, r);
  }
}

function buildMoodboard(page) {
  const s = section(page, 'Moodboard', 'Douceur · Confiance · Naturel · Clarté · Féminité sans cliché · Scientifique mais chaleureux', 0, 0);
  const grid = row('Images', 16);
  grid.layoutWrap = 'WRAP';
  grid.resize(1400, 100);
  grid.counterAxisSizingMode = 'AUTO';
  grid.primaryAxisSizingMode = 'FIXED';
  for (const l of ['Femme enceinte, lumière naturelle', 'Mains sur le ventre', 'Matières : lin, coton', 'Ingrédients : agrumes, algues, graines', 'Flacon ambré / blanc mat', 'Étiquette minimaliste', 'Packshot fond crème', 'Formes organiques sauge / pêche']) {
    grid.appendChild(placeholder(l, 330, 260, l));
  }
  add(s, grid);
  add(s, card('À éviter', ['Rose bonbon', 'Clichés « bébé »', 'Visuels trop médicaux (blouses, pilules en gros plan)'], { width: 500, fill: '#FFD6C9' }));
  add(s, text('➜ Colle ici tes images Pinterest / Dribbble / captures de concurrents.', { size: 16, color: COLORS['text-muted'] }));
}

async function buildDesignSystem(page, colorVars, styles) {
  // Couleurs
  const s1 = section(page, 'Couleurs', 'Variables Figma : collection « Couleurs »', 0, 0);
  const sw = row('Nuancier', 16);
  sw.layoutWrap = 'WRAP';
  sw.resize(1400, 100);
  sw.primaryAxisSizingMode = 'FIXED';
  sw.counterAxisSizingMode = 'AUTO';
  for (const [name, hex] of Object.entries(COLORS)) {
    const c = frame(name, { width: 160, gap: 8, padding: 0 });
    const chip = figma.createRectangle();
    chip.resize(160, 100);
    chip.cornerRadius = 12;
    chip.fills = boundFill(colorVars[name], hex);
    chip.strokes = solid(COLORS.border);
    c.appendChild(chip);
    c.appendChild(text(name, { font: FONTS.body700, size: 13 }));
    c.appendChild(text(hex, { size: 13, color: COLORS['text-muted'] }));
    sw.appendChild(c);
  }
  add(s1, sw);

  // Typographie
  const s2 = section(page, 'Typographie', 'Fraunces (titres) · DM Sans (texte) — styles « Desktop/… » et « Mobile/… »', 0, 800);
  for (const [name] of TEXT_STYLES) {
    const st = styles['Desktop/' + name];
    const t = text(name + ' — Prendre soin de vous, 9 mois et au-delà', { width: 1300 });
    await t.setTextStyleIdAsync(st.id);
    add(s2, t);
  }

  // Composants
  const s3 = section(page, 'Composants', 'Point de départ — à compléter (voir liste dans 05-design-system.md)', 0, 1700);
  const comps = row('Composants', 48);
  comps.counterAxisAlignItems = 'MIN';

  // Bouton : variantes Primaire / Secondaire
  const variants = [];
  for (const [type, bg, fg, stroke] of [['Primaire', 'primary-dark', '#FFFFFF', null], ['Secondaire', 'background', COLORS.text, COLORS.text]]) {
    const b = figma.createComponent();
    b.name = 'Type=' + type;
    b.layoutMode = 'HORIZONTAL';
    b.primaryAxisSizingMode = 'AUTO';
    b.counterAxisSizingMode = 'AUTO';
    b.paddingTop = b.paddingBottom = 16;
    b.paddingLeft = b.paddingRight = 28;
    b.cornerRadius = RADIUS.pill;
    b.fills = boundFill(colorVars[bg], COLORS[bg]);
    if (stroke) {
      b.strokes = solid(stroke);
      b.strokeWeight = 1.5;
    }
    const label = text('Trouver mon complément', { color: fg });
    await label.setTextStyleIdAsync(styles['Desktop/Bouton'].id);
    b.appendChild(label);
    variants.push(b);
  }
  const buttonSet = figma.combineAsVariants(variants, comps);
  buttonSet.name = 'Bouton';
  buttonSet.layoutMode = 'VERTICAL';
  buttonSet.itemSpacing = 16;
  buttonSet.paddingTop = buttonSet.paddingBottom = buttonSet.paddingLeft = buttonSet.paddingRight = 24;

  // Badges étapes
  const badges = [];
  for (const [label, key] of [['Préconception', 'stage/preconception'], ['1er trimestre', 'stage/trimestre-1'], ['2e trimestre', 'stage/trimestre-2'], ['3e trimestre', 'stage/trimestre-3'], ['Allaitement', 'stage/allaitement']]) {
    const b = figma.createComponent();
    b.name = 'Étape=' + label;
    b.layoutMode = 'HORIZONTAL';
    b.primaryAxisSizingMode = 'AUTO';
    b.counterAxisSizingMode = 'AUTO';
    b.paddingTop = b.paddingBottom = 6;
    b.paddingLeft = b.paddingRight = 12;
    b.cornerRadius = RADIUS.pill;
    b.fills = boundFill(colorVars[key], COLORS[key]);
    b.appendChild(text(label, { font: FONTS.body500, size: 13 }));
    badges.push(b);
  }
  const badgeSet = figma.combineAsVariants(badges, comps);
  badgeSet.name = 'Badge étape';
  badgeSet.layoutMode = 'VERTICAL';
  badgeSet.itemSpacing = 12;
  badgeSet.paddingTop = badgeSet.paddingBottom = badgeSet.paddingLeft = badgeSet.paddingRight = 24;

  // Carte produit
  const pc = figma.createComponent();
  pc.name = 'Carte produit';
  pc.layoutMode = 'VERTICAL';
  pc.primaryAxisSizingMode = 'AUTO';
  pc.counterAxisSizingMode = 'FIXED';
  pc.resize(300, 100);
  pc.itemSpacing = 8;
  pc.paddingTop = pc.paddingBottom = pc.paddingLeft = pc.paddingRight = 16;
  pc.cornerRadius = RADIUS.card;
  pc.fills = boundFill(colorVars.surface, COLORS.surface);
  pc.strokes = solid(COLORS.border);
  pc.appendChild(badgeSet.children[2].createInstance());
  add(pc, placeholder('Image produit', 268, 335, 'Image 4:5'), true);
  add(pc, text('Prénatal Complet T2', { font: FONTS.heading500, size: 20 }), true);
  add(pc, text('Fer, DHA et vitamine D pour le 2e trimestre', { size: 14, color: COLORS['text-muted'] }), true);
  add(pc, text('★★★★★ (124)', { size: 13, color: COLORS.warning }), true);
  add(pc, text('24,90 € · cure 30 jours', { font: FONTS.body700, size: 16 }), true);
  const btn = buttonSet.children[0].createInstance();
  add(pc, btn, true);
  comps.appendChild(pc);

  // Encart avertissement santé
  const warn = figma.createComponent();
  warn.name = 'Avertissement santé';
  warn.layoutMode = 'HORIZONTAL';
  warn.primaryAxisSizingMode = 'FIXED';
  warn.counterAxisSizingMode = 'AUTO';
  warn.resize(420, 100);
  warn.itemSpacing = 12;
  warn.paddingTop = warn.paddingBottom = warn.paddingLeft = warn.paddingRight = 16;
  warn.cornerRadius = 12;
  warn.fills = solid('#FBF1DC');
  warn.strokes = boundFill(colorVars.warning, COLORS.warning);
  warn.appendChild(text('⚠️', { size: 18 }));
  add(warn, text('Demandez conseil à votre médecin ou sage-femme avant toute prise pendant la grossesse ou l\'allaitement.', { size: 14, lineHeight: 150 }), true);
  comps.appendChild(warn);

  add(s3, comps);
}

// Sections de l'accueil (docs/figma/04-wireframes.md) : [nom, hauteur mobile, hauteur desktop, contenu]
const HOME_SECTIONS = [
  ['Barre d\'annonce', 40, 40, 'Livraison offerte dès 40 € · Formules validées par des sages-femmes'],
  ['Header', 64, 80, 'Logo · Boutique ▾ · Quiz · Conseils · Engagement · 🔍 👤 🛒'],
  ['Hero', 640, 640, 'H1 « Prendre soin de vous, 9 mois et au-delà » · sous-titre · photo · 3 réassurances · [Trouver mon complément] [Voir la boutique]'],
  ['Choisir son étape', 420, 360, '4 cartes : Préconception · Grossesse · Allaitement · Packs'],
  ['Best-sellers', 520, 560, '4 cartes produit (carrousel sur mobile)'],
  ['Bloc quiz', 380, 360, '« 4 questions, 1 minute » · [Commencer le quiz]'],
  ['Pourquoi nous', 560, 360, 'Formules ciblées · Transparence · Validé par des pros · Ingrédients de qualité'],
  ['Comité santé', 400, 360, 'Photos + noms + métiers des expertes'],
  ['Avis clientes', 420, 360, 'Note moyenne + 3 avis'],
  ['Abonnement', 420, 360, '3 étapes · -10 % · [Découvrir l\'abonnement]'],
  ['Conseils', 520, 440, '3 derniers articles · [Tous les conseils]'],
  ['Newsletter', 300, 260, '-10 % sur la 1re commande · email · consentement'],
  ['Footer', 560, 360, 'Liens · Légal · Réseaux · Paiements · Avertissement santé'],
];

function wireframePage(name, width, sections, isMobile) {
  const f = frame(name, { width, gap: 0, padding: 0, fill: '#FFFFFF' });
  f.clipsContent = true;
  sections.forEach(([sName, hM, hD, content], i) => {
    const h = isMobile ? hM : hD;
    const sec = frame('section_' + sName.toLowerCase().replace(/[^a-z0-9]+/g, '-'), { width, gap: 12, padding: isMobile ? 20 : 40, fill: i % 2 ? '#F2F2F2' : '#FAFAFA' });
    sec.primaryAxisSizingMode = 'FIXED';
    sec.resize(width, h);
    sec.strokes = solid('#E0E0E0');
    sec.strokeBottomWeight = 1;
    sec.strokeTopWeight = sec.strokeLeftWeight = sec.strokeRightWeight = 0;
    add(sec, text(sName.toUpperCase(), { font: FONTS.body700, size: 12, color: '#8A8A8A' }), true);
    add(sec, text(content, { size: isMobile ? 14 : 16, color: '#4A4A4A', lineHeight: 140 }), true);
    add(f, sec, true);
  });
  return f;
}

function buildWireframes(page) {
  const s = section(page, 'Wireframes basse fidélité', 'Niveaux de gris · mobile-first · docs/figma/04-wireframes.md', 0, 0);
  const r = row('Accueil', 80);
  r.counterAxisAlignItems = 'MIN';
  r.appendChild(wireframePage('Accueil — Mobile 390', 390, HOME_SECTIONS, true));
  r.appendChild(wireframePage('Accueil — Desktop 1440', 1440, HOME_SECTIONS, false));
  add(s, r);

  const product = [
    ['Header', 64, 80, 'Logo · menu · 🛒'],
    ['Galerie', 420, 560, 'Image principale + miniatures (swipe sur mobile)'],
    ['Infos d\'achat', 520, 560, 'Badge étape · H1 · ★ avis · 3 bénéfices · prix + prix/jour · [Achat unique | Abonnement -10 %] · quantité · [Ajouter au panier] (sticky mobile) · réassurances'],
    ['Avertissement santé', 120, 100, '« Demandez conseil à votre médecin ou sage-femme avant toute prise. »'],
    ['Accordéons', 360, 320, 'Description · Composition & dosages · Mode d\'emploi · Précautions · Labels & analyses'],
    ['Avis sage-femme', 260, 240, 'Photo + citation'],
    ['Avis clientes', 420, 360, 'Filtrables par trimestre'],
    ['Complétez votre routine', 420, 440, 'Produits associés / pack'],
    ['FAQ produit', 320, 280, 'Accordéons'],
    ['Footer', 560, 360, '—'],
  ];
  const r2 = row('Fiche produit', 80);
  r2.counterAxisAlignItems = 'MIN';
  r2.appendChild(wireframePage('Fiche produit — Mobile 390', 390, product, true));
  r2.appendChild(wireframePage('Fiche produit — Desktop 1440', 1440, product, false));
  add(s, r2);
}

function buildEmptyPage(page, title, subtitle) {
  section(page, title, subtitle, 0, 0);
}

// ---------- Exécution ----------

async function main() {
  await loadFonts();
  const pages = await getPages();
  const colorVars = await createVariables();
  const styles = await createTextStyles();

  buildCover(pages['00 · Cover']);
  buildBrainstorming(pages['01 · Brainstorming']);
  buildMoodboard(pages['02 · Moodboard']);
  buildWireframes(pages['03 · Wireframes']);
  await buildDesignSystem(pages['04 · Design system'], colorVars, styles);
  buildEmptyPage(pages['05 · Maquettes Desktop'], 'Maquettes Desktop 1440', 'Ordre : Accueil → Fiche produit → Catégorie → Panier → Quiz → Blog → pages secondaires');
  buildEmptyPage(pages['06 · Maquettes Mobile'], 'Maquettes Mobile 390', 'Mêmes pages que le desktop, en commençant par l\'accueil et la fiche produit');
  buildEmptyPage(pages['07 · Prototype'], 'Prototype', 'Flow A : Accueil → Quiz → Résultat → Panier → Checkout · Flow B : Accueil → Catégorie → Fiche → Panier');

  await figma.setCurrentPageAsync(pages['01 · Brainstorming']);
  figma.viewport.scrollAndZoomIntoView(figma.currentPage.children);
  const fontNote = FONTS.heading600.family === 'Fraunces' ? '' : ' (Fraunces/DM Sans introuvables : Inter utilisée)';
  figma.closePlugin('✅ Conception Neuf Lunes importée' + fontNote);
}

main().catch((e) => figma.closePlugin('❌ Erreur : ' + (e && e.message ? e.message : e)));
