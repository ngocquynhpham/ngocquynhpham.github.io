/** Root path for Engineer Atlas on GitHub Pages (avoids relative URL doubling). */

export function engineerAtlasBase() {
  const path = window.location.pathname.replace(/\/+$/, '');
  const marker = '/engineer-atlas';
  const idx = path.indexOf(marker);
  if (idx === -1) return '';
  return path.slice(0, idx + marker.length);
}

export function atlasUrl(relativePath = '') {
  const base = engineerAtlasBase() || '';
  const clean = String(relativePath).replace(/^\//, '');
  return clean ? `${base}/${clean}` : `${base}/`;
}

export function programUrl(pathSegment, hash = '') {
  const url = atlasUrl(`programs/${pathSegment}/`);
  return hash ? `${url}#${hash.replace(/^#/, '')}` : url;
}
