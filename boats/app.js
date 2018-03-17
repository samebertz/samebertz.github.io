/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _terrain_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./terrain.js */ \"./js/terrain.js\");\n\r\n\r\nwindow.onload = () => {\r\nlet run_button = document.getElementById('run'),\r\n    run_once_button = document.getElementById('run_once'),\r\n    iterations = document.getElementById('iterations'),\r\n    c = document.getElementById('canvas'),\r\n    ctx = c.getContext('2d'),\r\n    intID\r\n\r\nrun_button.onclick = run_loop\r\nfunction run_loop() {\r\n  this.textContent = 'STOP!'\r\n  if (intID) {\r\n    clearInterval(intID)\r\n    intID = null\r\n    this.textContent = 'RUN!'\r\n  } else {\r\n    intID = setInterval(run_once, 1000)\r\n  }\r\n}\r\n\r\nrun_once_button.onclick = run_once\r\nfunction run_once() {\r\n  reset()\r\n  run()\r\n}\r\n\r\nfunction get_iterations() {\r\n  return parseInt(iterations.value)\r\n}\r\n\r\nfunction run() {\r\n  let surface = _terrain_js__WEBPACK_IMPORTED_MODULE_0__[\"generate_surface\"](get_iterations())\r\n  // terrain.log_surface(surface)\r\n  _terrain_js__WEBPACK_IMPORTED_MODULE_0__[\"draw_surface\"](ctx, surface)\r\n}\r\n\r\nfunction reset() {\r\n  ctx.clearRect(0, 0, c.width, c.height)\r\n}\r\n}\r\n\n\n//# sourceURL=webpack:///./js/main.js?");

/***/ }),

/***/ "./js/terrain.js":
/*!***********************!*\
  !*** ./js/terrain.js ***!
  \***********************/
