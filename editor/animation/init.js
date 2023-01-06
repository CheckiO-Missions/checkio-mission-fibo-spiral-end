requirejs(['ext_editor_io2', 'jquery_190', 'raphael_210'],
    function (extIO, $) {
        function fiboSpiralEnd_Animation(tgt_node, data) {

            if (!data || !data.ext) {
                return
            }

            const input = data.in[0]

            /*----------------------------------------------*
             *
             * attr
             *
             *----------------------------------------------*/
            const attr = {
                axis: {
                    'stroke-width': '1px',
                    'stroke': '#4094c7',
                    'arrow-end': 'block-wide-long',
                },
                grid: {
                    'stroke-width': '0.3px',
                    'stroke': '#4094c7',
                },
                square: {
                    'stroke-width': '1px',
                    'stroke': '#F0801A',
                    'opacity': '0.7',
                    'fill': '#FABA00',
                },
            }

            /*----------------------------------------------*
             *
             * fibo spliral end
             *
             *----------------------------------------------*/
            const sum = nums => nums.reduce((a, x) => a + x)

            function fibo_spiral_end(elem) {
                const cd = [[1, -1], [1, 1], [-1, 1], [-1, -1]]
                let fib = [0, 1]
                let coords = [[0, 0]]
                for (let e = 0; e < elem; e += 1) {
                    const [x, y] = coords[coords.length-1]
                    const [dx, dy] = cd[e % 4]
                    coords.push([x + fib[fib.length-1] * dx, y + fib[fib.length-1] * dy])
                    fib.push(sum(fib.slice(fib.length-2, fib.length)))
                }
                return coords
            }

            /*----------------------------------------------*
             *
             * values
             *
             *----------------------------------------------*/
            const max_abs = arr => arr.reduce((a, b) => Math.max(Math.abs(a), Math.abs(b)))
            const coords = fibo_spiral_end(input)
            const max_coord = Math.max(3, max_abs([].concat(...coords))) * 1.2
            let [xs, ys] = [[],[]]
            for (let i = 0; i < coords.length; i += 1) {
                const [x, y] = coords[i]
                xs.push(x)
                ys.push(y)
            }
            const [min_x, max_x, min_y, max_y]
                = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)]
            const grid_size_px = 200
            const os = 15
            const scale = (grid_size_px / 2) / max_coord

            /*----------------------------------------------*
             *
             * paper
             *
             *----------------------------------------------*/
            const paper = Raphael(tgt_node, grid_size_px + os*2, grid_size_px + +os*2, 0, 0)

            /*----------------------------------------------*
             *
             * draw square
             *
             *----------------------------------------------*/
            paper.rect(
                (min_x+max_coord)*scale+os,
                (max_coord-max_y)*scale+os,
                Math.abs(max_x-min_x)*scale,
                Math.abs(max_y-min_y)*scale
            ).attr(attr.square)

            /*----------------------------------------------*
             *
             * draw axis
             *
             *----------------------------------------------*/
            // horizontal
            paper.path(['M', os, grid_size_px/2+os, 'h', grid_size_px]).attr(attr.axis)

            // vertical
            paper.path(['M', grid_size_px/2+os, grid_size_px+os, 'v', -grid_size_px]).attr(attr.axis)

            /*----------------------------------------------*
             *
             * draw grid
             *
             *----------------------------------------------*/
            // horizontal
            for (let i = 1; i <= max_coord; i += Math.max(1, max_coord/30)) {
                paper.path(['M', os, grid_size_px/2+os-scale*i, 'h', grid_size_px]).attr(attr.grid)
                paper.path(['M', os, grid_size_px/2+os+scale*i, 'h', grid_size_px]).attr(attr.grid)
            }
            
            // vertical
            for (let i = 1; i <= max_coord; i += Math.max(1, max_coord/30)) {
                paper.path(['M', grid_size_px/2+os-scale*i, grid_size_px+os, 'v', -grid_size_px]).attr(attr.grid)
                paper.path(['M', grid_size_px/2+os+scale*i, grid_size_px+os, 'v', -grid_size_px]).attr(attr.grid)
            }

            /*----------------------------------------------*
             *
             * draw spiral
             *
             *----------------------------------------------*/
            const pixel_coord = ([x, y]) => [(x+max_coord)*scale+os, (max_coord-y)*scale+os]
            coords.forEach((coord, idx) => {
                const [x1, y1] = pixel_coord(coord)
                // end point
                if (idx == coords.length-1) {
                    paper.circle(x1, y1, 1)
                }
                // arc
                if (coords.length > 1 && idx < coords.length - 1) {
                    const [x2, y2] = pixel_coord(coords[idx+1])
                    paper.path(['M', x1, y1, 'A', Math.abs(x1-x2), Math.abs(y1-y2), 90, 0, 0, x2, y2])
                }
            })
        }

        var io = new extIO({
            animation: function($expl, data){
                fiboSpiralEnd_Animation(
                    $expl[0],
                    data,
                );
            }
        });
        io.start();
    }
);
