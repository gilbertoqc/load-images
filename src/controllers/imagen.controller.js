const fs = require('fs');
const mime = require('mime');

const imagenController = {};

imagenController.upload = async(req, res) => {    
    try {
        const imgBase64 = req.body.attachment;        
        const matches = imgBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        const response = {};

        if (matches.length !== 3) {
            return res.render('error.html', { msgError: 'Archivo inválido' });
        }        

        response.type = matches[1];
        response.data = new Buffer.from(matches[2], 'base64');        
        const extension = mime.getExtension(response.type);

        const validExtensions = ['jpg','jpeg','png'];
        if (validExtensions.indexOf(extension) < 0) {
            return res.render('error.html', { msgError: 'Archivo inválido' });
        }

        const fileName = 'image-' + new Date().getTime().toString() + '.' + extension;
        console.log(fileName);

        fs.writeFileSync(`./public/images/uploads/${fileName}`, response.data, (error) => {
            if (error) {
                res.render('error.html', { msgError: error });
            }
        });
        
        res.render('uploaded.html', { imgUploaded: imgBase64 });

    } catch (error) {
        res.render('error.html', { msgError: error.message });
    }
}

module.exports = imagenController;