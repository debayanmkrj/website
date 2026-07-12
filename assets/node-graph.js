/* Shared node-graph canvas animation — originally Cascade's hero background
   (content/Cascade/index.html). Reused wherever the site needs to represent
   Cascade visually without a static screenshot. Sizes to its canvas's parent
   element rather than the viewport, so it can drop into any bounded box. */
(function (global) {
  const DEFAULT_COLORS = ['#00d4ff', '#ff6535', '#a855f7', '#22c864', '#f5c842'];
  const DEFAULT_LABELS = [
    'CLIP', 'GLSL', 'p5.js', 'Three.js', 'Reasoner', 'Mason',
    'RAG', 'Phase 1', 'Phase 2', 'WebAudio', 'ShaderExec',
    'Copilot', 'Repair', 'Session', 'WebGL2', 'Runtime',
    'Nodes', 'UIST', 'Influence', 'Blend', 'Particle'
  ];

  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  }

  function mountNodeGraph(canvas, opts) {
    opts = opts || {};
    const COLORS = opts.colors || DEFAULT_COLORS;
    const LABELS = opts.labels || DEFAULT_LABELS;
    const showLabels = opts.showLabels !== false;
    const density = opts.density || 28000;
    const maxNodes = opts.maxNodes || 28;
    const container = canvas.parentElement;
    const ctx = canvas.getContext('2d');

    let nodes = [], W = 0, H = 0, raf = null;

    function resize() {
      W = canvas.width = Math.max(1, container.clientWidth);
      H = canvas.height = Math.max(1, container.clientHeight);
    }

    function initNodes() {
      nodes = [];
      const count = Math.min(maxNodes, Math.max(6, Math.floor(W * H / density)));
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: 2.5 + Math.random() * 2.5,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          label: LABELS[i % LABELS.length],
          alpha: 0.35 + Math.random() * 0.45,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          const maxD = 220;
          if (d < maxD) {
            const a = (1 - d / maxD) * 0.12;
            const [r, g, b] = hexToRgb(nodes[i].color);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(${r},${g},${b},${a})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const [r, g, b] = hexToRgb(n.color);

        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4);
        grd.addColorStop(0, `rgba(${r},${g},${b},${n.alpha * 0.4})`);
        grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${n.alpha})`;
        ctx.fill();

        if (showLabels) {
          ctx.font = '9px monospace';
          ctx.fillStyle = `rgba(${r},${g},${b},${n.alpha * 0.6})`;
          ctx.fillText(n.label, n.x + n.r + 3, n.y + 3);
        }
      }
    }

    function update() {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0) { n.x = 0; n.vx *= -1; }
        if (n.x > W) { n.x = W; n.vx *= -1; }
        if (n.y < 0) { n.y = 0; n.vy *= -1; }
        if (n.y > H) { n.y = H; n.vy *= -1; }
      }
    }

    function loop() { draw(); update(); raf = requestAnimationFrame(loop); }

    function handleResize() { resize(); initNodes(); }

    resize();
    initNodes();
    loop();
    window.addEventListener('resize', handleResize);

    return {
      destroy() {
        if (raf) cancelAnimationFrame(raf);
        window.removeEventListener('resize', handleResize);
      }
    };
  }

  global.mountNodeGraph = mountNodeGraph;
})(window);
