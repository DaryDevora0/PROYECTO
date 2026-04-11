const Entrenador = require('../models/entrenador.model');

class EntrenadorController {
    // Obtener todos los Entrenadores
    static async obtenerEntrenadores(req, res) {
        try {
            const entrenadores = await Entrenador.obtenerEntrenadores();
            res.json(entrenadores);
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al obtener entrenadores",
                error: error.message
            });
        }
    }

    // Obtener por ID
    static async obtenerEntrenadorPorId(req, res) {
        try {
            const entrenador = await Entrenador.obtenerPorId(req.params.id);
            if (!entrenador) return res.status(404).json({ mensaje: "Entrenador no encontrado" });
            res.json(entrenador);
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al obtener entrenador",
                error: error.message
            });
        }
    }

    // Crear Entrenador
    static async crearEntrenador(req, res) {
        try {
            const nuevoEntrenador = await Entrenador.crear(req.body);
            res.status(201).json({
                mensaje: "Entrenador creado correctamente",
                data: nuevoEntrenador
            });
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al crear entrenador",
                error: error.message
            });
        }
    }

    // Actualizar Entrenador
    static async actualizarEntrenador(req, res) {
        try {
            const { id } = req.params;
            const actualizado = await Entrenador.actualizar(id, req.body);

            if (!actualizado) {
                return res.status(404).json({ mensaje: "Entrenador no encontrado" });
            }

            res.json({ mensaje: "Entrenador actualizado correctamente" });
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al actualizar entrenador",
                error: error.message
            });
        }
    }

    // Eliminar Entrenador
    static async eliminarEntrenador(req, res) {
        try {
            const eliminado = await Entrenador.eliminar(req.params.id);

            if (!eliminado) return res.status(404).json({ mensaje: "Entrenador no encontrado" });

            res.json({ mensaje: "Entrenador eliminado correctamente" });
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al eliminar entrenador",
                error: error.message
            });
        }
    }
}

module.exports = EntrenadorController;