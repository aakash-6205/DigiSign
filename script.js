document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById('signature-pad');
    var ctx = canvas.getContext('2d');
    var isDrawing = false;
    var lastX = 0;
    var lastY = 0;
    var defaultFontSize = 20;
    var defaultFontWeight = 'normal';
    
    // Set initial font style
    ctx.font = defaultFontWeight + ' ' + defaultFontSize + 'px Arial';
    ctx.strokeStyle = '#000'; // Default color

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

    // Font weight functionality
    document.getElementById('font-weight').addEventListener('change', changeFontWeight);

    // Function to start drawing
    function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    // Function to draw
    function draw(e) {
        if (!isDrawing) return;
        ctx.lineWidth = document.getElementById('font-size').value; // Update line width based on font size picker
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        [lastX, lastY] = [e.offsetX, e.offsetY];
        ctx.lineTo(lastX, lastY);
        ctx.stroke();
    }

    // Function to stop drawing
    function stopDrawing() {
        isDrawing = false;
    }

    // Function to start drawing for touch events
    function startDrawingTouch(e) {
        isDrawing = true;
        var touch = e.touches[0];
        var rect = canvas.getBoundingClientRect();
        [lastX, lastY] = [touch.clientX - rect.left, touch.clientY - rect.top];
    }

    // Function to draw for touch events
    function drawTouch(e) {
        if (!isDrawing) return;
        var touch = e.touches[0];
        var rect = canvas.getBoundingClientRect();
        ctx.lineWidth = document.getElementById('font-size').value; // Update line width based on font size picker
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        [lastX, lastY] = [touch.clientX - rect.left, touch.clientY - rect.top];
        ctx.lineTo(lastX, lastY);
        ctx.stroke();
    }

    // Function to stop drawing for touch events
    function stopDrawingTouch() {
        isDrawing = false;
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
        var fontSize = this.value + 'px';
        ctx.font = getFontStyle(fontSize);
        ctx.lineWidth = this.value; // Update line width based on font size picker
    }

    // Function to change font weight
    function changeFontWeight() {
        var fontSize = document.getElementById('font-size').value + 'px';
        ctx.font = getFontStyle(fontSize);
    }

    // Function to get font style based on current settings
    function getFontStyle(fontSize) {
        var fontWeight = document.getElementById('font-weight').value;
        return fontWeight + ' ' + fontSize + ' Arial';
    }
});
