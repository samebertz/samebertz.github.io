(function() {
    window.onload = function() {
        main();
    }
    var state = {};
    var w = 400;
    var h = 400;
    var n = 40;
    var s = 400 / n;
    var run = 0;
    var runs = 40;
    function main() {
        identifyCanvas();
        generateMatrixOfLife();
        cloneMOL();
        //generateWatch();
        //generateSeed();
        generateInit();
        //addSeed();
        addInit();
        //generateRule();
        drawEnvironment();
        //drawSeed();
        drawInit();
        // console.log('setup complete...');

        // console.log('MOL initial:');
        for(var j = 0; j != n; j++) {
            // console.log('row '+lpad(j.toString(),'0',2)+': '+state.MOL[j].join(' '));
        };

        // console.log('starting run...');
        state.run = setInterval(step, 1000);
    }
    function step() {
        // console.log('------------------------------');
        // console.log('beginning step '+(run+1));
        evolve();
        age();
        run++;
        // console.log('step completed !');
        // console.log('------------------------------');
        if(run == runs) {
            // console.log('last run completed !');
            clearInterval(state.run);
            // console.log('exit successful !');
            //main();
        };
    }
    function evolve() {
        // console.log('beginning evolution...');
        cloneMOL();
        var neighbors = [];
        for(var j = 0; j != n; j++) {
            for(var i = 0; i != n; i++) {
                neighbors = [];
                if(j == 0) {
                    if(i == 0) {
                        neighbors[0] = state.SSOSCO[n-1][n-1].toString(2);
                        neighbors[1] = state.SSOSCO[n-1][ i ].toString(2);
                        neighbors[2] = state.SSOSCO[n-1][i+1].toString(2);
                        neighbors[3] = state.SSOSCO[ j ][i+1].toString(2);
                        neighbors[4] = state.SSOSCO[j+1][i+1].toString(2);
                        neighbors[5] = state.SSOSCO[j+1][ i ].toString(2);
                        neighbors[6] = state.SSOSCO[j+1][n-1].toString(2);
                        neighbors[7] = state.SSOSCO[ j ][n-1].toString(2);
                    } else if(i == n-1) {
                        neighbors[0] = state.SSOSCO[n-1][i-1].toString(2);
                        neighbors[1] = state.SSOSCO[n-1][ i ].toString(2);
                        neighbors[2] = state.SSOSCO[n-1][ 0 ].toString(2);
                        neighbors[3] = state.SSOSCO[ j ][ 0 ].toString(2);
                        neighbors[4] = state.SSOSCO[j+1][ 0 ].toString(2);
                        neighbors[5] = state.SSOSCO[j+1][ i ].toString(2);
                        neighbors[6] = state.SSOSCO[j+1][i-1].toString(2);
                        neighbors[7] = state.SSOSCO[ j ][i-1].toString(2);
                    } else {
                        neighbors[0] = state.SSOSCO[n-1][i-1].toString(2);
                        neighbors[1] = state.SSOSCO[n-1][ i ].toString(2);
                        neighbors[2] = state.SSOSCO[n-1][i+1].toString(2);
                        neighbors[3] = state.SSOSCO[ j ][i+1].toString(2);
                        neighbors[4] = state.SSOSCO[j+1][i+1].toString(2);
                        neighbors[5] = state.SSOSCO[j+1][ i ].toString(2);
                        neighbors[6] = state.SSOSCO[j+1][i-1].toString(2);
                        neighbors[7] = state.SSOSCO[ j ][i-1].toString(2);
                    };
                } else if(j == n - 1) {
                    if(i == 0) {
                        neighbors[0] = state.SSOSCO[j-1][n-1].toString(2);
                        neighbors[1] = state.SSOSCO[j-1][ i ].toString(2);
                        neighbors[2] = state.SSOSCO[j-1][i+1].toString(2);
                        neighbors[3] = state.SSOSCO[ j ][i+1].toString(2);
                        neighbors[4] = state.SSOSCO[ 0 ][i+1].toString(2);
                        neighbors[5] = state.SSOSCO[ 0 ][ i ].toString(2);
                        neighbors[6] = state.SSOSCO[ 0 ][n-1].toString(2);
                        neighbors[7] = state.SSOSCO[ j ][n-1].toString(2);
                    } else if(i == n-1) {
                        neighbors[0] = state.SSOSCO[j-1][i-1].toString(2);
                        neighbors[1] = state.SSOSCO[j-1][ i ].toString(2);
                        neighbors[2] = state.SSOSCO[j-1][ 0 ].toString(2);
                        neighbors[3] = state.SSOSCO[ j ][ 0 ].toString(2);
                        neighbors[4] = state.SSOSCO[ 0 ][ 0 ].toString(2);
                        neighbors[5] = state.SSOSCO[ 0 ][ i ].toString(2);
                        neighbors[6] = state.SSOSCO[ 0 ][i-1].toString(2);
                        neighbors[7] = state.SSOSCO[ j ][i-1].toString(2);
                    } else {
                        neighbors[0] = state.SSOSCO[j-1][i-1].toString(2);
                        neighbors[1] = state.SSOSCO[j-1][ i ].toString(2);
                        neighbors[2] = state.SSOSCO[j-1][i+1].toString(2);
                        neighbors[3] = state.SSOSCO[ j ][i+1].toString(2);
                        neighbors[4] = state.SSOSCO[ 0 ][i+1].toString(2);
                        neighbors[5] = state.SSOSCO[ 0 ][ i ].toString(2);
                        neighbors[6] = state.SSOSCO[ 0 ][i-1].toString(2);
                        neighbors[7] = state.SSOSCO[ j ][i-1].toString(2);
                    };
                } else if(i == 0) {
                    neighbors[0] = state.SSOSCO[j-1][n-1].toString(2);
                    neighbors[1] = state.SSOSCO[j-1][ i ].toString(2);
                    neighbors[2] = state.SSOSCO[j-1][i+1].toString(2);
                    neighbors[3] = state.SSOSCO[ j ][i+1].toString(2);
                    neighbors[4] = state.SSOSCO[j+1][i+1].toString(2);
                    neighbors[5] = state.SSOSCO[j+1][ i ].toString(2);
                    neighbors[6] = state.SSOSCO[j+1][n-1].toString(2);
                    neighbors[7] = state.SSOSCO[ j ][n-1].toString(2);
                } else if(i == n - 1) {
                    neighbors[0] = state.SSOSCO[j-1][i-1].toString(2);
                    neighbors[1] = state.SSOSCO[j-1][ i ].toString(2);
                    neighbors[2] = state.SSOSCO[j-1][ 0 ].toString(2);
                    neighbors[3] = state.SSOSCO[ j ][ 0 ].toString(2);
                    neighbors[4] = state.SSOSCO[j+1][ 0 ].toString(2);
                    neighbors[5] = state.SSOSCO[j+1][ i ].toString(2);
                    neighbors[6] = state.SSOSCO[j+1][i-1].toString(2);
                    neighbors[7] = state.SSOSCO[ j ][i-1].toString(2);
                } else {
                    neighbors[0] = state.SSOSCO[j-1][i-1].toString(2);
                    neighbors[1] = state.SSOSCO[j-1][ i ].toString(2);
                    neighbors[2] = state.SSOSCO[j-1][i+1].toString(2);
                    neighbors[3] = state.SSOSCO[ j ][i+1].toString(2);
                    neighbors[4] = state.SSOSCO[j+1][i+1].toString(2);
                    neighbors[5] = state.SSOSCO[j+1][ i ].toString(2);
                    neighbors[6] = state.SSOSCO[j+1][i-1].toString(2);
                    neighbors[7] = state.SSOSCO[ j ][i-1].toString(2);
                };
                // console.log(neighbors.join(''));
                numNeighbors = countNeighbors(neighbors);
                // console.log(numNeighbors);
                if(state.SSOSCO[j][i] == 1 && !(numNeighbors == 2 || numNeighbors == 3)) {
                    state.MOL[j][i] = 0;
                } else if(state.SSOSCO[j][i] == 0 && numNeighbors == 3) {
                    state.MOL[j][i] = 1;
                };
                //if(state.rule[neighbors] == 1) {
                //    state.MOL[j][i] = 1;
                //} else {
                //    state.MOL[j][i] = 0;
                //};
            };
        };
        // console.log('evolution completed !');
    }
    function age() {
        // console.log('beginning aging process...');
        drawEnvironment();
        for(var j = 0; j != n; j++) {
            for(var i = 0; i!= n; i++) {
                if(state.MOL[j][i] == 1) {
                    // console.log('live cell at '+j+', '+i);
                    state.ctx.fillStyle = '#000';
                    state.ctx.fillRect((j * s), (i * s), s, s);
                };
            };
        };
        // console.log('aging process completed !');
    }
    function identifyCanvas() {
        // console.log('identifying canvas...');
        var c = document.getElementById('canvas');
        var context = c.getContext('2d');
        state.ctx = context;
        // console.log('canvas identified !');
    }
    function generateMatrixOfLife() {
        // console.log('generating matrix of life...');
        var matrix = [];
        var row;
        for(var j = 0; j != n; j++) {
            row = [];
            for(var i = 0; i != n; i++) {
                row.push(0);
            };
            matrix.push(row);
        };
        state.MOL = matrix;
        // console.log('matrix of life generated !');
    }
    function cloneMOL() {
        // console.log('cloning MOL to SSOSCO...');
        var matrix = [];
        var row;
        for(var j = 0; j != n; j++) {
            row = [];
            for(var i = 0; i != n; i++) {
                row.push(state.MOL[j][i]);
            };
            matrix.push(row);
        };
        state.SSOSCO = matrix;
        // console.log('MOL cloned to SSOSCO !');
    }

    function generateWatch() {
        // console.log('generating watch...');
        state.watch = [];
        // console.log('watch generated !');
    }
    function generateSeed() {
        // console.log('generating seed...');
        var seed = {};
        seed.x = Math.floor(Math.random() * n);
        // console.log('seed.x = '+seed.x);
        seed.y = Math.floor(Math.random() * n);
        // console.log('seed.y = '+seed.y);
        state.seed = seed;
        // console.log('seed generated !');
    }
    function generateInit() {
        // console.log('generating init...');
        var init = {};
        init.x = Math.floor(Math.random() * (n - 5)) + 1;
        // console.log('init.x = '+init.x);
        init.y = Math.floor(Math.random() * (n - 5)) + 1;
        // console.log('init.y = '+init.y);
        state.init = init;
        // console.log('init generated !');
    }
    function addSeed() {
        // console.log('adding seed...');
        state.MOL[state.seed.y][state.seed.x] = 1;
        // console.log('seed added !');
    }

    function addInit() {
        // console.log('adding init...');
        state.MOL[state.init.y][state.init.x] = 1;
        state.MOL[state.init.y + 1][state.init.x + 1] = 1;
        state.MOL[state.init.y + 1][state.init.x + 2] = 1;
        state.MOL[state.init.y + 2][state.init.x] = 1;
        state.MOL[state.init.y + 2][state.init.x + 1] = 1;
        // console.log('init added !');
    }
    function generateRule() {
        // console.log('generating rule...');
        var rule_num = Math.floor(Math.random() * Math.pow(2, 8));
        // console.log('rule_num: '+rule_num);
        var rule_string = lpad(rule_num.toString(2), '0', Math.pow(2, 8));
        // console.log('rule_string: '+rule_string);
        var rule = {};
        var key;
        for(var i = 0; i < Math.pow(2, 8); i++) {
            key = lpad(i.toString(2), '0', 8);
            rule[key] = rule_string[i];
        };
        // console.log('rule: '+assToString(rule));
        state.rule = rule;
        // console.log('rule generated !');
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

    function countNeighbors(arr) {
        // console.log('counting neighbors...');
        // console.log('neighbors array: '+arr.join(''));
        var n = 0;
        arr.forEach(function(x) {if(x==1) {n++;};});
        return n;
        // console.log('neighbors counted !');
    }
    function lpad(str, pad, len) {
        for(var i = str.length; i < len; i++) {
            str = pad + str;
        };
        return str;
    }
    function assToString(ass) {
        var n = '';
        for(var key in ass) {
            if(!ass.hasOwnProperty(key)) {
                // console.log('wait what...');
            } else {
                n += ' | ['+key+'] => '+ass[key];
            };
        };
        return n.substring(3);
    }
})();
