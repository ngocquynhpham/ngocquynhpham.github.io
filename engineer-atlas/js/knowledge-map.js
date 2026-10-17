/**
 * Graph = force-graph 2D (chấm nhỏ, pan/zoom). Mind map = cột roadmap.sh.
 */

const MODE_KEY = 'atlas-map-mode';
const MM_POS_KEY = 'atlas-mm-node-pos';
const FORCE_GRAPH_URL = 'https://cdn.jsdelivr.net/npm/force-graph@1.43.5/+esm';
const GRAPH_BG = '#050810';
/** Palette: xanh dương neon; done = xanh lá neon */
const NEON_BLUE = '#00d4ff';
const NEON_BLUE_MID = '#00a8ff';
const NEON_BLUE_SOFT = '#7dd3fc';
const NEON_GREEN = '#39ff14';
const NEON_GREEN_DONE = '#00ff88';

function readMode() {
  try {
    const m = localStorage.getItem(MODE_KEY);
    return m === 'mindmap' ? 'mindmap' : 'graph';
  } catch {
    return 'graph';
  }
}

function writeMode(mode) {
  try {
    localStorage.setItem(MODE_KEY, mode);
  } catch {
    /* ignore */
  }
}

function topicStatusAgg(topicIds, getStatus) {
  if (!topicIds.length) return 'todo';
  const statuses = topicIds.map((id) => getStatus(id));
  if (statuses.every((s) => s === 'done' || s === 'known')) return 'done';
  if (statuses.some((s) => s === 'doing')) return 'doing';
  if (statuses.every((s) => s === 'later')) return 'later';
  return 'todo';
}

function moduleTopicIds(modules, mi) {
  const ids = [];
  modules[mi].weeks.forEach((w, wi) => w[1].forEach((_, ti) => ids.push(`${mi}-${wi}-${ti}`)));
  return ids;
}

function weekTopicIds(mi, wi) {
  return [0, 1, 2, 3].map((ti) => `${mi}-${wi}-${ti}`);
}

function nodeVal(kind) {
  if (kind === 'root') return 3;
  if (kind === 'module') return 2.4;
  if (kind === 'week') return 1.8;
  return 1.3;
}

function truncate(s, max) {
  const t = String(s ?? '');
  return t.length <= max ? t : `${t.slice(0, max - 1)}…`;
}

function collectTreeNodes(modules, moduleShort, domainShort, expandedModules, expandedWeeks, getStatus) {
  const nodes = [];
  const edges = [];

  nodes.push({
    id: 'root',
    kind: 'root',
    label: 'Engineer Atlas',
    sub: '6 tháng · fullstack + AI',
    status: topicStatusAgg(
      modules.flatMap((_, mi) => moduleTopicIds(modules, mi)),
      getStatus
    ),
    expandable: false,
  });

  modules.forEach((m, mi) => {
    const tids = moduleTopicIds(modules, mi);
    nodes.push({
      id: `module-${mi}`,
      kind: 'module',
      moduleIndex: mi,
      label: moduleShort[mi] || domainShort[mi] || m.name,
      sub: `Tháng ${mi + 1}`,
      status: topicStatusAgg(tids, getStatus),
      expandable: true,
    });
    edges.push({ from: 'root', to: `module-${mi}` });

    if (!expandedModules.has(mi)) return;

    m.weeks.forEach((w, wi) => {
      const key = `${mi}-${wi}`;
      const wids = weekTopicIds(mi, wi);
      nodes.push({
        id: `week-${mi}-${wi}`,
        kind: 'week',
        moduleIndex: mi,
        weekIndex: wi,
        label: w[0],
        sub: `Tuần ${mi * 4 + wi + 1}`,
        status: topicStatusAgg(wids, getStatus),
        expandable: true,
      });
      edges.push({ from: `module-${mi}`, to: `week-${mi}-${wi}` });

      if (!expandedWeeks.has(key)) return;

      w[1].forEach((title, ti) => {
        const tid = `${mi}-${wi}-${ti}`;
        nodes.push({
          id: `topic-${tid}`,
          kind: 'topic',
          topicId: tid,
          moduleIndex: mi,
          weekIndex: wi,
          label: title,
          sub: '',
          status: getStatus(tid),
          expandable: false,
        });
        edges.push({ from: `week-${mi}-${wi}`, to: `topic-${tid}` });
      });
    });
  });

  return { nodes, edges };
}

