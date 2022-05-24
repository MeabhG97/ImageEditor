/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


import {offScreenCanvases} from './RenderCanvas.js';
import {images} from './RenderCanvas.js';
import {renderCanvas} from './RenderCanvas.js';
import {penSelected} from './RenderCanvas.js';
import {canvasBounds} from './RenderCanvas.js'; 
import {draw} from './drawOnImage.js';

export {mouseDownHandler, mouseMoveHandler, rotateImage, scaleImage};

function translateImage(){
    let image = images.pop();
    let canvas = offScreenCanvases.pop();
    let ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if(image.drawRotation === 0){
        ctx.drawImage(image, image.drawX, image.drawY, 
            image.drawWidth, image.drawHeight);
    }
    else{
        ctx.save();
        
        ctx.translate((image.drawX + image.drawWidth) / 2, 
            (image.drawY + image.drawHeight) / 2);
        ctx.rotate(image.drawRotation * Math.PI / 180);
        ctx.translate(-(image.drawX + image.drawWidth) / 2, 
            -(image.drawY + image.drawHeight) / 2);
        
        ctx.drawImage(image, image.drawX, image.drawY, 
            image.drawWidth, image.drawHeight);
        
        ctx.restore();
    }
    
    images.push(image);
    offScreenCanvases.push(canvas);
    
    renderCanvas();
}

function rotateImage(){
    let image = images.pop();
    let canvas = offScreenCanvases.pop();
    let ctx = canvas.getContext('2d');
    
    image.drawRotation = document.getElementById('rotateSlider').value;
    
    ctx.save();
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.translate((image.drawX + image.drawWidth) / 2, 
        (image.drawY + image.drawHeight) / 2);
    ctx.rotate(image.drawRotation * Math.PI / 180);
    ctx.translate(-(image.drawX + image.drawWidth) / 2, 
        -(image.drawY + image.drawHeight) / 2);
    
    ctx.drawImage(image, image.drawX, image.drawY, image.drawWidth, image.drawHeight);
    
    ctx.restore();
    
    images.push(image);
    offScreenCanvases.push(canvas);
    
    renderCanvas();
}

function scaleImage(event){
    let canvas = offScreenCanvases.pop();
    offScreenCanvases.push(canvas);

    let mouseX = event.clientX - canvasBounds.left;
    let mouseY = event.clientY - canvasBounds.top;
    
    if(isMouseInImage(mouseX, mouseY)){
        event.preventDefault();
        
        let image = images.pop();
        
        image.drawWidth = image.drawWidth + ((-event.deltaY) / 10);
        image.drawHeight = image.drawWidth / image.ratio;
        
        let ctx = canvas.getContext('2d');
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if(image.drawRotation === 0){
            ctx.drawImage(image, image.drawX, image.drawY, 
                image.drawWidth, image.drawHeight);
        }
        else{
            ctx.save();

            ctx.translate((image.drawX + image.drawWidth) / 2, 
                (image.drawY + image.drawHeight) / 2);
            ctx.rotate(image.drawRotation * Math.PI / 180);
            ctx.translate(-(image.drawX + image.drawWidth) / 2, 
                -(image.drawY + image.drawHeight) / 2);

            ctx.drawImage(image, image.drawX, image.drawY, 
                image.drawWidth, image.drawHeight);

            ctx.restore();
        }

        images.push(image);
    }
    
    offScreenCanvases.push(canvas);
    renderCanvas();
}

function isMouseInImage(mouseX, mouseY){
    let image = images.pop();
    if(image.src.length > 0){
        let x = image.drawX;
        let y = image.drawY;
        let width = image.drawWidth;
        let height = image.drawHeight;
        images.push(image);
        
        if(mouseX >= x && mouseX <= (x + width) &&
                mouseY >= y && mouseY <= (y + height)){
            return true;
        }
        return false;
    }
    else{
        images.push(image);
        return false;
    }
}

function mouseDownHandler(event){
    if(event.button === 0 && !penSelected){
        let canvas = offScreenCanvases.pop();
        offScreenCanvases.push(canvas);
        
        let mouseX = event.clientX - canvasBounds.left;
        let mouseY = event.clientY - canvasBounds.top;
        
        if(isMouseInImage(mouseX, mouseY)){
            let image = images.pop();
            image.offsetX = mouseX - image.drawX;;
            image.offsetY = mouseY - image.drawY;
            images.push(image);
        }
    }
}

function mouseMoveHandler(event){
    if(event.button === 0 && event.buttons === 1 && !penSelected){
        let canvas = offScreenCanvases.pop();
        offScreenCanvases.push(canvas);
        
        let mouseX = event.clientX - canvasBounds.left;
        let mouseY = event.clientY - canvasBounds.top;
        
        if(isMouseInImage(mouseX, mouseY)){
            let image = images.pop();
            image.drawX = mouseX - image.offsetX;
            image.drawY = mouseY - image.offsetY;
            images.push(image);
            
            translateImage();
        }
    }
    else if(event.button === 0 && event.buttons === 1 && penSelected){
        draw();
    }
}