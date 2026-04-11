const mongoose = require('mongoose');

const pagoSchema = new mongoose.Schema(
    {
        fechaPago: {type: Date, required: true},
        metodoPago: {type: String, required: true}, //efectivo o tarjeta
        monto: {type: Number, required: true}
    }
);

const asistenciaSchema = new mongoose.Schema(
    {
        fechaAsistencia: {type: Date, required: true},
        horaEntrada: {type: String, required: true},
        horaSalida: {type: String, required: true}
    }
);

const membresiaSchema = new mongoose.Schema(
    {
        idCliente: {type: String, required: true},
        idEntrenador: {type: String, required:true}, //CAMBIAR A FALSO 
        tipo: {type: String, required: true},
        fechaInicio: {type: Date, required:true},
        fechaFin: {type: Date, required:true},
        estado: {type: String, required: true},
        pagos: [pagoSchema],
        asistencias: [asistenciaSchema]
    },
    { collection: 'Membresias'}
);

module.exports = mongoose.model('Membresia', membresiaSchema);