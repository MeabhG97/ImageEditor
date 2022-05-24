/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
import {offScreenCanvases} from './RenderCanvas.js';
import {canvasNames} from './RenderCanvas.js';
import {renderCanvas} from './RenderCanvas.js';
import {CANVAS_WIDTH} from './RenderCanvas.js';
import {CANVAS_HEIGHT} from './RenderCanvas.js';

export {applyBrightness} ;

let brightnessFactor = 2; 
 function applyBrightness()
            {
                
                let workingCanvas = offScreenCanvases.pop()
                console.log(workingCanvas)
                let context = workingCanvas.getContext("2d")
              console.log(context)
               let imageData = context.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
              let data = imageData.data
                console.log(imageData)
                for (let i = 0; i < data.length; i += 4)
                {
                  data[i] *= brightnessFactor;
        data[i + 1] *= brightnessFactor;
        data[i + 2] *= brightnessFactor;
  
                }
context.putImageData(imageData, 0, 0)
                offScreenCanvases.push(workingCanvas)
                renderCanvas()
            }