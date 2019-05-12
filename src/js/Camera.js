import { CIRCLE, MOBILE } from '../util/constants'

class Camera {
  constructor (canvas, resolution, focalLength) {
    this.ctx = canvas.getContext('2d')
    this.width = canvas.width = window.innerWidth * 0.5
    this.height = canvas.height = window.innerHeight * 0.5
    this.resolution = resolution
    this.spacing = this.width / resolution
    this.focalLength = focalLength || 0.8
    this.range = MOBILE ? 8 : 14
    this.lightRange = 8
    this.scale = (this.width + this.height) / 1200
  }

  render (player, map) {
    // Update the camera view,
    // call in each iteration of the game loop
    this.drawSky(player.direction, map.skybox, map.light)
    this.drawWand(player.wand, player.paces)
  }

  drawSky (direction, sky, ambient) {
    const width = sky.width * (this.height / sky.height) * 2
    const left = (direction / CIRCLE) * -width

    this.ctx.save()
    this.ctx.drawImage(sky.image, left, 0, width, this.height)

    if (left < width - this.width) {
      this.ctx.drawImage(sky.image, left + width, 0, width, this.height)
    }

    if (ambient > 0) {
      this.ctx.fillStyle = '#ffffff'
      this.ctx.globalAlpha = ambient * 0.1
      this.ctx.fillRect(0, this.height * 0.5, this.width, this.height * 0.5)
    }

    this.ctx.restore()
  }

  drawWand (wand, paces) {
    var bobX = Math.cos(paces * 2) * this.scale * 6
    var bobY = Math.sin(paces * 4) * this.scale * 6
    var left = this.width * 0.5 + bobX
    var top = this.height * 0.06 + bobY
    this.ctx.save()
    this.ctx.rotate(15 * Math.PI / 180)
    this.ctx.drawImage(wand.image, left, top, wand.width * this.scale, wand.height * this.scale)
    this.ctx.restore()
  }
}

export default Camera
