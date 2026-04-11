const Membresia = require('../models/membresia.model');

class MembresiaController {
    static async registrarMembresia(req, res){
        try {
            const {
                idCliente,
                idEntrenador,
                tipo,
                fechaInicio,
                fechaFin,
                estado,
                pagos,
                asistencias
            } = req.body;

            const nuevaMembresia = new Membresia({
                idCliente,
                idEntrenador,
                tipo,
                fechaInicio,
                fechaFin,
                estado,
                pagos,
                asistencias
            });

            const membresiaGuardada = await nuevaMembresia.save();

            res.status(201).json({
                mensaje: 'Membresia registrada correctamente',
                data: membresiaGuardada
            });
        }catch (error){
            res.status(500).json({
                mensaje: 'Error al registrar membresia',
                error : error.message
            });
        }
    }

    static async obtenerPorCliente(req, res){
        try{

            const {idCliente} = req.params;

            const Membresias = await Membresia.find({idCliente});

            res.status(200).json(
                {
                    data: Membresias
                }
            );
        } catch (error) {
            res.status(500).json({
                mensaje: 'Error al obtener membresia',
                error: error.message
            });
        }
    }
}

module.exports = MembresiaController;