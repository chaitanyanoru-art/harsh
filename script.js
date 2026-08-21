const scenes=[...document.querySelectorAll(".scene")];
const progress=document.getElementById("progress");
const counter=document.getElementById("sceneCounter");
let current=0;
let busy=false;

function show(index){
  if(index<0||index>=scenes.length||busy||index===current)return;
  busy=true;
  scenes[current].classList.remove("active");
  current=index;
  scenes[current].classList.add("active");
  progress.style.width=(current/(scenes.length-1)*100)+"%";
  counter.textContent=String(current+1).padStart(2,"0")+" — 06";
  setTimeout(()=>busy=false,900);
}
function next(){show(current+1)}

document.querySelectorAll("[data-next]").forEach(b=>b.addEventListener("click",next));
document.getElementById("secretStar").addEventListener("click",()=>show(6));
document.getElementById("replay").addEventListener("click",()=>{
  scenes[current].classList.remove("active");
  current=0;
  scenes[0].classList.add("active");
  progress.style.width="0%";
  counter.textContent="01 — 06";
});

let wheelLock=false;
document.getElementById("film").addEventListener("wheel",e=>{
  e.preventDefault();
  if(wheelLock||Math.abs(e.deltaY)<12)return;
  wheelLock=true;
  e.deltaY>0?next():show(current-1);
  setTimeout(()=>wheelLock=false,950);
},{passive:false});

let startY=null;
document.getElementById("film").addEventListener("touchstart",e=>{startY=e.changedTouches[0].clientY},{passive:true});
document.getElementById("film").addEventListener("touchend",e=>{
  if(startY===null)return;
  const d=startY-e.changedTouches[0].clientY;
  if(Math.abs(d)>55)d>0?next():show(current-1);
  startY=null;
},{passive:true});

window.addEventListener("keydown",e=>{
  if(e.key==="ArrowDown"||e.key==="PageDown"){e.preventDefault();next()}
  if(e.key==="ArrowUp"||e.key==="PageUp"){e.preventDefault();show(current-1)}
});

const canvas=document.getElementById("stars");
const ctx=canvas.getContext("2d");
let stars=[];
function resize(){
  canvas.width=innerWidth;canvas.height=innerHeight;
  stars=Array.from({length:120},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:.2+Math.random()*1.1,s:.03+Math.random()*.18,a:.15+Math.random()*.7}));
}
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(const s of stars){
    s.y-=s.s;if(s.y<0)s.y=canvas.height;
    ctx.globalAlpha=s.a;ctx.fillStyle="#d8cfc3";ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
  }
  requestAnimationFrame(animate);
}
resize();addEventListener("resize",resize);animate();
