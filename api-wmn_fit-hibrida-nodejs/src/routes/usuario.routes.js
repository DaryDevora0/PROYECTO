const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuario.controller');
router.get('/', UsuarioController.obtenerUsuarios);  // todos
router.get('/:id', UsuarioController.obtenerUsuarioPorId); // uno por id
router.post('/', UsuarioController.crearUsuario);
router.put('/:id', UsuarioController.actualizarUsuario);
router.delete('/:id', UsuarioController.eliminarUsuario);


// login
router.post('/login', UsuarioController.login);
router.post('/logout', UsuarioController.logout);




module.exports = router;