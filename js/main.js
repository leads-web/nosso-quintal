(function () {
  'use strict';
  var C = window.NQ_CONFIG || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Cria elementos sem innerHTML (texto sempre escapado) */
  function h(tag, attrs, kids) {
    var el = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (attrs[k] === undefined || attrs[k] === null || attrs[k] === '') return;
      if (k === 'text') el.textContent = attrs[k]; else el.setAttribute(k, attrs[k]);
    });
    (kids || []).forEach(function (c) { if (c) el.appendChild(c); });
    return el;
  }
  function safeUrl(u) { return /^https:\/\//i.test(u || '') || /^http:\/\//i.test(u || '') ? u : ''; }
  function extLink(url, label, cls) {
    return h('a', { href: url, target: '_blank', rel: 'noopener noreferrer', 'class': cls || '', text: label });
  }

  /* Header + menu mobile */
  var header = $('.site-header'), toggle = $('.menu-toggle');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  function setMenu(open) {
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }
  toggle.addEventListener('click', function () { setMenu(!document.body.classList.contains('menu-open')); });
  document.querySelectorAll('.nav a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* Vídeo do hero: se o arquivo não existir, mostra o fundo alternativo */
  var video = $('#heroVideo'), vbtn = $('#videoToggle');
  if (video) {
    var src = video.querySelector('source');
    src.addEventListener('error', function () { video.hidden = true; });
    video.addEventListener('error', function () { video.hidden = true; });
    video.addEventListener('playing', function () { vbtn.hidden = false; });
    if (reduce) { video.removeAttribute('autoplay'); video.pause(); vbtn.hidden = false; vbtn.textContent = 'Reproduzir vídeo'; vbtn.setAttribute('aria-pressed', 'true'); }
    vbtn.addEventListener('click', function () {
      var paused = video.paused;
      if (paused) { video.play(); } else { video.pause(); }
      vbtn.textContent = paused ? 'Pausar vídeo' : 'Reproduzir vídeo';
      vbtn.setAttribute('aria-pressed', String(!paused));
    });
  }

  /* Galeria */
  var gal = $('#gallery');
  if (C.gallery && C.gallery.length) {
    C.gallery.forEach(function (g) {
      gal.appendChild(g.type === 'video'
        ? h('video', { src: g.src, controls: '', preload: 'metadata', playsinline: '', 'aria-label': g.alt })
        : h('img', { src: g.src, alt: g.alt || '', loading: 'lazy' }));
    });
    gal.hidden = false;
  }

  /* Eventos */
  var evBox = $('#events'), allEvs = (C.events || []).slice().sort(function (a, b) { return new Date(a.date) - new Date(b.date); });
  var featured = allEvs.filter(function (e) { return e.featured; })[0], evs = allEvs.filter(function (e) { return !e.featured; });
  var defUrl = safeUrl(C.tickets && C.tickets.defaultUrl), label = (C.tickets && C.tickets.buttonLabel) || 'Comprar ingressos';
  function emptyBox(title, text) { return h('div', { 'class': 'empty' }, [h('strong', { text: title }), h('p', { text: text })]); }
  var CT = C.contact || {};
  function waHref(num, text) {
    var d = (num || '').replace(/\D/g, ''); if (!d) return '';
    if (d.length <= 11) d = '55' + d;
    return 'https://wa.me/' + d + (text ? '?text=' + encodeURIComponent(text) : '');
  }
  function fmtTime(d) { return d.getHours() + 'h' + (d.getMinutes() ? String(d.getMinutes()).padStart(2, '0') : ''); }
  function fmtDay(d) { return d.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }); }
  function cap(t) { return t.charAt(0).toUpperCase() + t.slice(1); }
  /* Botão de compra: link do evento > link geral > WhatsApp de reservas > indisponível */
  function buyBtn(e, cls) {
    var u = safeUrl(e.ticketUrl) || defUrl;
    if (u) return extLink(u, label, cls);
    var d = e.date ? new Date(e.date) : null;
    var msg = 'Olá! Quero reservar ingressos para o evento do Nosso Quintal' + (d && !isNaN(d) ? ' de ' + fmtDay(d) + ', às ' + fmtTime(d) : '') + '.';
    var w = waHref(CT.whatsapp, msg);
    if (w) return extLink(w, 'Reservar pelo WhatsApp', cls);
    return h('span', { 'class': 'btn', 'aria-disabled': 'true', text: 'Ingressos em breve' });
  }

  /* Próximo evento (destaque) */
  if (featured) {
    var fd = new Date(featured.date), fok = !isNaN(fd);
    var list = function (t, arr, note) {
      return arr && arr.length ? h('div', { 'class': 'blk' }, [h('h4', { text: t }), h('p', { text: arr.join(' · ') }), note ? h('p', { 'class': 'note', text: note }) : null]) : null;
    };
    var prices = (featured.prices || []).map(function (p) {
      return h('div', { 'class': 'price-box' }, [h('span', { text: p.label }), h('strong', { text: p.value })]);
    });
    var phones = [CT.whatsapp, CT.whatsapp2].filter(Boolean).map(function (n, i) { return extLink(waHref(n), n); });
    var info = h('div', { 'class': 'next-info' }, [
      fok ? h('p', { 'class': 'next-when', text: cap(fmtDay(fd)) + ' · ' + fmtTime(fd) }) : null,
      prices.length ? h('div', { 'class': 'blk' }, [h('h4', { text: 'Ingressos' }), h('div', { 'class': 'prices' }, prices)]) : null,
      list('Atrações', featured.attractions, featured.attractionsNote),
      list('Na casa', featured.highlights),
      featured.address ? h('div', { 'class': 'blk' }, [h('h4', { text: 'Onde' }), CT.mapsUrl && safeUrl(CT.mapsUrl) ? extLink(CT.mapsUrl, featured.address) : h('p', { text: featured.address })]) : null,
      h('div', { 'class': 'hero-cta' }, [buyBtn(featured, 'btn'), h('a', { 'class': 'btn btn-ghost', href: '#cardapios', text: 'Ver cardápio' })]),
      phones.length ? h('p', { 'class': 'note reserve' }, [document.createTextNode('Reservas e informações: ')].concat(phones.reduce(function (a, n, i) { if (i) a.push(document.createTextNode(' · ')); a.push(n); return a; }, []))) : null
    ]);
    var fly = featured.flyer ? h('a', { 'class': 'flyer', href: featured.flyer, target: '_blank', rel: 'noopener', 'aria-label': 'Abrir o flyer em tamanho grande' }, [h('img', { src: featured.flyer, alt: featured.flyerAlt || 'Flyer do evento', width: 720, height: 878, loading: 'lazy' })]) : null;
    $('#next').appendChild(h('div', { 'class': 'next-grid reveal' }, [fly, info]));
    $('#proximo').hidden = false;
  }

  if (!allEvs.length) {
    $('#eventos').hidden = false;
    evBox.appendChild(emptyBox('Novos eventos em breve', 'A programação oficial será publicada aqui.'));
  } else if (evs.length) { $('#eventos').hidden = false; }
  evs.forEach(function (e) {
    var d = e.date ? new Date(e.date) : null, ok = d && !isNaN(d);
    var media = h('div', { 'class': 'card-media' }, [
      e.image ? h('img', { 'class': 'poster', src: e.image, alt: 'Cartaz: ' + e.title, loading: 'lazy' })
              : h('img', { 'class': 'mark', src: 'assets/img/logo.png', alt: '', loading: 'lazy' }),
      ok ? h('div', { 'class': 'date' }, [h('b', { text: String(d.getDate()) }), h('small', { text: d.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '').toUpperCase() })]) : null,
      e.demo ? h('span', { 'class': 'tag', text: 'Exemplo' }) : null
    ]);
    var when = ok ? d.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }) + (e.date.indexOf('T') > -1 ? ' às ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '') : '';
    var body = h('div', { 'class': 'card-body' }, [
      h('h3', { text: e.title }),
      when ? h('p', { 'class': 'when', text: when }) : null,
      e.description ? h('p', { 'class': 'desc', text: e.description }) : null,
      e.price ? h('p', { 'class': 'price', text: e.price }) : null,
      buyBtn(e, 'btn')
    ]);
    evBox.appendChild(h('article', { 'class': 'card reveal' }, [media, body]));
  });

  /* Ingressos */
  var tText = $('#ticketsText'), tAct = $('#ticketsAction');
  if (defUrl) {
    tText.textContent = 'A compra é feita em uma plataforma externa, em nova aba.';
    tAct.appendChild(extLink(defUrl, label, 'btn'));
  } else if (waHref(CT.whatsapp)) {
    tText.textContent = 'Ainda não há venda online. Reserve e tire dúvidas direto pelo WhatsApp.';
    tAct.appendChild(buyBtn(featured || {}, 'btn'));
    tAct.appendChild(h('a', { 'class': 'btn btn-ghost', href: featured ? '#proximo' : '#eventos', text: 'Ver evento' }));
  } else {
    tText.textContent = 'A venda de ingressos será aberta em breve. Os links oficiais aparecerão aqui.';
    tAct.appendChild(h('span', { 'class': 'btn', 'aria-disabled': 'true', text: 'Ingressos em breve' }));
  }

  /* Cardápios (abas acessíveis) */
  var mBox = $('#menus'), menus = C.menus || [];
  function renderMenu(m) {
    var wrap = h('div', { role: 'tabpanel' });
    if (m.description) wrap.appendChild(h('p', { 'class': 'menu-intro', text: m.description }));
    (m.categories || []).forEach(function (c) {
      var cat = h('section', { 'class': 'cat' }, [h('h3', { text: c.name })]);
      if (c.note) cat.appendChild(h('p', { 'class': 'note', text: c.note }));
      (c.items || []).forEach(function (i) {
        var vars = (i.variations || []).map(function (v) { return h('span', { text: v.label + (v.price ? ' · ' + v.price : '') }); });
        cat.appendChild(h('article', { 'class': 'item' }, [
          h('h4', { text: i.name }),
          i.price ? h('span', { 'class': 'p', text: i.price }) : null,
          i.description ? h('p', { 'class': 'd', text: i.description }) : null,
          vars.length ? h('div', { 'class': 'vars' }, vars) : null,
          i.note ? h('p', { 'class': 'note', text: i.note }) : null,
          i.image ? h('img', { src: i.image, alt: i.name, loading: 'lazy' }) : null
        ]));
      });
      wrap.appendChild(cat);
    });
    return wrap;
  }
  if (!menus.length) {
    mBox.appendChild(emptyBox('Cardápios em breve', 'Os cardápios oficiais serão publicados aqui.'));
  } else {
    var tabs = h('div', { 'class': 'tabs', role: 'tablist', 'aria-label': 'Cardápios' }), panel = h('div');
    var btns = menus.map(function (m, idx) {
      var b = h('button', { 'class': 'tab', type: 'button', role: 'tab', 'aria-selected': 'false', text: m.name });
      b.addEventListener('click', function () { select(idx); });
      b.addEventListener('keydown', function (e) {
        var n = e.key === 'ArrowRight' ? idx + 1 : e.key === 'ArrowLeft' ? idx - 1 : null;
        if (n === null) return;
        n = (n + menus.length) % menus.length; select(n); btns[n].focus();
      });
      tabs.appendChild(b); return b;
    });
    function select(i) {
      btns.forEach(function (b, k) { b.setAttribute('aria-selected', String(k === i)); b.tabIndex = k === i ? 0 : -1; });
      panel.replaceChildren(renderMenu(menus[i]));
    }
    if (menus.length > 1) mBox.appendChild(tabs);
    mBox.appendChild(panel); select(0);
  }

  /* Contato e redes: só mostra o que foi preenchido */
  var k = C.contact || {}, cBox = $('#contact'), dl = h('dl'), any = false;
  function row(t, node) { dl.appendChild(h('div', {}, [h('dt', { text: t }), h('dd', {}, [node])])); any = true; }
  if (k.address) row('Endereço', k.mapsUrl && safeUrl(k.mapsUrl) ? extLink(k.mapsUrl, k.address) : h('span', { text: k.address }));
  if (k.hours) row('Horários', h('span', { text: k.hours }));
  var wl = [k.whatsapp, k.whatsapp2].filter(function (n) { return waHref(n); });
  if (wl.length) { var wb = h('span'); wl.forEach(function (n, i) { if (i) wb.appendChild(document.createTextNode(' · ')); wb.appendChild(extLink(waHref(n), n)); }); row('WhatsApp', wb); }
  if (k.phone) row('Telefone', h('a', { href: 'tel:' + k.phone.replace(/[^\d+]/g, ''), text: k.phone }));
  if (k.email) row('E-mail', h('a', { href: 'mailto:' + k.email, text: k.email }));
  var socials = [['Instagram', k.instagram], ['Facebook', k.facebook], ['TikTok', k.tiktok], ['YouTube', k.youtube]].filter(function (s) { return safeUrl(s[1]); });
  if (socials.length) {
    var box = h('span', {}, []);
    socials.forEach(function (s, i) { if (i) box.appendChild(document.createTextNode(' · ')); box.appendChild(extLink(s[1], s[0])); });
    row('Redes sociais', box);
  }
  if (any) cBox.appendChild(dl); else cBox.appendChild(emptyBox('Informações em breve', 'Endereço, horários e canais oficiais serão divulgados aqui.'));
  if (safeUrl(k.mapEmbedUrl)) cBox.appendChild(h('div', { 'class': 'map' }, [h('iframe', { src: k.mapEmbedUrl, title: 'Mapa de localização do Nosso Quintal', loading: 'lazy', referrerpolicy: 'no-referrer-when-downgrade' })]));
  var fs = $('#footSocial'); socials.forEach(function (s) { fs.appendChild(extLink(s[1], s[0])); });

  $('#year').textContent = new Date().getFullYear();

  /* Revelação suave no scroll */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else { items.forEach(function (el) { el.classList.add('in'); }); }
})();
