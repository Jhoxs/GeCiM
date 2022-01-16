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
    clave varchar(60) NOT NULL, /*el tamaño crece debido a que esta se codifica*/
    /*fecha nacimiento*/
    nacimiento date NOT NULL,
    sexo varchar(15) NOT NULL,
    /*Llave primaria*/
    PRIMARY KEY (cedula)
);

DROP TABLE IF EXISTS roles;
CREATE TABLE roles(
  id_rol int(10) NOT NULL AUTO_INCREMENT,
  rol varchar(15) NOT NULL,
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

DROP TABLE IF EXISTS turnos;
CREATE TABLE turnos(
  id_turno int(4) NOT NULL AUTO_INCREMENT,
  inicio_turno time NOT NULL UNIQUE,
  fin_turno time NOT NULL UNIQUE,
  /*Llave primaria*/
  PRIMARY KEY (id_turno)
);

DROP TABLE IF EXISTS turnos_dias;
CREATE TABLE turnos_dias(
  id_turnoDias int(4) NOT NULL AUTO_INCREMENT,
  dia_turno varchar(15) NOT NULL,
  id_turno int(4) NOT NULL,
  /*Llave primaria*/
  PRIMARY KEY (id_turnoDias),
  /*Llave foranea*/
  CONSTRAINT turnoDias_Fk1 FOREIGN KEY (id_turno) REFERENCES turnos(id_turno)
);
ALTER TABLE `turnos_dias` DROP FOREIGN KEY `turnoDias_Fk1`; 
ALTER TABLE `turnos_dias` ADD CONSTRAINT `turnoDias_Fk1` FOREIGN KEY (`id_turno`) REFERENCES `turnos`(`id_turno`) ON DELETE CASCADE ON UPDATE CASCADE;

DROP TABLE IF EXISTS turnos_usuarios;
CREATE TABLE turnos_usuarios(
  id_turnoUsuario int(4) NOT NULL AUTO_INCREMENT,
  id_usPac int(4) NOT NULL UNIQUE, /*Solo debe haber un turno por paciente*/
  id_usDoc int(4) NOT NULL, 
  id_turno int(4) NOT NULL,
  fecha_consulta date NOT NULL,
  /*Llave primaria*/
  PRIMARY KEY (id_turnoUsuario),
  /*Llave secundaria*/
  CONSTRAINT turnoUsuario_Fk1 FOREIGN KEY (id_usPac) REFERENCES usuario(cedula),
  CONSTRAINT turnoUsuario_Fk2 FOREIGN KEY (id_usDoc) REFERENCES usuario(cedula),
  CONSTRAINT turnoUsuario_Fk3 FOREIGN KEY (id_turno) REFERENCES turnos(id_turno)
);


/*Cambios el las llaves foraneas*/
ALTER TABLE `rol_usuario` DROP FOREIGN KEY `rolUsuario_Fk1`; 
ALTER TABLE `rol_usuario` ADD CONSTRAINT `rolUsuario_Fk1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario`(`cedula`) ON DELETE CASCADE ON UPDATE CASCADE;


/*-------tablas en desuso-------(IGNORAR)*/ 
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


/*PROTOTIPO*/
DROP TABLE IF EXISTS dias;
CREATE TABLE dias(
  id_dias int(4) NOT NULL AUTO_INCREMENT,
  dias_semana varchar(15) NOT NULL,
  PRIMARY KEY (id_dias)
);
/* Nueva tabla intermedia*/
DROP TABLE IF EXISTS turnos_dias;
CREATE TABLE turnos_dias(
  id_turnoDias int(4) NOT NULL AUTO_INCREMENT,
  id_turno int(4) NOT NULL,
  id_dias int(4) NOT NULL,
  /*Llave primaria*/
  PRIMARY KEY (id_turnoDias),
  /*Llave foranea*/
  CONSTRAINT turnoDias_Fk1 FOREIGN KEY (id_turno) REFERENCES turnos(id_turno)
  CONSTRAINT turnoDias_Fk2 FOREIGN KEY (id_dias) REFERENCES dias(id_dias)
);
