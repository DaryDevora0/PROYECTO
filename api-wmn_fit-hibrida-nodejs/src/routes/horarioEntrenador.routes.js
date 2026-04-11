const express = require('express');
const router = express.Router();
const horarioEntrenadorController = require('../controllers/horarioEntrenador.controller');

// Rutas para HorarioEntrenador
router.get('/', horarioEntrenadorController.obtenerHorarios);         
router.get('/:id', horarioEntrenadorController.obtenerHorarioPorEntrenador);    
router.post('/', horarioEntrenadorController.crearHorario);            
router.put('/:id', horarioEntrenadorController.actualizarHorario);     
router.delete('/:id', horarioEntrenadorController.eliminarHorario);     

module.exports = router;