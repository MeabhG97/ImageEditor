/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
import {offScreenCanvases} from './RenderCanvas.js';
import {canvasNames} from './RenderCanvas.js';
import {renderCanvas} from './RenderCanvas.js';
import {CANVAS_WIDTH} from './RenderCanvas.js';
import {CANVAS_HEIGHT} from './RenderCanvas.js';

export {applySepia} ;

            function applySepia()
            {
                console.log("ho")
                let workingCanvas = offScreenCanvases.pop()
                console.log(workingCanvas)
                let context = workingCanvas.getContext("2d")
              console.log(context)
               let imageData = context.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
              let data = imageData.data
                console.log(imageData)
                for (let i = 0; i < data.length; i += 4)
                {
                   let red = data[i]
                   let green = data[i + 1]
                  let  blue = data[i + 2]

                    data[i] = (red * 0.393) + (green * 0.769) + (blue * 0.189)
                    data[i + 1] = (red * 0.349) + (green * 0.686) + (blue * 0.168)
                    data[i + 2] = (red * 0.272) + (green * 0.534) + (blue * 0.131)
                }
                context.putImageData(imageData, 0, 0)
                offScreenCanvases.push(workingCanvas)
                renderCanvas()
            }
            
            
