/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

//Importing functions
import {drawImage} from './modules/drawImage.js';
import {submitImage} from './submitImage.js';

export {renderCanvas};

//Starts rendering canvas when page is finished loading
window.addEventListener('load', renderCanvas);

document.getElementById('imageButton').addEventListener('click', submitImage);

//Canvas Setup
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

function renderCanvas(images){
    console.log(images);
    images.forEach(image => {
        drawImage(ctx, image, 0, 0, canvas.width, canvas.height);
    });
}
