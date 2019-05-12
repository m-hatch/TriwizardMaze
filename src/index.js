import Map from './js/Map'
import Controls from './js/Controls'
import GameLoop from './js/GameLoop'
import sampleMaze from './mazes/sampleMaze'
import './styles/main.scss'

const map = new Map(mazeGrid.size)
const controls = new Controls();
const loop = new GameLoop();

map.load(sampleMaze)

loop.start(function frame(seconds) {
  map.update(seconds)
})
