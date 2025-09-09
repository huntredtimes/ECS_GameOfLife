import { query, getComponent } from './ecs.js'
import { Position, Cell } from './components.js'

export function draw(world, ctx, cellPx) {
    const w = world.grid.width
    const h = world.grid.height
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

// Grid lines (optional subtle)
    ctx.strokeStyle = '#222'
    ctx.lineWidth = 1
    for (let x = 0; x <= w; x++) {
        ctx.beginPath()
        ctx.moveTo(x * cellPx, 0)
        ctx.lineTo(x * cellPx, h * cellPx)
        ctx.stroke()
    }
    for (let y = 0; y <= h; y++) {
        ctx.beginPath()
        ctx.moveTo(0, y * cellPx)
        ctx.lineTo(w * cellPx, y * cellPx)
        ctx.stroke()
    }

// Cells
    const entities = query(world, [Position, Cell])
    for (const e of entities) {
        const pos = getComponent(world, e, Position)
        const cell = getComponent(world, e, Cell)
        if (!cell.alive) continue

// color by age
        const a = Math.min(cell.age, 10)
        const hue = 140 - a * 10
        ctx.fillStyle = `hsl(${hue}, 80%, 55%)`
        ctx.fillRect(pos.x * cellPx + 1, pos.y * cellPx + 1, cellPx - 2, cellPx - 2)
    }
}