function toggleExpand(id, expandedModules, expandedWeeks) {
  if (id.startsWith('module-')) {
    const mi = Number(id.replace('module-', ''));
    if (expandedModules.has(mi)) {
      expandedModules.delete(mi);
      [...expandedWeeks].forEach((k) => {
        if (k.startsWith(`${mi}-`)) expandedWeeks.delete(k);
      });
    } else {
      expandedModules.add(mi);
    }
    return;
  }
  if (id.startsWith('week-')) {
    const parts = id.replace('week-', '').split('-');
    const key = `${parts[0]}-${parts[1]}`;
    if (expandedWeeks.has(key)) expandedWeeks.delete(key);
    else expandedWeeks.add(key);
  }
}

function toForceGraphData(tree) {
  return {
    nodes: tree.nodes.map((n) => ({ ...n, val: nodeVal(n.kind) })),
    links: tree.edges.map((e) => ({ source: e.from, target: e.to })),
  };
}

function graphNodeColor(n, selectedId) {
  if (n.status === 'done' || n.status === 'known') return NEON_GREEN_DONE;
  if (n.id === selectedId) return NEON_BLUE;
  if (n.status === 'doing') return NEON_BLUE_MID;
  if (n.kind === 'root') return NEON_BLUE;
  return NEON_BLUE_MID;
}

function graphLabelColor(n, selectedId) {
  if (n.status === 'done' || n.status === 'known') return NEON_GREEN;
  if (n.id === selectedId) return '#e0faff';
  return NEON_BLUE_SOFT;
}

function applyGraphForces(graph) {
  const link = graph.d3Force('link');
  link?.distance((l) => {
    const tgt = typeof l.target === 'object' ? l.target : null;
    const kind = tgt?.kind;
    if (kind === 'module') return 110;
    if (kind === 'week') return 78;
    if (kind === 'topic') return 62;
    return 90;
  });
  link?.strength(0.72);
  graph.d3Force('charge')?.strength(-320);
  graph.d3Force('center')?.strength(0.035);
  graph.d3VelocityDecay(0.35);
}

