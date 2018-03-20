// (function() {
//   window.onload = function() {
//       main();
//   }
//   var state = {};
//   var w = 400;
//   var h = 400;
//   var n = 40;
//   var s = 400 / n;
//   var run = 0;
//   var runs = 50;

  function main() {
      identifyCanvas();
      generateMatrixOfLife();
      cloneMOL();
      generateSeed();
      addSeed();
      generateRule();
      drawEnvironment();
      drawSeed();
      state.run = setInterval(step, 1000);
  }

  // function step() {
  //     evolve();
  //     age();
  //     run++;
  //     if(run == runs) {
  //         clearInterval(state.run);
  //     }
  // }

  function evolve() {
      cloneMOL();
      var neighbors = [];
      for(var j = 0; j != n; j++) {
          for(var i = 0; i != n; i++) {
              neighbors = [];
              if(j == 0) {
                  neighbors[0] = state.SSOSCO[n-1][i].toString(2);
                  neighbors[2] = state.SSOSCO[j+1][i].toString(2);
                  if(i == 0) {
                      neighbors[1] = state.SSOSCO[j][i+1].toString(2);
                      neighbors[3] = state.SSOSCO[j][n-1].toString(2);
                  } else if(i == n-1) {
                      neighbors[1] = state.SSOSCO[j][0].toString(2);
                      neighbors[3] = state.SSOSCO[j][i-1].toString(2);
                  } else {
                      neighbors[1] = state.SSOSCO[j][i+1].toString(2);
                      neighbors[3] = state.SSOSCO[j][i-1].toString(2);
                  }
              } else if(j == n - 1) {
                  neighbors[0] = state.SSOSCO[j-1][i].toString(2);
                  neighbors[2] = state.SSOSCO[0][i].toString(2);
                  if(i == 0) {
                      neighbors[1] = state.SSOSCO[j][i+1].toString(2);
                      neighbors[3] = state.SSOSCO[j][n-1].toString(2);
                  } else if(i == n-1) {
                      neighbors[1] = state.SSOSCO[j][0].toString(2);
                      neighbors[3] = state.SSOSCO[j][i-1].toString(2);
                  } else {
                      neighbors[1] = state.SSOSCO[j][i+1].toString(2);
                      neighbors[3] = state.SSOSCO[j][i-1].toString(2);
                  }
              } else if(i == 0) {
                  neighbors[0] = state.SSOSCO[j-1][i].toString(2);
                  neighbors[1] = state.SSOSCO[j][i+1].toString(2);
                  neighbors[2] = state.SSOSCO[j+1][i].toString(2);
                  neighbors[3] = state.SSOSCO[j][n-1].toString(2);
              } else if(i == n - 1) {
                  neighbors[0] = state.SSOSCO[j-1][i].toString(2);
                  neighbors[1] = state.SSOSCO[j][0].toString(2);
                  neighbors[2] = state.SSOSCO[j+1][i].toString(2);
                  neighbors[3] = state.SSOSCO[j][i-1].toString(2);
              } else {
                  neighbors[0] = state.SSOSCO[j-1][i].toString(2);
                  neighbors[1] = state.SSOSCO[j][i+1].toString(2);
                  neighbors[2] = state.SSOSCO[j+1][i].toString(2);
                  neighbors[3] = state.SSOSCO[j][i-1].toString(2);
              }
              neighbors = neighbors.join('');
              if(state.rule[neighbors] == 1) {
                  state.MOL[j][i] = 1;
              } else {
                  state.MOL[j][i] = 0;
              }
          }
      }
  }

  // function age() {
  //     drawEnvironment();
  //     for(var j = 0; j != n; j++) {
  //         for(var i = 0; i!= n; i++) {
  //             if(state.MOL[j][i] == 1) {
  //                 state.ctx.fillStyle = '#000';
  //                 state.ctx.fillRect((j * s), (i * s), s, s);
  //             }
  //         }
  //     }
  // }
  // function identifyCanvas() {
  //     var c = document.getElementById('canvas');
  //     var context = c.getContext('2d');
  //     state.ctx = context;
  // }
  // function generateMatrixOfLife() {
  //     var matrix = [];
  //     var row;
  //     for(var j = 0; j != n; j++) {
  //         row = [];
  //         for(var i = 0; i != n; i++) {
  //             row.push(0);
  //         }
  //         matrix.push(row);
  //     }
  //     state.MOL = matrix;
  // }
  // function cloneMOL() {
  //     var matrix = [];
  //     var row;
  //     for(var j = 0; j != n; j++) {
  //         row = [];
  //         for(var i = 0; i != n; i++) {
  //             row.push(state.MOL[j][i]);
  //         }
  //         matrix.push(row);
  //     }
  //     state.SSOSCO = matrix;
  // }
  // function generateSeed() {
  //     var seed = {};
  //     seed.x = Math.floor(Math.random() * n);
  //     seed.y = Math.floor(Math.random() * n);
  //     state.seed = seed;
  // }
  // function addSeed() {
  //     state.MOL[state.seed.y][state.seed.x] = 1;
  // }

  function generateRule() {
      var rule_num = Math.floor(Math.random() * Math.pow(2, 16));
      var rule_string = lpad(rule_num.toString(2), '0', 16);
      var rule = {};
      var key;
      for(var i = 0; i < 16; i++) {
          key = lpad(i.toString(2), '0', 4);
          rule[key] = rule_string[i];
      }
      state.rule = rule;
  }

  // function drawEnvironment() {
  //     state.ctx.fillStyle = '#fff';
  //     state.ctx.fillRect(0, 0, w, h);
  // }
  // function drawSeed() {
  //     state.ctx.fillStyle = '#000';
  //     state.ctx.fillRect((state.seed.y * s), (state.seed.x * s), s, s);
  // }
  // function lpad(str, pad, len) {
  //     for(var i = str.length; i < len; i++) {
  //         str = pad + str;
  //     }
  //     return str;
  // }
  // function assToString(ass) {
  //     var n = '';
  //     for(var key in ass) {
  //         if(!ass.hasOwnProperty(key)) {
  //             console.log('wait what...');
  //         } else {
  //             n += ' | ['+key+'] => '+ass[key];
  //         }
  //     }
  //     return n.substring(3);
  // }
// })();
