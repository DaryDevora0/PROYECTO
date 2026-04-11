const HorarioEntrenador = require('../models/horarioEntrenador.model');

class HorarioEntrenadorController {
    static async obtenerHorarios(req, res) {
        try {
            const horarios = await HorarioEntrenador.obtenerHorarios();
            res.json(horarios);
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al obtener horarios",
                error: error.message
            });
        }
    }

    static async obtenerHorarioPorEntrenador(req, res) {
        try {
            const id_entrenadorFK = req.params.id;
            const horarios = await HorarioEntrenador.obtenerPorEntrenador(id_entrenadorFK);

            if (horarios.length === 0) return res.status(404).json({ mensaje: "No hay horarios para este entrenador" });

            res.json(horarios);
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al obtener horarios",
                error: error.message
            });
        }
    }

static async crearHorario(req, res) {
    try {
        const data = req.body;
        const horarios = Array.isArray(data) ? data : [data];

        const creados = await HorarioEntrenador.crearVarios(horarios);

        res.status(201).json({
            mensaje: "Horarios creados correctamente",
            data: creados
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al crear horarios",
            error: error.message
        });
    }
}

    static async actualizarHorario(req, res) {
        try {
            const { id } = req.params;
            const actualizado = await HorarioEntrenador.actualizar(id, req.body);

            if (!actualizado) {
                return res.status(404).json({ mensaje: "Horario no encontrado" });
            }

            res.json({ mensaje: "Horario actualizado correctamente" });
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al actualizar horario",
                error: error.message
            });
        }
    }
  
    static async eliminarHorario(req, res) {
        try {
            const eliminado = await HorarioEntrenador.eliminar(req.params.id);

            if (!eliminado) return res.status(404).json({ mensaje: "Horario no encontrado" });

            res.json({ mensaje: "Horario eliminado correctamente" });
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al eliminar horario",
                error: error.message
            });
        }
    }
}

module.exports = HorarioEntrenadorController;