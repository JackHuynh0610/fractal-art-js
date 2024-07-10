document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('fractalCanvas');
    const ctx = canvas.getContext('2d');
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    let treeProperties = {
        color: 'black',
        branchLength: 70,
        angle: 25,
        ratio: 0.8,
        thickness: 2,
        depth: 10
    };

    const rootPosn = {
        x: canvasWidth / 2,
        y: canvasHeight - 70
    };

    function configTree(color, branchLength, angle, ratio, thickness, depth) {
        treeProperties.color = color;
        treeProperties.branchLength = branchLength;
        treeProperties.angle = angle;
        treeProperties.ratio = ratio;
        treeProperties.thickness = thickness;
        treeProperties.depth = depth;
        drawFractal(); // Redraw tree
    }

    function drawFractal() {
        // Clear current canvas
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        ctx.strokeStyle = treeProperties.color;  // Color of the line
        ctx.lineWidth = treeProperties.thickness;  // Width of the line

        // Start drawing the fractal tree from the root position
        drawBranch(rootPosn.x, rootPosn.y, treeProperties.branchLength, -Math.PI/2, treeProperties.depth);
    }

    function drawBranch(x, y, length, angle, depth) { //x and y is starting position, angle (radians) is the angle of the branch
        if (depth === 0) {
            return;
        }

        // Calculate endpoint of the branch, Math.cos and Math.sin function auto convert angle from degrees to radians
        let endX = x + length * Math.cos(angle);
        let endY = y + length * Math.sin(angle);

        // Draw the branch
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Recursively draw smaller branches
        let newLength = length * treeProperties.ratio;

        drawBranch(endX, endY, newLength, angle - treeProperties.angle * Math.PI / 180, depth - 1);
        drawBranch(endX, endY, newLength, angle + treeProperties.angle * Math.PI / 180, depth - 1);
    }



    // Form submission handler
    let form = document.getElementById('treeConfigForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get form values
        let color = document.getElementById('color').value;
        let branchLength = parseInt(document.getElementById('branchLength').value);
        let angle = parseInt(document.getElementById('angle').value);
        let ratio = parseFloat(document.getElementById('ratio').value);
        let thickness = parseInt(document.getElementById('thickness').value);
        let depth = parseInt(document.getElementById('depth').value);

        // Update and redraw tree with form values
        configTree(color, branchLength, angle, ratio, thickness, depth);
    });

    // Initial drawing of the tree with default values
    drawFractal();
});