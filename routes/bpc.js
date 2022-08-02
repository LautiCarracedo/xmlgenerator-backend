//Rutas para BPC
const express = require('express');
const router = express.Router();

const xmlBPController = require('../controllers/bpcController')


//Cuando el user venga a la ruta /api/bpc y sea un post
router.get('/', xmlBPController.obtenerExtraccionValoresBPC)
router.get('/:origen/:campo', xmlBPController.obtenerExtraccionValorBPC)
router.post('/', xmlBPController.crearXMLBPC)
router.put('/:origen/:campo', xmlBPController.updateExtraccionValoresBPC)

module.exports = router;