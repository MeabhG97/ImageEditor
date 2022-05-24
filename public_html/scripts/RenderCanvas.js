import {submitImage} from './submitImage.js';
import {layerMenu} from './layerSelector.js';
import {applySepia} from './Sepia.js';
import {applyBrightness} from './Brightness.js';
import {applyGreyscale} from './Greyscale.js';
import {applyInvert} from './Invert.js';
import {applyPosterise} from './Posterise.js';
import {applyThreshold} from './Threshold.js';
import {applyGlobal} from './GlobalComp.js';
import {applyComp} from './Comp1.js';


export {renderCanvas, offScreenCanvases, canvasNames, 
    CANVAS_WIDTH, CANVAS_HEIGHT};

let CANVAS_WIDTH;
let CANVAS_HEIGHT;
let offScreenCanvases;
let canvasNames;

let canvas;
let ctx;

//Setup when page is loaded
window.onload = () => {
    //Event Listenters
    document.getElementById('imageForm').addEventListener('change', submitImage);
    document.getElementById('canvas').addEventListener('contextmenu', canvasToImage);
     document.getElementById('sepia').addEventListener('click', applySepia);
      document.getElementById('brightness').addEventListener('click', applyBrightness);
      document.getElementById('greyscale').addEventListener('click', applyGreyscale);
      document.getElementById('invert').addEventListener('click', applyInvert);
      document.getElementById('posterise').addEventListener('click', applyPosterise);
      document.getElementById('threshold').addEventListener('click', applyThreshold);
       document.getElementById('global').addEventListener('click', applyGlobal);
        document.getElementById('comp').addEventListener('click', applyComp);
    
    
    //Canvas Setup
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    CANVAS_WIDTH = canvas.width;
    CANVAS_HEIGHT = canvas.height;
    
    offScreenCanvases = [];
    canvasNames = [];
    
    //White background canvas
    let offSC = document.createElement('canvas');
    let offCTX = offSC.getContext('2d');
    offSC.width = CANVAS_WIDTH;
    offSC.height = CANVAS_HEIGHT;
    
    offCTX.fillStyle = `rgb(255, 255, 255)`;
    offCTX.fillRect(0, 0, offSC.width, offSC.height);
    offScreenCanvases.push(offSC);
    canvasNames.push(offScreenCanvases.length);
    
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

