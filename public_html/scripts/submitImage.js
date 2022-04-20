/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

/* global URL */

import {renderCanvas} from './RenderCanvas.js';

export {images, submitImage};

const images = [];

function submitImage(){
    const input = document.getElementById('inputImage');
    const inputArr = [...input.files];
    inputArr.forEach(file => {
        let image = new Image();
        image.src = URL.createObjectURL(file);
        images.push(image);
    });
    console.log(images);
    renderCanvas(images);
}