/*! exports provided: draw_surface, generate_surface, log_surface */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"draw_surface\", function() { return draw_surface; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"generate_surface\", function() { return generate_surface; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"log_surface\", function() { return log_surface; });\n// let max = 0, min = 1\r\n\r\nfunction draw_surface(ctx, surface) {\r\n  let c = ctx.canvas\r\n  let water,\r\n      height,\r\n      size = surface.length,\r\n      bound_size = 256,\r\n      cell_size = bound_size / size,\r\n      cell_loc = {},\r\n      bound = {\r\n        x: (((c.width - 2) / 2) - (bound_size / 2) + (cell_size / 2) + 1),\r\n        y: (((c.height - 2) / 2) - (bound_size / 2) + (cell_size / 2) + 1)\r\n      }\r\n  for (let i = 0; i < size; i++) {\r\n    for (let j = 0; j < size; j++) {\r\n      height = surface[i][j]\r\n      if (height === undefined) continue\r\n      if (height > max) max = height\r\n      if (height < min) min = height\r\n      let rgb_triple = height < .4 ? '0,0,255' : Math.floor(height*250) + ',' + Math.floor(height*250) + ',' + Math.floor(height*250)\r\n      ctx.fillStyle = 'rgba(' + rgb_triple + ',.4)'\r\n      cell_loc.x = bound.x + (i * cell_size)\r\n      cell_loc.y = bound.y + (j * cell_size)\r\n      ctx.fillRect(cell_loc.x - (cell_size / 2) - 0.01, cell_loc.y - (cell_size / 2) - 0.01, cell_size + 0.02, cell_size + 0.02)\r\n    }\r\n  }\r\n  // document.getElementById('max').textContent = 'max: ' + max.toString().substring(0, 4)\r\n  // document.getElementById('min').textContent = 'min: ' + min.toString().substring(0, 4)\r\n}\r\n\r\n// The actual magic mathiness...\r\n// Something here is probably wrong though, because it's rendering 17 (iterations^2+1) squares...\r\n\r\n// Generate a surface (i.e. 2d array of z-values or heights) using the diamond-square algorithm\r\n// https://en.wikipedia.org/wiki/Diamond-square_algorithm\r\nfunction generate_surface(iterations) {\r\n  // console.log(iterations)  // log\r\n  let index_step, x_index, y_index, steps,\r\n    to, bo, le, ri, tl, tr, bl, br, cur,\r\n    z, dz, rand_dz, scale\r\n\r\n  // We start with a square array of dimension 2^n+1 x 2^n+1\r\n  let end = Math.pow(2, iterations)\r\n  let size = end + 1\r\n  // console.log(size)  // log\r\n  let surface = new Array(size)\r\n  for (let i = 0; i < size; i++) {\r\n    surface[i] = new Array(size)\r\n  }\r\n\r\n  // Create initial points at the four corners\r\n  // Note we are using consistent initial values so the resulting height map can be tiled without discontinuities.\r\n  surface[0][0] = Math.random() * .5 + .25\r\n  surface[end][0] = Math.random() * .5 + .25\r\n  surface[0][end] = Math.random() * .5 + .25\r\n  surface[end][end] = Math.random() * .5 + .25\r\n\r\n  // For each iteration, perform the \"diamond\" step and the \"square\" step\r\n  for (let i = 1; i < (iterations + 1); i++) {\r\n    // console.log('iteration: ' + i)  // log\r\n\r\n    // Calculate the number of subdivisions we'll need to compute for the current depth\r\n    steps = Math.pow(2, i)\r\n    index_step = end / steps\r\n\r\n    // Calculate a value to reduce the random component that is directly related to the current depth\r\n    scale = Math.pow(2, i)\r\n\r\n    // Perform the \"diamond\" step for each subdivision, where we assign a value to the centroid of the subdivision equal to the average of the four corners plus a random value\r\n    for (let j = 1; j < steps; j += 2) {\r\n      for (let k = 1; k < steps; k += 2) {\r\n        tl = surface[(j - 1) * index_step][(k - 1) * index_step]\r\n        tr = surface[(j + 1) * index_step][(k - 1) * index_step]\r\n        bl = surface[(j - 1) * index_step][(k + 1) * index_step]\r\n        br = surface[(j + 1) * index_step][(k + 1) * index_step]\r\n        z = (tl + tr + bl + br) / 4\r\n        rand_dz = ((Math.random() * 2) - 1)\r\n        dz = rand_dz / scale\r\n        cur = z + dz\r\n        surface[j * index_step][k * index_step] = cur\r\n      }\r\n    }\r\n\r\n    // Perform the \"square\" step for each subdivision, where we assign a value to the midpoints of each edge of the subdivision equal to the average of the four axially adjacent values plus a random value\r\n    for (let j = 1; j < steps; j += 2) {\r\n      for (let k = 2; k < steps; k += 2) {\r\n        le = surface[(j - 1) * index_step][k * index_step]\r\n        ri = surface[(j + 1) * index_step][k * index_step]\r\n        to = surface[j * index_step][(k + 1) * index_step]\r\n        bo = surface[j * index_step][(k - 1) * index_step]\r\n        z = (le + ri + to + bo) / 4\r\n        rand_dz = ((Math.random() * 2) - 1)\r\n        dz = rand_dz / scale\r\n        cur = z + dz\r\n        surface[j * index_step][k * index_step] = cur\r\n      }\r\n    }\r\n\r\n    // Perform the \"square\" step for each subdivision, for degenerate cases with no top neighbor (i.e. those along the top row)\r\n    for (let j = 1; j < steps; j += 2) {\r\n      le = surface[(j - 1) * index_step][0]\r\n      ri = surface[(j + 1) * index_step][0]\r\n      bo = surface[j * index_step][index_step]\r\n      z = (le + ri + bo) / 3\r\n      rand_dz = ((Math.random() * 2) - 1)\r\n      dz = rand_dz / scale\r\n      cur = z + dz\r\n      surface[j * index_step][0] = cur\r\n      surface[j * index_step][steps * index_step] = cur\r\n    }\r\n\r\n    // Perform the \"square\" step for each subdivision, for degenerate cases with no top neighbor\r\n    for (let j = 2; j < steps; j += 2) {\r\n      for (let k = 1; k < steps; k += 2) {\r\n        le = surface[(j - 1) * index_step][k * index_step]\r\n        ri = surface[(j + 1) * index_step][k * index_step]\r\n        to = surface[j * index_step][(k + 1) * index_step]\r\n        bo = surface[j * index_step][(k - 1) * index_step]\r\n        z = (to + bo + to + bo) / 4\r\n        rand_dz = ((Math.random() * 2) - 1)\r\n        dz = rand_dz / scale\r\n        cur = z + dz\r\n        surface[j * index_step][k * index_step] = cur\r\n      }\r\n    }\r\n\r\n    // Perform the \"square\" step for each subdivision\r\n    for (let k = 1; k < steps; k += 2) {\r\n      ri = surface[index_step][k * index_step]\r\n      to = surface[0][(k + 1) * index_step]\r\n      bo = surface[0][(k - 1) * index_step]\r\n      z = (ri + to + bo) / 3\r\n      rand_dz = ((Math.random() * 2) - 1)\r\n      dz = rand_dz / scale\r\n      cur = z + dz\r\n      surface[0][k * index_step] = cur\r\n      surface[steps * index_step][k * index_step] = cur\r\n    }\r\n  }\r\n  return surface\r\n}\r\n\r\nfunction log_surface(surface) {\r\n  surface.forEach(row => {\r\n    //console.log(row);\r\n    console.log(row.reduce((acc, cell) =>\r\n      acc + cell.toString().substring(0, 3) + '\\t',\r\n    ''))\r\n  })\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./js/terrain.js?");

/***/ })

/******/ });