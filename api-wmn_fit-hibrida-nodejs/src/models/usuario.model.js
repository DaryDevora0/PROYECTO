
const { mysqlPool } = require('../config/mysql');

class Usuario{
    //obtener todos los usuarios
    static async obtenerUsuarios(){
        const [rows] = await mysqlPool.query(`
            SELECT
                id_usuario,
                nombre,
                apellidos,
                userName,
                correo,
                telefono,
                contrasenia,
                rol
            FROM usuario
            ORDER BY id_usuario asc
        `);
        return rows;
    }


        static async obtenerPorId(id) {
        const [rows] = await mysqlPool.query(`
            SELECT id_usuario, nombre, apellidos, userName, correo, telefono, contrasenia, rol
            FROM usuario
            WHERE id_usuario = ?
        `, [id]);
        return rows[0]; 
    }



    //crear usuario
    static async crear(data){
    const {
        nombre,
        apellidos,
        userName,
        correo,
        telefono,
        contrasenia,
        rol = 'consulta'
    } = data;

    const [result] = await mysqlPool.query(`
        INSERT INTO usuario(
            nombre,
            apellidos,
            userName,
            correo,
            telefono,
            contrasenia,
            rol
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [nombre, apellidos, userName, correo, telefono, contrasenia, rol]);

    return {
        id_usuario: result.insertId,
        nombre,
        apellidos,
        userName,
        correo,
        telefono,
        rol
    };

   

}

 static async actualizar(id,data){
        const [result] = await mysqlPool.query(`UPDATE usuario SET ? WHERE id_usuario=?`,[data,id]);
        return result.affectedRows;
    }


      static async eliminar(id){
        const [result] = await mysqlPool.query(`DELETE FROM usuario WHERE id_usuario=?`,[id]);
        return result.affectedRows;
    }

    




}

module.exports = Usuario;
