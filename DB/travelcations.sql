-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: travelcations
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `postID` int NOT NULL,
  `title` varchar(128) NOT NULL,
  `rating` int NOT NULL,
  `author` varchar(60) NOT NULL,
  `date` date NOT NULL,
  `content` longtext NOT NULL,
  `image` varchar(128) NOT NULL,
  PRIMARY KEY (`postID`),
  KEY `author` (`author`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`author`) REFERENCES `user` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'Boracay',4,'JohnDoe','2022-07-15','Boracay is a beautiful island. The beach is spectacular. One could walk for miles on foot even without shoes! Well, because the sand is fine and not as sharp as in Potipot or Guimaras. The view is spectacular. I could not get tired of it.One thing I don\'t particularly enjoy, though, is that it is overcrowded already. We went to Boracay last November, thinking that it was off-peak season and we realized that there doesn\'t seem to be an off-peak season for Boracay anymore.','Boracay1.jpg'),(2,'El Nido',4,'JaneDoe','2022-04-01','El Nido is an actual paradise on earth. In my book, El Nido has some of the prettiest water and beaches, it\'s definitely one of the best places in the Philippines. Great tour plans take you to some of the most famous, and beautiful, parts of the archipelago.','1669440784190.JPG'),(3,'Bohol',5,'MariaDelaCruz','2022-11-10','Bohol is a very nice place; you can travel the beautiful places in Bohol for a day. You can just rent a car or van and it is not so costly. Don’t forget to have your lunch at Loboc River, you will enjoy eating while cruising the river, but my other friends say it is better if it is night. After the Long Day travel to beautiful places, stay one day for swimming at Panglao beach.','1669440826221.jpg'),(4,'Manila',5,'RobertSmith','2022-08-02','Metropolitan Manila encompasses 6 cities and 12 towns. Located on Manila Bay in the South China Sea, and bisected by the Pasig River, the capital of the Philippines is historic and modern, rich and poor. A popular sight is the walled area called Intramuros. The capital during Spanish colonization, Intramuros has retained old dungeons and gunpowder rooms but added art galleries and theaters. The city is filled with museums, shops, parks and churches, plus enough nightlife to last until dawn.\r\n\r\nI honestly enjoyed my stay here as someone who has not visited the Philippines yet and I definitely recommend getting a tour guide to make the most out of your trip!','1669440933141.jpg'),(5,'Siargao',5,'JuanDelaCruz','2022-06-30','While tourist numbers are fast on the rise, Siargao is still very much an island worth visiting. We didn’t find the crowds here unbearable, and in fact, thought they added to the hip vibe of the overall setting.\r\n\r\nSurfers should head to Siargao immediately, but there is also plenty to do for non-surfers - the beauty of the island speaks for itself.','1669441033159.jpg');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `username` varchar(60) NOT NULL,
  `firstname` varchar(128) NOT NULL,
  `lastname` varchar(128) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `dateJoin` date NOT NULL,
  `postCount` int NOT NULL,
  `profilePic` varchar(128) NOT NULL,
  `bio` text NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('JaneDoe','Jane','Doe','janedoe@gmail.com','$2b$10$YPUMET201Adrez0ss4x0yOSV1mqEqEM6UFzVmGgS3Bs7GkAcfcary','2022-11-26',1,'UserPic.JPG','Hi! I\'m Jane, I\'m a 35-year-old doctor living in Metro Manila and I love travelling with John!'),('JohnDoe','John','Doe','johndoe@gmail.com','$2b$10$xS3gdoCGmHwXp21cTMDyvOW95EKyb6Bu/RDJOHTd1rb7xJjTIzqTm','2022-11-26',1,'UserPic.JPG','Hi! I\'m John, I\'m a 36-year-old architect living in Metro Manila and I love Travelcations PH!'),('JuanDelaCruz','Juan','Dela Cruz','juandelacruz@gmail.com','$2b$10$EmFhsqTW7yOtob6CB75aqursmhBvkdWm3m/.qmLfvzEAQlw/XYFca','2022-11-26',1,'UserPic.JPG','25-year-old entrepreneur based in Mindanao, looking for like-minded people to travel with!'),('MariaDelaCruz','Maria','Dela Cruz','mariadelacruz@ymail.com','$2b$10$6kpDehfa6a4QAyb2nyKpL.KbAqVjnTeYU/tfBXLZi3WlW6E4QbHi.','2022-11-26',1,'UserPic.JPG','I\'m Maria! A 21-year-old student in DLSU Manila that loves travelling'),('RobertSmith','Robert','Smith','robertsmith@yahoo.com','$2b$10$9Op7nbBV7E9APNImzlLRjOhcyIPpMT1QHmIG1YGdq64QuK3z/cz8i','2022-11-26',1,'UserPic.JPG','Hello, I\'m Robert! A traveler/adventurer from outside the Philippines (where I am currently staying)');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-26 13:38:46
