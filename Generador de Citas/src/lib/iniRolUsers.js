const iniciadorRoles = {};
const pool = require("../database");

iniciadorRoles.iniciar = async () => {
  try {
    const row = await pool.query("SELECT * FROM roles");
    if (row.length)
      return console.log("la base de datos ya tiene roles asignados");

    //Si no existen crea los tres roles
    const values = await Promise.all([
      pool.query("INSERT INTO roles (id_rol,rol) VALUES (?,?)", [
        "1",
        "paciente",
      ]),
      pool.query("INSERT INTO roles (id_rol,rol) VALUES (?,?)", [
        "2",
        "doctor",
      ]),
      pool.query("INSERT INTO roles (id_rol,rol) VALUES (?,?)", [
        "3",
        "administrador",
      ]),
    ]);

    console.log(values);
  } catch (error) {
    console.log(error);
  }
  //verifica si existen roles
};

module.exports = iniciadorRoles;
