//Rutas para Entes Varios
const express = require('express');
const router = express.Router();

const xmlEntesVariosController = require('../controllers/entesVariosController')


//Cuando el user venga a la ruta /updateEntes y sea un post
router.get('/:origen/:nroEnte', xmlEntesVariosController.obtenerEnteSeleccionado)
router.post('/', xmlEntesVariosController.updateEntes)

module.exports = router;
