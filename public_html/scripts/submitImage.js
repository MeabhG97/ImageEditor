/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

/* global URL */

import {renderCanvas} from './RenderCanvas.js';
import {offScreenCanvases} from './RenderCanvas.js';
import {canvasNames} from './RenderCanvas.js';
import {CANVAS_WIDTH} from './RenderCanvas.js';
import {CANVAS_HEIGHT} from './RenderCanvas.js';

export {submitImage};

function submitImage(e){
    if(e.target.files){
        //Get image file
        let imageFile = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onloadend = (e) => {
            //Convert image file to image object
            let image = new Image();
            image.src = e.target.result;
            image.onload = () => {
                //Create a new off screen canvas for the image
                let offSC = document.createElement('canvas');
                let offCTX = offSC.getContext('2d');
                offSC.width = CANVAS_WIDTH;
                offSC.height = CANVAS_HEIGHT;
                
                let imageWidth = image.naturalWidth;
                let imageHeight = image.naturalHeight;
                
                //Scaling image to fit on canvas, if needed
                if(imageWidth > offSC.width || imageHeight > offSC.height){
                    let imageRatio = imageWidth / imageHeight;
                    
                    if(imageWidth >= imageHeight){
                        imageWidth = offSC.width;
                        imageHeight = imageWidth / imageRatio;   
                    }
                    else{
                        imageHeight = offSC.height;
                        imageWidth = imageHeight * imageRatio;
                    }
                }
                
                offCTX.drawImage(image, 0, 0, imageWidth, imageHeight);
                offScreenCanvases.push(offSC);
                canvasNames.push(offScreenCanvases.length);
                renderCanvas();
            };
        };
    }
}
