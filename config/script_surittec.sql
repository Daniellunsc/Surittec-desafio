DROP DATABASE IF EXISTS `restapi` ;

CREATE SCHEMA IF NOT EXISTS `restapi` DEFAULT CHARACTER SET utf8 ;
USE `restapi` ;
DROP TABLE IF EXISTS `restapi`.`cliente_email` ;

DROP TABLE IF EXISTS `restapi`.`clientes` ;
CREATE TABLE IF NOT EXISTS `restapi`.`clientes` (
  `id` BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
  `cpf` VARCHAR(255) NOT NULL,
  `nome` VARCHAR(255) NOT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE TABLE IF NOT EXISTS `restapi`.`cliente_email` (
  `id` BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `cliente_id` BIGINT(20) NULL DEFAULT NULL,
    FOREIGN KEY (`cliente_id`)
    REFERENCES `restapi`.`clientes` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

DROP TABLE IF EXISTS `restapi`.`cliente_endereco` ;

CREATE TABLE IF NOT EXISTS `restapi`.`cliente_endereco` (
  `id` BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
  `bairro` VARCHAR(255) NOT NULL,
  `cep` VARCHAR(255) NOT NULL,
  `cidade` VARCHAR(255) NOT NULL,
  `complemento` VARCHAR(255) NULL DEFAULT NULL,
  `logradouro` VARCHAR(255) NOT NULL,
  `uf` VARCHAR(255) NOT NULL,
  `cliente_id` BIGINT(20) NULL DEFAULT NULL,
    FOREIGN KEY (`cliente_id`)
    REFERENCES `restapi`.`clientes` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

DROP TABLE IF EXISTS `restapi`.`cliente_telefone` ;

CREATE TABLE IF NOT EXISTS `restapi`.`cliente_telefone` (
  `id` BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
  `numero` VARCHAR(255) NOT NULL,
  `tipo` VARCHAR(255) NOT NULL,
  `cliente_id` BIGINT(20) NULL DEFAULT NULL,
    FOREIGN KEY (`cliente_id`)
    REFERENCES `restapi`.`clientes` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

DROP TABLE IF EXISTS `restapi`.`users` ;

CREATE TABLE IF NOT EXISTS `restapi`.`users` (
  `id` BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
  `usuario` VARCHAR(255) NOT NULL,
  `senha` VARCHAR(255) NOT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

DROP TABLE IF EXISTS `restapi`.`hibernate_sequence` ;

CREATE TABLE IF NOT EXISTS `restapi`.`hibernate_sequence` (
  `next_val` BIGINT(20) NOT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

INSERT INTO users (usuario, senha) VALUE ('admin', '123456');
INSERT INTO users (usuario, senha) VALUE ('comum', '123456');
INSERT INTO hibernate_sequence(next_val) VALUE (1)
