# Swiss Flow Studio — Product & Engineering Specification

**Version:** 1.0 MVP · **Stack:** HTML5, CSS3, Vanilla JavaScript (ES Modules), SVG · **Visual style:** Swiss Minimalism / Technical Editorial.

## 1. Product vision

A browser-based diagram studio for technical educators, developers and designers to build elegant architecture diagrams with animated data-flow connectors and export them as shareable assets. Differentiate from generic flowchart tools through editorial visual polish, opinionated presets, and motion-first storytelling.

## 2. Visual design system

- Font: Inter / Geist / system sans-serif fallback.
- Canvas: `#FBFCFF`; panels `#FFFFFF`; app chrome `#F5F6FA`.
- Primary text `#191B24`; secondary text `#8B90A0`; borders `#E8EAF0`.
- Accent violet `#7665F6`; blue `#4B8EF7`; green `#18B996`; pink `#FF648B`; amber `#E8A23E`.
- Border: 1px neutral gray; radii 7–11px; minimal shadow; 8px spacing grid.
- Node: default 160×76 SVG units, white card, 35×35 tinted icon area, title and subtitle.
- Connections: cubic Bézier path, neutral base stroke plus animated violet overlay.
- Desktop shell: top toolbar (66px), 67px tool rail, 252px node library, flexible canvas, 270px inspector, 28px status bar.
- Mobile: limited viewing and core editing; full authoring optimized for desktop.

## 3. Layout

1. **Top toolbar:** project name, undo/redo, zoom, fit, preview, save/import, export.
2. **Tool rail:** Nodes, Templates, Background, Motion.
3. **Node library:** searchable categories Basic / AI / System / Other.
4. **Canvas:** SVG viewport with configurable background, draggable nodes, smart connectors, motion preview, zoom and keyboard shortcuts.
5. **Inspector:** contextual Style / Animation / Data tabs for selected nodes; basic edge inspector.
6. **Export dialog:** format selection, output resolution, background toggle, explicit V2 unavailable states.

## 4. MVP implementation status

| Feature | Status | Notes |
| --- | --- | --- |
| Swiss shell, node library and inspector | Implemented | CSS responsive shell |
| Node creation, drag, delete, duplicate | Implemented | Drag snapped to 10 SVG units |
| Port-to-port connection | Implemented | Click first port, then second port |
| Dynamic Bézier connectors | Implemented | Connections track node position |
| Node label, subtitle, position, size, accent | Implemented | Inspector changes |
| Dots/grid/solid background and colors | Implemented | SVG background |
| Animated dash / particle / none | Implemented | Dash CSS; particle time-driven JS |
| Play/pause, speed, scrub | Partial | Scrubbing drives particles; dash remains CSS-time-based |
| Zoom, fit and Shift+drag pan | Implemented | SVG transforms |
| Undo/redo | Implemented | Document snapshots |
| RAG, Agentic RAG, API and blank templates | Implemented | Simplified sample templates |
| Save/load project JSON | Implemented | File-based; no server |
| Export static SVG | Implemented | Self-contained SVG markup, font fallback applies |
| Export PNG | Implemented | Browser SVG-to-Canvas conversion |
| GIF / MP4 / PNG frame sequence | Planned V2 | UI disabled, no fake downloads |
| Custom uploaded background image | Planned V2 | Requires safe embedded asset handling |
| Orthogonal connector routing | Planned V2 | Current connector is cubic Bézier only |
| Group / multiselect / auto-layout | Planned V2 | Not in MVP |
| Auto-save IndexedDB | Planned V2 | Save JSON manually in MVP |
| Animated SVG export | Planned V2 | Current SVG export is static |

## 5. Project data model

```json
{
  "version": 1,
  "name": "RAG vs Agentic RAG",
  "background": {"type":"dots", "color":"#fbfcff", "gridOpacity":0.8},
  "animation": {"type":"dash", "speed":1, "duration":6},
  "nodes": [{"id":"n1", "type":"Agent", "x":100, "y":150, "w":160, "h":76, "label":"AI Agent", "subtitle":"Reason & plan", "color":"purple"}],
  "edges": [{"id":"e1", "from":"n1", "to":"n2"}]
}
```

