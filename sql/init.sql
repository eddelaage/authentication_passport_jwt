SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema authentication_passport_jwt
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema authentication_passport_jwt
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `authentication_passport_jwt` DEFAULT CHARACTER SET utf8 ;
USE `authentication_passport_jwt` ;

-- -----------------------------------------------------
-- Table `authentication_passport_jwt`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(245) NOT NULL,
  `password` VARCHAR(245) NOT NULL,
  `firstName` VARCHAR(70) NOT NULL,
  `lastName` VARCHAR(70) NOT NULL,
  `birthDate` DATE NOT NULL,
  `gender` VARCHAR(64) NOT NULL,
  `createdAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `email_UNIQUE` ON `authentication_passport_jwt`.`users` (`email` ASC);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;