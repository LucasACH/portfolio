// Animated blob background. Inlined right after the canvas, so its first frame is drawn before first paint,
// and it picks up where the previous page left off: navigating keeps the blobs in place instead of resetting them.
(function(){
  var root=document.documentElement,bg=document.getElementById("bg"),bx=null;
  var reduce=matchMedia("(prefers-reduced-motion: reduce)");
  try{bx=bg.getContext("2d");}catch(e){}
  if(!bx)return;
  function cssVar(n){return getComputedStyle(root).getPropertyValue(n).trim();}
  function rgb(hex){hex=hex.replace("#","");if(hex.length===3)hex=hex.replace(/./g,"$&$&");var n=parseInt(hex,16);return[(n>>16)&255,(n>>8)&255,n&255];}
  var W=0,H=0,base=rgb(cssVar("--bg")),blob=rgb(cssVar("--blob")),raf=0,last=0,t=40;
  var blobs=[
    {x:.8,y:.3,r:.42,ax:.198,ay:.220,sx:.11,sy:.083,p:0},
    {x:.15,y:1,r:.34,ax:.220,ay:.132,sx:.077,sy:.12,p:2},
    {x:1,y:.9,r:.26,ax:.154,ay:.220,sx:.13,sy:.07,p:4},
    {x:.4,y:-.05,r:.2,ax:.286,ay:.110,sx:.09,sy:.15,p:1}
  ];
  // t is the clock of the last drawn frame; the next page draws that same frame first.
  function load(){try{var s=+sessionStorage.getItem("bg-t");if(s>0)t=s;}catch(e){}}
  function save(){try{sessionStorage.setItem("bg-t",t);}catch(e){}}
  function sizeBg(){W=128;H=Math.max(64,Math.round(128*innerHeight/Math.max(innerWidth,1)));bg.width=W;bg.height=H;safeDraw();}
  function draw(){
    if(!bx)return;
    bx.fillStyle="rgb("+base+")";bx.fillRect(0,0,W,H);
    var M=Math.max(W,H),c="rgba("+blob+",";
    for(var i=0;i<blobs.length;i++){
      var b=blobs[i],x=(b.x+b.ax*Math.sin(t*b.sx+b.p))*W,y=(b.y+b.ay*Math.cos(t*b.sy+b.p*1.3))*H,r=b.r*M*(1+.08*Math.sin(t*.1+b.p));
      var g=bx.createRadialGradient(x,y,0,x,y,r);
      g.addColorStop(0,c+"1)");g.addColorStop(.25,c+".55)");g.addColorStop(.6,c+".08)");g.addColorStop(1,c+"0)");
      bx.fillStyle=g;bx.fillRect(0,0,W,H);
    }
  }
  function frame(now){
    raf=requestAnimationFrame(frame);
    if(now-last<50)return;
    var dt=last?Math.min(now-last,100):0;last=now;t+=dt/1000*1.5;safeDraw();
  }
  function start(){if(bx&&window.requestAnimationFrame&&!raf&&!reduce.matches&&!document.hidden){last=0;raf=requestAnimationFrame(frame);}}
  function stop(){if(raf){cancelAnimationFrame(raf);raf=0;}}
  function safeDraw(){
    try{draw();}catch(e){stop();bx=null;bg.width=0;bg.height=0;}
  }
  function update(){stop();safeDraw();start();}
  load();sizeBg();update();
  var rt;addEventListener("resize",function(){clearTimeout(rt);rt=setTimeout(sizeBg,120);});
  document.addEventListener("visibilitychange",function(){if(document.hidden)save();update();});
  (reduce.addEventListener?reduce.addEventListener("change",update):reduce.addListener(update));
  // pageswap fires just before the view transition snapshots this page; pagehide covers browsers without it.
  addEventListener("pageswap",save);
  addEventListener("pagehide",save);
  // Back/forward cache: this page was frozen while another one moved the blobs on.
  addEventListener("pageshow",function(e){if(e.persisted){load();update();}});
})();
