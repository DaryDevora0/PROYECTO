const { mysqlPool } = require('..//config/mysql');

class Entrenador {
    static async obtenerEntrenadores() {
        const [rows] = await mysqlPool.query(`
            SELECT 
                id_entrenador,
                id_usuarioFK,
                fechaNacimiento,
                fechaContrato,
                sueldo
            FROM entrenador
            ORDER BY id_entrenador ASC
        `);
        return rows;
    }

    static async obtenerPorId(id) {
        const [rows] = await mysqlPool.query(`
            SELECT 
                id_entrenador,
                id_usuarioFK,
                fechaNacimiento,
                fechaContrato,
                sueldo
            FROM entrenador
            WHERE id_entrenador = ?
        `, [id]);
        return rows[0] || null; 
    }

    // Crear Entrenador
    static async crear(data) {
        const { id_usuarioFK, fechaNacimiento, fechaContrato, sueldo } = data;

        const [result] = await mysqlPool.query(`
            INSERT INTO entrenador (id_usuarioFK, fechaNacimiento, fechaContrato, sueldo)
            VALUES (?, ?, ?, ?)
        `, [id_usuarioFK, fechaNacimiento, fechaContrato, sueldo]);

        return {
            id_entrenador: result.insertId,
            id_usuarioFK,
            fechaNacimiento,
            fechaContrato,
            sueldo
        };
    }

    // Actualizar Entrenador
    static async actualizar(id, data) {
        const [result] = await mysqlPool.query(`
            UPDATE entrenador SET ? WHERE id_entrenador = ?
        `, [data, id]);

        return result.affectedRows;
    }

    // Eliminar Entrenador
    static async eliminar(id) {
        const [result] = await mysqlPool.query(`
            DELETE FROM entrenador WHERE id_entrenador = ?
        `, [id]);

        return result.affectedRows;
    }
}

module.exports = Entrenador;