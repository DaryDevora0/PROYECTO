const express = require('express');
const router = express.Router();
const MembresiaController = require('../controllers/membresia.controller');

router.post('/', MembresiaController.registrarMembresia);
router.get('/:idCliente', MembresiaController.obtenerPorCliente);

module.exports = router;



