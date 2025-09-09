# 💡 ECS Game of Life – Workshop
Willkommen zu unserem ECS-Workshop! In diesem Projekt lernst du die Grundlagen eines Entity Component Systems (ECS) kennen, indem du damit Conway’s Game of Life im Browser umsetzt und live erleben kannst.

# 🎲 Warum ist Game of Life der perfekte Anwendungsfall für ECS?
* Komplexes Verhalten mit einfachen Regeln: Jede „Zelle“ hat einen eigenen Status und interagiert nur mit ihren Nachbarn. Perfekt für das ECS-Prinzip: Daten (Zellen) & Verhalten (Lebensregeln) sind getrennt.
* Skalierbare Strukturen: Selbst tausende Zellen lassen sich per ECS effizient strukturieren – jede Zelle ist eine Entity, „lebendig“ und „Position“ sind Components, die Regeln wirken als Systems.
* Direktes Feedback: Änderungen am ECS-Code wirken sich sofort aufs sichtbare Spielfeld aus. So wird klar, wie ECS-Strukturen funktionieren!
* Gamified Learning: Es macht einfach Spaß zu sehen, wie Leben und Muster entstehen oder wieder verschwinden.

# 📜 Die Regeln von Conway’s Game of Life
* Jede Zelle ist entweder lebendig oder tot.
* Jede Runde (Generation) gilt für JEDE Zelle:
* Ist die Zelle lebendig:
** Mit weniger als 2 lebenden Nachbarn stirbt sie (Einsamkeit).
** Mit 2 oder 3 lebenden Nachbarn bleibt sie am Leben.
** Mit mehr als 3 lebenden Nachbarn stirbt sie (Überbevölkerung).
* Ist sie tot:
** Mit exakt 3 lebenden Nachbarn wird sie lebendig (Nachwuchs).

# 🚀 Projekt starten & ausprobieren
## Variante 1: Lokal
* Repo clonen
* bash
** git clone https://github.com/DEINUSERNAME/ECS_GameOfLife.git
** cd ECS_GameOfLife
* Öffne die Datei index.html im Browser
** (Doppelklick genügt oft – falls nötig per lokalem Server, z.B. mit python -m http.server)
* Spiele mit dem Grid!
** Felder anklicken, „Start“, „Pause“, „Random“ und „Step“ nutzen.

## Variante 2: Im Browser mit CodeSandbox
* Gehe zu: codesandbox.io
* Importiere das GitHub-Repo über „Create Sandbox → Import Project“
** GitHub-URL: https://github.com/DEINUSERNAME/ECS_GameOfLife
* Starte und interagiere im Browser!

# 🗂️ Projektüberblick
index.html
Das HTML-Grundgerüst plus Buttons & Canvas für das Spielfeld.

## src/components.js
Definitionen der Component-Typen (Position, Cell) und Hilfsfunktionen.

## src/ecs.js
Das Herzstück:

Hier implementierst du die ECS-Funktionen wie Entity-Erstellung, Component-Handling und Queries.
*Hier liegen deine wichtigsten TODOs!*

## src/systems.js
Hier steckt die Logik der Lebensregeln (Game of Life) als Systems, die über die Zellen iterieren und deren Status berechnen.
*Auch hier gibt es TODOs.*

## src/render.js
Verantwortlich für das Zeichnen des aktuellen Zustands auf das Canvas.

## src/main.js
Das Hauptprogramm: Initialisierung, Event-Handling (Buttons/Klicks), „Verkabelung“ von ECS und Systems.

# 📝 Deine Aufgaben (TODOs)
## In src/ecs.js:

Baue das einfache ECS-Gerüst: Entities, Components, Query/Registrierung von Systemen, System-Runner.
## In src/systems.js:

Die Game-of-Life-Regeln als ECS-Systeme nach Vorgabe ausprogrammieren.
Der Rest (Rendering, UI, Grid-Basis) ist bereits fertig!
Teste die Buttons und das Zeichnen. Experimentiere mit eigenen Mustern oder „Random“ für Zufallsmuster!

Viel Spaß beim Entwickeln und Experimentieren – und beim Durchblicken, wie ECS-Prinzipien In-Action funktionieren! 🚀
