// Looks up optional photos in /src/assets. If a file is missing, components
// render their inline SVG illustration instead, so the site works immediately.
// Drop a file named e.g. "hero-cookie.webp" into /src/assets to replace one.
const files = import.meta.glob('../assets/*.{png,webp,jpg,jpeg}', {
  eager: true,
  import: 'default',
});

export function assetUrl(name) {
  for (const ext of ['webp', 'png', 'jpg', 'jpeg']) {
    const url = files[`../assets/${name}.${ext}`];
    if (url) return url;
  }
  return null;
}
