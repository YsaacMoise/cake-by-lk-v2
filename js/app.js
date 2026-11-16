/* Cake by LK — v2 (direction du prototype de référence du 13/11) (16/11/2026).
   Rien n'est envoyé : le message final est copié, puis la cliente le colle dans Instagram.
   Prix : seule source, la carte de LK. Règles validées par YKM le 14/11/2026 : number cake pour l'anniversaire seulement,
   wedding cake pour le mariage seulement, layer cake pour les autres fêtes ; douceurs en complément du gâteau. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var lisse = function (t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
  var tel = function () { return window.innerWidth <= 820; };
  var euros = function (n) { return n.toLocaleString('fr-FR') + ' €'; };
  var pluriel = function (n, un, plusieurs) { return n + ' ' + (n > 1 ? plusieurs : un); };
  var defiler = function (el) { if (el) el.scrollIntoView({ behavior: reduit ? 'auto' : 'smooth', block: 'start' }); };

  /* ---------- La carte de LK ---------- */
  var LAYER = [{ v: '15', l: '15 parts', p: 75 }, { v: '20', l: '20 parts', p: 95 }, { v: '25', l: '25 parts', p: 120 }, { v: 'plus', l: 'Plus de 25 parts', p: 0 }];
  var NUMBER = [{ v: '6', l: '6 parts', p: 30 }, { v: '8 à 10', l: '8 à 10 parts', p: 35 }];
  var PART_MARIAGE = 5, DOUCEUR = 3;
  var SAVEURS = [
    { n: 'Le 3 chocolat', img: 'img/coupe/3-chocolat.webp', d: 'Génoise chocolat, ganache chocolat au lait, croustillant praliné, ganache chocolat blanc.' },
    { n: 'Le Bueno', img: 'img/coupe/bueno.webp', d: 'Génoise chocolat, ganache chocolat au lait, crème de noisette maison, morceaux de Kinder Bueno.' },
    { n: 'Le Fraisier', img: 'img/coupe/fraisier.webp', d: 'Génoise vanille, coulis fraise, morceaux de fraises fraîches.' },
    { n: 'Le Framboisier', img: 'img/coupe/framboisier.webp', d: 'Génoise vanille, ganache chocolat blanc vanille, coulis framboise, morceaux de framboises fraîches.' },
    { n: 'Le Specaramel', img: 'img/coupe/specaramel.webp', d: 'Génoise vanille, ganache vanille, coulis de caramel beurre salé, éclats de speculos.' }
  ];
  var GARNITURES = [{ n: 'Fruits rouges', d: 'Biscuit, crème à la vanille, fraises et framboises.' }, { n: 'Chocolat', d: 'Biscuit, crème au chocolat, chocolats.' }];
  var FETES = ['Anniversaire', 'Mariage', 'Baby shower ou gender reveal', 'Henné', 'Tahara', 'Autre fête'];
  var GATEAUX = {
    layer: { l: 'Layer cake', s: 'dès 75 €' },
    number: { l: 'Number cake', s: 'dès 30 €' },
    wedding: { l: 'Wedding cake', s: 'dès 5 € la part' }
  };
  var DOUCEURS = [['sables', 'Sablés', 'sablé'], ['cupcakes', 'Cupcakes', 'cupcake'], ['popcakes', 'Popcakes', 'popcake']];
  var gateauxPour = function (f) { return f === 'Anniversaire' ? ['layer', 'number'] : f === 'Mariage' ? ['wedding'] : f ? ['layer'] : []; };

  var etat = { fete: '', gateau: '', parts: '', partsPlus: '', chiffre: '', invites: '', saveur: '', modele: null, themeAuto: '', themeCarte: false, sables: 0, cupcakes: 0, popcakes: 0 };

  /* ---------- En-tête, menu du téléphone ---------- */
  var entete = $('#entete'), menuBtn = $('#menuBtn'), menu = $('#menu');
  function fermerMenu(focus) {
    if (!menu.classList.contains('ouvert')) return;
    menu.classList.remove('ouvert'); menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.textContent = 'Menu';
    if (focus) menuBtn.focus();
  }
  menuBtn.addEventListener('click', function () {
    var ouvert = menu.classList.toggle('ouvert');
    menuBtn.setAttribute('aria-expanded', ouvert ? 'true' : 'false'); menuBtn.textContent = ouvert ? 'Fermer' : 'Menu';
    if (ouvert) $('a', menu).focus();
  });
  $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { fermerMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fermerMenu(true); });
  document.addEventListener('click', function (e) { if (!entete.contains(e.target)) fermerMenu(false); });

  /* ---------- Ancres ---------- */
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (ev) {
      var id = a.getAttribute('href'), cible = id === '#haut' ? document.body : $(id);
      if (!cible) return; ev.preventDefault(); defiler(cible);
    });
  });

  /* ---------- Accueil : le titre en deux temps, puis le gâteau se pose ---------- */
  ['l1', 'l2'].forEach(function (id, k) {
    var el = document.getElementById(id), sp = document.createElement('span');
    sp.className = 'c'; sp.textContent = el.getAttribute('data-mots'); sp.style.transitionDelay = (0.1 + k * 0.25) + 's'; el.appendChild(sp);
  });
  var lance = false;
  function lancer() { if (lance) return; lance = true; document.documentElement.classList.add('pret'); setTimeout(function () { document.documentElement.classList.add('fini'); }, 3200); }
  if (document.fonts && document.fonts.ready) { document.fonts.ready.then(function () { requestAnimationFrame(lancer); }); setTimeout(lancer, 1200); } else { lancer(); }

  var hero = $('#hero'), scene = $('#scene'), gateau = $('#gateau'), l1 = $('#l1'), l2 = $('#l2');
  var suite = $('#suite'), intro = $('#intro'), indice = $('#indice');
  var c1 = [246, 241, 234], c2 = [236, 228, 218];
  var prete = function () { return document.documentElement.classList.contains('fini'); };
  function progres(el) { var r = el.getBoundingClientRect(); var tot = r.height - window.innerHeight; return tot > 0 ? clamp(-r.top / tot, 0, 1) : 0; }
  suite.style.visibility = 'hidden';
  function majHero() {
    var p = progres(hero), e = lisse(clamp(p / 0.8, 0, 1));
    var vw = window.innerWidth / 100, vh = window.innerHeight / 100;
    var tx = tel() ? 0 : e * 20 * vw, ty = tel() ? -e * 12 * vh : 0, sc = 1 - .34 * e;
    gateau.style.transform = 'translate3d(' + tx + 'px,' + ty + 'px,0) scale(' + sc + ')';
    var f = clamp(1 - e * 1.8, 0, 1);
    l1.style.opacity = f; l2.style.opacity = f;
    if (prete()) { intro.style.opacity = f; indice.style.opacity = f; }
    var o = clamp((e - .5) / .35, 0, 1);
    suite.style.opacity = o; suite.style.transform = 'translate3d(0,' + ((1 - o) * 16) + 'px,0)';
    suite.classList.toggle('vis', o > .6); suite.style.visibility = o > 0 ? 'visible' : 'hidden';
    var c = c1.map(function (v, i) { return Math.round(v + (c2[i] - v) * e); }); scene.style.background = 'rgb(' + c.join(',') + ')';
  }
  var attente = false;
  function auDefilement() {
    if (attente) return; attente = true;
    requestAnimationFrame(function () { attente = false; entete.classList.toggle('plein', window.scrollY > 40); if (!reduit) majHero(); });
  }
  window.addEventListener('scroll', auDefilement, { passive: true }); window.addEventListener('resize', auDefilement); auDefilement();

  /* ---------- Apparitions ---------- */
  if ('IntersectionObserver' in window) {
    var vus = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('vu'); vus.unobserve(en.target); } });
    }, { threshold: .15 });
    $$('.rv').forEach(function (el) { vus.observe(el); });
  } else { $$('.rv').forEach(function (el) { el.classList.add('vu'); }); }

  /* ---------- Mes gâteaux : un grand, quatre petits, le reste à la demande ---------- */
  var galerie = $('#galerie'), voirPlus = $('#voirPlus'), filtre = 'tous', ouvert = false;
  var items = $$('li', galerie);
  function rang(li, f) { var v = li.getAttribute('data-r-' + f); return v === null ? 100 + items.indexOf(li) : parseFloat(v); }
  function majGalerie() {
    var liste = items.filter(function (li) { return f2(li); }).sort(function (a, b) { return rang(a, filtre) - rang(b, filtre); });
    items.forEach(function (li) { li.hidden = true; li.classList.remove('grand'); });
    liste.forEach(function (li, i) { galerie.appendChild(li); li.hidden = !ouvert && i >= 5; });
    items.forEach(function (li) { var im = $('img', li); if (im) im.sizes = '(max-width:820px) 50vw, 25vw'; });
    if (liste[0]) { liste[0].classList.add('grand'); var gi = $('img', liste[0]); if (gi) gi.sizes = '(max-width:820px) 100vw, 50vw'; }
    var reste = liste.length - 5;
    voirPlus.hidden = ouvert || reste <= 0;
    voirPlus.textContent = reste === 1 ? 'Voir l’autre gâteau' : 'Voir les ' + reste + ' autres gâteaux';
  }
  function f2(li) { return filtre === 'tous' ? li.getAttribute('data-f') !== 'mariage' || li.getAttribute('data-id') !== 'devis' : li.getAttribute('data-f') === filtre; }
  $$('.filtres .puce').forEach(function (b) {
    b.addEventListener('click', function () {
      filtre = b.getAttribute('data-filtre'); ouvert = false;
      $$('.filtres .puce').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      majGalerie();
    });
  });
  voirPlus.addEventListener('click', function () {
    var premier = items.filter(function (li) { return f2(li) && li.hidden; })[0];
    ouvert = true; majGalerie();
    var b = premier && $('button, a', premier); if (b) b.focus({ preventScroll: true });
  });
  majGalerie();

  /* ---------- Composer : rendu ---------- */
  var form = $('#form'), annonce = $('#annonce'), erreur = $('#erreur');
  function puce(txt, actif, petit, fn) {
    var b = document.createElement('button'); b.type = 'button'; b.className = 'puce';
    b.setAttribute('aria-pressed', actif ? 'true' : 'false'); b.textContent = txt;
    if (petit) { var s = document.createElement('small'); s.textContent = petit; b.appendChild(s); }
    b.addEventListener('click', fn); return b;
  }
  function champNombre(id, label, valeur, min, max, aide, fn) {
    var d = document.createElement('div'); d.className = 'champ';
    d.innerHTML = '<label for="' + id + '"></label><input id="' + id + '" type="number" inputmode="numeric" min="' + min + '" max="' + max + '">' + (aide ? '<p class="aide"></p>' : '');
    $('label', d).textContent = label; var i = $('input', d); i.value = valeur;
    if (aide) $('.aide', d).textContent = aide;
    i.addEventListener('input', function () { fn(i.value); majPrix(); sauver(); });
    return d;
  }

  function prix() {
    var base = 0, devis = false, note = '';
    if (etat.gateau === 'layer') {
      var o = LAYER.filter(function (x) { return x.v === etat.parts; })[0];
      if (o && o.p) base = o.p; else if (o) { devis = true; note = 'Au-delà de 25 parts, je vous donne le prix en vous répondant.'; }
    } else if (etat.gateau === 'number') {
      var n = NUMBER.filter(function (x) { return x.v === etat.parts; })[0];
      if (n) base = n.p;
      if (parseInt(etat.chiffre, 10) >= 10) note = 'Pour un nombre à deux chiffres, je vous donne le prix en vous répondant.';
    } else if (etat.gateau === 'wedding') {
      var inv = parseInt(etat.invites, 10);
      if (inv > 0) { base = inv * PART_MARIAGE; note = 'Une part par invité, sur devis.'; }
    }
    var d = (etat.sables + etat.cupcakes + etat.popcakes) * DOUCEUR;
    return { base: base, d: d, total: base + d, devis: devis, note: note };
  }
  function descGateau() {
    var g = etat.gateau;
    if (g === 'layer') return etat.parts === 'plus' ? 'Layer cake, ' + (parseInt(etat.partsPlus, 10) > 25 ? etat.partsPlus : 'plus de 25') + ' parts' : etat.parts ? 'Layer cake ' + etat.parts + ' parts' : 'Layer cake';
    if (g === 'number') return 'Number cake' + (etat.parts ? ' ' + etat.parts + ' parts' : '') + (etat.chiffre ? ', chiffre ' + etat.chiffre : '');
    if (g === 'wedding') return parseInt(etat.invites, 10) > 0 ? 'Wedding cake, ' + pluriel(parseInt(etat.invites, 10), 'part', 'parts') : 'Wedding cake';
    return '';
  }
  function imageAtelier() {
    if (etat.modele) return etat.modele.img;
    if (!etat.fete && !etat.gateau) return 'img/g/number-50-900.webp';
    if (etat.gateau === 'number') return 'img/g/number-50-900.webp';
    if (etat.gateau === 'wedding' || etat.fete === 'Mariage') return 'img/g/mariage-agrumes-900.webp';
    if (etat.fete === 'Baby shower ou gender reveal') return 'img/g/baby-shower-900.webp';
    if (etat.fete === 'Tahara') return 'img/g/tahara-900.webp';
    if (etat.themeCarte) return 'img/g/theme-licorne-900.webp';
    return 'img/g/anniv-fruits-rouges-900.webp';
  }
  var apercu = $('#apercu');
  function majPrix() {
    var p = prix(), titre = $('#estimTitre'), fort = $('#prix');
    if (!etat.gateau) { titre.textContent = 'À partir de'; fort.textContent = euros(30); fort.classList.remove('texte'); }
    else if (p.devis) { titre.textContent = 'Le prix'; fort.textContent = 'Dans ma réponse'; fort.classList.add('texte'); }
    else if (!p.base) {
      titre.textContent = 'À partir de'; fort.classList.remove('texte');
      fort.textContent = etat.gateau === 'wedding' ? euros(PART_MARIAGE) + ' la part' : etat.gateau === 'number' ? euros(30) : euros(75);
      if (etat.gateau === 'wedding') fort.classList.add('texte');
    } else { titre.textContent = 'À partir de'; fort.textContent = euros(p.total); fort.classList.remove('texte'); }
    var etq = etat.modele ? etat.modele.nom : etat.gateau ? GATEAUX[etat.gateau].l : 'Votre gâteau';
    var detail = etat.gateau === 'layer' && etat.parts ? (etat.parts === 'plus' ? 'plus de 25 parts' : etat.parts + ' parts') : etat.gateau === 'number' && etat.parts ? etat.parts + ' parts' : etat.gateau === 'wedding' && parseInt(etat.invites, 10) > 0 ? pluriel(parseInt(etat.invites, 10), 'part', 'parts') : '';
    $('#etiquette').textContent = etq + (detail ? ' · ' + detail : '');
    var src = imageAtelier();
    if (apercu.getAttribute('src') !== src) {
      apercu.classList.add('sort');
      setTimeout(function () { apercu.setAttribute('src', src); apercu.classList.toggle('pose', src.indexOf('theme-') > -1); requestAnimationFrame(function () { apercu.classList.remove('sort'); }); }, reduit ? 0 : 300);
    }
    majRecap();
    annonce.textContent = p.devis ? 'Prix donné dans ma réponse.' : p.total ? 'Prix de départ : ' + p.total + ' euros.' : '';
  }

  function rendre() {
    erreur.textContent = '';
    var zF = $('#choixFete'); zF.innerHTML = '';
    FETES.forEach(function (f) { zF.appendChild(puce(f, f === etat.fete, null, function () { choisirFete(f); })); });

    var gs = gateauxPour(etat.fete);
    $('#etapeGateau').hidden = !etat.fete;
    var zG = $('#choixGateau'); zG.innerHTML = '';
    gs.forEach(function (g) { zG.appendChild(puce(GATEAUX[g].l, g === etat.gateau, GATEAUX[g].s, function () { choisirGateau(g); })); });

    var suiteVisible = !!etat.gateau;
    ['#etapeTaille', '#etapeSaveur', '#etapeDecor', '#etapeDouceurs', '#etapeDate', '#envoi'].forEach(function (s) { $(s).hidden = !suiteVisible; });

    /* Taille */
    var zT = $('#zoneTaille'); zT.innerHTML = '';
    if (etat.gateau === 'layer' || etat.gateau === 'number') {
      $('#e3txt').textContent = 'Le nombre de parts';
      var p = document.createElement('div'); p.className = 'puces';
      (etat.gateau === 'layer' ? LAYER : NUMBER).forEach(function (o) {
        p.appendChild(puce(o.l, o.v === etat.parts, o.p ? euros(o.p) : 'prix dans ma réponse', function () { etat.parts = o.v; rendre(); sauver(); }));
      });
      zT.appendChild(p);
      if (etat.gateau === 'layer' && etat.parts === 'plus') {
        var c = champNombre('partsPlus', 'Combien de parts ? (facultatif)', etat.partsPlus, 26, 300, '', function (v) { etat.partsPlus = v; });
        c.style.marginTop = '16px'; c.style.maxWidth = '260px'; zT.appendChild(c);
      }
      if (etat.gateau === 'number') {
        var cn = champNombre('chiffre', 'Le chiffre ou le nombre (de 1 à 99)', etat.chiffre, 1, 99, '', function (v) { etat.chiffre = v; majNoteNumber(); });
        cn.style.marginTop = '16px'; cn.style.maxWidth = '300px'; zT.appendChild(cn);
        var nn = document.createElement('p'); nn.className = 'aide'; nn.id = 'noteNumber'; zT.appendChild(nn); majNoteNumber();
      }
    } else if (etat.gateau === 'wedding') {
      $('#e3txt').textContent = 'Le nombre d’invités';
      var cw = champNombre('invites', 'Nombre d’invités', etat.invites, 1, 1000, 'Une part par invité, à partir de 5 € la part. Je vous envoie le devis en vous répondant.', function (v) { etat.invites = v; });
      cw.style.maxWidth = '360px'; zT.appendChild(cw);
    }

    /* Saveur ou garniture */
    var zS = $('#choixSaveur'); zS.innerHTML = '';
    var compo = $('#compo');
    if (etat.gateau === 'number') {
      $('#e4txt').textContent = 'La garniture'; zS.className = 'puces';
      GARNITURES.forEach(function (g) { zS.appendChild(puce(g.n, g.n === etat.saveur, null, function () { etat.saveur = g.n; rendre(); sauver(); })); });
      var gc = GARNITURES.filter(function (g) { return g.n === etat.saveur; })[0];
      compo.textContent = (gc ? gc.d + ' ' : '') + 'Je vous confirme la garniture en vous répondant.';
    } else if (etat.gateau) {
      $('#e4txt').textContent = 'La saveur'; zS.className = 'puces saveurs';
      SAVEURS.forEach(function (s) {
        var b = document.createElement('button'); b.type = 'button'; b.className = 'saveur';
        b.setAttribute('aria-pressed', s.n === etat.saveur ? 'true' : 'false');
        b.innerHTML = '<img src="' + s.img + '" alt="" width="96" height="128" loading="lazy"><span></span>';
        $('span', b).textContent = s.n;
        b.addEventListener('click', function () { etat.saveur = s.n; rendre(); sauver(); });
        zS.appendChild(b);
      });
      var sc = SAVEURS.filter(function (s) { return s.n === etat.saveur; })[0];
      compo.textContent = sc ? sc.d : 'Touchez une saveur pour voir ce qu’il y a dedans.';
    }

    /* Décor */
    var lab = $('#texteLabel'), aide = $('#decorAide'), champTheme = $('#champTheme');
    if (etat.gateau === 'wedding') {
      lab.textContent = 'Prénoms, initiales ou texte sur le gâteau'; champTheme.hidden = true;
      aide.textContent = 'Les prénoms ou les initiales sont écrits en lettres dorées. Si vous avez une photo modèle, envoyez-la-moi avec le message.';
    } else if (etat.gateau === 'number') {
      lab.textContent = 'Un prénom sur une petite plaque (facultatif)'; champTheme.hidden = true;
      aide.textContent = 'Je garnis le chiffre comme vous l’avez choisi, et je peux y poser une petite plaque avec un prénom. Si vous avez une photo modèle, envoyez-la-moi avec le message.';
    } else {
      lab.textContent = 'Prénom ou texte sur le gâteau'; champTheme.hidden = false;
      aide.textContent = 'Le prénom est écrit en lettres dorées, ou dans les couleurs du thème. Si vous avez une photo modèle, envoyez-la-moi avec le message.';
    }

    /* Modèle choisi */
    var m = $('#modele');
    m.hidden = !etat.modele;
    if (etat.modele) { $('#modeleNom').textContent = etat.modele.nom; $('#modeleImg').src = etat.modele.img.replace('-900', '-480'); }

    majCompteurs();
    majPrix();
  }
  function majNoteNumber() { var n = $('#noteNumber'); if (n) n.textContent = parseInt(etat.chiffre, 10) >= 10 ? 'Pour un nombre à deux chiffres, je vous donne le prix en vous répondant.' : ''; }

  /* Douceurs */
  function majCompteurs() {
    var z = $('#compteurs');
    if (!z.children.length) {
      DOUCEURS.forEach(function (d) {
        var l = document.createElement('div'); l.className = 'compteur';
        l.innerHTML = '<span>' + d[1] + '<small>3 € pièce</small></span><span class="pas"><button type="button" aria-label="Retirer un ' + d[2] + '">−</button><output aria-live="polite"></output><button type="button" aria-label="Ajouter un ' + d[2] + '">+</button></span>';
        var bs = $$('button', l);
        bs[0].addEventListener('click', function () { etat[d[0]] = Math.max(0, etat[d[0]] - 1); majCompteurs(); majPrix(); sauver(); });
        bs[1].addEventListener('click', function () { etat[d[0]] = Math.min(99, etat[d[0]] + 1); majCompteurs(); majPrix(); sauver(); });
        z.appendChild(l);
      });
    }
    $$('.compteur', z).forEach(function (l, i) { $('output', l).textContent = etat[DOUCEURS[i][0]]; });
  }

  /* Le thème suit le modèle : un nouveau modèle remplace le thème qu'il avait rempli ; un thème écrit par la cliente reste. */
  function oublierThemeAuto() {
    var th = $('#theme');
    if (etat.themeAuto && th.value.trim() === etat.themeAuto) th.value = '';
    etat.themeAuto = '';
  }
  function oublierModele() { etat.modele = null; oublierThemeAuto(); }
  /* Un modèle reste tant qu'il va avec la fête et le gâteau : un gâteau à thème va avec toutes les fêtes sauf le mariage. */
  function modeleCompatible() {
    var m = etat.modele; if (!m) return true;
    var feteOk = m.fete === '*' ? etat.fete !== 'Mariage' : m.fete === etat.fete;
    return feteOk && (!etat.gateau || m.gateau === etat.gateau);
  }
  function choisirFete(f) {
    etat.fete = f;
    var gs = gateauxPour(f);
    if (gs.indexOf(etat.gateau) < 0) { etat.gateau = gs.length === 1 ? gs[0] : ''; etat.parts = ''; etat.saveur = ''; }
    if (!modeleCompatible()) oublierModele();
    if (f !== 'Anniversaire') etat.themeCarte = false;
    rendre(); sauver();
  }
  function choisirGateau(g) {
    if (etat.gateau !== g) { etat.parts = ''; etat.saveur = ''; }
    etat.gateau = g;
    if (!modeleCompatible()) oublierModele();
    rendre(); sauver();
  }
  function retirerModele() { oublierModele(); rendre(); sauver(); }
  $('#modeleRetirer').addEventListener('click', retirerModele);

  /* Depuis les occasions et la galerie : le formulaire se remplit, puis la page va à la première question sans réponse */
  $$('.carte[data-fete], .devis [data-fete]').forEach(function (c) {
    c.addEventListener('click', function (ev) {
      ev.preventDefault();
      oublierModele(); etat.themeCarte = c.getAttribute('data-theme') === 'oui';
      etat.fete = c.getAttribute('data-fete');
      var g = c.getAttribute('data-gateau'); if (etat.gateau !== g) { etat.parts = ''; etat.saveur = ''; } etat.gateau = g;
      rendre(); sauver(); allerSuite();
    });
  });
  $$('.tuile').forEach(function (t) {
    t.addEventListener('click', function () {
      var g = t.getAttribute('data-gateau'), theme = t.getAttribute('data-theme') === 'oui', fete = t.getAttribute('data-fete');
      oublierModele();
      if (etat.gateau !== g) { etat.parts = ''; etat.saveur = ''; }
      etat.modele = { nom: t.getAttribute('data-nom'), img: t.getAttribute('data-img'), gateau: g, theme: theme, fete: theme ? '*' : fete };
      etat.gateau = g; etat.fete = fete; etat.themeCarte = false;
      var ch = t.getAttribute('data-chiffre'); if (ch) etat.chiffre = ch;
      var th = $('#theme');
      if (theme && !th.value.trim()) { th.value = etat.modele.nom; etat.themeAuto = etat.modele.nom; }
      rendre(); sauver(); allerSuite();
    });
  });
  /* Amène la visiteuse à la première question sans réponse, focus compris */
  function allerSuite() {
    var m = manque(), etape = m ? $(m[1]) : $('#recap'), cible = m ? $(m[2]) : $('#preparer');
    if (!etape || etape.hidden) etape = $('#form');
    etape.scrollIntoView({ behavior: reduit ? 'auto' : 'smooth', block: 'start' });
    var foc = cible && (cible.matches('input, button') ? cible : $('button, input', cible));
    if (foc) setTimeout(function () { foc.focus({ preventScroll: true }); }, reduit ? 0 : 700);
  }

  /* ---------- Date : pas de date passée ---------- */
  var dateIn = $('#date'), auj = new Date();
  var iso = function (d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  dateIn.min = iso(auj);

  /* ---------- Garder les réponses le temps de la visite ---------- */
  var CHAMPS = ['texte', 'theme', 'idees', 'date', 'nom', 'tel', 'allergies'];
  function sauver() {
    var bm = document.getElementById('message'); if (bm && bm.classList.contains('vis')) bm.classList.remove('vis');
    try {
      var c = {}; CHAMPS.forEach(function (id) { c[id] = $('#' + id).value; });
      sessionStorage.setItem('lk-v2', JSON.stringify({ etat: etat, champs: c }));
    } catch (e) { /* stockage indisponible : rien à faire */ }
  }
  function charger() {
    try {
      var s = JSON.parse(sessionStorage.getItem('lk-v2') || 'null'); if (!s) return;
      Object.keys(etat).forEach(function (k) { if (k in s.etat) etat[k] = s.etat[k]; });
      CHAMPS.forEach(function (id) { if (s.champs && s.champs[id]) $('#' + id).value = s.champs[id]; });
    } catch (e) { /* rien */ }
  }
  CHAMPS.forEach(function (id) { $('#' + id).addEventListener('input', function () { erreur.textContent = ''; majRecap(); sauver(); }); });

  /* ---------- Le récapitulatif, repris tel quel dans le message ---------- */
  function lignesRecap() {
    var v = function (id) { return $('#' + id).value.trim(); };
    return [
      ['Modèle', etat.modele ? GATEAUX[etat.modele.gateau].l + ' « ' + etat.modele.nom + ' »' : ''],
      ['Fête', etat.fete], ['Gâteau', descGateau()],
      [etat.gateau === 'number' ? 'Garniture' : 'Saveur', etat.saveur],
      [etat.gateau === 'number' ? 'Prénom sur la plaque' : 'Texte sur le gâteau', v('texte')],
      ['Thème ou personnage', etat.gateau === 'layer' ? v('theme') : ''],
      ['Idées de décor', v('idees')], ['Douceurs', listeDouceurs()], ['Date de la fête', dateLongue()],
      ['Allergies ou régime', v('allergies')]
    ].filter(function (l) { return l[1]; });
  }
  function majRecap() {
    var r = $('#recapListe'); if (!r) return;
    var L = lignesRecap();
    r.innerHTML = '';
    L.forEach(function (l) { var dt = document.createElement('dt'), dd = document.createElement('dd'); dt.textContent = l[0]; dd.textContent = l[1]; r.appendChild(dt); r.appendChild(dd); });
    $('#recap').hidden = !etat.fete;
    var p = prix(), t = p.devis ? 'Prix dans ma réponse' : p.total ? 'À partir de ' + euros(p.total) : etat.gateau === 'wedding' ? 'À partir de 5 € la part' : '';
    $('#recapPrix').textContent = t; $('#barrePrix').textContent = t || 'Votre gâteau';
    var mi = $('#recapImg'); mi.hidden = !etat.modele; if (etat.modele) mi.src = etat.modele.img.replace('-900', '-480');
  }

  /* ---------- Le message ---------- */
  function dateLongue() { return dateIn.value ? new Date(dateIn.value + 'T12:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : ''; }
  function listeDouceurs() { return DOUCEURS.filter(function (d) { return etat[d[0]] > 0; }).map(function (d) { return pluriel(etat[d[0]], d[2], d[2] + 's'); }).join(', '); }
  function texteMessage(ref) {
    var p = prix(), L = [];
    L.push('Bonjour,', 'Voici ma demande ' + ref + ' :', '');
    lignesRecap().forEach(function (l) { L.push(l[0] + ' : ' + l[1]); });
    if (p.devis) L.push('Prix : à me donner dans votre réponse');
    else if (p.total) L.push('Prix de départ indiqué sur le site : à partir de ' + euros(p.total) + (p.note && etat.gateau === 'number' ? ' (nombre à deux chiffres : prix à confirmer)' : ''));
    var nom = $('#nom').value.trim(), tel = $('#tel').value.trim();
    L.push('', 'De la part de : ' + nom + (tel ? ' · Téléphone : ' + tel : ''), '', 'Merci !');
    return L.join('\n');
  }
  function copier(t) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(t).then(function () { return true; }, function () { return secours(t); });
    return Promise.resolve(secours(t));
  }
  function secours(t) {
    var a = document.createElement('textarea'); a.value = t; a.setAttribute('readonly', ''); a.style.position = 'fixed'; a.style.opacity = '0';
    document.body.appendChild(a); a.select(); var ok = false; try { ok = document.execCommand('copy'); } catch (e) { ok = false; } a.remove(); return ok;
  }
  function manque() {
    if (!etat.fete) return ['Choisissez la fête.', '#etapeGateau', '#choixFete'];
    if (!etat.gateau) return ['Choisissez le gâteau.', '#etapeGateau', '#choixGateau'];
    if (etat.gateau !== 'wedding' && !etat.parts) return ['Choisissez le nombre de parts.', '#etapeTaille', '#zoneTaille'];
    if (etat.gateau === 'number') { var c = parseInt(etat.chiffre, 10); if (!(c >= 1 && c <= 99)) return ['Indiquez le chiffre ou le nombre, de 1 à 99.', '#etapeTaille', '#chiffre']; }
    if (etat.gateau === 'wedding' && !(parseInt(etat.invites, 10) > 0)) return ['Indiquez le nombre d’invités.', '#etapeTaille', '#invites'];
    if (!etat.saveur) return [etat.gateau === 'number' ? 'Choisissez la garniture.' : 'Choisissez la saveur.', '#etapeSaveur', '#choixSaveur'];
    if (!dateIn.value) return ['Indiquez la date de la fête.', '#etapeDate', '#date'];
    if (dateIn.value < iso(auj)) return ['Cette date est passée. Choisissez une date à venir.', '#etapeDate', '#date'];
    if (!$('#nom').value.trim()) return ['Indiquez votre prénom.', '#etapeDate', '#nom'];
    return null;
  }
  var ref = '';
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var m = manque(), boite = $('#message');
    if (m) {
      erreur.textContent = m[0];
      var cible = $(m[2]); var foc = cible && (cible.matches('input') ? cible : $('button, input', cible));
      $(m[1]).scrollIntoView({ behavior: reduit ? 'auto' : 'smooth', block: 'center' });
      if (foc) setTimeout(function () { foc.focus({ preventScroll: true }); }, reduit ? 0 : 450);
      return;
    }
    erreur.textContent = '';
    ref = ref || 'LK-' + Date.now().toString(36).slice(-5).toUpperCase();
    var t = texteMessage(ref);
    $('#messageTexte').textContent = t;
    boite.classList.add('vis'); majBarre();
    copier(t).then(function (ok) {
      $('#copieInfo').textContent = ok ? 'Il est copié. Ouvrez Instagram, collez-le et envoyez-le-moi. Ajoutez votre photo modèle si vous en avez une.' : 'Copiez le message ci-dessous, collez-le dans Instagram et envoyez-le-moi. Ajoutez votre photo modèle si vous en avez une.';
      $('#recopier').textContent = ok ? 'Copier à nouveau' : 'Copier le message';
    });
    boite.focus({ preventScroll: true });
    boite.scrollIntoView({ behavior: reduit ? 'auto' : 'smooth', block: 'center' });
  });
  $('#recopier').addEventListener('click', function () {
    copier($('#messageTexte').textContent).then(function (ok) { $('#recopier').textContent = ok ? 'Message copié' : 'Sélectionnez le texte pour le copier'; });
  });

  /* ---------- Téléphone : le prix et l'action restent à portée de pouce pendant la composition ---------- */
  var barre = $('#barre'), vu = { composer: false, envoi: false, saisie: false };
  function majBarre() { barre.classList.toggle('vis', vu.composer && !vu.envoi && !vu.saisie && !$('#message').classList.contains('vis') && !!etat.fete); }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e) { vu.composer = e[0].isIntersecting; majBarre(); }, { threshold: 0 }).observe($('#form'));
    new IntersectionObserver(function (e) { vu.envoi = e[0].isIntersecting; majBarre(); }, { threshold: 0 }).observe($('#envoi'));
  }
  document.addEventListener('focusin', function (e) { vu.saisie = e.target.matches('input, textarea'); majBarre(); });
  document.addEventListener('focusout', function () { vu.saisie = false; majBarre(); });
  $('#barreBtn').addEventListener('click', function () { if (form.requestSubmit) form.requestSubmit(); else $('#preparer').click(); });

  charger();
  rendre();
})();
