/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


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
