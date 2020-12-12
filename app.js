const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INIT_COLOR = "#2c2c2c";
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);

ctx.strokeStyle = INIT_COLOR;
ctx.fillStyle = INIT_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(e){
    const x = e.offsetX;
    const y = e.offsetY;
    // console.log(x,y);
    if(!painting) {
        ctx.beginPath();
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function handleColorClick(e) {
    const color = e.target.style.backgroundColor;
    //  console.log(color);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function hadleRangeChage(e) {
    const rangeVal = e.target.value;
    ctx.lineWidth = rangeVal;
}

function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "fill";
    } else {
        filling = true;
        mode.innerText = "paint";
    }
}

function hadleCanvasClick() {
    if(filling) {
        ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    }
}

// 마우스 우클릭 메뉴 막기
function hadleCM(e) {
    e.preventDefault();
}

// 이미지 저장하기 
function handleSaveClick(e) {
    const img = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = img;
    link.download = "PaintJS";
    link.click();
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", hadleCanvasClick);
    canvas.addEventListener("contextmenu", hadleCM);
}

if(colors) {
    Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
}

if(range) {
    range.addEventListener("input", hadleRangeChage);
}

if(mode) {
    mode.addEventListener("click",handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick);
}