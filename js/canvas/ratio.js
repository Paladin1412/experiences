function ratio(ctx){
  var ctx = ctx,
      canvas=ctx.canvas,
      width = canvas.width,
      height = canvas.height;
      
 if (window.devicePixelRatio) {
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      canvas.height = height * window.devicePixelRatio;
      canvas.width = width * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
}


