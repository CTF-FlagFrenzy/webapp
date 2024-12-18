-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema flagfrenzy
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema flagfrenzy
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `flagfrenzy` DEFAULT CHARACTER SET utf8 ;
USE `flagfrenzy` ;

-- -----------------------------------------------------
-- Table `flagfrenzy`.`Teams`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flagfrenzy`.`Teams` (
  `ID` INT auto_increment Not NULL,
  `Teamname` VARCHAR(50) NOT NULL unique,
  `Teamkey` VARCHAR(75) NOT NULL unique,
  `Password`VARCHAR(50) NOT NULL,
  `Points` INT NOT NULL DEFAULT 0,
  `Members` INT NOT NULL Default 0,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `flagfrenzy`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flagfrenzy`.`User` (
  `ID` INT auto_increment Not NULL,
  `Nickname` VARCHAR(50) NOT NULL Unique,
  `Avatar` varchar(200) Null,
  `Points` INT NOT NULL Default 0,
  `TeamsID` INT NULL,
  `Disabled`tinyint NOT Null Default 0,
  `Email` VARCHAR(50) NOT NULL unique,
  PRIMARY KEY (`ID`),
 
  CONSTRAINT `fk_User_Teams`
    FOREIGN KEY (`TeamsID`)
    REFERENCES `flagfrenzy`.`Teams` (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `flagfrenzy`.`Challenges`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flagfrenzy`.`Challenges` (
  `ID` INT auto_increment Not NULL,
  `ChallengeName` VARCHAR(100) NOT NULL Unique,
  `Categorie` VARCHAR(45) NOT NULL,
  `Hintcount` INT NOT NULL DEFAULT 0,
  `Points` INT NOT NULL DEFAULT 100,
  `Description` TEXT(1000) NOT NULL,
  `Dificulty`VARCHAR(30) NOT NULL,
  `Static`VARCHAR(50) NOT NULL,
  `Chain` VARCHAR(100) NULL,
  `Hint1`TEXT(400),
  `Hint2`TEXT(400),
  `Hint3`TEXT(400)
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `flagfrenzy`.`User_made_Challenges`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flagfrenzy`.`User_made_Challenges` (
  `User_ID` INT NOT NULL,
  `Challenges_ID` INT NOT NULL,
  `Firstblood` TINYINT NOT NULL DEFAULT 0,
  `Solved` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`User_ID`, `Challenges_ID`),
  CONSTRAINT `fk_User_has_Challenges_User1`
    FOREIGN KEY (`User_ID`)
    REFERENCES `flagfrenzy`.`User` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_has_Challenges_Challenges1`
    FOREIGN KEY (`Challenges_ID`)
    REFERENCES `flagfrenzy`.`Challenges` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
