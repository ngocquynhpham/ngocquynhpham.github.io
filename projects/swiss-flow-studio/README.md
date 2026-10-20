# Swiss Flow Studio

Minimal animated technical diagram editor in HTML, CSS, Vanilla JS and SVG.

## Run

```bash
python -m http.server 5500
```

Open http://localhost:5500.

## Files
- `index.html` — editor shell and export modal
- `styles.css` — Swiss minimal design system
- `app.js` — state, renderer, editor interactions, animation, import/export
- `spec.md` — full product specification, roadmap and acceptance criteria

## Controls
Click node tiles to add; drag nodes; click source then destination port to connect; Shift+drag canvas to pan; Ctrl/Cmd+wheel to zoom; Ctrl/Cmd+Z to undo. Save/import JSON, export static SVG or PNG.

GIF, MP4 and frame export are deliberately disabled until V2.
