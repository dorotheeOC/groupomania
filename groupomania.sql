-- MySQL dump 10.13  Distrib 5.7.33, for Win32 (AMD64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	5.7.33-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `groupomania`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `groupomania` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `groupomania`;

--
-- Table structure for table `comments`
--
set global max_allowed_packet=1000000000;

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `commentText` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `reported` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `postId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `postId` (`postId`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'Ce post est super !','user@gmail.com',1,'2021-03-25 14:44:23','2021-03-25 14:45:12',2,9),(2,'Très jolie photo !','user2@gmail.com',0,'2021-03-25 14:45:53','2021-03-25 14:45:53',4,8),(3,'un dernier commentaire','user3@gmail.com',0,'2021-03-25 14:47:39','2021-03-25 14:47:39',5,7),(4,'Je suis d\'accord !','user3@gmail.com',0,'2021-03-25 14:48:08','2021-03-25 14:48:08',5,9),(5,'Belle illustration !','user3@gmail.com',0,'2021-03-25 14:48:43','2021-03-25 14:48:43',5,6);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follows`
--

DROP TABLE IF EXISTS `follows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `follows` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userFollowed` int(11) DEFAULT NULL,
  `userEmail` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follows`
--

LOCK TABLES `follows` WRITE;
/*!40000 ALTER TABLE `follows` DISABLE KEYS */;
INSERT INTO `follows` VALUES (5,6,'user4@gmail.com','2021-03-25 14:40:18','2021-03-25 14:40:18',1),(6,5,'user3@gmail.com','2021-03-25 14:40:47','2021-03-25 14:40:47',1),(7,4,'user2@gmail.com','2021-03-25 14:40:59','2021-03-25 14:40:59',1),(8,2,'user@gmail.com','2021-03-25 14:41:09','2021-03-25 14:41:09',1),(9,6,'user4@gmail.com','2021-03-25 14:46:15','2021-03-25 14:46:15',4),(10,5,'user3@gmail.com','2021-03-25 14:46:34','2021-03-25 14:46:34',4),(12,4,'user2@gmail.com','2021-03-25 14:49:05','2021-03-25 14:49:05',5),(13,6,'user4@gmail.com','2021-03-25 14:49:19','2021-03-25 14:49:19',5);
/*!40000 ALTER TABLE `follows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `data` longblob,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `likes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `postId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `postId` (`postId`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (1,'2021-03-25 14:45:36','2021-03-25 14:45:36',4,8),(2,'2021-03-25 14:46:52','2021-03-25 14:46:52',4,5),(3,'2021-03-25 14:47:29','2021-03-25 14:47:29',5,7),(4,'2021-03-25 14:48:19','2021-03-25 14:48:19',5,8),(5,'2021-03-25 14:48:45','2021-03-25 14:48:45',5,6);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `postContent` text NOT NULL,
  `liked` int(11) DEFAULT '0',
  `commented` int(11) DEFAULT '0',
  `author` varchar(255) NOT NULL,
  `reported` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'Un titre','<p>Du texte</p><p><img src=\'https://image.freepik.com/vecteurs-libre/personne-accro-illustration-medias-sociaux_52683-31882.jpg\'/></p>',0,0,'user@gmail.com',0,'2021-03-25 14:19:56','2021-03-25 14:19:56',2),(2,'Un titre','<p>Du texte</p><p><img src=\'https://image.freepik.com/free-photo/hand-drawing-social-network-icons_1232-156.jpg\'/></p>',0,0,'user2@gmail.com',0,'2021-03-25 14:22:04','2021-03-25 14:22:04',4),(3,'Un titre','<p>Du texte</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In dictum non consectetur a. Massa sapien faucibus et molestie ac feugiat. Tempus iaculis urna id volutpat lacus laoreet non curabitur. Ultrices vitae auctor eu augue ut. At erat pellentesque adipiscing commodo elit. Ultrices tincidunt arcu non sodales neque sodales ut. Donec pretium vulputate sapien nec sagittis aliquam. Tristique risus nec feugiat in fermentum posuere urna. Faucibus vitae aliquet nec ullamcorper sit amet.Congue quisque egestas diam in arcu cursus euismod. Tincidunt arcu non sodales neque. Netus et malesuada fames ac. Nec sagittis aliquam malesuada bibendum arcu. Ultrices dui sapien eget mi proin sed libero enim sed. Felis donec et odio pellentesque. Proin libero nunc consequat interdum varius sit amet mattis. Eget egestas purus viverra accumsan. Tortor at auctor urna nunc id cursus metus aliquam eleifend. Ultricies mi eget mauris pharetra et ultrices. Laoreet non curabitur gravida arcu ac. Volutpat blandit aliquam etiam erat. Adipiscing enim eu turpis egestas pretium aenean pharetra. Faucibus pulvinar elementum integer enim neque volutpat ac.Convallis posuere morbi leo urna molestie at elementum eu. Urna duis convallis convallis tellus id interdum velit laoreet id. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus. Dui sapien eget mi proin sed libero enim sed faucibus. Nibh cras pulvinar mattis nunc sed blandit. Pretium nibh ipsum consequat nisl vel. Velit egestas dui id ornare arcu. Faucibus a pellentesque sit amet porttitor eget dolor. Tempor commodo ullamcorper a lacus vestibulum sed arcu non. Quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna. Porttitor rhoncus dolor purus non enim praesent elementum facilisis leo. Eget lorem dolor sed viverra ipsum nunc aliquet bibendum enim.Consectetur adipiscing elit ut aliquam purus sit amet luctus. Auctor elit sed vulputate mi sit amet mauris commodo quis. Eu tincidunt tortor aliquam nulla facilisi cras fermentum odio. Urna id volutpat lacus laoreet. Netus et malesuada fames ac turpis egestas. Interdum velit laoreet id donec ultrices. Tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Semper quis lectus nulla at volutpat. Praesent elementum facilisis leo vel fringilla est ullamcorper eget nulla. Pellentesque elit eget gravida cum sociis natoque. Lectus proin nibh nisl condimentum id venenatis a condimentum. Magna etiam tempor orci eu lobortis elementum nibh. Pellentesque elit eget gravida cum sociis natoque. Enim sit amet venenatis urna cursus eget nunc. Dapibus ultrices in iaculis nunc sed augue. Malesuada bibendum arcu vitae elementum curabitur. Placerat vestibulum lectus mauris ultrices eros. Penatibus et magnis dis parturient montes nascetur ridiculus.Semper feugiat nibh sed pulvinar. Aliquam purus sit amet luctus venenatis lectus. A cras semper auctor neque vitae. Aliquam sem et tortor consequat id porta nibh. Ornare lectus sit amet est placerat in egestas. Suspendisse ultrices gravida dictum fusce ut placerat orci nulla pellentesque. Urna nunc id cursus metus. Orci sagittis eu volutpat odio facilisis. Dui sapien eget mi proin sed libero enim sed faucibus. Consequat mauris nunc congue nisi vitae suscipit. Tristique senectus et netus et malesuada fames ac turpis egestas. Interdum posuere lorem ipsum dolor sit amet. Molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus.</p>',0,0,'user2@gmail.com',0,'2021-03-25 14:24:59','2021-03-25 14:24:59',4),(4,'Un titre','<p>Du texte</p><p><img src=\'https://image.freepik.com/vecteurs-libre/smileys-facebook-aime-fond_52683-27762.jpg\'/></p>',0,0,'user3@gmail.com',0,'2021-03-25 14:27:31','2021-03-25 14:27:31',5),(5,'Un titre','<p>Du texte</p><p><img src=\'https://image.freepik.com/vecteurs-libre/composition-isometrique-gadget-internet-smartphone-addiction-images-gadgets-electroniques-comme-pictogrammes-illustration-vectorielle-texte-modifiable_1284-30290.jpg\'/></p>',1,0,'user4@gmail.com',0,'2021-03-25 14:28:10','2021-03-25 14:46:52',6),(6,'Un titre','<p>Du texte</p><p><img src=\'https://image.freepik.com/vecteurs-libre/personne-accro-aux-medias-sociaux_23-2148393336.jpg\'/></p>',1,1,'user@gmail.com',0,'2021-03-25 14:30:22','2021-03-25 14:48:45',2),(7,'Un titre','<p>Du texte</p><p><img src=\'https://image.freepik.com/vecteurs-libre/jeune-couple-datant-illustration-adolescent-garcon-fille-assise-banc-fleurs_33099-558.jpg\'/></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In dictum non consectetur a. Massa sapien faucibus et molestie ac feugiat. Tempus iaculis urna id volutpat lacus laoreet non curabitur. Ultrices vitae auctor eu augue ut. At erat pellentesque adipiscing commodo elit. Ultrices tincidunt arcu non sodales neque sodales ut. Donec pretium vulputate sapien nec sagittis aliquam. Tristique risus nec feugiat in fermentum posuere urna. Faucibus vitae aliquet nec ullamcorper sit amet. Congue quisque egestas diam in arcu cursus euismod. Tincidunt arcu non sodales neque. Netus et malesuada fames ac. Nec sagittis aliquam malesuada bibendum arcu. Ultrices dui sapien eget mi proin sed libero enim sed. Felis donec et odio pellentesque. Proin libero nunc consequat interdum varius sit amet mattis. Eget egestas purus viverra accumsan. Tortor at auctor urna nunc id cursus metus aliquam eleifend. Ultricies mi eget mauris pharetra et ultrices. Laoreet non curabitur gravida arcu ac. Volutpat blandit aliquam etiam erat. Adipiscing enim eu turpis egestas pretium aenean pharetra. Faucibus pulvinar elementum integer enim neque volutpat ac.</p>',1,1,'user2@gmail.com',0,'2021-03-25 14:31:27','2021-03-25 14:47:39',4),(8,'Un titre','<p>Du texte</p><p><img src=\'https://image.freepik.com/vecteurs-libre/fond-icones-medias-sociaux-3d_52683-28863.jpg\'/></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In dictum non consectetur a. Massa sapien faucibus et molestie ac feugiat. Tempus iaculis urna id volutpat lacus laoreet non curabitur. Ultrices vitae auctor eu augue ut. At erat pellentesque adipiscing commodo elit. Ultrices tincidunt arcu non sodales neque sodales ut. Donec pretium vulputate sapien nec sagittis aliquam. Tristique risus nec feugiat in fermentum posuere urna. Faucibus vitae aliquet nec ullamcorper sit amet. Congue quisque egestas diam in arcu cursus euismod. Tincidunt arcu non sodales neque. Netus et malesuada fames ac. Nec sagittis aliquam malesuada bibendum arcu. Ultrices dui sapien eget mi proin sed libero enim sed. Felis donec et odio pellentesque. Proin libero nunc consequat interdum varius sit amet mattis. Eget egestas purus viverra accumsan. Tortor at auctor urna nunc id cursus metus aliquam eleifend. Ultricies mi eget mauris pharetra et ultrices. Laoreet non curabitur gravida arcu ac. Volutpat blandit aliquam etiam erat. Adipiscing enim eu turpis egestas pretium aenean pharetra. Faucibus pulvinar elementum integer enim neque volutpat ac.</p>',2,1,'user3@gmail.com',0,'2021-03-25 14:36:24','2021-03-25 14:48:19',5),(9,'Un titre','<p>Du texte</p><p><img src=\'https://image.freepik.com/photos-gratuite/pile-of-3d-popular-social-media-logos_1379-881.jpg\'/></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In dictum non consectetur a. Massa sapien faucibus et molestie ac feugiat. Tempus iaculis urna id volutpat lacus laoreet non curabitur. Ultrices vitae auctor eu augue ut. At erat pellentesque adipiscing commodo elit. Ultrices tincidunt arcu non sodales neque sodales ut. Donec pretium vulputate sapien nec sagittis aliquam. Tristique risus nec feugiat in fermentum posuere urna. Faucibus vitae aliquet nec ullamcorper sit amet. Congue quisque egestas diam in arcu cursus euismod. Tincidunt arcu non sodales neque. Netus et malesuada fames ac. Nec sagittis aliquam malesuada bibendum arcu. Ultrices dui sapien eget mi proin sed libero enim sed. Felis donec et odio pellentesque. Proin libero nunc consequat interdum varius sit amet mattis. Eget egestas purus viverra accumsan. Tortor at auctor urna nunc id cursus metus aliquam eleifend. Ultricies mi eget mauris pharetra et ultrices. Laoreet non curabitur gravida arcu ac. Volutpat blandit aliquam etiam erat. Adipiscing enim eu turpis egestas pretium aenean pharetra. Faucibus pulvinar elementum integer enim neque volutpat ac.</p>',0,2,'user4@gmail.com',1,'2021-03-25 14:37:50','2021-03-25 14:48:08',6);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `followers` int(11) DEFAULT '0',
  `role` varchar(255) DEFAULT 'user',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `users_first_name_last_name` (`firstName`,`lastName`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin@gmail.com','$2b$10$gJfZjDvS6ube8kZwELHTGuJ00P32Of8ATLcK/K.4IOGuZyciqt33G',NULL,NULL,0,'admin','2021-03-25 14:19:10','2021-03-25 14:19:10'),(2,'user@gmail.com','$2b$10$qjzTxCZGff3NHM5IbhnB2OHZbGC.2IK8fBBuoUEk8ykHT30evlfPO',NULL,NULL,1,'user','2021-03-25 14:19:26','2021-03-25 14:41:09'),(4,'user2@gmail.com','$2b$10$01fX15z33MblAEkWfYOK3.5l44bqPM6cxN0F.xP9IhI6v1dD4jXqC',NULL,NULL,2,'user','2021-03-25 14:19:33','2021-03-25 14:49:05'),(5,'user3@gmail.com','$2b$10$FYchmTRZiOZVXx/hVJ2Y8uSxJtpHTY.WLAQcRj3GhjkdVaE4fdQxm',NULL,NULL,2,'user','2021-03-25 14:19:37','2021-03-25 14:46:34'),(6,'user4@gmail.com','$2b$10$5zZN1NBFFelt2mq/3EF7BeHEpceXPmJyxOQwyQpQ8zcZtJ.WVEdFS',NULL,NULL,3,'user','2021-03-25 14:19:40','2021-03-25 14:49:19');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-25 15:51:01
