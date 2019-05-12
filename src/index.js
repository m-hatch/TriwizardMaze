import Map from './js/Map'
import Player from './js/Player'
import Controls from './js/Controls'
import GameLoop from './js/GameLoop'
import sampleMaze from './mazes/sampleMaze'
import './styles/main.scss'

const map = new Map(sampleMaze.size)
const player = new Player(4.5, 2.5, Math.PI * 0.5)
const controls = new Controls();
const loop = new GameLoop();

map.load(sampleMaze)

// Run the game loop
loop.start(function frame(seconds) {
  map.update(seconds)
  player.update(controls.states, map, seconds)
})
