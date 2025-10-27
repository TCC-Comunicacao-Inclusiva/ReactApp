// utils/nav.js
export const getAmbRouteName = (amb) => {
  const raw = String(amb?.id ?? amb?.nome ?? '').trim();
  const safe = raw.length ? raw : Math.random().toString(36).slice(2);
  const slug = safe.replace(/\s+/g, '_');
  return `Ambiente_${slug}`;
};
