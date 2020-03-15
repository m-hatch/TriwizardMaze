import Camera from './js/Camera'
import Map from './js/Map'
import Navigation from './js/Navigation'
import Player from './js/Player'
import Controls from './js/Controls'
import GameLoop from './js/GameLoop'
import sampleMaze from './mazes/sampleMaze'
import Buttons from './js/Buttons'
import { MOBILE } from './util/constants'
import './styles/main.scss'

const display = document.getElementById('canvas')
const camera = new Camera(display, MOBILE ? 160 : 320, 0.8)
const map = new Map(sampleMaze.size)
const navigation = new Navigation(sampleMaze.size)
const buttons = new Buttons()
const player = new Player(sampleMaze.x, sampleMaze.y, Math.PI * 0.5)
const controls = new Controls()
const loop = new GameLoop()


map.load(sampleMaze)
navigation.load(sampleMaze);
buttons.load(navigation)

// Run the game loop
loop.start(function frame(seconds) {
  map.update(seconds)
  player.update(controls.states, map, seconds)
  camera.render(player, map, navigation);
})
