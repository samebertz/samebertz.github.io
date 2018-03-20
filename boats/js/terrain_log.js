function stringify_2d_array(arr) {
  return arr.reduce((a,e) => {
    return a + e.reduce((a,e) => {
      return a + e.toString().substring(0,5) + '\t'
    },'') + '\n'
  },'').trim()
}

function log_surface(surface) {
  console.log(stringify_2d_array(surface))
  // surface.forEach(row => {
  //   //console.log(row);
  //   console.log(row.reduce((acc, cell) =>
  //     acc + cell.toString().substring(0, 3) + '\t',
  //   ''))
  // })
}

function gen_rand_2d_array(m,n,min,max) {
  return randomize_2d_array(gen_undef_2d_array(m,n),min,max)
  // return new Array(m).fill(0).map(() =>
  //   new Array(n).fill(0).map(() =>
  //     min + Math.random()*(max-min)
  //   )
  // )
}

function randomize_2d_array(arr,min,max) {
  return arr.map(e =>
    e.map(() => min + Math.random()*(max-min))
  )
}

function gen_undef_square_2d_array(m) {
  return gen_undef_2d_array(m,m)
}

function gen_undef_2d_array(m,n) {
  return new Array(m).fill(0).map(() =>
    new Array(n).fill(undefined)
  )
}

function log_2d_array(a) {
  a.slice(0,10).forEach(row => {
    console.log(row.slice(0,10).reduce((acc, cell) =>
      acc + cell.toString().substring(0, 5) + '\t',
    ''))
  })
}
