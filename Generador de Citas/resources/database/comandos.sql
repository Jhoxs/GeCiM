/*Insertar Roles*/
INSERT INTO roles(id_rol,rol) VALUES '1',paciente;
INSERT INTO roles(rol) VALUES doctor;
INSERT INTO roles(rol) VALUES administrador;

/*buscar roles*/
SELECT usuario.cedula, roles.rol 
FROM usuario, rol_usuario, roles 
WHERE rol_usuario.id_usuario = usuario.cedula AND rol_usuario.id_rol = roles.id_rol AND usuario.cedula = "1709989352";


/*buscar turnos*/
SELECT tu.*,t.inicio_turno, t.fin_turno, td.dia_turno FROM turnos_usuarios AS tu, turnos AS t, turnos_dias AS td WHERE t.id_turno = td.id_turno AND  td.dia_turno = 'miercoles'  AND tu.fecha_consulta = '2022-01-21' AND tu.id_turno = t.id_turno

SELECT * FROM turnos_usuarios AS tu, turnos AS t WHERE tu.fecha_consulta = '2022-01-13' AND t.id_turno = tu.id_turno;