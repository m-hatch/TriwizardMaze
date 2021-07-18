import Bitmap from './Bitmap'

class Map {
  constructor (size) {
    this.size = size
    this.wallGrid = new Uint8Array(size * size)
    this.skybox = new Bitmap('images/deathvalley_panorama.jpg', 2000, 750)
    this.wallTexture = new Bitmap('images/hedge.jpg', 1600, 1600);
    this.light = 2
  }

  get (x, y) {
    x = Math.floor(x)
    y = Math.floor(y)

    // If coordinates outside of grid, return -1
    if (x < 0 || x > this.size - 1 || y < 0 || y > this.size - 1) return -1

    return this.wallGrid[y * this.size + x]
  }

  load (maze) {
    for (let i = 0; i < this.size * this.size; i++) {
      // We only need to set the grid when maze cell == 1,
      // Uint8Array initializes cells to 0.
      if (maze.map[i] > 0) this.wallGrid[i] = maze.map[i]
    }
  }

  update (seconds) {
    if (this.light > 0) {
      this.light = Math.max(this.light - 10 * seconds, 0)
    } else if (Math.random() * 5 < seconds) {
      this.light = 2
    }
  }

  cast (point, angle, range) {
    const sin = Math.sin(angle)
    const cos = Math.cos(angle)
    const cells = []
    let stepX, stepY
    let nextStep = { x: point.x, y: point.y, height: 0, distance: 0 }

    // The raycast algorithm
    do {
      cells.push(nextStep)

      if (nextStep.height > 0) break

      stepX = this._step(sin, cos, nextStep.x, nextStep.y)
      stepY = this._step(cos, sin, nextStep.y, nextStep.x, true)
      nextStep = stepX.length2 < stepY.length2
        ? this._inspect(stepX, 1, 0, nextStep.distance, stepX.y, cos, sin)
        : this._inspect(stepY, 0, 1, nextStep.distance, stepY.x, cos, sin)
    } while (nextStep.distance <= range)

    return cells
  }

  _step (rise, run, x, y, inverted) {
    const dx = run > 0 ? Math.floor(x + 1) - x : Math.ceil(x - 1) - x
    const dy = dx * (rise / run)
    const noWall = { length2: Infinity }
    const nextStep = {
      x: inverted ? y + dy : x + dx,
      y: inverted ? x + dx : y + dy,
      length2: dx * dx + dy * dy
    }

    return run === 0 ? noWall : nextStep
  }

  _inspect (step, shiftX, shiftY, distance, offset, cos, sin) {
    const dx = cos < 0 ? shiftX : 0
    const dy = sin < 0 ? shiftY : 0
    step.height = this.get(step.x - dx, step.y - dy)
    step.distance = distance + Math.sqrt(step.length2)

    if (shiftX) {
      step.shading = cos < 0 ? 2 : 0
    } else {
      step.shading = sin < 0 ? 2 : 1
    }

    step.offset = offset - Math.floor(offset)

    return step
  }
}

export default Map