IDs must be unique; edges must reference existing node IDs. Validate imported files more strictly before production deployment (types, bounds, sizes, color values, safe text, file limits). Introduce schema migrations when `version` changes.

## 6. Interaction rules

- Click node: select, reveal handles, edit via Inspector.
- Drag node: move in diagram units; update connectors; one undo checkpoint per drag.
- Click a port, then another node's port: connect source to target; disallow self-loops and duplicate directional edges.
- Click an edge: select for deletion.
- Shift + drag blank canvas: pan. Ctrl/Cmd + wheel: zoom. Toolbar: zoom and fit.
- Delete/Backspace: delete selection; Esc: cancel connection/selection/close export.
- Ctrl/Cmd+Z and Ctrl/Cmd+Y: undo/redo; Ctrl/Cmd+Shift+Z: redo.
- Import/export should never silently overwrite a project file.

## 7. Export behavior

- **JSON:** entire editable project model.
- **SVG:** static SVG scene with background optional and without editor-only handles.
- **PNG:** rasterize static SVG into user-selected size with aspect-preserving fit. Background may be transparent.
- **GIF, frames, MP4:** V2; require deterministic time-based renderer, not screenshotting uncontrolled CSS animations.
- **V2 GIF:** render fixed frames using animation time `t`, encode via browser library/worker, loop metadata, progress and cancellation.
- **V2 MP4:** prefer WebCodecs + muxer where supported or FFmpeg WASM fallback; ensure browser capability and memory limits are surfaced.
- **V2 Frames:** render PNG sequence and ZIP, preserve exact timeline/fps.
- **V2 Animated SVG:** embed SVG-native animations and test browser compatibility.

## 8. Suggested roadmap

### Milestone 1 — Editor foundation (this deliverable)
Static browser application, SVG renderer, state/history, node editor, animated connectors, themes, static export.

### Milestone 2 — Precision & polish
Connection port geometry, orthogonal lines, selection marquee, group, keyboard move, layer ordering, pan by Space, cursor-based zoom, accessibility, responsive inspector drawer, autosave and recovery.

### Milestone 3 — Motion timeline
Per-node entrance effects, edge animation presets, sequence playback, easing, looping, deterministic `renderAt(t)`, timeline UI and keyframes.

### Milestone 4 — Media export
GIF, MP4, frame ZIP, transparent background, preset resolutions, export progress, worker-based encoding and cancellation.

### Milestone 5 — Templates and sharing
Template gallery, custom SVG icons, reusable themes, project versioning, optional cloud sync, shareable previews.

## 9. Acceptance tests

1. Add Agent, Database and Output nodes; drag each without losing connectors.
2. Connect three nodes by clicking ports; delete an edge and undo.
3. Edit node label, subtitle, color, size, position; undo changes.
4. Change background to dots, grid and solid; export PNG and SVG.
5. Save JSON, refresh, import JSON and verify nodes/edges/styles.
6. Change animation mode and speed; preview moving lines/particles.
7. Export PNG at square and landscape sizes without cropping.
8. Verify no GIF/MP4 button claims to export until implemented.
9. Check basic keyboard accessibility and reduced-motion support before release.

## 10. Run instructions

Serve the directory with a local static server (ES modules should not be opened via `file://`):

```bash
cd swiss-flow-studio
python -m http.server 5500
```

Open `http://localhost:5500` in Chrome or Edge. No npm install required. Alternatively use VS Code Live Server.

## 11. Known limitations

This is a functional MVP, not a production-grade Figma replacement. SVG text appearance depends on installed fonts; SVG export is static; moving particles are rendered on the browser timeline while flowing dashes use CSS; PNG may be affected by browser-specific SVG rendering; no background image upload, persistence, timeline, multi-select or orthogonal routing yet. Complex node graphs may require virtualized rendering and spatial indexing later.
