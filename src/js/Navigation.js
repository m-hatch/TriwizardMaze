class Navigation {
  constructor (size) {
    this.target, this.map
    this.width = size;
    this.height = size;
    this.cellSize = 5
    
    if (this.target === undefined) {
      this.target = document.createElement('canvas')
      document.body.appendChild(this.target)
      this.target.setAttribute('id', 'navigation')
      this.target.classList.add('navigation', 'hide');
    }

    this.target.width = size * this.cellSize
    this.target.height = size * this.cellSize
    this.ctx = this.target.getContext('2d')
  }

  load (maze) {
    this.map = maze.map;
    this.drawMap();
  }

  drawMap () {
    this.ctx.fillStyle = '#ffff00'
      for(var y = 0; y < this.height; y++){
        for(var x = 0; x < this.width; x++){
          if(this.map[(this.height - y - 1) * this.width + (this.width - x - 1)] === 0) {
            this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize)
          }
        }
      }
  }

  // Update player position in navigation
  update (ctx, pos, playerPos) {
    ctx.clearRect(playerPos.x, playerPos.y, this.cellSize, this.cellSize)
    this.drawMap()

    var pX = (this.width - (playerPos.x | 0) - 1) * this.cellSize
    var pY = (this.height - (playerPos.y | 0) - 1) * this.cellSize
    ctx.drawImage(this.target, pos.x, pos.y, this.target.width, this.target.height)
    ctx.fillStyle = '#ff0000'
    ctx.fillRect(pos.x + pX, pos.y + pY, this.cellSize, this.cellSize)
  }
}

export default Navigation
