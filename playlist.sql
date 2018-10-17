-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 15, 2018 at 10:14 PM
-- Server version: 10.1.32-MariaDB
-- PHP Version: 7.2.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `playlist`
--

-- --------------------------------------------------------

--
-- Table structure for table `playlists`
--

CREATE TABLE `playlists` (
  `id` int(11) NOT NULL,
  `name` varchar(100) CHARACTER SET hp8 COLLATE hp8_bin NOT NULL,
  `image` varchar(1000) CHARACTER SET hp8 COLLATE hp8_bin NOT NULL,
  `songs` text CHARACTER SET hp8 COLLATE hp8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `playlists`
--

INSERT INTO `playlists` (`id`, `name`, `image`, `songs`) VALUES
(1, 'Rocks', 'https://images.pexels.com/photos/1147946/pexels-photo-1147946.jpeg?auto=compress&cs=tinysrgb&h=350', '[{\"name\":\"Juicy-r\",\"url\":\"http:\\/\\/kolber.github.io\\/audiojs\\/demos\\/mp3\\/02-juicy-r.mp3\"},{\"name\":\"Islands Is The Limit\",\"url\":\"http:\\/\\/kolber.github.io\\/audiojs\\/demos\\/mp3\\/04-islands-is-the-limit.mp3\"},{\"name\":\"One More Chance For A Heart To Skip A Beat\",\"url\":\"http:\\/\\/kolber.github.io\\/audiojs\\/demos\\/mp3\\/05-one-more-chance-for-a-heart-to-skip-a-beat.mp3\"},{\"name\":\"Suicidal Fantasy\",\"url\":\"http:\\/\\/kolber.github.io\\/audiojs\\/demos\\/mp3\\/06-suicidal-fantasy.mp3\"}]'),
(2, 'Dice', 'https://ichef.bbci.co.uk/news/660/cpsprodpb/37B5/production/_89716241_thinkstockphotos-523060154.jpg', '[{\"name\":\"Everyday Shelter\",\"url\":\"http:\\/\\/kolber.github.io\\/audiojs\\/demos\\/mp3\\/07-everyday-shelter.mp3\"},{\"name\":\"Basic Hypnosis\",\"url\":\"http:\\/\\/kolber.github.io\\/audiojs\\/demos\\/mp3\\/08-basic-hypnosis.mp3\"}]'),
(3, 'Broccoli House', 'https://404store.com/2017/12/08/Random-Pictures-of-Conceptual-and-Creative-Ideas-02.jpg', '[{\"name\":\"Infinite Victory\",\"url\":\"http:\\/\\/kolber.github.io\\/audiojs\\/demos\\/mp3\\/09-infinite-victory.mp3\"},{\"name\":\"The Curious Incident Of Big Poppa In The Nighttime\",\"url\":\"http:\\/\\/kolber.github.io\\/audiojs\\/demos\\/mp3\\/10-the-curious-incident-of-big-poppa-in-the-nighttime.mp3\"},{\"name\":\"Mo Stars Mo Problems\",\"url\":\"http:\\/\\/kolber.github.io\\/audiojs\\/demos\\/mp3\\/11-mo-stars-mo-problems.mp3\"}]'),
(4, 'Waffle Building', 'https://images.pexels.com/photos/1143416/pexels-photo-1143416.jpeg?auto=compress&cs=tinysrgb&h=350', '[{\"name\":\"Suicidal Fantasy\",\"url\":\"http:\\/\\/kolber.github.io\\/audiojs\\/demos\\/mp3\\/06-suicidal-fantasy.mp3\"},{\"name\":\"It\'s All About The Crystalizabeths\",\"url\":\"http:\\/\\/kolber.github.io\\/audiojs\\/demos\\/mp3\\/03-its-all-about-the-crystalizabeths.mp3\"},{\"name\":\"Everyday Shelter\",\"url\":\"http:\\/\\/kolber.github.io\\/audiojs\\/demos\\/mp3\\/07-everyday-shelter.mp3\"}]'),
(5, 'Mountain Reflection', 'https://images.pexels.com/photos/976994/pexels-photo-976994.jpeg?auto=compress&cs=tinysrgb&h=350', '[{\"name\":\"Basic Hypnosis\",\"url\":\"http:\\/\\/kolber.github.io\\/audiojs\\/demos\\/mp3\\/08-basic-hypnosis.mp3\"},{\"name\":\"Juicy-R\",\"url\":\"http:\\/\\/kolber.github.io\\/audiojs\\/demos\\/mp3\\/02-juicy-r.mp3\"}]'),
(6, 'Island And Boat', 'https://images.pexels.com/photos/1316897/pexels-photo-1316897.jpeg?auto=compress&cs=tinysrgb&h=350', '[{\"name\":\"Infinite Victory\",\"url\":\"http:\\/\\/kolber.github.io\\/audiojs\\/demos\\/mp3\\/09-infinite-victory.mp3\"},{\"name\":\"Islands Is The Limit\",\"url\":\"http:\\/\\/kolber.github.io\\/audiojs\\/demos\\/mp3\\/04-islands-is-the-limit.mp3\"}]'),
(7, 'Clothes', 'https://images.pexels.com/photos/102303/pexels-photo-102303.jpeg?auto=compress&cs=tinysrgb&h=350', '[{\"name\":\"Basic Hypnosis\",\"url\":\"http:\\/\\/kolber.github.io\\/audiojs\\/demos\\/mp3\\/08-basic-hypnosis.mp3\"},{\"name\":\"Mo Stars Mo Problems\",\"url\":\"http:\\/\\/kolber.github.io\\/audiojs\\/demos\\/mp3\\/11-mo-stars-mo-problems.mp3\"}]'),
(8, 'Bursting Bubble', 'http://sites.warnercnr.colostate.edu/cnreddy/wp-content/uploads/sites/119/2018/01/36080727-random-picture.jpg', '[{\"name\":\"Islands Is The Limit\",\"url\":\"http:\\/\\/kolber.github.io\\/audiojs\\/demos\\/mp3\\/04-islands-is-the-limit.mp3\"},{\"name\":\"It\'s All About The Crystalizabeths\",\"url\":\"http:\\/\\/kolber.github.io\\/audiojs\\/demos\\/mp3\\/03-its-all-about-the-crystalizabeths.mp3\"},{\"name\":\"Islands Is The Limit\",\"url\":\"http:\\/\\/kolber.github.io\\/audiojs\\/demos\\/mp3\\/04-islands-is-the-limit.mp3\"}]');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `playlists`
--
ALTER TABLE `playlists`
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `playlists`
--
ALTER TABLE `playlists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
