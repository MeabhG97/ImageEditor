/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

//Importing functions
import {drawImage} from './modules/drawImage.js';
import {submitImage} from './submitImage.js';

export {renderCanvas, offScreenCanvases, CANVAS_WIDTH, CANVAS_HEIGHT};

//Starts rendering canvas when page is finished loading
window.addEventListener('load', renderCanvas);

document.getElementById('imageForm').addEventListener('change', submitImage);

//Canvas Setup
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

let offScreenCanvases = [];

function renderCanvas(){
    offScreenCanvases.forEach(offSC => {
        ctx.drawImage(offSC, 0, 0);
    });
        
}
