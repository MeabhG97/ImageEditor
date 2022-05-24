/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


import {offScreenCanvases} from './RenderCanvas.js';
import {canvasNames} from './RenderCanvas.js';
import {images} from './RenderCanvas.js';
import {renderCanvas} from './RenderCanvas.js';
import {penSelected} from './RenderCanvas.js';
import {penColor} from './RenderCanvas.js';
import {penSize} from './RenderCanvas.js'; 
import {canvasBounds} from './RenderCanvas.js'; 

export {draw};

function draw(){
    let canvas = offScreenCanvases.pop();
    let ctx = canvas.getContext('2d');
    
    let mouseX = event.clientX - canvasBounds.left;
    let mouseY = event.clientY - canvasBounds.top;
    
    
    ctx.fillStyle = penColor;
    
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, penSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    
    offScreenCanvases.push(canvas);
    
    renderCanvas();
}