const { mysqlPool } = require('../config/mysql');

class Cliente {
    // Obtener todos los clientes
    static async obtenerClientes() {
        const [rows] = await mysqlPool.query(`
            SELECT 
                id_cliente,
                id_usuarioFK,
                direccion
            FROM cliente
            ORDER BY id_cliente ASC
        `);
        return rows;
    }

    // Obtener cliente por id
    static async obtenerPorId(id) {
        const [rows] = await mysqlPool.query(`
            SELECT 
                id_cliente,
                id_usuarioFK,
                direccion
            FROM cliente
            WHERE id_cliente = ?
        `, [id]);
        return rows[0] || null; // si no existe, devuelve null
    }

    // Crear cliente
    static async crear(data) {
        const { id_usuarioFK, direccion } = data;

        const [result] = await mysqlPool.query(`
            INSERT INTO cliente (id_usuarioFK, direccion)
            VALUES (?, ?)
        `, [id_usuarioFK, direccion]);

        return {
            id_cliente: result.insertId,
            id_usuarioFK,
            direccion
        };
    }

    // Actualizar cliente
    static async actualizar(id, data) {
        const [result] = await mysqlPool.query(`
            UPDATE cliente SET ? WHERE id_cliente = ?
        `, [data, id]);

        return result.affectedRows;
    }

    // Eliminar cliente
    static async eliminar(id) {
        const [result] = await mysqlPool.query(`
            DELETE FROM cliente WHERE id_cliente = ?
        `, [id]);

        return result.affectedRows;
    }
}

module.exports = Cliente;