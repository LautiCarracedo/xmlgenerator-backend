//Rutas para Entes Varios
const express = require('express');
const router = express.Router();

const xmlEntesVariosController = require('../controllers/entesVariosController')


//Cuando el user venga a la ruta /entesVarios y sea un post
router.get('/', xmlEntesVariosController.obtenerEntesCargados)
router.post('/', xmlEntesVariosController.crearXMLEnte)

module.exports = router;