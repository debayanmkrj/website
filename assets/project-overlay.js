/* Shared full-screen project detail overlay (markup, media carousel with
   custom video controls, GitHub link, fetched summary.txt "About" text).
   Pairs with project-overlay.css. Usage:
     ProjectOverlay.open(projectArray, startIndex)
   where each project is { title, desc, eyebrow, media:[...], github, summaryPath } */
(function (global) {
  let root, projects = [], idx = 0, mediaIdx = 0;

  function curMedia() {
    return (projects[idx] && projects[idx].media) || [];
  }

  function fmtTime(s) {
    const m = Math.floor(s / 60);
    return String(m).padStart(2, '0') + ':' + String(Math.floor(s % 60)).padStart(2, '0');
  }

  function ensureRoot() {
    if (root) return root;
    root = document.createElement('div');
    root.className = 'po-overlay';
    root.innerHTML =
      '<div class="po-bar">' +
        '<button data-act="close">← Close</button>' +
        '<span class="po-bar-title" id="po-bar-title"></span>' +
        '<div class="po-bar-group">' +
          '<button data-act="prev-proj">Prev</button>' +
          '<span class="mono" id="po-counter" style="font-size:.62rem;color:var(--muted);"></span>' +
          '<button data-act="next-proj">Next</button>' +
        '</div>' +
      '</div>' +
      '<div class="po-body">' +
        '<div class="po-media" id="po-media">' +
          '<div class="po-media-count" id="po-media-count"></div>' +
          '<div class="po-media-nav">' +
            '<button data-act="prev-media">←</button>' +
            '<button data-act="next-media">→</button>' +
          '</div>' +
        '</div>' +
        '<div class="po-info" id="po-info"></div>' +
      '</div>';
    document.body.appendChild(root);

    root.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-act]');
      if (!btn) return;
      const act = btn.dataset.act;
      if (act === 'close') close();
      if (act === 'prev-proj') openIdx(idx - 1);
      if (act === 'next-proj') openIdx(idx + 1);
      if (act === 'prev-media' && curMedia().length) { mediaIdx = (mediaIdx - 1 + curMedia().length) % curMedia().length; renderMedia(); }
      if (act === 'next-media' && curMedia().length) { mediaIdx = (mediaIdx + 1) % curMedia().length; renderMedia(); }
    });

    document.addEventListener('keydown', (e) => {
      if (!root.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft' && curMedia().length) { mediaIdx = (mediaIdx - 1 + curMedia().length) % curMedia().length; renderMedia(); }
      if (e.key === 'ArrowRight' && curMedia().length) { mediaIdx = (mediaIdx + 1) % curMedia().length; renderMedia(); }
    });

    return root;
  }

  function buildVidControls(video) {
    const ctrl = document.createElement('div');
    ctrl.className = 'po-vid-controls';

    const muteBtn = document.createElement('button');
    muteBtn.textContent = 'MUTE';
    muteBtn.onclick = (e) => { e.stopPropagation(); video.muted = !video.muted; muteBtn.textContent = video.muted ? 'MUTE' : 'SOUND'; };

    const seek = document.createElement('input');
    seek.type = 'range'; seek.min = 0; seek.max = 1000; seek.value = 0;
    seek.oninput = (e) => { e.stopPropagation(); if (video.duration) video.currentTime = (seek.value / 1000) * video.duration; };
    seek.onclick = (e) => e.stopPropagation();

    const time = document.createElement('span');
    time.textContent = '00:00';
    video.addEventListener('timeupdate', () => {
      if (video.duration) seek.value = (video.currentTime / video.duration) * 1000;
      time.textContent = fmtTime(video.currentTime);
    });

    const fsBtn = document.createElement('button');
    fsBtn.textContent = '[ ]';
    fsBtn.onclick = (e) => {
      e.stopPropagation();
      if (video.requestFullscreen) video.requestFullscreen();
      else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
    };

    ctrl.append(muteBtn, seek, time, fsBtn);
    return ctrl;
  }

  function renderMedia() {
    const mediaEl = document.getElementById('po-media');
    mediaEl.querySelectorAll('video,img,.po-vid-controls').forEach((n) => n.remove());
    const media = curMedia();
    const cnt = document.getElementById('po-media-count');
    if (!media.length) { if (cnt) cnt.textContent = ''; return; }

    const src = media[mediaIdx];
    const isVid = /\.(mp4|webm)$/i.test(src);
    let el;
    if (isVid) {
      el = document.createElement('video');
      el.src = src; el.autoplay = true; el.muted = true; el.loop = true;
      el.setAttribute('playsinline', ''); el.setAttribute('webkit-playsinline', '');
      mediaEl.insertBefore(el, mediaEl.firstChild);
      mediaEl.appendChild(buildVidControls(el));
    } else {
      el = document.createElement('img');
      el.src = src; el.alt = '';
      mediaEl.insertBefore(el, mediaEl.firstChild);
    }
    if (cnt) cnt.textContent = media.length > 1 ? (mediaIdx + 1) + ' / ' + media.length : '';
  }

  async function openIdx(newIdx) {
    idx = (newIdx + projects.length) % projects.length;
    mediaIdx = 0;
    const p = projects[idx];
    history.replaceState(null, '', '#' + (p.slug || slugify(p.title)));
    document.getElementById('po-bar-title').textContent = p.title;
    document.getElementById('po-counter').textContent = (idx + 1) + ' / ' + projects.length;
    renderMedia();
    const infoEl = document.getElementById('po-info');
    infoEl.innerHTML =
      '<div class="po-eyebrow">' + (p.eyebrow || '') + '</div>' +
      '<div class="po-name">' + p.title + '</div>' +
      '<p class="po-desc">' + (p.desc || '') + '</p>' +
      (p.github ? '<a class="po-github" href="' + p.github + '" target="_blank" rel="noopener">GitHub ↗</a>' : '') +
      (p.summaryPath ? '<div class="po-summary-label">About</div><div class="po-summary" id="po-summary-text">Loading…</div>' : '');
    if (p.summaryPath) {
      try {
        const res = await fetch(p.summaryPath);
        if (res.ok) {
          const text = await res.text();
          const el = document.getElementById('po-summary-text');
          if (el) el.textContent = text;
        }
      } catch (e) { /* summary is optional flavor text; silently skip on failure */ }
    }
  }

  function slugify(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  function open(projectList, startIdx) {
    ensureRoot();
    projects = projectList;
    openIdx(startIdx || 0);
    root.classList.add('open');
  }

  function close() {
    if (!root) return;
    root.classList.remove('open');
    const v = root.querySelector('#po-media video');
    if (v) v.pause();
  }

  global.ProjectOverlay = { open, close };
})(window);
