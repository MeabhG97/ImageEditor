/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

//Importing functions
import {submitImage} from './submitImage.js';
import {layerMenu} from './layerSelector.js';
import {mouseDownHandler} from './imageTransFormations.js';
import {mouseMoveHandler} from './imageTransFormations.js';
import {rotateImage} from './imageTransFormations.js';
import {scaleImage} from './imageTransFormations.js';

import {applySepia} from './Sepia.js';
import {applyBrightness} from './Brightness.js';
import {applyGreyscale} from './Greyscale.js';
import {applyInvert} from './Invert.js';
import {applyPosterise} from './Posterise.js';
import {applyThreshold} from './Threshold.js';

export {renderCanvas, offScreenCanvases, canvasNames, images,
    CANVAS_WIDTH, CANVAS_HEIGHT, penSelected, penColor, penSize, canvasBounds};

let CANVAS_WIDTH;
let CANVAS_HEIGHT;
let canvasBounds;
let offScreenCanvases;
let canvasNames;
let images;

let canvas;
let ctx;

let penSelected;
let penColor;
let penSize;

//Setup when page is loaded
window.onload = () => {
    //Event Listenters
    document.getElementById('imageForm').addEventListener('change', submitImage);
    document.getElementById('canvas').addEventListener('contextmenu', canvasToImage);
    document.getElementById('canvas').addEventListener('mousedown', mouseDownHandler);
    document.getElementById('canvas').addEventListener('mousemove', mouseMoveHandler);
    document.getElementById('rotateSlider').addEventListener('change', rotateImage);
    document.getElementById('canvas').addEventListener('wheel', scaleImage);
    document.getElementById('penSelect').addEventListener('click', penSelect);
    document.getElementById('penColor').addEventListener('change', penColorSelect);
    document.getElementById('penSize').addEventListener('change', penSizeSelect);
    
    document.getElementById('sepia').addEventListener('click', applySepia);
    document.getElementById('brightness').addEventListener('click', applyBrightness);
    document.getElementById('greyscale').addEventListener('click', applyGreyscale);
    document.getElementById('invert').addEventListener('click', applyInvert);
    document.getElementById('posterise').addEventListener('click', applyPosterise);
    document.getElementById('threshold').addEventListener('click', applyThreshold);

    //Canvas Setup
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    CANVAS_WIDTH = canvas.width;
    CANVAS_HEIGHT = canvas.height;
    
    canvasBounds = canvas.getBoundingClientRect();
    
    offScreenCanvases = [];
    canvasNames = [];
    images = [];
    
    //White background canvas
    let offSC = document.createElement('canvas');
    let offCTX = offSC.getContext('2d');
    offSC.width = CANVAS_WIDTH;
    offSC.height = CANVAS_HEIGHT;
    
    offCTX.fillStyle = `rgb(255, 255, 255)`;
    offCTX.fillRect(0, 0, offSC.width, offSC.height);
    offScreenCanvases.push(offSC);
    canvasNames.push(offScreenCanvases.length);
    
    let image = new Image();
    images.push(image);
    
    penSelected = false;
    penColor = `rgb(0, 0, 0)`;
    penSize = 10;
    
    renderCanvas();
};

function renderCanvas(){
    layerMenu();
    offScreenCanvases.forEach(offSC => {
        ctx.drawImage(offSC, 0, 0);
    });
}

function canvasToImage(){
    let dataURL = canvas.toDataURL();
    document.getElementById('canvasImage').src = dataURL;
}

function penSelect(){
    penSelected = !penSelected;
}

function penColorSelect(){
    penColor = document.getElementById('penColor').value;
}

function penSizeSelect(){
    penSize = document.getElementById('penSize').value * 10;
}