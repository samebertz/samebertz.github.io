//ES6 Modules import
import { log_surface } from terrain_log.js

// The actual magic mathiness...
// Something here is probably wrong though, because it's rendering 17 (iterations^2+1) squares...

// Generate a surface (i.e. 2d array of z-values or heights) using the diamond-square algorithm
// https://en.wikipedia.org/wiki/Diamond-square_algorithm
function generate_surface(iterations) {
  // console.log(iterations)  // log
  let index_step, x_index, y_index, steps,
    to, bo, le, ri, tl, tr, bl, br, cur,
    z, dz, rand_dz, scale

  // We start with a square array of dimension 2^n+1 x 2^n+1
  let end = Math.pow(2, iterations)
  let size = end + 1
  // console.log(size)  // log
  let surface = new Array(size)
  for (let i = 0; i < size; i++) {
    surface[i] = new Array(size)
  }

  // Create initial points at the four corners
  // Note we are using consistent initial values so the resulting height map can be tiled without discontinuities.
  surface[0][0] = Math.random() * .5 + .25
  surface[end][0] = Math.random() * .5 + .25
  surface[0][end] = Math.random() * .5 + .25
  surface[end][end] = Math.random() * .5 + .25

  // For each iteration, perform the "diamond" step and the "square" step
  for (let i = 1; i < (iterations + 1); i++) {
    // console.log('iteration: ' + i)  // log

    // Calculate the number of subdivisions we'll need to compute for the current depth
    steps = Math.pow(2, i)
    index_step = end / steps

    // Calculate a value to reduce the random component that is directly related to the current depth
    scale = Math.pow(2, i)

    // Perform the "diamond" step for each subdivision, where we assign a value to the centroid of the subdivision equal to the average of the four corners plus a random value
    for (let j = 1; j < steps; j += 2) {
      for (let k = 1; k < steps; k += 2) {
        tl = surface[(j - 1) * index_step][(k - 1) * index_step]
        tr = surface[(j + 1) * index_step][(k - 1) * index_step]
        bl = surface[(j - 1) * index_step][(k + 1) * index_step]
        br = surface[(j + 1) * index_step][(k + 1) * index_step]
        z = (tl + tr + bl + br) / 4
        rand_dz = ((Math.random() * 2) - 1)
        dz = rand_dz / scale
        cur = z + dz
        surface[j * index_step][k * index_step] = cur
      }
    }

    // Perform the "square" step for each subdivision, where we assign a value to the midpoints of each edge of the subdivision equal to the average of the four axially adjacent values plus a random value
    for (let j = 1; j < steps; j += 2) {
      for (let k = 2; k < steps; k += 2) {
        le = surface[(j - 1) * index_step][k * index_step]
        ri = surface[(j + 1) * index_step][k * index_step]
        to = surface[j * index_step][(k + 1) * index_step]
        bo = surface[j * index_step][(k - 1) * index_step]
        z = (le + ri + to + bo) / 4
        rand_dz = ((Math.random() * 2) - 1)
        dz = rand_dz / scale
        cur = z + dz
        surface[j * index_step][k * index_step] = cur
      }
    }

    // Perform the "square" step for each subdivision, for degenerate cases with no top neighbor (i.e. those along the top row)
    for (let j = 1; j < steps; j += 2) {
      le = surface[(j - 1) * index_step][0]
      ri = surface[(j + 1) * index_step][0]
      bo = surface[j * index_step][index_step]
      z = (le + ri + bo) / 3
      rand_dz = ((Math.random() * 2) - 1)
      dz = rand_dz / scale
      cur = z + dz
      surface[j * index_step][0] = cur
      surface[j * index_step][steps * index_step] = cur
    }

    // Perform the "square" step for each subdivision, for degenerate cases with no top neighbor
    for (let j = 2; j < steps; j += 2) {
      for (let k = 1; k < steps; k += 2) {
        le = surface[(j - 1) * index_step][k * index_step]
        ri = surface[(j + 1) * index_step][k * index_step]
        to = surface[j * index_step][(k + 1) * index_step]
        bo = surface[j * index_step][(k - 1) * index_step]
        z = (to + bo + to + bo) / 4
        rand_dz = ((Math.random() * 2) - 1)
        dz = rand_dz / scale
        cur = z + dz
        surface[j * index_step][k * index_step] = cur
      }
    }

    // Perform the "square" step for each subdivision
    for (let k = 1; k < steps; k += 2) {
      ri = surface[index_step][k * index_step]
      to = surface[0][(k + 1) * index_step]
      bo = surface[0][(k - 1) * index_step]
      z = (ri + to + bo) / 3
      rand_dz = ((Math.random() * 2) - 1)
      dz = rand_dz / scale
      cur = z + dz
      surface[0][k * index_step] = cur
      surface[steps * index_step][k * index_step] = cur
    }
  }
  return surface
}

// ES6 Modules export
export { generate_surface }
