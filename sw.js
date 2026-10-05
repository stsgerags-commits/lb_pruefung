/* Service Worker – Bewertung Praktische Prüfung
   ------------------------------------------------------------------
   Zweck: App auch ohne Netz starten (Prüfungsraum ohne WLAN).

   Strategie:
   - index.html / Seitenaufruf: zuerst Netz, bei Ausfall die
     zwischengespeicherte Fassung. Damit kommt eine neue Version
     automatisch an, sobald das Gerät online ist.
   - übrige Dateien (Icons, Manifest): aus dem Zwischenspeicher,
     im Hintergrund aktualisiert.

   Bei JEDER neuen Version der App die Nummer in CACHE erhöhen
   (pp-v1 -> pp-v2 ...). Alte Zwischenspeicher werden dann gelöscht.

   Prüfungsdaten liegen im localStorage des Browsers und werden von
   diesem Service Worker weder gelesen noch gelöscht.
   ------------------------------------------------------------------ */
const CACHE = 'pp-v3';
const DATEIEN = [
  './',
  './index.html',
  './manifest.json',
  './apple-touch-icon.png',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(c => c.addAll(DATEIEN)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(namen => Promise.all(namen.filter(n => n !== CACHE).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;

  const istSeite = req.mode === 'navigate' || req.url.endsWith('/index.html') || req.url.endsWith('/');

  if (istSeite) {
    /* Netz zuerst, Fallback Zwischenspeicher */
    event.respondWith(
      fetch(req)
        .then(antwort => {
          const kopie = antwort.clone();
          caches.open(CACHE).then(c => c.put('./index.html', kopie));
          return antwort;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  /* Zwischenspeicher zuerst, im Hintergrund aktualisieren */
  event.respondWith(
    caches.match(req).then(gespeichert => {
      const netz = fetch(req)
        .then(antwort => {
          if (antwort && antwort.ok) {
            const kopie = antwort.clone();
            caches.open(CACHE).then(c => c.put(req, kopie));
          }
          return antwort;
        })
        .catch(() => gespeichert);
      return gespeichert || netz;
    })
  );
});
