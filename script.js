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

    // Signature pad functionality
    canvas.addEventListener('mousedown', function(e) {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    canvas.addEventListener('mousemove', function(e) {
        if (!isDrawing) return;
        ctx.lineWidth = document.getElementById('font-size').value; // Update line width based on font size picker
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        [lastX, lastY] = [e.offsetX, e.offsetY];
        ctx.lineTo(lastX, lastY);
        ctx.stroke();
    });

    canvas.addEventListener('mouseup', function() {
        isDrawing = false;
    });

    canvas.addEventListener('mouseout', function() {
        isDrawing = false;
    });

    // Clear button functionality
    document.getElementById('clear-btn').addEventListener('click', function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Save button functionality
    document.getElementById('save-btn').addEventListener('click', function() {
        var dataURL = canvas.toDataURL('image/png');
        var link = document.createElement('a');
        link.href = dataURL;
        link.download = 'signature.png';
        link.click();
    });

    // Text color functionality
    document.getElementById('text-color').addEventListener('input', function() {
        ctx.strokeStyle = this.value;
    });

    // Background color functionality
    document.getElementById('background-color').addEventListener('input', function() {
        canvas.style.backgroundColor = this.value;
    });

    // Font size picker functionality
    document.getElementById('font-size').addEventListener('change', function() {
        var fontSize = this.value + 'px';
        ctx.font = getFontStyle(fontSize);
        ctx.lineWidth = this.value; // Update line width based on font size picker
    });

    // Font weight functionality
    document.getElementById('font-weight').addEventListener('change', function() {
        var fontSize = document.getElementById('font-size').value + 'px';
        ctx.font = getFontStyle(fontSize);
    });

    // Function to get font style based on current settings
    function getFontStyle(fontSize) {
        var fontWeight = document.getElementById('font-weight').value;
        return fontWeight + ' ' + fontSize + ' Arial';
    }
});
