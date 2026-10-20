/** Build a topic detail object with intro and checklist sections. */
export function detail(intro, sections, meta) {
  const out = { intro, sections };
  if (meta && typeof meta === 'object') Object.assign(out, meta);
  return out;
}
