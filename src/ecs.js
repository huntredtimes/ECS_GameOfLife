export function createWorld() {
// TODO: return { nextEntityId, entities:Set, components:Map, systems:[], grid:{} }
}

export function createEntity(world) {
// TODO: Entity-ID erzeugen, ins Set eintragen, zurückgeben.
}

export function addComponent(world, entity, type, data) {
// TODO: Komponentenspeicher für type holen/erstellen und data eintragen.
}

export function removeComponent(world, entity, type) {
// TODO: Komponente entfernen, falls vorhanden.
}

export function getComponent(world, entity, type) {
// TODO: Komponente lesen oder undefined
}

export function hasComponent(world, entity, type) {
// TODO: true/false, ob Entity type hat
}

export function query(world, types) {
// TODO: naive Query: über alle Entities iterieren und prüfen, ob alle types vorhanden sind.
}

export function registerSystem(world, systemFn) {
// TODO: Systems registrieren (FIFO)
}

export function runSystems(world, dt) {
// TODO: Alle registrierten Systeme aufrufen
}