const { Router } = require('express');
const router = Router();

const imagenController = require('../controllers/imagen.controller');

router.get('/', (req, res) => {
    res.render('index.html');
});

router.post('/upload', imagenController.upload);


module.exports = router;