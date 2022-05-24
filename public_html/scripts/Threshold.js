/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
import {offScreenCanvases} from './RenderCanvas.js';
import {canvasNames} from './RenderCanvas.js';
import {renderCanvas} from './RenderCanvas.js';
import {CANVAS_WIDTH} from './RenderCanvas.js';
import {CANVAS_HEIGHT} from './RenderCanvas.js';

export {applyThreshold} ;

            function applyThreshold()
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
        for (let rgb = 0; rgb < 3; rgb++)
        {
            if (data[i + rgb] < 128)
            {
                data[i + rgb] = 0;
            }
            else
            {
                data[i + rgb] = 255;
            }
        }
        data[i + 3] = 255;
    }
                context.putImageData(imageData, 0, 0)
                offScreenCanvases.push(workingCanvas)
                renderCanvas()
            }
            


