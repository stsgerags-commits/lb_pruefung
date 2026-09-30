# Bewertung Praktische Prüfung

Web-App zur Live-Beobachtung und Bewertung der praktischen Prüfung im Vorbereitungsdienst Lehramt Grundschule, Thüringen. Grundlage: Standardisiertes Leistungsbild zur praktischen Prüfung (Stand 13.12.13), ThürAZStPLVO.

## Dateien

| Datei | Zweck |
|---|---|
| `index.html` | die App |
| `manifest.json` | Installation auf dem Home-Bildschirm |
| `sw.js` | Offline-Betrieb (Service Worker) |
| `apple-touch-icon.png` | App-Symbol iPad/iPhone |
| `icon-192.png`, `icon-512.png` | App-Symbole Android/Desktop |
| `.nojekyll` | GitHub Pages liefert die Dateien unverändert aus |

Alle Dateien liegen im Hauptordner des Repositorys.

## Einrichtung auf GitHub Pages

1. Alle Dateien in den Hauptordner des Repositorys hochladen.
2. Repository → Settings → Pages → Source: „Deploy from a branch“, Branch `main`, Ordner `/ (root)`.
3. Nach ein bis zwei Minuten ist die App unter `https://<benutzername>.github.io/<repository>/` erreichbar.
4. iPad: Adresse in Safari öffnen → Teilen → „Zum Home-Bildschirm“.
5. Die App einmal mit Netz öffnen. Danach startet sie auch offline.

## Neue Version einspielen

1. `index.html` ersetzen.
2. In `sw.js` die Zeile `const CACHE = 'pp-v1';` hochzählen (`pp-v2`, `pp-v3` …).
3. Beide Dateien hochladen.
4. Auf dem iPad die App vollständig schließen und neu öffnen, ggf. zweimal.

## Datenschutz

Prüfungsdaten (Namen, Bewertungen, Notizen) werden ausschließlich im Browser des jeweiligen Geräts gespeichert (localStorage). Sie werden nicht übertragen und liegen nicht im Repository. Die Daten bleiben erhalten, solange die Adresse der App gleich bleibt und der Browserspeicher nicht gelöscht wird. Für eine Sicherung die Exportfunktion der App verwenden.
