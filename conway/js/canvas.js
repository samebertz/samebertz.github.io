function identifyCanvas() {
    // console.log('identifying canvas...');
    var c = document.getElementById('canvas');
    var context = c.getContext('2d');
    state.ctx = context;
    // console.log('canvas identified !');
}
function drawEnvironment() {
    // console.log('drawing environment...');
    state.ctx.fillStyle = '#eee';
    state.ctx.fillRect(0, 0, w, h);
    // console.log('environment drawn !');
}
function drawSeed() {
    // console.log('drawing seed...');
    state.ctx.fillStyle = '#000';
    state.ctx.fillRect((state.seed.y * s), (state.seed.x * s), s, s);
    // console.log('seed drawn !');
}
function drawInit() {
    // console.log('drawing init...');
    state.ctx.fillStyle = '#000';
    state.ctx.fillRect((state.init.y * s), (state.init.x * s), s, s);
    state.ctx.fillRect(((state.init.y + 1) * s), ((state.init.x + 1) * s), s, s);
    state.ctx.fillRect(((state.init.y + 1) * s), ((state.init.x + 2) * s), s, s);
    state.ctx.fillRect(((state.init.y + 2) * s), (state.init.x * s), s, s);
    state.ctx.fillRect(((state.init.y + 2) * s), ((state.init.x + 1) * s), s, s);
    // console.log('init drawn !');
}
