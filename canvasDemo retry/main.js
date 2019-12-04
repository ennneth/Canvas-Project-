$(function () {


    //declare variables

    // paintingerasing or not
    var paint = false;

    //painting or erasing
    var paint_erase = 'paint';

    //get the canvas and context
    var canvas = document.getElementById('paint');
    var c = canvas.getContext('2d');

    //mouse position
    var mouse = {
        x: 0,
        y: 0
    };

    // //onload load saved work from localStorage
    // if(localStorage.getItem('imgCanvas') != null) {
    //     var img = new Image();
    //     img.onload = function (){
    //         c.drawImage(img,0,0);
    //      }
    //     img.src = localStorage.getItem('imgCanvas');
    // }

    //set drawing parameters (lineWidth,lineJoin, lineCap)
    c.lineWidth = 3; // initial diameter of the line
    c.lineJoin = 'round';
    c.lineCap = 'round';
    c.strokeStyle = 'black';

    //click inside container
    $('#container').mousedown(function (e) {
        // when we click on the container we have to set paint to true to tell us either we are painting or erasing
        paint = true;
        c.beginPath();
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        c.moveTo(mouse.x, mouse.y);
    });


    //move the mouse while holding mouse key

    $('#container').mousemove(function (e) {
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        if (paint == true) {
            if (paint_erase == 'paint') {
                //get color input
                c.strokeStyle = $('#paintColor').val();
            } else {
                //white color
                c.strokeStyle = 'white';
            }
            c.lineTo(mouse.x, mouse.y);
            c.stroke();
        }
    });


    // mouse up --> we are not paintingerasing anymore
    $('#container').mouseup(function () {
        paint = false;
    });

    //if we leave the container we are not paintingerasing anymore
    $('#container').mouseleave(function () {
        paint = false;

    });
    //click on reset button
    $('#reset').click(function () { 
        c.clearRect(0, 0, canvas.width, canvas.height);
        paint_erase = 'paint';
        $('#erase').removeClass('eraseMode'); //erasemode defined in css sheet that when you click on reset, erase will be untoggled
    });

    //click on save button
    $('#save').click(function () { 
        if(typeof(localStorage)!= null) { // this checks if the browser supports local storage
            localStorage.setItem('imgCanvas',canvas.toDataURL());
        }
        else {
            window.alert('Your browser does not support local storage');
        }
        
    });

        //onload load saved work from localStorage
    if(localStorage.getItem('imgCanvas') != null) {
        var img = new Image();
        img.onload = function (){
            c.drawImage(img,0,0);
         }
        img.src = localStorage.getItem('imgCanvas');
    }

    //click on the erase button 

    $('#erase').click(function () { 
        if(paint_erase = 'paint') {
            paint_erase = 'erase';
        }
        else {
            paint_erase = 'paint';
        }
        $(this).toggleClass('eraseMode');
       
    });

    //change color input
    $('#paintColor').change(function(){
        $('#linewidth').css('background-color',
        $(this).val());
    });

    //change lineWidth input
    $("#slider").slider({
        min: 3, // this is the minumum radius of the circle connected to the slider
        max: 30, // max raduis of circle connected to the slider
        slide: function (e, ui) { //this event will trigger when slider is slided using a mouse
            $("#linewidth").height(ui.value); //when mouse grabs the slider the height of the circle which is under id=linewidth will be change
            $("#linewidth").width(ui.value); //when mouse grabs the slider the width of the circle which is under id=linewidth will be change
            c.lineWidth = ui.value;
        }
    });



    

});