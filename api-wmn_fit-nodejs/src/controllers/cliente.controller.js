const Cliente = require('../models/cliente.model');

class ClienteController {
    // Obtener todos los clientes
    static async obtenerClientes(req, res) {
        try {
            const clientes = await Cliente.obtenerClientes();
            res.json(clientes);
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al obtener clientes",
                error: error.message
            });
        }
    }

    // Obtener cliente por ID
    static async obtenerClientePorId(req, res) {
        try {
            const cliente = await Cliente.obtenerPorId(req.params.id);
            if (!cliente) return res.status(404).json({ mensaje: "Cliente no encontrado" });
            res.json(cliente);
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al obtener cliente",
                error: error.message
            });
        }
    }

    // Crear cliente
    static async crearCliente(req, res) {
        try {
            const nuevoCliente = await Cliente.crear(req.body);
            res.status(201).json({
                mensaje: "Cliente creado correctamente",
                data: nuevoCliente
            });
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al crear cliente",
                error: error.message
            });
        }
    }

    // Actualizar cliente
    static async actualizarCliente(req, res) {
        try {
            const { id } = req.params;
            const actualizado = await Cliente.actualizar(id, req.body);

            if (!actualizado) {
                return res.status(404).json({ mensaje: "Cliente no encontrado" });
            }

            res.json({ mensaje: "Cliente actualizado correctamente" });
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al actualizar cliente",
                error: error.message
            });
        }
    }

    // Eliminar cliente
    static async eliminarCliente(req, res) {
        try {
            const eliminado = await Cliente.eliminar(req.params.id);

            if (!eliminado) return res.status(404).json({ mensaje: "Cliente no encontrado" });

            res.json({ mensaje: "Cliente eliminado correctamente" });
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al eliminar cliente",
                error: error.message
            });
        }
    }
}

module.exports = ClienteController;