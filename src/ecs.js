export function createWorld() {
// TODO: return { nextEntityId, entities:Set, components:Map, systems:[], grid:{} }
    return {
        nextEntityId: 1,
        entities: new Set(),
        components: new Map(), // key: componentType -> Map(entityId -> data)
        systems: [],
        grid: null, // wird in main.js gesetzt
    }
}

export function createEntity(world) {
// TODO: Entity-ID erzeugen, ins Set eintragen, zurückgeben.
    const id = world.nextEntityId++
    world.entities.add(id)
    return id
}

export function addComponent(world, entity, type, data) {
// TODO: Komponentenspeicher für type holen/erstellen und data eintragen.
    let store = world.components.get(type)
    if (!store) {
        store = new Map()
        world.components.set(type, store)
    }
    store.set(entity, data)
}

export function removeComponent(world, entity, type) {
// TODO: Komponente entfernen, falls vorhanden.
    const store = world.components.get(type)
    if (store) store.delete(entity)
}

export function getComponent(world, entity, type) {
// TODO: Komponente lesen oder undefined
    const store = world.components.get(type)
    return store ? store.get(entity) : undefined
}

export function hasComponent(world, entity, type) {
// TODO: true/false, ob Entity type hat
    const store = world.components.get(type)
    return !!(store && store.has(entity))
}

export function query(world, types) {
// TODO: naive Query: über alle Entities iterieren und prüfen, ob alle types vorhanden sind.
    const result = []
    outer: for (const e of world.entities) {
        for (const t of types) {
            if (!hasComponent(world, e, t)) continue outer
        }
        result.push(e)
    }
    return result
}

export function registerSystem(world, systemFn) {
// TODO: Systems registrieren (FIFO)
    world.systems.push(systemFn)
}

export function runSystems(world, dt) {
// TODO: Alle registrierten Systeme aufrufen
    for (const sys of world.systems) sys(world, dt)
}