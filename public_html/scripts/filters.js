/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

            let canvas = null
            let offscreenCanvas;
            let offscreenCanvasCtx;
            let ctx = null
            let width = null
            let height = null
            let  originalImage = new Image()
                originalImage.src = "images/original.jpg"
            let imageData = null
            let data = null



    
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

            window.onload = onAllAssetsLoaded
            document.write("<div id='loadingMessage'>Loading...</div>")
            
            
       function onAllAssetsLoaded()
            {
                document.getElementById('loadingMessage').style.visibility = "hidden"

               canvas = document.getElementById('screenCanvas');
           
                canvas = document.getElementById('canvas')
                ctx = canvas.getContext('2d')
                width = originalImage.clientWidth
                height = originalImage.clientHeight
                width =canvas.width
                height = canvas.height
                
                offscreenCanvas = document.createElement('canvas');
                offscreenCanvasCtx = offscreenCanvas.getContext('2d');
                off_width = offscreenCanvas.width;
                off_height = offscreenCanvas.height ;

                renderCanvas()
            }


            function applyFilter()
            {
                offscreenCanvasCtx.drawImage(originalImage, 0, 0, width, height)
                imageData = offscreenCanvasCtx.getImageData(0, 0, width, height)
                data = imageData.data

                for (let i = 0; i < data.length; i += 4)
                {
                    red = data[i]
                    green = data[i + 1]
                    blue = data[i + 2]

                    data[i] = (red * 0.393) + (green * 0.769) + (blue * 0.189)
                    data[i + 1] = (red * 0.349) + (green * 0.686) + (blue * 0.168)
                    data[i + 2] = (red * 0.272) + (green * 0.534) + (blue * 0.131)
                }

                offscreenCanvasCtx.putImageData(imageData, 0, 0)
                renderCanvas()
            }
            
             function renderCanvas()
             {
                // applyFilter()
                ctx.drawImage(originalImage, 0,0, width, height)
                 ctx.drawImage(offscreenCanvas, 0, 0, width, height) 
             }
        