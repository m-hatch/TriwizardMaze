import Map from './js/Map'
import GameLoop from './js/GameLoop'
import sampleMaze from './mazes/sampleMaze'
import './styles/main.scss'

const map = new Map(mazeGrid.size)
const loop = new GameLoop();

map.load(sampleMaze)

loop.start(function frame(seconds) {
  map.update(seconds)
})
