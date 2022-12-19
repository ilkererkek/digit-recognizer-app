window.addEventListener('load', function () {
    // get the canvas element and its context
    var canvas = document.getElementById('output');
    var context = canvas.getContext('2d');
    var isIdle = true;
    function drawstart(event) {
      context.beginPath();
      context.moveTo(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);
      isIdle = false;
    }
    function drawmove(event) {
      if (isIdle) return;
      context.lineTo(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);
      context.stroke();
    }
    function drawend(event) {
      if (isIdle) return;
      drawmove(event);
      isIdle = true;
    }
    function touchstart(event) { 
        drawstart(event.touches[0]) 
    }
    function touchmove(event) { 
        drawmove(event.touches[0]); 
        event.preventDefault(); 
    }
    async function touchend(event) { 
        drawend(event.changedTouches[0]) 

        let imageBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));

        let formData = new FormData();
        formData.append("image", imageBlob, "image.png");

        let response = await fetch('http://localhost:8000/image', {
            method: 'POST',
            body: formData
        });
        let result = await response.json();

    }
  
    canvas.addEventListener('touchstart', touchstart, false);
    canvas.addEventListener('touchmove', touchmove, false);
    canvas.addEventListener('touchend', touchend, false);        
  
    canvas.addEventListener('mousedown', drawstart, false);
    canvas.addEventListener('mousemove', drawmove, false);
    canvas.addEventListener('mouseup', drawend, false);
  
  }, false); // end window.onLoad