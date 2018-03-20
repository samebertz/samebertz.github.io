// ES6 Modules import
import * as terrain from './terrain.js'

window.onload = () => {
let run_button = document.getElementById('run'),
    run_once_button = document.getElementById('run_once'),
    iterations = document.getElementById('iterations'),
    c = document.getElementById('canvas'),
    ctx = c.getContext('2d'),
    intID

run_button.onclick = run_loop
function run_loop() {
  this.textContent = 'STOP!'
  if (intID) {
    clearInterval(intID)
    intID = null
    this.textContent = 'RUN!'
  } else {
    intID = setInterval(run_once, 1000)
  }
}

run_once_button.onclick = run_once
function run_once() {
  reset()
  run()
}

function get_iterations() {
  return parseInt(iterations.value)
}

function run() {
  let surface = terrain.generate_surface(get_iterations())
  // terrain.log_surface(surface)
  terrain.draw_surface(ctx, surface)
}

function reset() {
  ctx.clearRect(0, 0, c.width, c.height)
}
}
