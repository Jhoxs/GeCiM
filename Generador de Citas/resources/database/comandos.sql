/*Insertar Roles*/
INSERT INTO roles(id_rol,rol) VALUES '1',paciente;
INSERT INTO roles(rol) VALUES doctor;
INSERT INTO roles(rol) VALUES administrador;

/*buscar roles*/
SELECT usuario.cedula, roles.rol 
FROM usuario, rol_usuario, roles 
WHERE rol_usuario.id_usuario = usuario.cedula AND rol_usuario.id_rol = roles.id_rol AND usuario.cedula = "1709989352";