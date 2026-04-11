const express = require('express');
const router = express.Router();
const entrenadorController = require('../controllers/entrenador.controllers');

router.get('/', entrenadorController.obtenerEntrenadores);          
router.get('/:id', entrenadorController.obtenerEntrenadorPorId);    
router.post('/', entrenadorController.crearEntrenador);             
router.put('/:id', entrenadorController.actualizarEntrenador);      
router.delete('/:id', entrenadorController.eliminarEntrenador);     

module.exports = router;