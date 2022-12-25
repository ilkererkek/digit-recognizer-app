window.addEventListener('load', function () {

  // get the canvas element and its context
  var canvas = document.getElementById('output');
  var context = canvas.getContext('2d');
  var buttonClear = this.document.getElementById('btn-clear');
  context.lineWidth = 40
  context.fillStyle = "white";
  context.drawStyle = "black"
  context.fillRect(0, 0, canvas.width, canvas.height);
  var isIdle = true

  const clear = (e) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
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
    isIdle = true
    let imageBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
    let formData = new FormData();
    formData.append("image", imageBlob, "image.png");

    let response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
    });

    let result = await response.json()
    const printedResult = document.getElementsByName('resultante-1');
    printedResult[0].innerHTML = result.Prediction;
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
  canvas.addEventListener('mouseup', drawend, false)
  buttonClear.addEventListener('click', clear)
  
  const navId = document.getElementById("nav_menu"),
  ToggleBtnId = document.getElementById("toggle_btn"),
  CloseBtnId = document.getElementById("close_btn");

  // ==== SHOW MENU ==== //
  ToggleBtnId.addEventListener("click", () => {
    navId.classList.add("show");
  });

  // ==== HIDE MENU ==== //
  CloseBtnId.addEventListener("click", () => {
    navId.classList.remove("show");
  });

  // ==== Animate on Scroll Initialize  ==== //
  AOS.init();

  // ==== GSAP Animations ==== //
  // ==== LOGO  ==== //
  gsap.from(".logo", {
    opacity: 0,
    y: -10,
    delay: 1,
    duration: 0.5,
  });
  // ==== NAV-MENU ==== //
  gsap.from(".nav_menu_list .nav_menu_item", {
    opacity: 0,
    y: -10,
    delay: 1.4,
    duration: 0.5,
    stagger: 0.3,
  });
  // ==== TOGGLE BTN ==== //
  gsap.from(".toggle_btn", {
    opacity: 0,
    y: -10,
    delay: 1.4,
    duration: 0.5,
  });
  // ==== MAIN HEADING  ==== //
  gsap.from(".main-heading", {
    opacity: 0,
    y: 20,
    delay: 2.4,
    duration: 1,
  });
  // ==== INFO TEXT ==== //
  gsap.from(".info-text", {
    opacity: 0,
    y: 20,
    delay: 2.8,
    duration: 1,
  });
  // ==== CTA BUTTONS ==== //
  gsap.from(".btn_wrapper", {
    opacity: 0,
    y: 20,
    delay: 2.8,
    duration: 1,
  });
  // ==== TEAM IMAGE ==== //
  gsap.from(".team_img_wrapper img", {
    opacity: 0,
    y: 20,
    delay: 3,
    duration: 1,
  });
  }, false); // end window.onLoad

  function upload(){
    var imgcanvas = document.getElementById("canv1");
    var fileinput = document.getElementById("finput");
    var image = new SimpleImage(fileinput);
    image.drawTo(imgcanvas);
    setTimeout(uploaded_image_to_digit, 1000);
  }
  var canvas2 = document.getElementById('canv1');
  async function uploaded_image_to_digit(){
    let imageBlob = await new Promise(resolve => canvas2.toBlob(resolve, 'image/png'));
    let formData = new FormData();
    formData.append("image", imageBlob, "image.png");
    let response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      body: formData,
    });

    let result = await response.json()
    const printedResult = document.getElementsByName('resultante-2');
    console.log(result)
    printedResult[0].innerHTML = result.Prediction
  }