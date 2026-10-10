// Resume menu, language switch and the hex reveal of the name (the background is src/scripts/background.js).
// Inlined at the end of <body>, so the reveal starts as soon as the page is parsed instead of after the deferred module scripts.
(function(){
  var root=document.documentElement;
  var reduce=matchMedia("(prefers-reduced-motion: reduce)");
  function context(canvas){try{return canvas.getContext("2d");}catch(e){return null;}}
  function cssVar(n){return getComputedStyle(root).getPropertyValue(n).trim();}

  /* resume menu: a native <details>, so it opens without JS; this adds dismissal */
  var menu=document.querySelector(".resume");
  if(menu){
    var closeMenu=function(refocus){if(!menu.open)return;menu.open=false;if(refocus)menu.querySelector("summary").focus();};
    document.addEventListener("click",function(e){if(!menu.contains(e.target))closeMenu(false);});
    document.addEventListener("keydown",function(e){if(e.key==="Escape")closeMenu(menu.contains(document.activeElement));});
    menu.addEventListener("focusout",function(e){if(e.relatedTarget&&!menu.contains(e.relatedTarget))closeMenu(false);});
    // Close once a download is picked; the link's default action still runs.
    menu.querySelector("ul").addEventListener("click",function(e){if(e.target.closest("a"))closeMenu(false);});
  }

  /* language switch: remember the pick so / stops following the browser language (the redirect lives in vercel.json) */
  var langLink=document.querySelector(".lang");
  if(langLink)langLink.addEventListener("click",function(){
    try{document.cookie="lang="+langLink.getAttribute("data-lang")+";path=/;max-age=31536000;samesite=lax"+(location.protocol==="https:"?";secure":"");}catch(e){}
  });

  /* hex name */
  // Only the big name on the landing and 404 pages; the resume page's heading has no spans to reveal.
  var h1=document.querySelector(".bottom h1"),HEX="0123456789ABCDEF",running=false,cv=null;
  var safety=0,id=0,finished=false,moved=null;
  function finish(){
    finished=true;running=false;
    // Lifts the CSS hold that keeps the name hidden until the mask is on.
    root.classList.add("revealed");
    if(moved)removeEventListener("resize",moved);
    clearTimeout(safety);cancelAnimationFrame(id);
    if(cv)cv.remove();
    if(h1){
      var hs=h1.style;
      hs.webkitMaskImage=hs.maskImage=hs.webkitMaskRepeat=hs.maskRepeat=hs.webkitMaskPosition=hs.maskPosition=hs.webkitMaskSize=hs.maskSize="";
    }
  }
  // Plays once per visit, like the entrance animation; `seen` is set in <head>.
  if(!h1||root.classList.contains("seen")||reduce.matches||!window.requestAnimationFrame||!window.CSS||!CSS.supports("mask-image","linear-gradient(black,black)")){finish();return;}
  addEventListener("scroll",finish,{once:true,passive:true});
  // Leaving mid-reveal: show the whole name in the outgoing view transition snapshot.
  addEventListener("pageswap",finish);
  document.addEventListener("visibilitychange",function(){if(document.hidden)finish();});
  var motionChanged=function(){if(reduce.matches)finish();};
  if(reduce.addEventListener)reduce.addEventListener("change",motionChanged);
  else reduce.addListener(motionChanged);
  function build(){
    if(running||finished)return;running=true;
    safety=setTimeout(finish,2500);
    var cs=getComputedStyle(h1),fs=parseFloat(cs.fontSize),r=h1.getBoundingClientRect();
    // The overlay is pinned to where the name is now. Mobile browsers fire resize while applying the viewport or moving toolbars, so only stop if the name actually moved.
    moved=function(){var n=h1.getBoundingClientRect();if(Math.abs(n.left-r.left)>1||Math.abs(n.top-r.top)>1||Math.abs(n.width-r.width)>1)finish();};
    addEventListener("resize",moved);
    var dpr=Math.min(Math.ceil(devicePixelRatio||1),2);
    var pad=Math.round(fs*.25),w=Math.ceil(r.width+pad*2),h=Math.ceil(r.height+pad*2);
    var fg=cssVar("--fg");
    var off=document.createElement("canvas");off.width=w*dpr;off.height=h*dpr;
    var o=context(off);if(!o){finish();return;}o.scale(dpr,dpr);
    o.font=cs.fontWeight+" "+fs+"px "+cs.fontFamily;
    if("letterSpacing" in o)o.letterSpacing=cs.letterSpacing;
    o.fillStyle="#000";o.textBaseline="alphabetic";
    Array.prototype.forEach.call(h1.children,function(s){
      if(s.tagName!=="SPAN")return;
      var sr=s.getBoundingClientRect(),m=o.measureText(s.textContent);
      var asc=m.fontBoundingBoxAscent||fs*.9,des=m.fontBoundingBoxDescent||fs*.25;
      o.fillText(s.textContent,sr.left-r.left+pad,sr.top-r.top+pad+(sr.height-(asc+des))/2+asc);
    });
    var W2=w*dpr,data=o.getImageData(0,0,W2,h*dpr).data,cell=Math.max(5,Math.round(fs/13));
    var cols=Math.ceil(w/cell),rows=Math.ceil(h/cell),cells=[];
    for(var gy=0;gy<rows;gy++)for(var gx=0;gx<cols;gx++){
      var x0=gx*cell,y0=gy*cell,sum=0,any=0,n=0;
      for(var yy=y0*dpr;yy<Math.min((y0+cell)*dpr,h*dpr);yy+=dpr)for(var xx=x0*dpr;xx<Math.min((x0+cell)*dpr,W2);xx+=dpr){
        var al=data[(yy*W2+xx)*4+3];sum+=al;n++;if(al)any=1;
      }
      if(!any)continue;
      var t0=(x0/w)*1100+Math.random()*600,t1=t0+300+Math.random()*400;
      cells.push({gx:gx,gy:gy,x:x0,y:y0,hex:sum/n>90,t0:t0,t1:t1,t2:t1+250+Math.random()*450,s:Math.random()*16|0,ch:HEX[Math.random()*16|0]});
    }
    var FADE=360,end=0;for(var q=0;q<cells.length;q++)end=Math.max(end,cells[q].t2+FADE);

    var mk=document.createElement("canvas");mk.width=cols;mk.height=rows;
    var mc=context(mk);if(!mc){finish();return;}
    var mimg=mc.createImageData(cols,rows),md=mimg.data;
    for(var z=0;z<md.length;z+=4){md[z]=md[z+1]=md[z+2]=0;md[z+3]=0;}
    var hs=h1.style,decoding=false;
    // Safari decodes each new url() mask asynchronously and hides the name until it is ready, so swapping one in per
    // frame blinks the name. WebKit can mask with a live canvas instead, drawn synchronously.
    var live=document.getCSSCanvasContext&&CSS.supports("-webkit-mask-image","-webkit-canvas(a)")?document.getCSSCanvasContext("2d","hexname",cols,rows):null;
    function applyMask(u){hs.webkitMaskImage=hs.maskImage="url("+u+")";}
    function setMask(){
      if(live){live.putImageData(mimg,0,0);return;}
      mc.putImageData(mimg,0,0);
      // Elsewhere, decode each frame before swapping it in, skipping frames that arrive mid-decode.
      var u=mk.toDataURL(),img=new Image();
      if(!img.decode){applyMask(u);return;}
      if(decoding)return;decoding=true;
      img.src=u;
      img.decode().then(function(){decoding=false;if(!finished)applyMask(u);},function(){decoding=false;});
    }
    hs.webkitMaskRepeat=hs.maskRepeat="no-repeat";
    hs.webkitMaskPosition=hs.maskPosition=(-pad)+"px "+(-pad)+"px";
    hs.webkitMaskSize=hs.maskSize=(cols*cell)+"px "+(rows*cell)+"px";
    // The first, empty mask goes on at once: the name is hidden either way until it takes.
    if(live){live.putImageData(mimg,0,0);hs.webkitMaskImage="-webkit-canvas(hexname)";}
    else{mc.putImageData(mimg,0,0);applyMask(mk.toDataURL());}
    root.classList.add("revealed");

    cv=document.createElement("canvas");cv.setAttribute("aria-hidden","true");
    cv.width=W2;cv.height=h*dpr;
    cv.style.cssText="position:fixed;pointer-events:none;z-index:3;left:"+(r.left-pad)+"px;top:"+(r.top-pad)+"px;width:"+w+"px;height:"+h+"px";
    document.body.appendChild(cv);
    var c=context(cv);if(!c){finish();return;}c.setTransform(dpr,0,0,dpr,0,0);
    c.font="400 "+Math.round(cell*1.15)+"px 'Geist Mono',ui-monospace,monospace";
    c.textAlign="center";c.textBaseline="middle";
    var start0=performance.now(),lastF=0,half=cell/2;
    function step(now){
      if(finished)return;
      try{
      var e=(now-start0)*2;
      if(e>=end){finish();return;}
      id=requestAnimationFrame(step);
      if(now-lastF<33)return;lastF=now;
      c.clearRect(0,0,w,h);c.fillStyle=fg;
      var tick=(e/65)|0;
      for(var i=0;i<cells.length;i++){
        var k=cells[i],p=e>=k.t2?Math.min(1,(e-k.t2)/FADE):0;
        if(k.hex&&e>=k.t0&&p<1){
          c.globalAlpha=(e<k.t1?Math.min(1,(e-k.t0)/220)*.65:.85)*(1-p);
          c.fillText(e<k.t1?HEX[(k.s+tick)%16]:k.ch,k.x+half,k.y+half);
        }
        md[(k.gy*cols+k.gx)*4+3]=Math.round(255*p*p*(3-2*p));
      }
      setMask();
      }catch(e){finish();}
    }
    id=requestAnimationFrame(step);
  }
  var ready=document.fonts&&document.fonts.load?Promise.all([document.fonts.load("600 100px Geist"),document.fonts.load("20px 'Geist Mono'")]):Promise.resolve();
  // Slow or failed fonts leave real text readable; never start a late reveal.
  var fontDeadline=setTimeout(finish,1200);
  function go(){
    clearTimeout(fontDeadline);
    if(finished||reduce.matches||document.hidden)return;
    id=requestAnimationFrame(function(){try{build();}catch(e){finish();}});
  }
  ready.then(go,function(){clearTimeout(fontDeadline);finish();});
})();
