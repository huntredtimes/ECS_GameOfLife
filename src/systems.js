import { query, getComponent } from './ecs.js'
import { Position, Cell } from './components.js'

const NEIGHBORS = [
    [-1, -1], [0, -1], [1, -1],
    [-1, 0], [1, 0],
    [-1, 1], [0, 1], [1, 1],
]

export function lifeCompute(world) {
// TODO:
// - hole alle Entities mit Position+Cell (query)
// - für jede Zelle: Nachbarn zählen (welt.grid.idAt(x, y) nutzen)
// - GOL-Regeln anwenden: nächste State in cell.nextAlive schreiben
    const entities = query(world, [Position, Cell])
    const w = world.grid.width
    const h = world.grid.height
    for (const e of entities) {
        const pos = getComponent(world, e, Position)
        const cell = getComponent(world, e, Cell)
        let aliveNeighbors = 0
        for (const [dx, dy] of NEIGHBORS) {
            const nx = pos.x + dx
            const ny = pos.y + dy
            if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue // ohne Wrap
            const nid = world.grid.idAt(nx, ny)
            if (!nid) continue
            const ncell = getComponent(world, nid, Cell)
            if (ncell && ncell.alive) aliveNeighbors++
        }
        const willLive = cell.alive
            ? (aliveNeighbors === 2 || aliveNeighbors === 3)
            : (aliveNeighbors === 3)
        cell.nextAlive = willLive
    }
}

export function lifeApply(world) {
// TODO:
// - hole alle Entities mit Cell
// - alive = nextAlive übernehmen, age hochzählen, ggf. reset bei Tod
    const entities = query(world, [Cell])
    for (const e of entities) {
        const cell = getComponent(world, e, Cell)
        const wasAlive = cell.alive
        cell.alive = cell.nextAlive
        if (cell.alive) {
            cell.age = wasAlive ? cell.age + 1 : 0
        } else {
            cell.age = 0
        }
    }
}

