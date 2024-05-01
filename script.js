document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById('signature-pad');
    var ctx = canvas.getContext('2d');
    var isDrawing = false;
    var points = [];
    
    // Set initial styles
    ctx.strokeStyle = '#000'; // Default color
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    // Signature pad functionality for mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Signature pad functionality for touch events
    canvas.addEventListener('touchstart', startDrawingTouch);
    canvas.addEventListener('touchmove', drawTouch);
    canvas.addEventListener('touchend', stopDrawingTouch);

    // Clear button functionality
    document.getElementById('clear-btn').addEventListener('click', clearCanvas);

    // Save button functionality
    document.getElementById('save-btn').addEventListener('click', saveSignature);

    // Text color functionality
    document.getElementById('text-color').addEventListener('input', changeTextColor);

    // Background color functionality
    document.getElementById('background-color').addEventListener('input', changeBackgroundColor);

    // Font size picker functionality
    document.getElementById('font-size').addEventListener('change', changeFontSize);

    // Function to start drawing
    function startDrawing(e) {
        isDrawing = true;
        points.push({ x: e.offsetX, y: e.offsetY });
    }

    // Function to draw
    function draw(e) {
        if (!isDrawing) return;
        points.push({ x: e.offsetX, y: e.offsetY });
        smoothDraw();
    }

    // Function to stop drawing
    function stopDrawing() {
        isDrawing = false;
        points = [];
    }

    // Function to start drawing for touch events
    function startDrawingTouch(e) {
        e.preventDefault();
        isDrawing = true;
        var touch = e.touches[0];
        points.push({ x: touch.clientX - canvas.offsetLeft, y: touch.clientY - canvas.offsetTop });
    }

    // Function to draw for touch events
    function drawTouch(e) {
        e.preventDefault();
        if (!isDrawing) return;
        var touch = e.touches[0];
        points.push({ x: touch.clientX - canvas.offsetLeft, y: touch.clientY - canvas.offsetTop });
        smoothDraw();
    }

    // Function to stop drawing for touch events
    function stopDrawingTouch() {
        isDrawing = false;
        points = [];
    }

    // Function to clear the canvas
    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Function to save the signature
    function saveSignature() {
        var dataURL = canvas.toDataURL('image/png');
        var link = document.createElement('a');
        link.href = dataURL;
        link.download = 'signature.png';
        link.click();
    }

    // Function to change text color
    function changeTextColor() {
        ctx.strokeStyle = this.value;
    }

    // Function to change background color
    function changeBackgroundColor() {
        canvas.style.backgroundColor = this.value;
    }

    // Function to change font size
    function changeFontSize() {
        ctx.lineWidth = this.value;
    }

    // Function to draw smoothed curve
    function smoothDraw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        for (var i = 1; i < points.length - 2; i++) {
            var xc = (points[i].x + points[i + 1].x) / 2;
            var yc = (points[i].y + points[i + 1].y) / 2;
            ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }

        // For the last 2 points
        ctx.quadraticCurveTo(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
        ctx.stroke();
    }
});
