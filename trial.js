$(function () {


    var canvas,
        context,
        dragging = false, //initially mouse drag is false. We will make this true when we are on mousedown while on mousemove
        dragStartLocation, // this will capture the x and y coordinate when press mousedown event
        snapshot;


    function getCanvasCoordinates(event) {
        var x = event.clientX - canvas.getBoundingClientRect().left;
        var y = event.clientY - canvas.getBoundingClientRect().top;

        return {
            x: x,
            y: y
        };
    }

    function takeSnapshot() { // this will take the snapshot of the previous shapes we did when we press mousedown
        snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
    }

    function restoreSnapshot() { // put the image back into canvas
        context.putImageData(snapshot, 0, 0);

    }



    function drawLine(position) { //position will be thte last point of the line
        context.beginPath();
        context.moveTo(dragStartLocation.x, dragStartLocation.y);
        context.lineTo(position.x, position.y);
        context.stroke();
    }

    function drawCircle(position) {
        var radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x), 2) + Math.pow((dragStartLocation.y - position.y), 2));
        context.beginPath();
        context.arc(dragStartLocation.x, dragStartLocation.y, radius, 0, 2 * Math.PI, false);
    }

    function drawPolygon(position, sides, angle) {
        var coordinates = [];
        var radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x), 2) + Math.pow((dragStartLocation.y - position.y), 2));
        index = 0;

        for (index = 0; index < sides; index++) {
            coordinates.push({
                x: dragStartLocation.x + radius * Math.cos(angle),
                y: dragStartLocation.y - radius * Math.sin(angle)
            })
            angle += (2 * Math.PI) / sides;
        }
        context.beginPath();
        context.moveTo(coordinates[0].x, coordinates[0].y);
        for (index = 1; index < sides; index++) {
            context.lineTo(coordinates[index].x, coordinates[index].y);
        }

        context.closePath();
    }

    function draw(position, shape) {
        var fill = document.getElementById('fill');
        var shape = document.querySelector('input[type="radio"][name="shape"]:checked').value;
        var polygonSides = document.getElementById('polygonSides').value;
        var polygonAngle = document.getElementById('polygonAngle').value;

    //     switch (shape) {
    //         case circle:
    //             drawCircle(position);
    //             break;
    //         case line:
    //             drawLine(position);
    //             break;
    //         case polygon:
    //             drawPolygon(position, polygonSides, polygonAngle * (Math.PI / 180));
    //             break;
    //         case fill.checked:
    //             context.fill();
    //             break;
    //         default:
    //         context.stroke();
                
    //     }
    // }

        if (shape === 'circle') {
            drawCircle(position);
        }
        if (shape === 'line') {
            drawLine(position);
        }
        if (shape === 'polygon') {
            drawPolygon(position, polygonSides, polygonAngle * (Math.PI / 180));
        }
        if (fill.checked) {
            context.fill()
        } else {
            context.stroke();
        }
    }



    function dragStart(event) { // this will be called on mousedown event
        dragging = true;
        dragStartLocation = getCanvasCoordinates(event);
        takeSnapshot();

    }

    function drag(event) {
        var position;
        if (dragging == true) {
            restoreSnapshot();
            position = getCanvasCoordinates(event);
            draw(position, 'polygon');

        }
    }

    function dragStop(event) {
        dragging = false;
        var position = getCanvasCoordinates(event);
        draw(position, 'polygon');


    }

    function changeLineWidth() {
        context.lineWidth = this.value;
        event.stopPropagation;
    }

    function changeFillStyle() {
        context.fillStyle = this.value;
        event.stopPropagation;
    }

    function changeStrokeColor() {
        context.strokeStyle = this.value;
        event.stopPropagation;
    }

    function resetCanvas() {
        context.clearRect(0, 0, canvas.width, canvas.height)
    }

    // function erase () {
    //     context.strokeStyle = '#000000';
    //    
    //     this.toggleClass('eraseMode');
    // }




    //   //click on save button
    // function save() {
    //     if(typeof(localStorage)!= null) { // this checks if the browser supports local storage
    //         localStorage.setItem('imgCanvas',canvas.toDataURL());
    //     }
    //     else {
    //         window.alert('Your browser does not support local storage');
    //     }

    //     console.log('aa');
    // }

    // if(localStorage.getItem('imgCanvas') != null) {
    //     var img = new Image();
    //     img.onload = function (){
    //         context.drawImage(img,0,0);
    //      }
    //     img.src = localStorage.getItem('imgCanvas');
    // }


    function init() {
        canvas = document.getElementById('paint');
        context = canvas.getContext('2d');
        var lineWidth = document.getElementById('lineWidth');
        var fillColor = document.getElementById('fillColor');
        var strokeColor = document.getElementById('strokeColor');
        var clearCanvas = document.getElementById('clearCanvas');
        var erase = document.getElementById('erase');
        var save = document.getElementById('save');
        context.strokeStyle = strokeColor.value;
        context.fillStyle = fillColor.value;
        context.lineWidth = lineWidth.value;
        context.lineCap = 'round';

        //Event Listeners

        canvas.addEventListener('mousedown', dragStart, false);
        canvas.addEventListener('mousemove', drag, false);
        canvas.addEventListener('mouseup', dragStop, false);
        lineWidth.addEventListener('input', changeLineWidth, false);
        fillColor.addEventListener('input', changeFillStyle, false);
        strokeColor.addEventListener('input', changeStrokeColor, false);
        clearCanvas.addEventListener('click', resetCanvas, false);
        erase.addEventListener('click', erase, false);
        // save.addEventListener('click',save, false);


    }

    window.addEventListener('load', init, false);


});


//  //get the canvas and context
//  var canvas = document.getElementById('paint');
//  var ctx = canvas.getContext('2d');

// ctx.beginPath();
// ctx.moveTo(20,20);
// ctx.lineTo(200,200);
// ctx.stroke();


// function drawQuadraticCurve(ctx,start,cp1,end){
//     ctx.beginPath();
//     ctx.moveTo(start[0],start[1]);
//     ctx.quadraticCurveTo(cp1[0],cp1[1],end[0],end[1]);
//     ctx.stroke();
// }
// function drawLine(ctx,start,end){
//     ctx.beginPath();
//     ctx.moveTo(start[0],start[1]);
//     ctx.lineTo(end[0],end[1]);
//     ctx.stroke();
// }
// function drawRect(ctx,start,dimension,color){
//     ctx.fillStyle= color
//     ctx.fillRect(start[0],start[1],dimension[0],dimension[1]);
// }


//     drawRect(ctx,[10,10],[100,100],'green');
//     drawLine(ctx,[0,0],[200,200]);
//     drawQuadraticCurve(ctx,[2,2],[0,100],[200,100]);


//     // Quadratric curves example
//     ctx.beginPath();
//     ctx.moveTo(75, 25);
//     ctx.quadraticCurveTo(25, 25, 25, 62.5);
//     ctx.quadraticCurveTo(25, 100, 50, 100);
//     ctx.quadraticCurveTo(50, 120, 30, 125);
//     ctx.quadraticCurveTo(60, 120, 65, 100);
//     ctx.quadraticCurveTo(125, 100, 125, 62.5);
//     ctx.quadraticCurveTo(125, 25, 75, 25);
//     ctx.stroke(); 

