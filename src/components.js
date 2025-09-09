export const Position = 'Position' // { x, y }
export const Cell = 'Cell' // { alive, nextAlive, age }

export function makePosition(x, y) {
    return { x, y }
}

export function makeCell(alive = false) {
    return { alive, nextAlive: alive, age: 0 }
}