function escapeXml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(s) {
  return escapeXml(s).replace(/'/g, '&#39;');
}

function cardSize(kind) {
  if (kind === 'root') return { w: 160, h: 56 };
  if (kind === 'module') return { w: 148, h: 50 };
  if (kind === 'week') return { w: 172, h: 46 };
  return { w: 200, h: 40 };
}

function readMmPosOverrides() {
  try {
    const raw = sessionStorage.getItem(MM_POS_KEY);
    if (!raw) return new Map();
    const obj = JSON.parse(raw);
    return new Map(Object.entries(obj).map(([id, p]) => [id, { x: p.x, y: p.y }]));
  } catch {
    return new Map();
  }
}

function writeMmPosOverrides(map) {
  try {
    const obj = Object.fromEntries(map);
    sessionStorage.setItem(MM_POS_KEY, JSON.stringify(obj));
  } catch {
    /* ignore */
  }
}

function pruneMmPosOverrides(overrides, tree) {
  const ids = new Set(tree.nodes.map((n) => n.id));
  [...overrides.keys()].forEach((id) => {
    if (!ids.has(id)) overrides.delete(id);
  });
}

function nodeDisplayPos(n, overrides) {
  const o = overrides.get(n.id);
  return o ? { x: o.x, y: o.y } : { x: n.x, y: n.y };
}

/** Mind map roadmap.sh: cột trái → phải; xếp dọc theo chiều cao thật của card (không chồng). */
function layoutRoadmapColumns(tree, modules, expandedModules, expandedWeeks) {
  const pad = 40;
  const header = 36;
  const col = { root: pad, module: pad + 168, week: pad + 360, topic: pad + 560 };
  const gap = 14;
  const gapModule = 28;
  const placed = new Map();

  const root = tree.nodes.find((n) => n.id === 'root');
  const rs = cardSize('root');

  const bands = modules.map((m, mi) => {
    const ms = cardSize('module');
    if (!expandedModules.has(mi)) {
      return { height: ms.h + gapModule, blocks: [] };
    }
    const blocks = [];
    let innerH = 0;
    m.weeks.forEach((w, wi) => {
      const ws = cardSize('week');
      let blockH = ws.h + gap;
      const topicCount = expandedWeeks.has(`${mi}-${wi}`) ? w[1].length : 0;
      if (topicCount) {
        blockH += topicCount * (cardSize('topic').h + gap);
      }
      blocks.push({ wi, blockH, topicCount });
      innerH += blockH;
    });
    return { height: Math.max(innerH, ms.h) + gapModule, blocks };
  });

  const stackH = bands.reduce((s, b) => s + b.height, 0);
  const rootY = pad + header + stackH / 2 - rs.h / 2;
  placed.set('root', { ...root, x: col.root, y: rootY, ...rs });

  let yCursor = pad + header;
  modules.forEach((m, mi) => {
    const band = bands[mi];
    const n = tree.nodes.find((x) => x.id === `module-${mi}`);
    if (!n) {
      yCursor += band.height;
      return;
    }
    const ms = cardSize('module');
    const modY = yCursor + band.height / 2 - ms.h / 2;
    placed.set(n.id, { ...n, x: col.module, y: modY, ...ms });

    if (expandedModules.has(mi)) {
      let y = yCursor;
      band.blocks.forEach(({ wi, blockH, topicCount }) => {
        const wn = tree.nodes.find((x) => x.id === `week-${mi}-${wi}`);
        if (!wn) return;
        const ws = cardSize('week');
        placed.set(wn.id, { ...wn, x: col.week, y, ...ws });
        let yTopic = y + ws.h + gap;
        if (topicCount) {
          m.weeks[wi][1].forEach((_, ti) => {
            const tn = tree.nodes.find((x) => x.id === `topic-${mi}-${wi}-${ti}`);
            if (!tn) return;
            const ts = cardSize('topic');
            placed.set(tn.id, { ...tn, x: col.topic, y: yTopic, ...ts });
            yTopic += ts.h + gap;
          });
        }
        y += blockH;
      });
    }
    yCursor += band.height;
  });

  const nodes = tree.nodes.map((n) => placed.get(n.id)).filter(Boolean);
  const width = col.topic + 240 + pad;
  const height = Math.max(520, yCursor + pad);
  return { nodes, edges: tree.edges, width, height, columns: col };
}

function mindmapEdgePath(a, b) {
  const x1 = a.x + a.w;
  const y1 = a.y + a.h / 2;
  const x2 = b.x;
  const y2 = b.y + b.h / 2;
  const mx = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
}

function refreshMindmapEdges(svg, layout, overrides) {
  if (!svg || !layout) return;
  const byId = Object.fromEntries(
    layout.nodes.map((n) => {
      const p = nodeDisplayPos(n, overrides);
      return [n.id, { ...n, x: p.x, y: p.y }];
    })
  );
  svg.querySelectorAll('.km-mm-edge').forEach((path) => {
    const a = byId[path.dataset.from];
    const b = byId[path.dataset.to];
    if (!a || !b) return;
    path.setAttribute('d', mindmapEdgePath(a, b));
  });
}

function renderMindmapCard(n, x, y, selectedId, expandedModules, expandedWeeks) {
  let isOpen = false;
  if (n.kind === 'module') isOpen = expandedModules.has(n.moduleIndex);
  if (n.kind === 'week') isOpen = expandedWeeks.has(`${n.moduleIndex}-${n.weekIndex}`);
  const chevron = n.expandable ? (isOpen ? '▾' : '▸') : '';
  const sel = n.id === selectedId ? ' is-selected' : '';
  const st = n.status ? ` status-${n.status}` : '';
  return `<g class="km-mm-node${sel}${st} kind-${n.kind}" data-node-id="${n.id}" data-expandable="${n.expandable ? '1' : '0'}" data-w="${n.w}" data-h="${n.h}" transform="translate(${x}, ${y})" tabindex="0">
    <rect class="km-mm-card" x="0" y="0" width="${n.w}" height="${n.h}" rx="10" ry="10"/>
    <foreignObject x="0" y="0" width="${n.w}" height="${n.h}">
      <div xmlns="http://www.w3.org/1999/xhtml" class="km-mm-fo">
        <div class="km-mm-row">
          ${chevron ? `<span class="km-mm-chevron">${chevron}</span>` : ''}
          <button type="button" class="km-mm-label km-nav" title="${escapeAttr(n.label)}">${escapeXml(truncate(n.label, 42))}</button>
        </div>
        ${n.sub ? `<div class="km-mm-sub">${escapeXml(n.sub)}</div>` : ''}
      </div>
    </foreignObject>
  </g>`;
}

function renderMindmapSvg(layout, selectedId, expandedModules, expandedWeeks, overrides) {
  const byId = Object.fromEntries(
    layout.nodes.map((n) => {
      const p = nodeDisplayPos(n, overrides);
      return [n.id, { ...n, x: p.x, y: p.y }];
    })
  );
  const { columns: col } = layout;

  const colGuides = `
    <text class="km-rm-colhead" x="${col.root + 4}" y="24">Atlas</text>
    <text class="km-rm-colhead" x="${col.module + 4}" y="24">Tháng</text>
    <text class="km-rm-colhead" x="${col.week + 4}" y="24">Tuần</text>
    <text class="km-rm-colhead" x="${col.topic + 4}" y="24">Chủ đề</text>
    <line class="km-rm-spine" x1="${col.root + 80}" y1="32" x2="${col.root + 80}" y2="${layout.height - 20}"/>
  `;

  const edges = layout.edges
    .map((e) => {
      const a = byId[e.from];
      const b = byId[e.to];
      if (!a || !b) return '';
      return `<path class="km-mm-edge" data-from="${e.from}" data-to="${e.to}" d="${mindmapEdgePath(a, b)}" fill="none"/>`;
    })
    .join('');

  const nodes = layout.nodes
    .map((n) => {
      const p = nodeDisplayPos(n, overrides);
      return renderMindmapCard(n, p.x, p.y, selectedId, expandedModules, expandedWeeks);
    })
    .join('');

  return `<svg class="km-mm-svg km-rm-svg" viewBox="0 0 ${layout.width} ${layout.height}" width="${layout.width}" height="${layout.height}">
    ${colGuides}
    ${edges}
    ${nodes}
  </svg>`;
}

let forceGraphLoader;

function loadForceGraphLib() {
  if (!forceGraphLoader) {
    forceGraphLoader = import(/* webpackIgnore: true */ FORCE_GRAPH_URL).then((m) => m.default);
  }
  return forceGraphLoader;
}

export function mountKnowledgeMap(stageEl, options) {
  if (!stageEl) return { destroy() {} };

  const { modules, domainShort, moduleShort, getStatus, onSelect, onNavigate, onModeChange } = options;

  let mode = readMode();
  let selectedId = 'root';
  const expandedModules = new Set();
  const expandedWeeks = new Set();
  let treeNodes = [];
  let graph = null;
  let graphLayer = null;
  let mindmapLayer = null;
  let mindmapPan = null;
  let mmPanX = 0;
  let mmPanY = 0;
  let mmZoom = 1;
  let mmNodePos = readMmPosOverrides();
  let lastMindmapLayout = null;
  let mmSuppressClick = false;
  let resizeObs = null;
  let lastClick = { id: null, t: 0 };
  let destroyed = false;
  let graphReady = false;

  stageEl.innerHTML = '';
  stageEl.dataset.mode = mode;

  graphLayer = document.createElement('div');
  graphLayer.className = 'km-graph-host';
  mindmapLayer = document.createElement('div');
  mindmapLayer.className = 'km-mindmap-viewport';
  mindmapPan = document.createElement('div');
  mindmapPan.className = 'km-mindmap-pan';
  mindmapLayer.appendChild(mindmapPan);
  stageEl.appendChild(graphLayer);
  stageEl.appendChild(mindmapLayer);

  function findNode(id) {
    return treeNodes.find((n) => n.id === id) || null;
  }

  function buildTree() {
    return collectTreeNodes(modules, moduleShort, domainShort, expandedModules, expandedWeeks, getStatus);
  }

  function metaFromClick(id) {
    return buildTree().nodes.find((n) => n.id === id);
  }

  function handleExpandOrSelect(id, { navigate = false } = {}) {
    const meta = metaFromClick(id);
    if (!meta) return;
    selectedId = id;

    if (navigate && meta.kind !== 'root') {
      onNavigate?.(meta);
      return;
    }

    if (meta.expandable) {
      toggleExpand(id, expandedModules, expandedWeeks);
      refresh();
      return;
    }

    onSelect?.(meta);
    if (mode === 'graph') paintGraph(false);
    else paintMindmap(false);
  }

  function handleNodeClickGraph(node) {
    if (!node?.id) return;
    const now = Date.now();
    const dbl = lastClick.id === node.id && now - lastClick.t < 400;
    lastClick = { id: node.id, t: now };
    handleExpandOrSelect(node.id, { navigate: dbl });
  }

  function bindMindmapPointer() {
    let panDrag = null;
    let nodeDrag = null;

    mindmapPan.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      const onLabel = e.target.closest('.km-mm-label');
      const nodeG = e.target.closest('.km-mm-node');
      if (nodeG && !onLabel) {
        const id = nodeG.dataset.nodeId;
        const layoutNode = lastMindmapLayout?.nodes.find((n) => n.id === id);
        if (!layoutNode) return;
        const cur = nodeDisplayPos(layoutNode, mmNodePos);
        nodeDrag = {
          id,
          el: nodeG,
          sx: e.clientX,
          sy: e.clientY,
          ox: cur.x,
          oy: cur.y,
          moved: false,
          pointerId: e.pointerId,
        };
        nodeG.setPointerCapture(e.pointerId);
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      if (nodeG || e.target.closest('.km-nav')) return;
      panDrag = { sx: e.clientX, sy: e.clientY, px: mmPanX, py: mmPanY, pointerId: e.pointerId };
      mindmapLayer.setPointerCapture(e.pointerId);
    });

    const onPointerMove = (e) => {
      if (nodeDrag && e.pointerId === nodeDrag.pointerId) {
        const dx = (e.clientX - nodeDrag.sx) / mmZoom;
        const dy = (e.clientY - nodeDrag.sy) / mmZoom;
        if (!nodeDrag.moved && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) {
          nodeDrag.moved = true;
          nodeDrag.el.classList.add('is-dragging');
        }
        if (!nodeDrag.moved) return;
        const nx = nodeDrag.ox + dx;
        const ny = nodeDrag.oy + dy;
        mmNodePos.set(nodeDrag.id, { x: nx, y: ny });
        nodeDrag.el.setAttribute('transform', `translate(${nx}, ${ny})`);
        const svg = mindmapPan.querySelector('.km-mm-svg');
        refreshMindmapEdges(svg, lastMindmapLayout, mmNodePos);
        e.preventDefault();
        return;
      }
      if (!panDrag || e.pointerId !== panDrag.pointerId) return;
      mmPanX = panDrag.px + (e.clientX - panDrag.sx);
      mmPanY = panDrag.py + (e.clientY - panDrag.sy);
      applyMindmapTransform();
    };

    const endPointer = (e) => {
      if (nodeDrag && e.pointerId === nodeDrag.pointerId) {
        if (nodeDrag.moved) {
          mmSuppressClick = true;
          writeMmPosOverrides(mmNodePos);
        }
        nodeDrag.el.classList.remove('is-dragging');
        nodeDrag.el.releasePointerCapture(e.pointerId);
        nodeDrag = null;
        return;
      }
      if (!panDrag || e.pointerId !== panDrag.pointerId) return;
      mindmapLayer.releasePointerCapture(e.pointerId);
      panDrag = null;
    };

    mindmapLayer.addEventListener('pointermove', onPointerMove);
    mindmapLayer.addEventListener('pointerup', endPointer);
    mindmapLayer.addEventListener('pointercancel', endPointer);

    mindmapLayer.onwheel = (e) => {
      e.preventDefault();
      const f = e.deltaY < 0 ? 1.07 : 0.93;
      mmZoom = Math.min(2.2, Math.max(0.45, mmZoom * f));
      applyMindmapTransform();
    };
  }

  function applyMindmapTransform() {
    mindmapPan.style.transform = `translate(${mmPanX}px, ${mmPanY}px) scale(${mmZoom})`;
  }

  function bindMindmapClicks() {
    mindmapPan.onclick = (e) => {
      if (mmSuppressClick) {
        mmSuppressClick = false;
        return;
      }
      const nav = e.target.closest('.km-nav');
      if (nav) {
        e.preventDefault();
        e.stopPropagation();
        const g = nav.closest('.km-mm-node');
        if (g) handleExpandOrSelect(g.dataset.nodeId, { navigate: true });
        return;
      }
      const g = e.target.closest('.km-mm-node');
      if (!g) return;
      e.stopPropagation();
      handleExpandOrSelect(g.dataset.nodeId, { navigate: false });
    };
  }

  function paintGraph(relayout = true) {
    if (!graph) return;
    const tree = buildTree();
    treeNodes = tree.nodes;
    if (!treeNodes.some((n) => n.id === selectedId)) selectedId = 'root';

    graph
      .nodeRelSize(3.2)
      .nodeVal('val')
      .nodeColor((n) => graphNodeColor(n, selectedId))
      .linkColor((link) => {
        const tgt = typeof link.target === 'object' ? link.target : null;
        if (tgt?.status === 'done' || tgt?.status === 'known') return 'rgba(0, 255, 136, 0.35)';
        return 'rgba(0, 212, 255, 0.22)';
      })
      .linkWidth(0.55)
      .nodeCanvasObjectMode(() => 'after')
      .nodeCanvasObject((node, ctx, globalScale) => {
        const label = truncate(node.label, 26);
        const fontPx = Math.max(11 / globalScale, 2.5);
        ctx.font = `500 ${fontPx}px Inter, system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = graphLabelColor(node, selectedId);
        ctx.fillText(label, node.x, node.y + 5 / globalScale);
      })
      .graphData(toForceGraphData(tree));

    applyGraphForces(graph);
    if (relayout) graph.d3ReheatSimulation();

    onSelect?.(findNode(selectedId));

    if (relayout) {
      setTimeout(() => {
        if (graph && !destroyed) graph.zoomToFit(520, 48);
      }, 600);
    }
  }

  function paintMindmap(relayout = true) {
    const tree = buildTree();
    treeNodes = tree.nodes;
    if (!treeNodes.some((n) => n.id === selectedId)) selectedId = 'root';
    pruneMmPosOverrides(mmNodePos, tree);
    const layout = layoutRoadmapColumns(tree, modules, expandedModules, expandedWeeks);
    lastMindmapLayout = layout;
    mindmapPan.innerHTML = renderMindmapSvg(layout, selectedId, expandedModules, expandedWeeks, mmNodePos);
    applyMindmapTransform();
    onSelect?.(findNode(selectedId));
    if (relayout) {
      mmPanX = 0;
      mmPanY = 0;
      mmZoom = 1;
      applyMindmapTransform();
    }
  }

  function refresh() {
    if (mode === 'graph') paintGraph(true);
    else paintMindmap(true);
  }

  function setLayerVisibility() {
    const isGraph = mode === 'graph';
    graphLayer.classList.toggle('hidden', !isGraph);
    mindmapLayer.classList.toggle('hidden', isGraph);
    mindmapLayer.classList.toggle('is-active', !isGraph);
  }

  async function ensureGraph() {
    if (graphReady || destroyed) return;
    graphLayer.innerHTML = '<div class="km-graph-loading">Đang tải Graph view…</div>';
    try {
      const ForceGraph = await loadForceGraphLib();
      if (destroyed) return;
      graphLayer.innerHTML = '';

      graph = ForceGraph()(graphLayer)
        .backgroundColor(GRAPH_BG)
        .enableNodeDrag(false)
        .enableZoomInteraction(true)
        .enablePanInteraction(true)
        .warmupTicks(120)
        .cooldownTicks(80)
        .onNodeClick(handleNodeClickGraph);

      graphReady = true;
      resizeGraph();
    } catch (err) {
      console.error(err);
      graph = null;
      graphReady = false;
      graphLayer.innerHTML = `<div class="km-graph-error">Không tải Graph view (${escapeXml(err.message)})</div>`;
    }
  }

  function resizeGraph() {
    if (!graph) return;
    graph.width(stageEl.clientWidth || 640).height(stageEl.clientHeight || 420);
  }

  async function boot() {
    bindMindmapPointer();
    bindMindmapClicks();
    setLayerVisibility();
    resizeObs = new ResizeObserver(() => {
      if (mode === 'graph') resizeGraph();
    });
    resizeObs.observe(stageEl);

    if (mode === 'graph') {
      await ensureGraph();
      paintGraph(true);
    } else {
      paintMindmap(true);
    }
  }

  boot();

  return {
    destroy() {
      destroyed = true;
      resizeObs?.disconnect();
      graph?._destructor?.();
      graph = null;
      stageEl.innerHTML = '';
    },
    async setMode(next) {
      mode = next === 'mindmap' ? 'mindmap' : 'graph';
      writeMode(mode);
      stageEl.dataset.mode = mode;
      setLayerVisibility();
      onModeChange?.(mode);
      if (mode === 'graph') {
        await ensureGraph();
        if (graph) paintGraph(true);
      } else {
        paintMindmap(true);
      }
    },
    getMode: () => mode,
    refresh,
    selectNode(id) {
      selectedId = id;
      if (mode === 'graph') paintGraph(false);
      else paintMindmap(false);
    },
    expandModule(mi) {
      expandedModules.add(mi);
      refresh();
    },
    expandWeek(mi, wi) {
      expandedModules.add(mi);
      expandedWeeks.add(`${mi}-${wi}`);
      refresh();
    },
    collapseAll() {
      expandedModules.clear();
      expandedWeeks.clear();
      selectedId = 'root';
      mmNodePos.clear();
      writeMmPosOverrides(mmNodePos);
      refresh();
    },
    resetView() {
      if (mode === 'graph' && graph) {
        graph.zoomToFit(600, 48);
      } else {
        mmPanX = 0;
        mmPanY = 0;
        mmZoom = 1;
        mmNodePos.clear();
        writeMmPosOverrides(mmNodePos);
        paintMindmap(false);
        applyMindmapTransform();
      }
    },
  };
}

export { readMode as getStoredMapMode };
