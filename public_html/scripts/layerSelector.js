/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

import {offScreenCanvases} from './RenderCanvas.js';
import {canvasNames} from './RenderCanvas.js';

export {layerMenu};

function layerMenu(){
    let layers = ``;
    let i = 0;
    
    offScreenCanvases.forEach(offSC => {
        layers += `<li class='layer'>
                        Layer ${canvasNames[i]}
                   </li>`;
        i++;
    });
    document.getElementById('layerList').innerHTML = layers;
}
