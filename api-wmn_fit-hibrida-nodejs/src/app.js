const express = require('express');
const cors = require('cors');
const app = express();

const usuarioRoutes = require('./routes/usuario.routes'); 

const membresiaRoutes = require('./routes/membresia.routes');



// Middlewares primero
app.use(cors());
app.use(express.json());



// Rutas

app.use('/membresia', membresiaRoutes);
app.use('/usuario', usuarioRoutes); 


app.get('/', (req, res) => {
    res.json({
        mensaje: 'API de GYM híbrido funciona correctamente'
    });
});

module.exports = app;















