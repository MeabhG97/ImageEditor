/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

import {offScreenCanvases} from './RenderCanvas.js';
import {canvasNames} from './RenderCanvas.js';
import {renderCanvas} from './RenderCanvas.js';

export {layerMenu};

function layerMenu(){
    let layers = ``;
    
    //Show top image layer at top of list
    for(let i = canvasNames.length - 1; i >= 0; i--){
        layers += `<li class='layer'>
                        <button type="button" class="layerButton">                        
                            Layer ${canvasNames[i]}
                        </button>
                   </li>`;
    }
    document.getElementById('layerList').innerHTML = layers;
    
    let buttons = Array.from(document.getElementsByClassName('layerButton'));
    buttons.forEach(button => {
        button.addEventListener('click', layerSwap.bind(button.innerHTML)); 
    });
}

function layerSwap(event){
    if(offScreenCanvases.length > 1){
        //Binding the innerHTML returned an event rather than the HTML
        const numberFilter = /\d/g;
        let layerNumbers = event.path[0].innerHTML.match(numberFilter);

        let layerName = '';
        layerNumbers.forEach(num => {
            layerName = layerName + num;
        });
        layerName = parseInt(layerName);
        
        let index = canvasNames.findIndex(name => {
            return name === layerName;
        });
        
        let canvas = offScreenCanvases[index];
        let name = canvasNames[index];
        
        offScreenCanvases.splice(index, 1);
        canvasNames.splice(index, 1);
        
        offScreenCanvases.push(canvas);
        canvasNames.push(name);
    }
    renderCanvas();
}
