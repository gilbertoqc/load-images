
// Seleccionar imagen
const imgInput = document.querySelector('#imgInput');
const imgDisplay = document.querySelector('#imgDisplay');
const attachment = document.querySelector('#attachment');

imgInput.addEventListener('change', async(evt) => {
    
    const imgFile = evt.target.files[0];
    const img64 = await imgBase64(imgFile);
    attachment.setAttribute('value', img64);
    imgDisplay.src = img64;  

});

// Muestra y convierte el archivo seleccionado en formato base64
const imgBase64 = (file) => new Promise((resolve, reject) => {    

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);

});

// Captura de imagen desde la cámara
const formCaptureImg = document.getElementById('formCaptureImg');
const modalCaptureImg = new bootstrap.Modal(formCaptureImg, { keyboard: false });

formCaptureImg.addEventListener('shown.bs.modal', (evt) => {

    webCamController();

});

const webCamController = () => {

    const video = document.querySelector('#videoWebCam'),
        canvas = document.querySelector('#canvasWebCam'),
        btnCapture = document.querySelector('#btnCapture');
    let streaming = false,
        width = 320,
        height = 240;

    // Acceso a la webcam del cliente
    navigator.mediaDevices.getUserMedia({        
        video: true,
        audio: false
    }).then((stream) => {

        video.srcObject = stream;
        video.play();
    
    }).catch((err) => {
        
        console.log("A ocurrido un error: " + err);

    });

    video.addEventListener('canplay', (evt) => {
        
        if (!streaming) {
            height = video.videoHeight / (video.videoWidth / width);

            if (isNaN(height)) {
                height = width / (4 / 3);
            }

            video.setAttribute('width', width);
            video.setAttribute('height', height);
            canvas.setAttribute('width', width);
            canvas.setAttribute('height', height);
            streaming = true;
        }

    }, false);

    const takePicture = () => {

        const context = canvas.getContext('2d');
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);

            const data = canvas.toDataURL('image/png');
            imgDisplay.setAttribute('src', data);
            attachment.setAttribute('value', data);
        } else {
            clearPicture();
        }

    }

    const clearPicture = () => {

        const context = canvas.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);

        const data = canvas.toDataURL('image/png');
        imgDisplay.setAttribute('src', data);

    }

    btnCapture.addEventListener('click', (evt) => {

        takePicture();
        modalCaptureImg.hide();
        evt.preventDefault();

    }, false);

}

const btnSubmit = document.querySelector('#btnSubmit');
btnSubmit.addEventListener('click', (evt) => {

    const formUploadImg = document.querySelector('#formUploadImg');
    formUploadImg.submit();
    
});