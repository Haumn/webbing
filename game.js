var canvas, ctx,
    brush = {
        x: 0,
        y: 0,
        color: '#000000',
        size: 10,
        down: false,
    },
    strokes = [],
    currentStroke = null;

function redraw () {
    ctx.clearRect(0, 0, canvas[0].width, canvas[0].height);
    ctx.lineCap = 'round';
    for (var i = 0; i < strokes.length; i++) {
        var s = strokes[i];
        ctx.strokeStyle = s.color;
        ctx.lineWidth = s.size;
        ctx.beginPath();
        ctx.moveTo(s.points[0].x, s.points[0].y);
        for (var j = 0; j < s.points.length; j++) {
            var p = s.points[j];
            ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
    }
}

function detectShape(p_points) {

    const xs = p_points.map(p => p.x);
    const ys = p_points.map(p => p.y);
    const width = Math.max(...xs) - Math.min(...xs);
    const height = Math.max(...ys) - Math.min(...ys);

    let shape = "Unknown";

    // Very basic heuristic
    if (Math.abs(width - height) < 20) {
        shape = "Circle or Square";
    } else if (width > height) {
        shape = "Rectangle";
    } else {
        shape = "Ellipse";
    }

    document.getElementById("shapeResult").textContent = `Detected: ${shape}`;
    }

function init () {
    canvas = $('#game_draw');
    canvas.attr({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    ctx = canvas[0].getContext('2d');

    function mouseEvent(e) {
        const rect = canvas[0].getBoundingClientRect();
        brush.x = e.clientX - rect.left;
        brush.y = e.clientY - rect.top;

        currentStroke.points.push({
            x: brush.x,
            y: brush.y,
        });

        redraw();
    }


    canvas.mousedown(function (e) {
        brush.down = true;

        currentStroke = {
            color: brush.color,
            size: brush.size,
            points: [],
        };

        p_points = currentStroke.points;

        strokes.push(currentStroke);

        mouseEvent(e);
    }).mouseup(function (e) {
        brush.down = false;

        mouseEvent(e);

        detectShape(p_points);

        currentStroke = null;
    }).mousemove(function (e) {
        if (brush.down)
            mouseEvent(e);
    });

    $('#color-picker').on('input', function () {
        brush.color = this.value;
    });

    $('#clear-btn').click(function () {
    strokes = [];
    redraw();
    });

    $('#save-btn').click(function () {
    var dataURL = canvas[0].toDataURL('image/png');     // base‑64 string

    // create a link pointing at the dataURL
    var a = document.createElement('a');
    a.href = dataURL;

    // open in new tab/window instead of downloading
    a.target = '_blank';           // <== this makes it open in another window
    // a.download = 'drawing.png';  // omit download attribute if you don't want a save prompt

    // the element must be in the document for some browsers to honour target
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
});

    $('#brush-size').on('input', function () {
        brush.size = this.value;
    });
}

$(init);