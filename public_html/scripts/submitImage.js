/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

/* global URL */

import {renderCanvas} from './RenderCanvas.js';
import {offScreenCanvases} from './RenderCanvas.js';
import {CANVAS_WIDTH} from './RenderCanvas.js';
import {CANVAS_HEIGHT} from './RenderCanvas.js';

export {submitImage};

function submitImage(e){
    if(e.target.files){
        let imageFile = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(imageFile);
        console.log(reader);
        reader.onloadend = (e) => {
            let image = new Image();
            image.src = e.target.result;
            image.onload = () => {
                let offSC = document.createElement('canvas');
                let offSCctx = offSC.getContext('2d');
                offSC.width = CANVAS_WIDTH;
                offSC.height = CANVAS_HEIGHT;
                offSCctx.drawImage(image, 0, 0, offSC.width, offSC.height);
                offScreenCanvases.push(offSC);
                renderCanvas();
            };
        };
    }
}
