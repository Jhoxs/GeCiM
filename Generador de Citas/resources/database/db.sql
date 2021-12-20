CREATE DATABASE GECIM;
DROP TABLE IF EXISTS usuario;
CREATE TABLE usuario(
    /*La sintaxis para crear una tabla es
      "NombreTupla"-"Tipo de dato"-"Longitud"*/
    nombre varchar(30) NOT NULL,
    apellido varchar(30) NOT NULL,
    cedula int (10) NOT NULL,
    correo varchar(30) NOT NULL UNIQUE, /*el correo debe de ser unico*/
    telefono int (10) NOT NULL,
    clave varchar(30) NOT NULL,
    /*fecha nacimiento*/
    nacimiento date NOT NULL,
    /*Llave primaria*/
    PRIMARY KEY (cedula)
);

DROP TABLE IF EXISTS roles;
CREATE TABLE roles(
  id_rol int(10) NOT NULL AUTO_INCREMENT,
  rol varchar(10) NOT NULL,
  /*Llave primaria*/
    PRIMARY KEY (id_rol)
);

DROP TABLE IF EXISTS rol_Usuario;
CREATE TABLE  rol_Usuario(
  id_rolUsuario int (4) NOT NULL AUTO_INCREMENT,
  id_usuario int (10) NOT NULL,
  id_rol int(4) NOT NULL,
  /*Llave primaria*/
  PRIMARY KEY (id_rolUsuario),
  /*Llaves foraneas*/
  CONSTRAINT rolUsuario_Fk1 FOREIGN KEY (id_usuario) REFERENCES usuario (cedula),
  CONSTRAINT rolUsuario_Fk2 FOREIGN KEY (id_rol) REFERENCES roles (id_rol)
);


DROP TABLE IF EXISTS funcionalidades;
CREATE TABLE funcionalidades(
  id_funcionalidad int(4) NOT NULL AUTO_INCREMENT,
  funcionalidad varchar(20),
  /*Llave primaria*/
  PRIMARY KEY (id_funcionalidad)
);

DROP TABLE IF EXISTS rol_funcionalidades;
CREATE TABLE rol_funcionalidades(
  id_rolFuncionalidad int (4) NOT NULL AUTO_INCREMENT,
  id_rolUsuario int (4) NOT NULL,
  id_funcionalidad int (4) NOT NULL,
  /*Llave primaria*/
  PRIMARY KEY (id_rolFuncionalidad),
  /*Llaves foraneas*/
  CONSTRAINT rolFuncionalidad_Fk1 FOREIGN KEY (id_rolUsuario) REFERENCES rol_Usuario(id_rolUsuario),
  CONSTRAINT rolFuncionalidad_Fk2 FOREIGN KEY (id_funcionalidad) REFERENCES funcionalidades(id_funcionalidad)
);

DROP TABLE IF EXISTS turnos;
CREATE TABLE turnos(
  id_turno int(4) NOT NULL AUTO_INCREMENT,
  dia_turno int(2) NOT NULL UNIQUE,
  mes_turno int(2) NOT NULL UNIQUE,
  anio_turno int(4) NOT NULL UNIQUE,
  /*Llave primaria*/
  PRIMARY KEY (id_turno)
);

DROP TABLE IF EXISTS turnos_usuarios;
CREATE TABLE turnos_usuarios(
  id_turnoUsuario int(4) NOT NULL AUTO_INCREMENT,
  id_usuario int(4) NOT NULL,
  id_turno int(4) NOT NULL,
  /*Llave primaria*/
  PRIMARY KEY (id_turnoUsuario),
  /*Llave secundaria*/
  CONSTRAINT turnoUsuario_Fk1 FOREIGN KEY (id_usuario) REFERENCES usuario(cedula),
  CONSTRAINT turnoUsuario_Fk2 FOREIGN KEY (id_turno) REFERENCES turnos(id_turno)
);