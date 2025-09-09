import {
    createWorld, createEntity, addComponent,
    registerSystem, runSystems, getComponent
} from './ecs.js'
import { makePosition, makeCell, Position, Cell } from './components.js'
import { lifeCompute, lifeApply } from './systems.js'
import { draw } from './render.js'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d', { alpha: false })
const btnStart = document.getElementById('btnStart')
const btnPause = document.getElementById('btnPause')
const btnStep = document.getElementById('btnStep')
const btnRandom = document.getElementById('btnRandom')
const btnClear = document.getElementById('btnClear')
const speed = document.getElementById('speed')
const tickEl = document.getElementById('tick')
const aliveCountEl = document.getElementById('aliveCount')
const gridSizeEl = document.getElementById('gridSize')

const CELL_PX = 5
const GRID_W = Math.floor(canvas.width / CELL_PX) // 800/20 = 40
const GRID_H = Math.floor(canvas.height / CELL_PX) // 600/20 = 30

gridSizeEl.textContent = `${GRID_W} × ${GRID_H}`;

const world = createWorld()
setupGrid(world, GRID_W, GRID_H)
initEntities(world)

registerSystem(world, lifeCompute)
registerSystem(world, lifeApply)

let running = false
let tick = 0
let accumulator = 0
let lastTs = performance.now()

btnStart.onclick = () => running = true
btnPause.onclick = () => running = false
btnStep.onclick = () => { step(1 / Math.max(1, +speed.value)); draw(world, ctx, CELL_PX) }
btnRandom.onclick = () => { randomize(world); draw(world, ctx, CELL_PX) }
btnClear.onclick = () => { clearAll(world); draw(world, ctx, CELL_PX) }

// Toggle cell via click
canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect()
    const x = Math.floor((e.clientX - rect.left) / CELL_PX)
    const y = Math.floor((e.clientY - rect.top) / CELL_PX)
    const id = world.grid.idAt(x, y)
    if (!id) return
    const cell = getComponent(world, id, Cell)
    cell.alive = !cell.alive
    cell.nextAlive = cell.alive
    cell.age = 0
    draw(world, ctx, CELL_PX)
})

function setupGrid(world, width, height) {
    const map = new Array(width * height).fill(0)
    world.grid = {
        width, height,
        index(x, y) { return y * width + x },
        idAt(x, y) { const i = this.index(x, y); return map[i] },
        setId(x, y, id) { const i = this.index(x, y); map[i] = id },
        data: map,
    }
}

function initEntities(world) {
    for (let y = 0; y < world.grid.height; y++) {
        for (let x = 0; x < world.grid.width; x++) {
            const e = createEntity(world)
            addComponent(world, e, Position, makePosition(x, y))
            addComponent(world, e, Cell, makeCell(false))
            world.grid.setId(x, y, e)
        }
    }
    draw(world, ctx, CELL_PX)
}

function randomize(world) {
    let alive = 0
    for (let y = 0; y < world.grid.height; y++) {
        for (let x = 0; x < world.grid.width; x++) {
            const id = world.grid.idAt(x, y)
            const cell = getComponent(world, id, Cell)
            const v = Math.random() < 0.25
            cell.alive = v
            cell.nextAlive = v
            cell.age = 0
            if (v) alive++
        }
    }
    aliveCountEl.textContent = alive
}

function clearAll(world) {
    for (let y = 0; y < world.grid.height; y++) {
        for (let x = 0; x < world.grid.width; x++) {
            const id = world.grid.idAt(x, y)
            const cell = getComponent(world, id, Cell)
            cell.alive = false
            cell.nextAlive = false
            cell.age = 0
        }
    }
    aliveCountEl.textContent = 0
    tick = 0
    tickEl.textContent = tick
}

function step(dt) {
    runSystems(world, dt)
    tick++
    tickEl.textContent = tick
// alive count
    let alive = 0
    for (let y = 0; y < world.grid.height; y++) {
        for (let x = 0; x < world.grid.width; x++) {
            const id = world.grid.idAt(x, y)
            const cell = getComponent(world, id, Cell)
            if (cell.alive) alive++
        }
    }
    aliveCountEl.textContent = alive
}

function loop(ts) {
    const spf = 1 / Math.max(1, +speed.value) // steps per frame scaled
    const dtTarget = spf
    const delta = (ts - lastTs) / 1000
    lastTs = ts
    accumulator += delta
    if (running) {
        while (accumulator >= dtTarget) {
            step(dtTarget)
            accumulator -= dtTarget
        }
    }
    draw(world, ctx, CELL_PX)
    requestAnimationFrame(loop)
}

requestAnimationFrame(loop)