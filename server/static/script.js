


window.addEventListener('load', function () {
    // get the canvas element and its context
    var canvas = document.getElementById('output');
    var context = canvas.getContext('2d');
    var buttonClear = this.document.getElementById('btn-clear');
    context.lineWidth = 40;

    context.fillStyle = "white";
    context.drawStyle = "black"
    context.fillRect(0, 0, canvas.width, canvas.height);
    var isIdle = true;


    const clear = (e) => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillRect(0, 0, canvas.width, canvas.height);
    };


    function drawstart(event) {
      context.beginPath();
      context.moveTo(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);
      isIdle = false;
    }
    function drawmove(event) {
      if (isIdle) return;
      const x = event.pageX - canvas.offsetLeft;
      const y = event.pageY - canvas.offsetTop;
      if(x > canvas.width || x < 0 || y > canvas.height || y < 0){
        drawend()
      }
      context.lineTo(x, y);
      context.stroke();
    }
    async function drawend(event) {
      if (isIdle) return;
      drawmove(event);
      isIdle = true;

      let imageBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));

      let formData = new FormData();
      formData.append("image", imageBlob, "image.png");
      
      let response = await fetch('http://localhost:5000/predict', {
          method: 'POST',
          body: formData,
      });
      let result = await response.text()
      console.log(result);
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
    }
  
    canvas.addEventListener('touchstart', touchstart, false);
    canvas.addEventListener('touchmove', touchmove, false);
    canvas.addEventListener('touchend',touchend, false);        
  
    canvas.addEventListener('mousedown', drawstart, false);
    canvas.addEventListener('mousemove', drawmove, false);
    canvas.addEventListener('mouseup', drawend, false);

    buttonClear.addEventListener('click', clear)
  
  }, false); // end window.onLoad