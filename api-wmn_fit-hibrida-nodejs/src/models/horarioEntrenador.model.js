const { mysqlPool } = require('../config/mysql');

class HorarioEntrenador {
    static async obtenerHorarios() {
        const [rows] = await mysqlPool.query(`
            SELECT 
                id_horario,
                dia,
                horaInicio,
                horaFin,
                id_entrenadorFK
            FROM horario_entrenador
            ORDER BY id_horario ASC
        `);
        return rows;
    }

        static async obtenerPorEntrenador(id_entrenadorFK) {
        const [rows] = await mysqlPool.query(`
            SELECT id_horario, dia, horaInicio, horaFin, id_entrenadorFK
            FROM horario_entrenador
            WHERE id_entrenadorFK = ?
            ORDER BY dia, horaInicio
        `, [id_entrenadorFK]);

        return rows;
    }


    static async crearVarios(horarios) {
        const horariosCreados = [];

        for (const h of horarios) {
            const { dia, horaInicio, horaFin, id_entrenadorFK } = h;
            const [result] = await mysqlPool.query(`
                INSERT INTO horario_entrenador (dia, horaInicio, horaFin, id_entrenadorFK)
                VALUES (?, ?, ?, ?)
            `, [dia, horaInicio, horaFin, id_entrenadorFK]);

            horariosCreados.push({
                id_horario: result.insertId,
                dia,
                horaInicio,
                horaFin,
                id_entrenadorFK
            });
        }

        return horariosCreados;
    }

    static async actualizar(id, data) {
        const [result] = await mysqlPool.query(`
            UPDATE horario_entrenador SET ? WHERE id_horario = ?
        `, [data, id]);

        return result.affectedRows;
    }


    static async eliminar(id) {
        const [result] = await mysqlPool.query(`
            DELETE FROM horario_entrenador WHERE id_horario = ?
        `, [id]);

        return result.affectedRows;
    }
}

module.exports = HorarioEntrenador;