-- phpMyAdmin SQL Dump
-- version 4.6.0
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 09, 2016 at 03:36 PM
-- Server version: 5.6.22
-- PHP Version: 7.0.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `samlenett`
--

-- --------------------------------------------------------

--
-- Table structure for table `consoles`
--

CREATE TABLE `consoles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created-time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `wiki-link` varchar(255) NOT NULL,
  `slug` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `consoles`
--

INSERT INTO `consoles` (`id`, `name`, `created-time`, `wiki-link`, `slug`) VALUES
(1, 'Nintendo Entertainment System', '2015-11-15 19:31:52', '', 'nes');

-- --------------------------------------------------------

--
-- Table structure for table `Developers`
--

CREATE TABLE `Developers` (
  `id` int(11) NOT NULL,
  `name` int(11) NOT NULL,
  `created_time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `game-reviews`
--

CREATE TABLE `game-reviews` (
  `id` int(11) NOT NULL,
  `games_id` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `game-reviews`
--

INSERT INTO `game-reviews` (`id`, `games_id`, `score`, `created_time`) VALUES
(1, 204, 80, '2016-05-04 08:49:17');

-- --------------------------------------------------------

--
-- Table structure for table `game-to-region`
--

CREATE TABLE `game-to-region` (
  `id` int(11) NOT NULL,
  `game-id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `region` int(11) NOT NULL,
  `rarity` int(11) NOT NULL,
  `release-date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `console_id` int(11) NOT NULL,
  `genre_id` int(11) DEFAULT NULL,
  `developer_id` int(11) DEFAULT NULL,
  `publisher_id` int(11) DEFAULT NULL,
  `description` text NOT NULL,
  `slug` varchar(250) NOT NULL,
  `parent_id` int(11) NOT NULL,
  `rarity` int(11) NOT NULL,
  `release_year` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`id`, `title`, `console_id`, `genre_id`, `developer_id`, `publisher_id`, `description`, `slug`, `parent_id`, `rarity`, `release_year`) VALUES
(204, '1943: The Battle of Midway', 1, NULL, NULL, NULL, '', '1943-the-battle-of-midway', 0, 0, 0),
(205, '3-D WorldRunner', 1, NULL, NULL, NULL, '', '3-d-worldrunner', 0, 0, 0),
(206, '720°', 1, NULL, NULL, NULL, '', '720degree', 0, 0, 0),
(207, '8 Eyes', 1, NULL, NULL, NULL, '', '8-eyes', 0, 0, 0),
(208, 'Abadox', 1, NULL, NULL, NULL, '', 'abadox', 0, 0, 0),
(209, 'The Addams Family', 1, NULL, NULL, NULL, '', 'the-addams-family', 0, 0, 0),
(210, 'The Addams Family: Pugsley\'s Scavenger Hunt', 1, NULL, NULL, NULL, '', 'the-addams-family-pugsleys-scavenger-hunt', 0, 0, 0),
(211, 'Advanced Dungeons & Dragons: DragonStrike', 1, NULL, NULL, NULL, '', 'advanced-dungeons-and-dragons-dragonstrike', 0, 0, 0),
(212, 'Advanced Dungeons & Dragons: Heroes of the Lance', 1, NULL, NULL, NULL, '', 'advanced-dungeons-and-dragons-heroes-of-the-lance', 0, 0, 0),
(213, 'Advanced Dungeons & Dragons: Hillsfar', 1, NULL, NULL, NULL, '', 'advanced-dungeons-and-dragons-hillsfar', 0, 0, 0),
(214, 'Advanced Dungeons & Dragons: Pool of Radiance', 1, NULL, NULL, NULL, '', 'advanced-dungeons-and-dragons-pool-of-radiance', 0, 0, 0),
(215, 'Adventure Island', 1, NULL, NULL, NULL, '', 'adventure-island', 0, 0, 0),
(216, 'Adventure Island II', 1, NULL, NULL, NULL, '', 'adventure-island-ii', 0, 0, 0),
(217, 'Adventure Island 3', 1, NULL, NULL, NULL, '', 'adventure-island-3', 0, 0, 0),
(218, 'Adventures in the Magic Kingdom', 1, NULL, NULL, NULL, '', 'adventures-in-the-magic-kingdom', 0, 0, 0),
(219, 'The Adventures of Bayou Billy', 1, NULL, NULL, NULL, '', 'the-adventures-of-bayou-billy', 0, 0, 0),
(220, 'Adventures of Dino Riki', 1, NULL, NULL, NULL, '', 'adventures-of-dino-riki', 0, 0, 0),
(221, 'The Adventures of Gilligan\'s Island', 1, NULL, NULL, NULL, '', 'the-adventures-of-gilligans-island', 0, 0, 0),
(222, 'Adventures of Lolo', 1, NULL, NULL, NULL, '', 'adventures-of-lolo', 0, 0, 0),
(223, 'Adventures of Lolo 2', 1, NULL, NULL, NULL, '', 'adventures-of-lolo-2', 0, 0, 0),
(224, 'Adventures of Lolo 3', 1, NULL, NULL, NULL, '', 'adventures-of-lolo-3', 0, 0, 0),
(225, 'The Adventures of Rad Gravity', 1, NULL, NULL, NULL, '', 'the-adventures-of-rad-gravity', 0, 0, 0),
(226, 'The Adventures of Rocky and Bullwinkle and Friends', 1, NULL, NULL, NULL, '', 'the-adventures-of-rocky-and-bullwinkle-and-friends', 0, 0, 0),
(227, 'The Adventures of Tom Sawyer', 1, NULL, NULL, NULL, '', 'the-adventures-of-tom-sawyer', 0, 0, 0),
(228, 'Air Fortress', 1, NULL, NULL, NULL, '', 'air-fortress', 0, 0, 0),
(229, 'Airwolf', 1, NULL, NULL, NULL, '', 'airwolf', 0, 0, 0),
(230, 'Al Unser Jr.\'s Turbo Racing', 1, NULL, NULL, NULL, '', 'al-unser-jrs-turbo-racing', 0, 0, 0),
(231, 'Alfred Chicken', 1, NULL, NULL, NULL, '', 'alfred-chicken', 0, 0, 0),
(232, 'Alien3', 1, NULL, NULL, NULL, '', 'alien3', 0, 0, 0),
(233, 'All-Pro Basketball', 1, NULL, NULL, NULL, '', 'all-pro-basketball', 0, 0, 0),
(234, 'Alpha Mission', 1, NULL, NULL, NULL, '', 'alpha-mission', 0, 0, 0),
(235, 'Amagon', 1, NULL, NULL, NULL, '', 'amagon', 0, 0, 0),
(236, 'American Gladiators', 1, NULL, NULL, NULL, '', 'american-gladiators', 0, 0, 0),
(237, 'Anticipation', 1, NULL, NULL, NULL, '', 'anticipation', 0, 0, 0),
(238, 'Arch Rivals', 1, NULL, NULL, NULL, '', 'arch-rivals', 0, 0, 0),
(239, 'Archon', 1, NULL, NULL, NULL, '', 'archon', 0, 0, 0),
(240, 'Arkanoid', 1, NULL, NULL, NULL, '', 'arkanoid', 0, 0, 0),
(241, 'Arkista\'s Ring', 1, NULL, NULL, NULL, '', 'arkistas-ring', 0, 0, 0),
(242, 'Asterix', 1, NULL, NULL, NULL, '', 'asterix', 0, 0, 0),
(243, 'Astyanax', 1, NULL, NULL, NULL, '', 'astyanax', 0, 0, 0),
(244, 'Athena', 1, NULL, NULL, NULL, '', 'athena', 0, 0, 0),
(245, 'Athletic World', 1, NULL, NULL, NULL, '', 'athletic-world', 0, 0, 0),
(246, 'Attack of the Killer Tomatoes', 1, NULL, NULL, NULL, '', 'attack-of-the-killer-tomatoes', 0, 0, 0),
(247, 'Aussie Rules Footy', 1, NULL, NULL, NULL, '', 'aussie-rules-footy', 0, 0, 0),
(248, 'Back to the Future', 1, NULL, NULL, NULL, '', 'back-to-the-future', 0, 0, 0),
(249, 'Back to the Future Part II & III', 1, NULL, NULL, NULL, '', 'back-to-the-future-part-ii-and-iii', 0, 0, 0),
(250, 'Bad Dudes Vs. DragonNinja', 1, NULL, NULL, NULL, '', 'bad-dudes-vs-dragonninja', 0, 0, 0),
(251, 'Bad News Baseball', 1, NULL, NULL, NULL, '', 'bad-news-baseball', 0, 0, 0),
(252, 'Bad Street Brawler', 1, NULL, NULL, NULL, '', 'bad-street-brawler', 0, 0, 0),
(253, 'Balloon Fight', 1, NULL, NULL, NULL, '', 'balloon-fight', 0, 0, 0),
(254, 'Banana Prince', 1, NULL, NULL, NULL, '', 'banana-prince', 0, 0, 0),
(255, 'Bandai Golf: Challenge Pebble Beach', 1, NULL, NULL, NULL, '', 'bandai-golf-challenge-pebble-beach', 0, 0, 0),
(256, 'Bandit Kings of Ancient China', 1, NULL, NULL, NULL, '', 'bandit-kings-of-ancient-china', 0, 0, 0),
(257, 'Barbie', 1, NULL, NULL, NULL, '', 'barbie', 0, 0, 0),
(258, 'The Bard\'s Tale', 1, NULL, NULL, NULL, '', 'the-bards-tale', 0, 0, 0),
(259, 'Barker Bill\'s Trick Shooting', 1, NULL, NULL, NULL, '', 'barker-bills-trick-shooting', 0, 0, 0),
(260, 'Base Wars', 1, NULL, NULL, NULL, '', 'base-wars', 0, 0, 0),
(261, 'Baseball', 1, NULL, NULL, NULL, '', 'baseball', 0, 0, 0),
(262, 'Baseball Simulator 1.000', 1, NULL, NULL, NULL, '', 'baseball-simulator-1000', 0, 0, 0),
(263, 'Baseball Stars', 1, NULL, NULL, NULL, '', 'baseball-stars', 0, 0, 0),
(264, 'Baseball Stars 2', 1, NULL, NULL, NULL, '', 'baseball-stars-2', 0, 0, 0),
(265, 'Bases Loaded', 1, NULL, NULL, NULL, '', 'bases-loaded', 0, 0, 0),
(266, 'Bases Loaded II: Second Season', 1, NULL, NULL, NULL, '', 'bases-loaded-ii-second-season', 0, 0, 0),
(267, 'Bases Loaded 3', 1, NULL, NULL, NULL, '', 'bases-loaded-3', 0, 0, 0),
(268, 'Bases Loaded 4', 1, NULL, NULL, NULL, '', 'bases-loaded-4', 0, 0, 0),
(269, 'Batman', 1, NULL, NULL, NULL, '', 'batman', 0, 0, 0),
(270, 'Batman Returns', 1, NULL, NULL, NULL, '', 'batman-returns', 0, 0, 0),
(271, 'Batman: Return of the Joker', 1, NULL, NULL, NULL, '', 'batman-return-of-the-joker', 0, 0, 0),
(272, 'Battle Chess', 1, NULL, NULL, NULL, '', 'battle-chess', 0, 0, 0),
(273, 'The Battle of Olympus', 1, NULL, NULL, NULL, '', 'the-battle-of-olympus', 0, 0, 0),
(274, 'Battle Tank', 1, NULL, NULL, NULL, '', 'battle-tank', 0, 0, 0),
(275, 'Battleship', 1, NULL, NULL, NULL, '', 'battleship', 0, 0, 0),
(276, 'Battletoads', 1, NULL, NULL, NULL, '', 'battletoads', 0, 0, 0),
(277, 'Battletoads & Double Dragon', 1, NULL, NULL, NULL, '', 'battletoads-and-double-dragon', 0, 0, 0),
(278, 'Beetlejuice', 1, NULL, NULL, NULL, '', 'beetlejuice', 0, 0, 0),
(279, 'Best of the Best: Championship Karate', 1, NULL, NULL, NULL, '', 'best-of-the-best-championship-karate', 0, 0, 0),
(280, 'Bigfoot', 1, NULL, NULL, NULL, '', 'bigfoot', 0, 0, 0),
(281, 'Bill & Ted\'s Excellent Video Game Adventure', 1, NULL, NULL, NULL, '', 'bill-and-teds-excellent-video-game-adventure', 0, 0, 0),
(282, 'Bill Elliott\'s NASCAR Challenge', 1, NULL, NULL, NULL, '', 'bill-elliotts-nascar-challenge', 0, 0, 0),
(283, 'Bionic Commando', 1, NULL, NULL, NULL, '', 'bionic-commando', 0, 0, 0),
(284, 'The Black Bass', 1, NULL, NULL, NULL, '', 'the-black-bass', 0, 0, 0),
(285, 'Blades of Steel', 1, NULL, NULL, NULL, '', 'blades-of-steel', 0, 0, 0),
(286, 'Blaster Master', 1, NULL, NULL, NULL, '', 'blaster-master', 0, 0, 0),
(287, 'The Blue Marlin', 1, NULL, NULL, NULL, '', 'the-blue-marlin', 0, 0, 0),
(288, 'The Blues Brothers', 1, NULL, NULL, NULL, '', 'the-blues-brothers', 0, 0, 0),
(289, 'Bo Jackson Baseball', 1, NULL, NULL, NULL, '', 'bo-jackson-baseball', 0, 0, 0),
(290, 'Bomberman', 1, NULL, NULL, NULL, '', 'bomberman', 0, 0, 0),
(291, 'Bomberman II', 1, NULL, NULL, NULL, '', 'bomberman-ii', 0, 0, 0),
(292, 'Bonk\'s Adventure', 1, NULL, NULL, NULL, '', 'bonks-adventure', 0, 0, 0),
(293, 'Boulder Dash', 1, NULL, NULL, NULL, '', 'boulder-dash', 0, 0, 0),
(294, 'A Boy and His Blob: Trouble on Blobolonia', 1, NULL, NULL, NULL, '', 'a-boy-and-his-blob-trouble-on-blobolonia', 0, 0, 0),
(295, 'Bram Stoker\'s Dracula', 1, NULL, NULL, NULL, '', 'bram-stokers-dracula', 0, 0, 0),
(296, 'Break Time: The National Pool Tour', 1, NULL, NULL, NULL, '', 'break-time-the-national-pool-tour', 0, 0, 0),
(297, 'BreakThru', 1, NULL, NULL, NULL, '', 'breakthru', 0, 0, 0),
(298, 'Bubble Bobble', 1, NULL, NULL, NULL, '', 'bubble-bobble', 0, 0, 0),
(299, 'Mattel (AUS)', 1, NULL, NULL, NULL, '', 'mattel-aus', 0, 0, 0),
(300, 'Bubble Bobble Part 2', 1, NULL, NULL, NULL, '', 'bubble-bobble-part-2', 0, 0, 0),
(301, 'Bucky O\'Hare', 1, NULL, NULL, NULL, '', 'bucky-ohare', 0, 0, 0),
(302, 'The Bugs Bunny Birthday Blowout', 1, NULL, NULL, NULL, '', 'the-bugs-bunny-birthday-blowout', 0, 0, 0),
(303, 'The Bugs Bunny Crazy Castle', 1, NULL, NULL, NULL, '', 'the-bugs-bunny-crazy-castle', 0, 0, 0),
(307, 'Bump \'n\' Jump', 1, NULL, NULL, NULL, '', 'bump-n-jump', 0, 0, 0),
(308, 'Burai Fighter', 1, NULL, NULL, NULL, '', 'burai-fighter', 0, 0, 0),
(309, 'BurgerTime', 1, NULL, NULL, NULL, '', 'burgertime', 0, 0, 0),
(310, 'Cabal', 1, NULL, NULL, NULL, '', 'cabal', 0, 0, 0),
(311, 'Caesars Palace', 1, NULL, NULL, NULL, '', 'caesars-palace', 0, 0, 0),
(312, 'California Games', 1, NULL, NULL, NULL, '', 'california-games', 0, 0, 0),
(313, 'Capcom\'s Gold Medal Challenge \'92', 1, NULL, NULL, NULL, '', 'capcoms-gold-medal-challenge-92', 0, 0, 0),
(314, 'Captain America and The Avengers', 1, NULL, NULL, NULL, '', 'captain-america-and-the-avengers', 0, 0, 0),
(315, 'Captain Planet and the Planeteers', 1, NULL, NULL, NULL, '', 'captain-planet-and-the-planeteers', 0, 0, 0),
(316, 'Captain Skyhawk', 1, NULL, NULL, NULL, '', 'captain-skyhawk', 0, 0, 0),
(317, 'Casino Kid', 1, NULL, NULL, NULL, '', 'casino-kid', 0, 0, 0),
(318, 'Casino Kid 2', 1, NULL, NULL, NULL, '', 'casino-kid-2', 0, 0, 0),
(319, 'Castelian', 1, NULL, NULL, NULL, '', 'castelian', 0, 0, 0),
(320, 'Castle of Dragon', 1, NULL, NULL, NULL, '', 'castle-of-dragon', 0, 0, 0),
(321, 'Castlequest', 1, NULL, NULL, NULL, '', 'castlequest', 0, 0, 0),
(322, 'Castlevania', 1, NULL, NULL, NULL, '', 'castlevania', 0, 0, 0),
(323, 'Castlevania II: Simon\'s Quest', 1, NULL, NULL, NULL, '', 'castlevania-ii-simons-quest', 0, 0, 0),
(324, 'Castlevania III: Dracula\'s Curse', 1, NULL, NULL, NULL, '', 'castlevania-iii-draculas-curse', 0, 0, 0),
(325, 'Caveman Games', 1, NULL, NULL, NULL, '', 'caveman-games', 0, 0, 0),
(326, 'Championship Bowling', 1, NULL, NULL, NULL, '', 'championship-bowling', 0, 0, 0),
(327, 'Championship Pool', 1, NULL, NULL, NULL, '', 'championship-pool', 0, 0, 0),
(328, 'Championship Rally', 1, NULL, NULL, NULL, '', 'championship-rally', 0, 0, 0),
(329, 'Chessmaster', 1, NULL, NULL, NULL, '', 'chessmaster', 0, 0, 0),
(330, 'Chip \'n Dale: Rescue Rangers', 1, NULL, NULL, NULL, '', 'chip-n-dale-rescue-rangers', 0, 0, 0),
(331, 'Chip \'n Dale Rescue Rangers 2', 1, NULL, NULL, NULL, '', 'chip-n-dale-rescue-rangers-2', 0, 0, 0),
(332, 'Chubby Cherub', 1, NULL, NULL, NULL, '', 'chubby-cherub', 0, 0, 0),
(333, 'Circus Caper', 1, NULL, NULL, NULL, '', 'circus-caper', 0, 0, 0),
(334, 'City Connection', 1, NULL, NULL, NULL, '', 'city-connection', 0, 0, 0),
(335, 'Clash at Demonhead', 1, NULL, NULL, NULL, '', 'clash-at-demonhead', 0, 0, 0),
(336, 'Classic Concentration', 1, NULL, NULL, NULL, '', 'classic-concentration', 0, 0, 0),
(337, 'Cliffhanger', 1, NULL, NULL, NULL, '', 'cliffhanger', 0, 0, 0),
(338, 'Clu Clu Land', 1, NULL, NULL, NULL, '', 'clu-clu-land', 0, 0, 0),
(339, 'Cobra Command', 1, NULL, NULL, NULL, '', 'cobra-command', 0, 0, 0),
(340, 'Cobra Triangle', 1, NULL, NULL, NULL, '', 'cobra-triangle', 0, 0, 0),
(341, 'Code Name: Viper', 1, NULL, NULL, NULL, '', 'code-name-viper', 0, 0, 0),
(342, 'Color a Dinosaur', 1, NULL, NULL, NULL, '', 'color-a-dinosaur', 0, 0, 0),
(343, 'Commando', 1, NULL, NULL, NULL, '', 'commando', 0, 0, 0),
(344, 'Conan: The Mysteries of Time', 1, NULL, NULL, NULL, '', 'conan-the-mysteries-of-time', 0, 0, 0),
(345, 'Conflict', 1, NULL, NULL, NULL, '', 'conflict', 0, 0, 0),
(346, 'Conquest of the Crystal Palace', 1, NULL, NULL, NULL, '', 'conquest-of-the-crystal-palace', 0, 0, 0),
(347, 'Contra', 1, NULL, NULL, NULL, '', 'contra', 0, 0, 0),
(348, 'Contra Force', 1, NULL, NULL, NULL, '', 'contra-force', 0, 0, 0),
(349, 'Cool World', 1, NULL, NULL, NULL, '', 'cool-world', 0, 0, 0),
(350, 'Cowboy Kid', 1, NULL, NULL, NULL, '', 'cowboy-kid', 0, 0, 0),
(351, 'Crackout', 1, NULL, NULL, NULL, '', 'crackout', 0, 0, 0),
(352, 'Crash \'n the Boys: Street Challenge', 1, NULL, NULL, NULL, '', 'crash-n-the-boys-street-challenge', 0, 0, 0),
(353, 'Crystalis', 1, NULL, NULL, NULL, '', 'crystalis', 0, 0, 0),
(354, 'Cyberball', 1, NULL, NULL, NULL, '', 'cyberball', 0, 0, 0),
(355, 'Cybernoid: The Fighting Machine', 1, NULL, NULL, NULL, '', 'cybernoid-the-fighting-machine', 0, 0, 0),
(356, 'Dance Aerobics', 1, NULL, NULL, NULL, '', 'dance-aerobics', 0, 0, 0),
(357, 'Danny Sullivan\'s Indy Heat', 1, NULL, NULL, NULL, '', 'danny-sullivans-indy-heat', 0, 0, 0),
(358, 'Darkman', 1, NULL, NULL, NULL, '', 'darkman', 0, 0, 0),
(359, 'Dash Galaxy in the Alien Asylum', 1, NULL, NULL, NULL, '', 'dash-galaxy-in-the-alien-asylum', 0, 0, 0),
(360, 'Day Dreamin\' Davey', 1, NULL, NULL, NULL, '', 'day-dreamin-davey', 0, 0, 0),
(361, 'Days of Thunder', 1, NULL, NULL, NULL, '', 'days-of-thunder', 0, 0, 0),
(362, 'Deadly Towers', 1, NULL, NULL, NULL, '', 'deadly-towers', 0, 0, 0),
(363, 'Defender II', 1, NULL, NULL, NULL, '', 'defender-ii', 0, 0, 0),
(364, 'Defender of the Crown', 1, NULL, NULL, NULL, '', 'defender-of-the-crown', 0, 0, 0),
(365, 'Defenders of Dynatron City', 1, NULL, NULL, NULL, '', 'defenders-of-dynatron-city', 0, 0, 0),
(366, 'Déjà Vu', 1, NULL, NULL, NULL, '', 'deja-vu', 0, 0, 0),
(367, 'Demon Sword', 1, NULL, NULL, NULL, '', 'demon-sword', 0, 0, 0),
(368, 'Desert Commander', 1, NULL, NULL, NULL, '', 'desert-commander', 0, 0, 0),
(369, 'Destination Earthstar', 1, NULL, NULL, NULL, '', 'destination-earthstar', 0, 0, 0),
(370, 'Destiny of an Emperor', 1, NULL, NULL, NULL, '', 'destiny-of-an-emperor', 0, 0, 0),
(371, 'Devil World', 1, NULL, NULL, NULL, '', 'devil-world', 0, 0, 0),
(372, 'Dick Tracy', 1, NULL, NULL, NULL, '', 'dick-tracy', 0, 0, 0),
(373, 'Die Hard', 1, NULL, NULL, NULL, '', 'die-hard', 0, 0, 0),
(374, 'Dig Dug II', 1, NULL, NULL, NULL, '', 'dig-dug-ii', 0, 0, 0),
(375, 'Digger T. Rock: Legend of the Lost City', 1, NULL, NULL, NULL, '', 'digger-t-rock-legend-of-the-lost-city', 0, 0, 0),
(376, 'Dirty Harry', 1, NULL, NULL, NULL, '', 'dirty-harry', 0, 0, 0),
(377, 'Disney\'s Aladdin', 1, NULL, NULL, NULL, '', 'disneys-aladdin', 0, 0, 0),
(378, 'Disney\'s Beauty and the Beast', 1, NULL, NULL, NULL, '', 'disneys-beauty-and-the-beast', 0, 0, 0),
(379, 'Disney\'s Darkwing Duck', 1, NULL, NULL, NULL, '', 'disneys-darkwing-duck', 0, 0, 0),
(380, 'Disney\'s The Jungle Book', 1, NULL, NULL, NULL, '', 'disneys-the-jungle-book', 0, 0, 0),
(381, 'Disney\'s The Lion King', 1, NULL, NULL, NULL, '', 'disneys-the-lion-king', 0, 0, 0),
(382, 'Disney\'s The Little Mermaid', 1, NULL, NULL, NULL, '', 'disneys-the-little-mermaid', 0, 0, 0),
(383, 'Donkey Kong', 1, NULL, NULL, NULL, '', 'donkey-kong', 0, 0, 0),
(384, 'Donkey Kong 3', 1, NULL, NULL, NULL, '', 'donkey-kong-3', 0, 0, 0),
(385, 'Donkey Kong Classics', 1, NULL, NULL, NULL, '', 'donkey-kong-classics', 0, 0, 0),
(386, 'Donkey Kong Jr.', 1, NULL, NULL, NULL, '', 'donkey-kong-jr', 0, 0, 0),
(387, 'Donkey Kong Jr. Math', 1, NULL, NULL, NULL, '', 'donkey-kong-jr-math', 0, 0, 0),
(388, 'Double Dare', 1, NULL, NULL, NULL, '', 'double-dare', 0, 0, 0),
(389, 'Double Dragon', 1, NULL, NULL, NULL, '', 'double-dragon', 0, 0, 0),
(390, 'Double Dragon II: The Revenge', 1, NULL, NULL, NULL, '', 'double-dragon-ii-the-revenge', 0, 0, 0),
(391, 'Double Dragon III: The Sacred Stones', 1, NULL, NULL, NULL, '', 'double-dragon-iii-the-sacred-stones', 0, 0, 0),
(392, 'Double Dribble', 1, NULL, NULL, NULL, '', 'double-dribble', 0, 0, 0),
(393, 'Dr. Chaos', 1, NULL, NULL, NULL, '', 'dr-chaos', 0, 0, 0),
(394, 'Dr. Jekyll and Mr. Hyde', 1, NULL, NULL, NULL, '', 'dr-jekyll-and-mr-hyde', 0, 0, 0),
(395, 'Dr. Mario', 1, NULL, NULL, NULL, '', 'dr-mario', 0, 0, 0),
(396, 'Dragon Fighter', 1, NULL, NULL, NULL, '', 'dragon-fighter', 0, 0, 0),
(397, 'Dragon Power', 1, NULL, NULL, NULL, '', 'dragon-power', 0, 0, 0),
(398, 'Dragon Spirit', 1, NULL, NULL, NULL, '', 'dragon-spirit', 0, 0, 0),
(399, 'Dragon Warrior', 1, NULL, NULL, NULL, '', 'dragon-warrior', 0, 0, 0),
(400, 'Dragon Warrior II', 1, NULL, NULL, NULL, '', 'dragon-warrior-ii', 0, 0, 0),
(401, 'Dragon Warrior III', 1, NULL, NULL, NULL, '', 'dragon-warrior-iii', 0, 0, 0),
(402, 'Dragon Warrior IV', 1, NULL, NULL, NULL, '', 'dragon-warrior-iv', 0, 0, 0),
(403, 'Dragon\'s Lair', 1, NULL, NULL, NULL, '', 'dragons-lair', 0, 0, 0),
(404, 'Dropzone', 1, NULL, NULL, NULL, '', 'dropzone', 0, 0, 0),
(405, 'Duck Hunt', 1, NULL, NULL, NULL, '', 'duck-hunt', 0, 0, 0),
(406, 'DuckTales', 1, NULL, NULL, NULL, '', 'ducktales', 0, 0, 0),
(407, 'DuckTales 2', 1, NULL, NULL, NULL, '', 'ducktales-2', 0, 0, 0),
(408, 'Dungeon Magic: Sword of the Elements', 1, NULL, NULL, NULL, '', 'dungeon-magic-sword-of-the-elements', 0, 0, 0),
(409, 'Dusty Diamond\'s All-Star Softball', 1, NULL, NULL, NULL, '', 'dusty-diamonds-all-star-softball', 0, 0, 0),
(410, 'Dynowarz: Destruction of Spondylus', 1, NULL, NULL, NULL, '', 'dynowarz-destruction-of-spondylus', 0, 0, 0),
(411, 'Elevator Action', 1, NULL, NULL, NULL, '', 'elevator-action', 0, 0, 0),
(412, 'Eliminator Boat Duel', 1, NULL, NULL, NULL, '', 'eliminator-boat-duel', 0, 0, 0),
(413, 'Elite', 1, NULL, NULL, NULL, '', 'elite', 0, 0, 0),
(414, 'Excitebike', 1, NULL, NULL, NULL, '', 'excitebike', 0, 0, 0),
(415, 'F-117A Stealth Fighter', 1, NULL, NULL, NULL, '', 'f-117a-stealth-fighter', 0, 0, 0),
(416, 'F-15 Strike Eagle', 1, NULL, NULL, NULL, '', 'f-15-strike-eagle', 0, 0, 0),
(417, 'Family Feud', 1, NULL, NULL, NULL, '', 'family-feud', 0, 0, 0),
(418, 'Faria: A World of Mystery and Danger', 1, NULL, NULL, NULL, '', 'faria-a-world-of-mystery-and-danger', 0, 0, 0),
(419, 'Faxanadu', 1, NULL, NULL, NULL, '', 'faxanadu', 0, 0, 0),
(420, 'Felix the Cat', 1, NULL, NULL, NULL, '', 'felix-the-cat', 0, 0, 0),
(421, 'Ferrari Grand Prix Challenge', 1, NULL, NULL, NULL, '', 'ferrari-grand-prix-challenge', 0, 0, 0),
(422, 'Fester\'s Quest', 1, NULL, NULL, NULL, '', 'festers-quest', 0, 0, 0),
(423, 'Final Fantasy', 1, NULL, NULL, NULL, '', 'final-fantasy', 0, 0, 0),
(424, 'Fire \'n Ice', 1, NULL, NULL, NULL, '', 'fire-n-ice', 0, 0, 0),
(425, 'Fisher-Price: Firehouse Rescue', 1, NULL, NULL, NULL, '', 'fisher-price-firehouse-rescue', 0, 0, 0),
(426, 'Fisher-Price: I Can Remember', 1, NULL, NULL, NULL, '', 'fisher-price-i-can-remember', 0, 0, 0),
(427, 'Fisher-Price: Perfect Fit', 1, NULL, NULL, NULL, '', 'fisher-price-perfect-fit', 0, 0, 0),
(428, 'Fist of the North Star', 1, NULL, NULL, NULL, '', 'fist-of-the-north-star', 0, 0, 0),
(429, 'Flight of the Intruder', 1, NULL, NULL, NULL, '', 'flight-of-the-intruder', 0, 0, 0),
(430, 'The Flintstones: The Rescue of Dino & Hoppy', 1, NULL, NULL, NULL, '', 'the-flintstones-the-rescue-of-dino-and-hoppy', 0, 0, 0),
(431, 'Mattel (AU)', 1, NULL, NULL, NULL, '', 'mattel-au', 0, 0, 0),
(432, 'The Flintstones: Surprise at Dinosaur Peak', 1, NULL, NULL, NULL, '', 'the-flintstones-surprise-at-dinosaur-peak', 0, 0, 0),
(433, 'Flying Dragon: The Secret Scroll', 1, NULL, NULL, NULL, '', 'flying-dragon-the-secret-scroll', 0, 0, 0),
(434, 'Flying Warriors', 1, NULL, NULL, NULL, '', 'flying-warriors', 0, 0, 0),
(435, 'Formula One: Built to Win', 1, NULL, NULL, NULL, '', 'formula-one-built-to-win', 0, 0, 0),
(436, 'Formula One Sensation', 1, NULL, NULL, NULL, '', 'formula-one-sensation', 0, 0, 0),
(437, 'Frankenstein: The Monster Returns', 1, NULL, NULL, NULL, '', 'frankenstein-the-monster-returns', 0, 0, 0),
(438, 'Freedom Force', 1, NULL, NULL, NULL, '', 'freedom-force', 0, 0, 0),
(439, 'Friday the 13th', 1, NULL, NULL, NULL, '', 'friday-the-13th', 0, 0, 0),
(440, 'Fun House', 1, NULL, NULL, NULL, '', 'fun-house', 0, 0, 0),
(441, 'G.I. Joe: A Real American Hero', 1, NULL, NULL, NULL, '', 'gi-joe-a-real-american-hero', 0, 0, 0),
(442, 'G.I. Joe: The Atlantis Factor', 1, NULL, NULL, NULL, '', 'gi-joe-the-atlantis-factor', 0, 0, 0),
(443, 'Galaga', 1, NULL, NULL, NULL, '', 'galaga', 0, 0, 0),
(444, 'Galaxy 5000', 1, NULL, NULL, NULL, '', 'galaxy-5000', 0, 0, 0),
(445, 'Gargoyle\'s Quest II', 1, NULL, NULL, NULL, '', 'gargoyles-quest-ii', 0, 0, 0),
(446, 'Gauntlet', 1, NULL, NULL, NULL, '', 'gauntlet', 0, 0, 0),
(447, 'Gauntlet II', 1, NULL, NULL, NULL, '', 'gauntlet-ii', 0, 0, 0),
(448, 'Gemfire', 1, NULL, NULL, NULL, '', 'gemfire', 0, 0, 0),
(449, 'Genghis Khan', 1, NULL, NULL, NULL, '', 'genghis-khan', 0, 0, 0),
(450, 'George Foreman\'s KO Boxing', 1, NULL, NULL, NULL, '', 'george-foremans-ko-boxing', 0, 0, 0),
(451, 'Ghostbusters', 1, NULL, NULL, NULL, '', 'ghostbusters', 0, 0, 0),
(452, 'Ghostbusters II', 1, NULL, NULL, NULL, '', 'ghostbusters-ii', 0, 0, 0),
(453, 'Ghosts\'n Goblins', 1, NULL, NULL, NULL, '', 'ghostsn-goblins', 0, 0, 0),
(454, 'Ghoul School', 1, NULL, NULL, NULL, '', 'ghoul-school', 0, 0, 0),
(455, 'Goal!', 1, NULL, NULL, NULL, '', 'goal', 0, 0, 0),
(456, 'Goal! Two', 1, NULL, NULL, NULL, '', 'goal-two', 0, 0, 0),
(457, 'Godzilla: Monster of Monsters', 1, NULL, NULL, NULL, '', 'godzilla-monster-of-monsters', 0, 0, 0),
(458, 'Godzilla 2: War of the Monsters', 1, NULL, NULL, NULL, '', 'godzilla-2-war-of-the-monsters', 0, 0, 0),
(459, 'Golf', 1, NULL, NULL, NULL, '', 'golf', 0, 0, 0),
(460, 'Golf Grand Slam', 1, NULL, NULL, NULL, '', 'golf-grand-slam', 0, 0, 0),
(461, 'Golgo 13: Top Secret Episode', 1, NULL, NULL, NULL, '', 'golgo-13-top-secret-episode', 0, 0, 0),
(462, 'The Goonies II', 1, NULL, NULL, NULL, '', 'the-goonies-ii', 0, 0, 0),
(463, 'Gotcha! The Sport!', 1, NULL, NULL, NULL, '', 'gotcha-the-sport', 0, 0, 0),
(464, 'Gradius', 1, NULL, NULL, NULL, '', 'gradius', 0, 0, 0),
(465, 'The Great Waldo Search', 1, NULL, NULL, NULL, '', 'the-great-waldo-search', 0, 0, 0),
(466, 'Greg Norman\'s Golf Power', 1, NULL, NULL, NULL, '', 'greg-normans-golf-power', 0, 0, 0),
(467, 'Gremlins 2: The New Batch', 1, NULL, NULL, NULL, '', 'gremlins-2-the-new-batch', 0, 0, 0),
(468, 'The Guardian Legend', 1, NULL, NULL, NULL, '', 'the-guardian-legend', 0, 0, 0),
(469, 'Nintendo (NA/EU)', 1, NULL, NULL, NULL, '', 'nintendo-naeu', 0, 0, 0),
(470, 'Guerrilla War', 1, NULL, NULL, NULL, '', 'guerrilla-war', 0, 0, 0),
(471, 'Gumshoe', 1, NULL, NULL, NULL, '', 'gumshoe', 0, 0, 0),
(472, 'Gun-Nac', 1, NULL, NULL, NULL, '', 'gun-nac', 0, 0, 0),
(473, 'Gun.Smoke', 1, NULL, NULL, NULL, '', 'gunsmoke', 0, 0, 0),
(474, 'Gyromite', 1, NULL, NULL, NULL, '', 'gyromite', 0, 0, 0),
(475, 'Gyruss', 1, NULL, NULL, NULL, '', 'gyruss', 0, 0, 0),
(476, 'Hammerin\' Harry', 1, NULL, NULL, NULL, '', 'hammerin-harry', 0, 0, 0),
(477, 'Harlem Globetrotters', 1, NULL, NULL, NULL, '', 'harlem-globetrotters', 0, 0, 0),
(478, 'Hatris', 1, NULL, NULL, NULL, '', 'hatris', 0, 0, 0),
(479, 'Heavy Barrel', 1, NULL, NULL, NULL, '', 'heavy-barrel', 0, 0, 0),
(480, 'Heavy Shreddin\'', 1, NULL, NULL, NULL, '', 'heavy-shreddin', 0, 0, 0),
(481, 'High Speed', 1, NULL, NULL, NULL, '', 'high-speed', 0, 0, 0),
(482, 'Hogan\'s Alley', 1, NULL, NULL, NULL, '', 'hogans-alley', 0, 0, 0),
(483, 'Hollywood Squares', 1, NULL, NULL, NULL, '', 'hollywood-squares', 0, 0, 0),
(484, 'Home Alone', 1, NULL, NULL, NULL, '', 'home-alone', 0, 0, 0),
(485, 'Home Alone 2: Lost in New York', 1, NULL, NULL, NULL, '', 'home-alone-2-lost-in-new-york', 0, 0, 0),
(486, 'Hook', 1, NULL, NULL, NULL, '', 'hook', 0, 0, 0),
(487, 'Hoops', 1, NULL, NULL, NULL, '', 'hoops', 0, 0, 0),
(488, 'Hudson Hawk', 1, NULL, NULL, NULL, '', 'hudson-hawk', 0, 0, 0),
(489, 'The Hunt for Red October', 1, NULL, NULL, NULL, '', 'the-hunt-for-red-october', 0, 0, 0),
(490, 'Hydlide', 1, NULL, NULL, NULL, '', 'hydlide', 0, 0, 0),
(491, 'Ice Climber', 1, NULL, NULL, NULL, '', 'ice-climber', 0, 0, 0),
(492, 'Ice Hockey', 1, NULL, NULL, NULL, '', 'ice-hockey', 0, 0, 0),
(493, 'Ikari Warriors', 1, NULL, NULL, NULL, '', 'ikari-warriors', 0, 0, 0),
(494, 'Ikari Warriors II: Victory Road', 1, NULL, NULL, NULL, '', 'ikari-warriors-ii-victory-road', 0, 0, 0),
(495, 'Ikari Warriors III: The Rescue', 1, NULL, NULL, NULL, '', 'ikari-warriors-iii-the-rescue', 0, 0, 0),
(496, 'Image Fight', 1, NULL, NULL, NULL, '', 'image-fight', 0, 0, 0),
(497, 'The Immortal', 1, NULL, NULL, NULL, '', 'the-immortal', 0, 0, 0),
(498, 'The Incredible Crash Dummies', 1, NULL, NULL, NULL, '', 'the-incredible-crash-dummies', 0, 0, 0),
(499, 'Indiana Jones and the Last Crusade', 1, NULL, NULL, NULL, '', 'indiana-jones-and-the-last-crusade', 0, 0, 0),
(503, 'Indiana Jones and the Temple of Doom', 1, NULL, NULL, NULL, '', 'indiana-jones-and-the-temple-of-doom', 0, 0, 0),
(504, 'Infiltrator', 1, NULL, NULL, NULL, '', 'infiltrator', 0, 0, 0),
(505, 'International Cricket', 1, NULL, NULL, NULL, '', 'international-cricket', 0, 0, 0),
(506, 'Iron Tank', 1, NULL, NULL, NULL, '', 'iron-tank', 0, 0, 0),
(507, 'Ironsword: Wizards & Warriors II', 1, NULL, NULL, NULL, '', 'ironsword-wizards-and-warriors-ii', 0, 0, 0),
(508, 'Isolated Warrior', 1, NULL, NULL, NULL, '', 'isolated-warrior', 0, 0, 0),
(509, 'Ivan \'Ironman\' Stewart\'s Super Off Road', 1, NULL, NULL, NULL, '', 'ivan-ironman-stewarts-super-off-road', 0, 0, 0),
(510, 'Jack Nicklaus\' Greatest 18 Holes of Major Championship Golf', 1, NULL, NULL, NULL, '', 'jack-nicklaus-greatest-18-holes-of-major-championship-golf', 0, 0, 0),
(511, 'Jackal', 1, NULL, NULL, NULL, '', 'jackal', 0, 0, 0),
(512, 'Jackie Chan\'s Action Kung Fu', 1, NULL, NULL, NULL, '', 'jackie-chans-action-kung-fu', 0, 0, 0),
(513, 'James Bond Jr.', 1, NULL, NULL, NULL, '', 'james-bond-jr', 0, 0, 0),
(514, 'Jaws', 1, NULL, NULL, NULL, '', 'jaws', 0, 0, 0),
(515, 'Jeopardy!', 1, NULL, NULL, NULL, '', 'jeopardy', 0, 0, 0),
(516, 'Jeopardy! 25th Anniversary Edition', 1, NULL, NULL, NULL, '', 'jeopardy-25th-anniversary-edition', 0, 0, 0),
(517, 'Jeopardy! Junior Edition', 1, NULL, NULL, NULL, '', 'jeopardy-junior-edition', 0, 0, 0),
(518, 'The Jetsons: Cogswell\'s Caper!', 1, NULL, NULL, NULL, '', 'the-jetsons-cogswells-caper', 0, 0, 0),
(519, 'Jimmy Connors Tennis', 1, NULL, NULL, NULL, '', 'jimmy-connors-tennis', 0, 0, 0),
(520, 'Joe & Mac', 1, NULL, NULL, NULL, '', 'joe-and-mac', 0, 0, 0),
(521, 'John Elway\'s Quarterback', 1, NULL, NULL, NULL, '', 'john-elways-quarterback', 0, 0, 0),
(522, 'Jordan vs. Bird: One on One', 1, NULL, NULL, NULL, '', 'jordan-vs-bird-one-on-one', 0, 0, 0),
(523, 'Journey to Silius', 1, NULL, NULL, NULL, '', 'journey-to-silius', 0, 0, 0),
(524, 'Joust', 1, NULL, NULL, NULL, '', 'joust', 0, 0, 0),
(525, 'Jurassic Park', 1, NULL, NULL, NULL, '', 'jurassic-park', 0, 0, 0),
(526, 'Kabuki Quantum Fighter', 1, NULL, NULL, NULL, '', 'kabuki-quantum-fighter', 0, 0, 0),
(527, 'Karate Champ', 1, NULL, NULL, NULL, '', 'karate-champ', 0, 0, 0),
(528, 'The Karate Kid', 1, NULL, NULL, NULL, '', 'the-karate-kid', 0, 0, 0),
(529, 'Karnov', 1, NULL, NULL, NULL, '', 'karnov', 0, 0, 0),
(530, 'Kick Master', 1, NULL, NULL, NULL, '', 'kick-master', 0, 0, 0),
(531, 'Kick Off', 1, NULL, NULL, NULL, '', 'kick-off', 0, 0, 0),
(532, 'Kickle Cubicle', 1, NULL, NULL, NULL, '', 'kickle-cubicle', 0, 0, 0),
(533, 'Kid Icarus', 1, NULL, NULL, NULL, '', 'kid-icarus', 0, 0, 0),
(534, 'Kid Klown in Night Mayor World', 1, NULL, NULL, NULL, '', 'kid-klown-in-night-mayor-world', 0, 0, 0),
(535, 'Kid Kool', 1, NULL, NULL, NULL, '', 'kid-kool', 0, 0, 0),
(536, 'Kid Niki: Radical Ninja', 1, NULL, NULL, NULL, '', 'kid-niki-radical-ninja', 0, 0, 0),
(537, 'King\'s Knight', 1, NULL, NULL, NULL, '', 'kings-knight', 0, 0, 0),
(538, 'Kings of the Beach', 1, NULL, NULL, NULL, '', 'kings-of-the-beach', 0, 0, 0),
(539, 'King\'s Quest V: Absence Makes the Heart Go Yonder!', 1, NULL, NULL, NULL, '', 'kings-quest-v-absence-makes-the-heart-go-yonder', 0, 0, 0),
(540, 'Kirby\'s Adventure', 1, NULL, NULL, NULL, '', 'kirbys-adventure', 0, 0, 0),
(541, 'HAL America', 1, NULL, NULL, NULL, '', 'hal-america', 0, 0, 0),
(542, 'KlashBall', 1, NULL, NULL, NULL, '', 'klashball', 0, 0, 0),
(543, 'Knight Rider', 1, NULL, NULL, NULL, '', 'knight-rider', 0, 0, 0),
(544, 'Konami Hyper Soccer', 1, NULL, NULL, NULL, '', 'konami-hyper-soccer', 0, 0, 0),
(545, 'The Krion Conquest', 1, NULL, NULL, NULL, '', 'the-krion-conquest', 0, 0, 0),
(546, 'Krusty\'s Fun House', 1, NULL, NULL, NULL, '', 'krustys-fun-house', 0, 0, 0),
(547, 'Kung-Fu', 1, NULL, NULL, NULL, '', 'kung-fu', 0, 0, 0),
(548, 'Kung-Fu Heroes', 1, NULL, NULL, NULL, '', 'kung-fu-heroes', 0, 0, 0),
(549, 'Laser Invasion', 1, NULL, NULL, NULL, '', 'laser-invasion', 0, 0, 0),
(550, 'Last Action Hero', 1, NULL, NULL, NULL, '', 'last-action-hero', 0, 0, 0),
(551, 'The Last Ninja', 1, NULL, NULL, NULL, '', 'the-last-ninja', 0, 0, 0),
(552, 'The Last Starfighter', 1, NULL, NULL, NULL, '', 'the-last-starfighter', 0, 0, 0),
(553, 'Lee Trevino\'s Fighting Golf', 1, NULL, NULL, NULL, '', 'lee-trevinos-fighting-golf', 0, 0, 0),
(554, 'Legacy of the Wizard', 1, NULL, NULL, NULL, '', 'legacy-of-the-wizard', 0, 0, 0),
(555, 'Legend of the Ghost Lion', 1, NULL, NULL, NULL, '', 'legend-of-the-ghost-lion', 0, 0, 0),
(556, 'The Legend of Kage', 1, NULL, NULL, NULL, '', 'the-legend-of-kage', 0, 0, 0),
(557, 'The Legend of Prince Valiant', 1, NULL, NULL, NULL, '', 'the-legend-of-prince-valiant', 0, 0, 0),
(558, 'The Legend of Zelda', 1, NULL, NULL, NULL, '', 'the-legend-of-zelda', 0, 0, 0),
(559, 'Legendary Wings', 1, NULL, NULL, NULL, '', 'legendary-wings', 0, 0, 0),
(560, 'Legends of the Diamond', 1, NULL, NULL, NULL, '', 'legends-of-the-diamond', 0, 0, 0),
(561, 'Lemmings', 1, NULL, NULL, NULL, '', 'lemmings', 0, 0, 0),
(562, 'L\'Empereur', 1, NULL, NULL, NULL, '', 'lempereur', 0, 0, 0),
(563, 'Lethal Weapon', 1, NULL, NULL, NULL, '', 'lethal-weapon', 0, 0, 0),
(564, 'Life Force', 1, NULL, NULL, NULL, '', 'life-force', 0, 0, 0),
(565, 'Little League Baseball: Championship Series', 1, NULL, NULL, NULL, '', 'little-league-baseball-championship-series', 0, 0, 0),
(566, 'Little Nemo: The Dream Master', 1, NULL, NULL, NULL, '', 'little-nemo-the-dream-master', 0, 0, 0),
(567, 'Little Ninja Brothers', 1, NULL, NULL, NULL, '', 'little-ninja-brothers', 0, 0, 0),
(568, 'Little Samson', 1, NULL, NULL, NULL, '', 'little-samson', 0, 0, 0),
(569, 'Lode Runner', 1, NULL, NULL, NULL, '', 'lode-runner', 0, 0, 0),
(570, 'The Lone Ranger', 1, NULL, NULL, NULL, '', 'the-lone-ranger', 0, 0, 0),
(571, 'Loopz', 1, NULL, NULL, NULL, '', 'loopz', 0, 0, 0),
(572, 'Low G Man: The Low Gravity Man', 1, NULL, NULL, NULL, '', 'low-g-man-the-low-gravity-man', 0, 0, 0),
(573, 'Lunar Pool', 1, NULL, NULL, NULL, '', 'lunar-pool', 0, 0, 0),
(574, 'M.C. Kids', 1, NULL, NULL, NULL, '', 'mc-kids', 0, 0, 0),
(575, 'M.U.L.E.', 1, NULL, NULL, NULL, '', 'mule', 0, 0, 0),
(576, 'M.U.S.C.L.E.', 1, NULL, NULL, NULL, '', 'muscle', 0, 0, 0),
(577, 'Mach Rider', 1, NULL, NULL, NULL, '', 'mach-rider', 0, 0, 0),
(578, 'Mad Max', 1, NULL, NULL, NULL, '', 'mad-max', 0, 0, 0),
(579, 'The Mafat Conspiracy', 1, NULL, NULL, NULL, '', 'the-mafat-conspiracy', 0, 0, 0),
(580, 'Magic Darts', 1, NULL, NULL, NULL, '', 'magic-darts', 0, 0, 0),
(581, 'Magic Johnson\'s Fast Break', 1, NULL, NULL, NULL, '', 'magic-johnsons-fast-break', 0, 0, 0),
(582, 'The Magic of Scheherazade', 1, NULL, NULL, NULL, '', 'the-magic-of-scheherazade', 0, 0, 0),
(583, 'Magician', 1, NULL, NULL, NULL, '', 'magician', 0, 0, 0),
(584, 'MagMax', 1, NULL, NULL, NULL, '', 'magmax', 0, 0, 0),
(585, 'Major League Baseball', 1, NULL, NULL, NULL, '', 'major-league-baseball', 0, 0, 0),
(586, 'Maniac Mansion', 1, NULL, NULL, NULL, '', 'maniac-mansion', 0, 0, 0),
(587, 'Mappy-Land', 1, NULL, NULL, NULL, '', 'mappy-land', 0, 0, 0),
(588, 'Marble Madness', 1, NULL, NULL, NULL, '', 'marble-madness', 0, 0, 0),
(589, 'Mario Bros.', 1, NULL, NULL, NULL, '', 'mario-bros', 0, 0, 0),
(590, 'Mario Is Missing!', 1, NULL, NULL, NULL, '', 'mario-is-missing', 0, 0, 0),
(591, 'Mario\'s Time Machine', 1, NULL, NULL, NULL, '', 'marios-time-machine', 0, 0, 0),
(592, 'Mechanized Attack', 1, NULL, NULL, NULL, '', 'mechanized-attack', 0, 0, 0),
(593, 'Mega Man', 1, NULL, NULL, NULL, '', 'mega-man', 0, 0, 0),
(594, 'Mega Man 2', 1, NULL, NULL, NULL, '', 'mega-man-2', 0, 0, 0),
(595, 'Mega Man 3', 1, NULL, NULL, NULL, '', 'mega-man-3', 0, 0, 0),
(596, 'Mega Man 4', 1, NULL, NULL, NULL, '', 'mega-man-4', 0, 0, 0),
(597, 'Mega Man 5', 1, NULL, NULL, NULL, '', 'mega-man-5', 0, 0, 0),
(598, 'Mega Man 6', 1, NULL, NULL, NULL, '', 'mega-man-6', 0, 0, 0),
(599, 'Nintendo (NA)', 1, NULL, NULL, NULL, '', 'nintendo-na', 0, 0, 0),
(600, 'Mendel Palace', 1, NULL, NULL, NULL, '', 'mendel-palace', 0, 0, 0),
(601, 'Metal Gear', 1, NULL, NULL, NULL, '', 'metal-gear', 0, 0, 0),
(602, 'Metal Mech', 1, NULL, NULL, NULL, '', 'metal-mech', 0, 0, 0),
(603, 'Metal Storm', 1, NULL, NULL, NULL, '', 'metal-storm', 0, 0, 0),
(604, 'Metroid', 1, NULL, NULL, NULL, '', 'metroid', 0, 0, 0),
(605, 'Michael Andretti\'s World GP', 1, NULL, NULL, NULL, '', 'michael-andrettis-world-gp', 0, 0, 0),
(606, 'Mickey Mousecapade', 1, NULL, NULL, NULL, '', 'mickey-mousecapade', 0, 0, 0),
(607, 'Mickey\'s Adventures in Numberland', 1, NULL, NULL, NULL, '', 'mickeys-adventures-in-numberland', 0, 0, 0),
(608, 'Mickey\'s Safari in Letterland', 1, NULL, NULL, NULL, '', 'mickeys-safari-in-letterland', 0, 0, 0),
(609, 'Might and Magic Book One: The Secret of the Inner Sanctum', 1, NULL, NULL, NULL, '', 'might-and-magic-book-one-the-secret-of-the-inner-sanctum', 0, 0, 0),
(610, 'Mighty Bomb Jack', 1, NULL, NULL, NULL, '', 'mighty-bomb-jack', 0, 0, 0),
(611, 'Mighty Final Fight', 1, NULL, NULL, NULL, '', 'mighty-final-fight', 0, 0, 0),
(612, 'Mike Tyson\'s Punch-Out!!', 1, NULL, NULL, NULL, '', 'mike-tysons-punch-out', 0, 0, 0),
(613, 'Millipede', 1, NULL, NULL, NULL, '', 'millipede', 0, 0, 0),
(614, 'Milon\'s Secret Castle', 1, NULL, NULL, NULL, '', 'milons-secret-castle', 0, 0, 0),
(615, 'Miracle Piano Teaching System', 1, NULL, NULL, NULL, '', 'miracle-piano-teaching-system', 0, 0, 0),
(616, 'Mission: Impossible', 1, NULL, NULL, NULL, '', 'mission-impossible', 0, 0, 0),
(617, 'Monopoly', 1, NULL, NULL, NULL, '', 'monopoly', 0, 0, 0),
(618, 'Monster in My Pocket', 1, NULL, NULL, NULL, '', 'monster-in-my-pocket', 0, 0, 0),
(619, 'Monster Party', 1, NULL, NULL, NULL, '', 'monster-party', 0, 0, 0),
(620, 'Monster Truck Rally', 1, NULL, NULL, NULL, '', 'monster-truck-rally', 0, 0, 0),
(621, 'Motor City Patrol', 1, NULL, NULL, NULL, '', 'motor-city-patrol', 0, 0, 0),
(622, 'Mr. Gimmick!', 1, NULL, NULL, NULL, '', 'mr-gimmick', 0, 0, 0),
(623, 'Ms. Pac-Man', 1, NULL, NULL, NULL, '', 'ms-pac-man', 0, 0, 0),
(624, 'Muppet Adventure: Chaos at the Carnival', 1, NULL, NULL, NULL, '', 'muppet-adventure-chaos-at-the-carnival', 0, 0, 0),
(625, 'The Mutant Virus: Crisis in a Computer World', 1, NULL, NULL, NULL, '', 'the-mutant-virus-crisis-in-a-computer-world', 0, 0, 0),
(626, 'Mystery Quest', 1, NULL, NULL, NULL, '', 'mystery-quest', 0, 0, 0),
(627, 'NARC', 1, NULL, NULL, NULL, '', 'narc', 0, 0, 0),
(628, 'NES Open Tournament Golf', 1, NULL, NULL, NULL, '', 'nes-open-tournament-golf', 0, 0, 0),
(629, 'NES Play Action Football', 1, NULL, NULL, NULL, '', 'nes-play-action-football', 0, 0, 0),
(630, 'New Ghostbusters II', 1, NULL, NULL, NULL, '', 'new-ghostbusters-ii', 0, 0, 0),
(631, 'Kiwi Kraze (NA)', 1, NULL, NULL, NULL, '', 'kiwi-kraze-na', 0, 0, 0),
(632, 'The NewZealand Story (EU/AU)', 1, NULL, NULL, NULL, '', 'the-newzealand-story-euau', 0, 0, 0),
(633, 'Ocean Software (EU/AU)', 1, NULL, NULL, NULL, '', 'ocean-software-euau', 0, 0, 0),
(634, 'NFL', 1, NULL, NULL, NULL, '', 'nfl', 0, 0, 0),
(635, 'Nigel Mansell\'s World Championship Racing', 1, NULL, NULL, NULL, '', 'nigel-mansells-world-championship-racing', 0, 0, 0),
(636, 'A Nightmare on Elm Street', 1, NULL, NULL, NULL, '', 'a-nightmare-on-elm-street', 0, 0, 0),
(637, 'Nightshade', 1, NULL, NULL, NULL, '', 'nightshade', 0, 0, 0),
(638, 'Ninja Crusaders', 1, NULL, NULL, NULL, '', 'ninja-crusaders', 0, 0, 0),
(639, 'Ninja Gaiden', 1, NULL, NULL, NULL, '', 'ninja-gaiden', 0, 0, 0),
(640, 'Ninja Gaiden II: The Dark Sword of Chaos', 1, NULL, NULL, NULL, '', 'ninja-gaiden-ii-the-dark-sword-of-chaos', 0, 0, 0),
(641, 'Ninja Gaiden III: The Ancient Ship of Doom', 1, NULL, NULL, NULL, '', 'ninja-gaiden-iii-the-ancient-ship-of-doom', 0, 0, 0),
(642, 'Ninja Kid', 1, NULL, NULL, NULL, '', 'ninja-kid', 0, 0, 0),
(643, 'Nintendo Campus Challenge', 1, NULL, NULL, NULL, '', 'nintendo-campus-challenge', 0, 0, 0),
(644, 'Nintendo World Championships', 1, NULL, NULL, NULL, '', 'nintendo-world-championships', 0, 0, 0),
(645, 'Nintendo World Cup', 1, NULL, NULL, NULL, '', 'nintendo-world-cup', 0, 0, 0),
(646, 'Noah\'s Ark', 1, NULL, NULL, NULL, '', 'noahs-ark', 0, 0, 0),
(647, 'Nobunaga\'s Ambition', 1, NULL, NULL, NULL, '', 'nobunagas-ambition', 0, 0, 0),
(648, 'Nobunaga\'s Ambition II', 1, NULL, NULL, NULL, '', 'nobunagas-ambition-ii', 0, 0, 0),
(649, 'North & South', 1, NULL, NULL, NULL, '', 'north-and-south', 0, 0, 0),
(650, 'Operation Wolf', 1, NULL, NULL, NULL, '', 'operation-wolf', 0, 0, 0),
(651, 'Orb-3D', 1, NULL, NULL, NULL, '', 'orb-3d', 0, 0, 0),
(652, 'Othello', 1, NULL, NULL, NULL, '', 'othello', 0, 0, 0),
(653, 'Over Horizon', 1, NULL, NULL, NULL, '', 'over-horizon', 0, 0, 0),
(654, 'Overlord', 1, NULL, NULL, NULL, '', 'overlord', 0, 0, 0),
(655, 'P.O.W.: Prisoners of War', 1, NULL, NULL, NULL, '', 'pow-prisoners-of-war', 0, 0, 0),
(656, 'Pac-Man', 1, NULL, NULL, NULL, '', 'pac-man', 0, 0, 0),
(657, 'Palamedes', 1, NULL, NULL, NULL, '', 'palamedes', 0, 0, 0),
(658, 'Panic Restaurant', 1, NULL, NULL, NULL, '', 'panic-restaurant', 0, 0, 0),
(659, 'Paperboy', 1, NULL, NULL, NULL, '', 'paperboy', 0, 0, 0),
(660, 'Paperboy 2', 1, NULL, NULL, NULL, '', 'paperboy-2', 0, 0, 0),
(661, 'Parasol Stars: The Story of Bubble Bobble 3', 1, NULL, NULL, NULL, '', 'parasol-stars-the-story-of-bubble-bobble-3', 0, 0, 0),
(662, 'Ocean Software', 1, NULL, NULL, NULL, '', 'ocean-software', 0, 0, 0),
(663, 'Parodius Da!', 1, NULL, NULL, NULL, '', 'parodius-da', 0, 0, 0),
(664, 'Peter Pan and the Pirates', 1, NULL, NULL, NULL, '', 'peter-pan-and-the-pirates', 0, 0, 0),
(665, 'Phantom Fighter', 1, NULL, NULL, NULL, '', 'phantom-fighter', 0, 0, 0),
(666, 'Pictionary', 1, NULL, NULL, NULL, '', 'pictionary', 0, 0, 0),
(667, 'Pinball', 1, NULL, NULL, NULL, '', 'pinball', 0, 0, 0),
(668, 'Pinball Quest', 1, NULL, NULL, NULL, '', 'pinball-quest', 0, 0, 0),
(669, 'Pin*Bot', 1, NULL, NULL, NULL, '', 'pinbot', 0, 0, 0),
(670, 'Pipe Dream', 1, NULL, NULL, NULL, '', 'pipe-dream', 0, 0, 0),
(671, 'Pirates!', 1, NULL, NULL, NULL, '', 'pirates', 0, 0, 0),
(672, 'Platoon', 1, NULL, NULL, NULL, '', 'platoon', 0, 0, 0),
(673, 'Popeye', 1, NULL, NULL, NULL, '', 'popeye', 0, 0, 0),
(674, 'Power Blade', 1, NULL, NULL, NULL, '', 'power-blade', 0, 0, 0),
(675, 'Power Blade 2', 1, NULL, NULL, NULL, '', 'power-blade-2', 0, 0, 0),
(676, 'Power Punch II', 1, NULL, NULL, NULL, '', 'power-punch-ii', 0, 0, 0),
(677, 'Predator: Soon the Hunt Will Begin', 1, NULL, NULL, NULL, '', 'predator-soon-the-hunt-will-begin', 0, 0, 0),
(678, 'Prince of Persia', 1, NULL, NULL, NULL, '', 'prince-of-persia', 0, 0, 0),
(679, 'Princess Tomato in the Salad Kingdom', 1, NULL, NULL, NULL, '', 'princess-tomato-in-the-salad-kingdom', 0, 0, 0),
(680, 'Pro Sport Hockey', 1, NULL, NULL, NULL, '', 'pro-sport-hockey', 0, 0, 0),
(681, 'Pro Wrestling', 1, NULL, NULL, NULL, '', 'pro-wrestling', 0, 0, 0),
(682, 'The Punisher', 1, NULL, NULL, NULL, '', 'the-punisher', 0, 0, 0),
(683, 'Puss \'n Boots: Pero\'s Great Adventure', 1, NULL, NULL, NULL, '', 'puss-n-boots-peros-great-adventure', 0, 0, 0),
(684, 'Puzznic', 1, NULL, NULL, NULL, '', 'puzznic', 0, 0, 0),
(685, 'Q*bert', 1, NULL, NULL, NULL, '', 'qbert', 0, 0, 0),
(686, 'Qix', 1, NULL, NULL, NULL, '', 'qix', 0, 0, 0),
(687, 'R.B.I. Baseball', 1, NULL, NULL, NULL, '', 'rbi-baseball', 0, 0, 0),
(688, 'R.C. Pro-Am', 1, NULL, NULL, NULL, '', 'rc-pro-am', 0, 0, 0),
(689, 'R.C. Pro-Am II', 1, NULL, NULL, NULL, '', 'rc-pro-am-ii', 0, 0, 0),
(690, 'Race America', 1, NULL, NULL, NULL, '', 'race-america', 0, 0, 0),
(691, 'Racket Attack', 1, NULL, NULL, NULL, '', 'racket-attack', 0, 0, 0),
(692, 'Rackets & Rivals', 1, NULL, NULL, NULL, '', 'rackets-and-rivals', 0, 0, 0),
(693, 'Rad Racer', 1, NULL, NULL, NULL, '', 'rad-racer', 0, 0, 0),
(694, 'Rad Racer II', 1, NULL, NULL, NULL, '', 'rad-racer-ii', 0, 0, 0),
(695, 'Raid on Bungeling Bay', 1, NULL, NULL, NULL, '', 'raid-on-bungeling-bay', 0, 0, 0),
(696, 'Rainbow Islands: The Story of Bubble Bobble 2', 1, NULL, NULL, NULL, '', 'rainbow-islands-the-story-of-bubble-bobble-2', 0, 0, 0),
(697, 'Rally Bike', 1, NULL, NULL, NULL, '', 'rally-bike', 0, 0, 0),
(698, 'Rambo', 1, NULL, NULL, NULL, '', 'rambo', 0, 0, 0),
(699, 'Rampage', 1, NULL, NULL, NULL, '', 'rampage', 0, 0, 0),
(700, 'Rampart', 1, NULL, NULL, NULL, '', 'rampart', 0, 0, 0),
(701, 'Remote Control', 1, NULL, NULL, NULL, '', 'remote-control', 0, 0, 0),
(702, 'The Ren & Stimpy Show: Buckaroo$!', 1, NULL, NULL, NULL, '', 'the-ren-and-stimpy-show-buckaroodollar', 0, 0, 0),
(703, 'Renegade', 1, NULL, NULL, NULL, '', 'renegade', 0, 0, 0),
(704, 'Rescue: The Embassy Mission', 1, NULL, NULL, NULL, '', 'rescue-the-embassy-mission', 0, 0, 0),
(705, 'Ring King', 1, NULL, NULL, NULL, '', 'ring-king', 0, 0, 0),
(706, 'River City Ransom', 1, NULL, NULL, NULL, '', 'river-city-ransom', 0, 0, 0),
(707, 'Road Fighter', 1, NULL, NULL, NULL, '', 'road-fighter', 0, 0, 0),
(708, 'RoadBlasters', 1, NULL, NULL, NULL, '', 'roadblasters', 0, 0, 0),
(709, 'Robin Hood: Prince of Thieves', 1, NULL, NULL, NULL, '', 'robin-hood-prince-of-thieves', 0, 0, 0),
(710, 'RoboCop', 1, NULL, NULL, NULL, '', 'robocop', 0, 0, 0),
(711, 'RoboCop 2', 1, NULL, NULL, NULL, '', 'robocop-2', 0, 0, 0),
(712, 'RoboCop 3', 1, NULL, NULL, NULL, '', 'robocop-3', 0, 0, 0),
(713, 'Robowarrior', 1, NULL, NULL, NULL, '', 'robowarrior', 0, 0, 0),
(714, 'Rock \'n Ball', 1, NULL, NULL, NULL, '', 'rock-n-ball', 0, 0, 0),
(715, 'Rocket Ranger', 1, NULL, NULL, NULL, '', 'rocket-ranger', 0, 0, 0),
(716, 'The Rocketeer', 1, NULL, NULL, NULL, '', 'the-rocketeer', 0, 0, 0),
(717, 'Rockin\' Kats', 1, NULL, NULL, NULL, '', 'rockin-kats', 0, 0, 0),
(718, 'Rod Land', 1, NULL, NULL, NULL, '', 'rod-land', 0, 0, 0),
(719, 'Roger Clemens\' MVP Baseball', 1, NULL, NULL, NULL, '', 'roger-clemens-mvp-baseball', 0, 0, 0),
(720, 'Rollerball', 1, NULL, NULL, NULL, '', 'rollerball', 0, 0, 0),
(721, 'Rollerblade Racer', 1, NULL, NULL, NULL, '', 'rollerblade-racer', 0, 0, 0),
(722, 'RollerGames', 1, NULL, NULL, NULL, '', 'rollergames', 0, 0, 0),
(723, 'Romance of the Three Kingdoms', 1, NULL, NULL, NULL, '', 'romance-of-the-three-kingdoms', 0, 0, 0),
(724, 'Romance of the Three Kingdoms II', 1, NULL, NULL, NULL, '', 'romance-of-the-three-kingdoms-ii', 0, 0, 0),
(725, 'Roundball: 2 on 2 Challenge', 1, NULL, NULL, NULL, '', 'roundball-2-on-2-challenge', 0, 0, 0),
(726, 'Rush\'n Attack', 1, NULL, NULL, NULL, '', 'rushn-attack', 0, 0, 0),
(727, 'Rygar', 1, NULL, NULL, NULL, '', 'rygar', 0, 0, 0),
(728, 'S.C.A.T.: Special Cybernetic Attack Team', 1, NULL, NULL, NULL, '', 'scat-special-cybernetic-attack-team', 0, 0, 0),
(729, 'Section Z', 1, NULL, NULL, NULL, '', 'section-z', 0, 0, 0),
(730, 'Seicross', 1, NULL, NULL, NULL, '', 'seicross', 0, 0, 0),
(731, 'Sesame Street: 1-2-3', 1, NULL, NULL, NULL, '', 'sesame-street-1-2-3', 0, 0, 0),
(732, 'Sesame Street: A-B-C', 1, NULL, NULL, NULL, '', 'sesame-street-a-b-c', 0, 0, 0),
(733, 'Sesame Street: A-B-C/1-2-3', 1, NULL, NULL, NULL, '', 'sesame-street-a-b-c1-2-3', 0, 0, 0),
(734, 'Sesame Street: Big Bird\'s Hide & Speak', 1, NULL, NULL, NULL, '', 'sesame-street-big-birds-hide-and-speak', 0, 0, 0),
(735, 'Sesame Street: Countdown', 1, NULL, NULL, NULL, '', 'sesame-street-countdown', 0, 0, 0),
(736, 'Shadow of the Ninja (aka Blue Shadow)', 1, NULL, NULL, NULL, '', 'shadow-of-the-ninja-aka-blue-shadow', 0, 0, 0),
(737, 'Shadowgate', 1, NULL, NULL, NULL, '', 'shadowgate', 0, 0, 0),
(738, 'Shatterhand', 1, NULL, NULL, NULL, '', 'shatterhand', 0, 0, 0),
(739, 'Shingen the Ruler', 1, NULL, NULL, NULL, '', 'shingen-the-ruler', 0, 0, 0),
(740, 'Shooting Range', 1, NULL, NULL, NULL, '', 'shooting-range', 0, 0, 0),
(741, 'Short Order / Eggsplode!', 1, NULL, NULL, NULL, '', 'short-order-eggsplode', 0, 0, 0),
(742, 'Side Pocket', 1, NULL, NULL, NULL, '', 'side-pocket', 0, 0, 0),
(743, 'Silent Service', 1, NULL, NULL, NULL, '', 'silent-service', 0, 0, 0),
(744, 'Silkworm', 1, NULL, NULL, NULL, '', 'silkworm', 0, 0, 0),
(745, 'Silver Surfer', 1, NULL, NULL, NULL, '', 'silver-surfer', 0, 0, 0),
(746, 'The Simpsons: Bart vs. the Space Mutants', 1, NULL, NULL, NULL, '', 'the-simpsons-bart-vs-the-space-mutants', 0, 0, 0),
(747, 'The Simpsons: Bart vs. the World', 1, NULL, NULL, NULL, '', 'the-simpsons-bart-vs-the-world', 0, 0, 0),
(748, 'The Simpsons: Bartman Meets Radioactive Man', 1, NULL, NULL, NULL, '', 'the-simpsons-bartman-meets-radioactive-man', 0, 0, 0),
(749, 'Skate or Die!', 1, NULL, NULL, NULL, '', 'skate-or-die', 0, 0, 0),
(750, 'Skate or Die 2: The Search for Double Trouble', 1, NULL, NULL, NULL, '', 'skate-or-die-2-the-search-for-double-trouble', 0, 0, 0),
(751, 'Ski or Die', 1, NULL, NULL, NULL, '', 'ski-or-die', 0, 0, 0),
(752, 'Sky Kid', 1, NULL, NULL, NULL, '', 'sky-kid', 0, 0, 0),
(753, 'Sky Shark', 1, NULL, NULL, NULL, '', 'sky-shark', 0, 0, 0),
(754, 'Slalom', 1, NULL, NULL, NULL, '', 'slalom', 0, 0, 0),
(755, 'Smash TV', 1, NULL, NULL, NULL, '', 'smash-tv', 0, 0, 0),
(756, 'The Smurfs', 1, NULL, NULL, NULL, '', 'the-smurfs', 0, 0, 0),
(757, 'Snake Rattle \'n\' Roll', 1, NULL, NULL, NULL, '', 'snake-rattle-n-roll', 0, 0, 0),
(758, 'Snake\'s Revenge', 1, NULL, NULL, NULL, '', 'snakes-revenge', 0, 0, 0),
(759, 'Snoopy\'s Silly Sports Spectacular', 1, NULL, NULL, NULL, '', 'snoopys-silly-sports-spectacular', 0, 0, 0),
(760, 'Snow Brothers', 1, NULL, NULL, NULL, '', 'snow-brothers', 0, 0, 0),
(761, 'Soccer', 1, NULL, NULL, NULL, '', 'soccer', 0, 0, 0),
(762, 'Solar Jetman: Hunt for the Golden Warpship', 1, NULL, NULL, NULL, '', 'solar-jetman-hunt-for-the-golden-warpship', 0, 0, 0),
(763, 'Solomon\'s Key', 1, NULL, NULL, NULL, '', 'solomons-key', 0, 0, 0),
(764, 'Solstice: The Quest for the Staff of Demnos', 1, NULL, NULL, NULL, '', 'solstice-the-quest-for-the-staff-of-demnos', 0, 0, 0),
(765, 'Space Shuttle Project', 1, NULL, NULL, NULL, '', 'space-shuttle-project', 0, 0, 0),
(766, 'Spelunker', 1, NULL, NULL, NULL, '', 'spelunker', 0, 0, 0),
(767, 'Spider-Man: Return of the Sinister Six', 1, NULL, NULL, NULL, '', 'spider-man-return-of-the-sinister-six', 0, 0, 0),
(768, 'Spot: The Video Game', 1, NULL, NULL, NULL, '', 'spot-the-video-game', 0, 0, 0),
(769, 'Spy Hunter', 1, NULL, NULL, NULL, '', 'spy-hunter', 0, 0, 0),
(770, 'Spy vs. Spy', 1, NULL, NULL, NULL, '', 'spy-vs-spy', 0, 0, 0),
(771, 'Sqoon', 1, NULL, NULL, NULL, '', 'sqoon', 0, 0, 0),
(772, 'Stack-Up', 1, NULL, NULL, NULL, '', 'stack-up', 0, 0, 0),
(773, 'Stadium Events', 1, NULL, NULL, NULL, '', 'stadium-events', 0, 0, 0),
(774, 'Stanley: The Search for Dr. Livingston', 1, NULL, NULL, NULL, '', 'stanley-the-search-for-dr-livingston', 0, 0, 0),
(775, 'Star Force', 1, NULL, NULL, NULL, '', 'star-force', 0, 0, 0),
(776, 'Star Soldier', 1, NULL, NULL, NULL, '', 'star-soldier', 0, 0, 0),
(777, 'Star Trek: 25th Anniversary', 1, NULL, NULL, NULL, '', 'star-trek-25th-anniversary', 0, 0, 0),
(778, 'Star Trek: The Next Generation', 1, NULL, NULL, NULL, '', 'star-trek-the-next-generation', 0, 0, 0),
(779, 'Star Voyager', 1, NULL, NULL, NULL, '', 'star-voyager', 0, 0, 0),
(780, 'Star Wars', 1, NULL, NULL, NULL, '', 'star-wars', 0, 0, 0),
(781, 'Star Wars: The Empire Strikes Back', 1, NULL, NULL, NULL, '', 'star-wars-the-empire-strikes-back', 0, 0, 0),
(782, 'Starship Hector', 1, NULL, NULL, NULL, '', 'starship-hector', 0, 0, 0),
(783, 'StarTropics', 1, NULL, NULL, NULL, '', 'startropics', 0, 0, 0),
(784, 'Stealth ATF', 1, NULL, NULL, NULL, '', 'stealth-atf', 0, 0, 0),
(785, 'Stinger', 1, NULL, NULL, NULL, '', 'stinger', 0, 0, 0),
(786, 'Street Cop', 1, NULL, NULL, NULL, '', 'street-cop', 0, 0, 0),
(787, 'Street Fighter 2010: The Final Fight', 1, NULL, NULL, NULL, '', 'street-fighter-2010-the-final-fight', 0, 0, 0),
(788, 'Strider', 1, NULL, NULL, NULL, '', 'strider', 0, 0, 0),
(789, 'Super C', 1, NULL, NULL, NULL, '', 'super-c', 0, 0, 0),
(790, 'Super Cars', 1, NULL, NULL, NULL, '', 'super-cars', 0, 0, 0),
(791, 'Super Dodge Ball', 1, NULL, NULL, NULL, '', 'super-dodge-ball', 0, 0, 0),
(792, 'Super Glove Ball', 1, NULL, NULL, NULL, '', 'super-glove-ball', 0, 0, 0),
(793, 'Super Jeopardy!', 1, NULL, NULL, NULL, '', 'super-jeopardy', 0, 0, 0),
(794, 'Super Mario Bros.', 1, NULL, NULL, NULL, '', 'super-mario-bros', 0, 0, 0),
(795, 'Super Mario Bros./Duck Hunt', 1, NULL, NULL, NULL, '', 'super-mario-brosduck-hunt', 0, 0, 0),
(796, 'Super Mario Bros./Duck Hunt/World Class Track Meet', 1, NULL, NULL, NULL, '', 'super-mario-brosduck-huntworld-class-track-meet', 0, 0, 0),
(797, 'Super Mario Bros./Tetris/Nintendo World Cup', 1, NULL, NULL, NULL, '', 'super-mario-brostetrisnintendo-world-cup', 0, 0, 0),
(798, 'Super Mario Bros. 2', 1, NULL, NULL, NULL, '', 'super-mario-bros-2', 0, 0, 0),
(799, 'Super Mario Bros. 3', 1, NULL, NULL, NULL, '', 'super-mario-bros-3', 0, 0, 0),
(800, 'Super Pitfall', 1, NULL, NULL, NULL, '', 'super-pitfall', 0, 0, 0),
(801, 'Super Spike V\'Ball', 1, NULL, NULL, NULL, '', 'super-spike-vball', 0, 0, 0),
(802, 'Super Spike V\'Ball/Nintendo World Cup', 1, NULL, NULL, NULL, '', 'super-spike-vballnintendo-world-cup', 0, 0, 0),
(803, 'Super Spy Hunter', 1, NULL, NULL, NULL, '', 'super-spy-hunter', 0, 0, 0),
(804, 'Super Team Games', 1, NULL, NULL, NULL, '', 'super-team-games', 0, 0, 0),
(805, 'Super Turrican', 1, NULL, NULL, NULL, '', 'super-turrican', 0, 0, 0),
(806, 'Superman', 1, NULL, NULL, NULL, '', 'superman', 0, 0, 0),
(807, 'Swamp Thing', 1, NULL, NULL, NULL, '', 'swamp-thing', 0, 0, 0),
(808, 'Sword Master', 1, NULL, NULL, NULL, '', 'sword-master', 0, 0, 0),
(809, 'Swords and Serpents', 1, NULL, NULL, NULL, '', 'swords-and-serpents', 0, 0, 0),
(810, 'Taboo: The Sixth Sense', 1, NULL, NULL, NULL, '', 'taboo-the-sixth-sense', 0, 0, 0),
(811, 'Tag Team Wrestling', 1, NULL, NULL, NULL, '', 'tag-team-wrestling', 0, 0, 0),
(812, 'TaleSpin', 1, NULL, NULL, NULL, '', 'talespin', 0, 0, 0),
(813, 'Target: Renegade', 1, NULL, NULL, NULL, '', 'target-renegade', 0, 0, 0),
(814, 'Tecmo Baseball', 1, NULL, NULL, NULL, '', 'tecmo-baseball', 0, 0, 0),
(815, 'Tecmo Bowl', 1, NULL, NULL, NULL, '', 'tecmo-bowl', 0, 0, 0),
(816, 'Tecmo Cup Soccer Game', 1, NULL, NULL, NULL, '', 'tecmo-cup-soccer-game', 0, 0, 0),
(817, 'Tecmo NBA Basketball', 1, NULL, NULL, NULL, '', 'tecmo-nba-basketball', 0, 0, 0);
INSERT INTO `games` (`id`, `title`, `console_id`, `genre_id`, `developer_id`, `publisher_id`, `description`, `slug`, `parent_id`, `rarity`, `release_year`) VALUES
(818, 'Tecmo Super Bowl', 1, NULL, NULL, NULL, '', 'tecmo-super-bowl', 0, 0, 0),
(819, 'Tecmo World Cup Soccer', 1, NULL, NULL, NULL, '', 'tecmo-world-cup-soccer', 0, 0, 0),
(820, 'Tecmo World Wrestling', 1, NULL, NULL, NULL, '', 'tecmo-world-wrestling', 0, 0, 0),
(821, 'Teenage Mutant Ninja Turtles', 1, NULL, NULL, NULL, '', 'teenage-mutant-ninja-turtles', 0, 0, 0),
(822, 'Teenage Mutant Ninja Turtles II: The Arcade Game', 1, NULL, NULL, NULL, '', 'teenage-mutant-ninja-turtles-ii-the-arcade-game', 0, 0, 0),
(823, 'Teenage Mutant Ninja Turtles III: The Manhattan Project', 1, NULL, NULL, NULL, '', 'teenage-mutant-ninja-turtles-iii-the-manhattan-project', 0, 0, 0),
(824, 'Teenage Mutant Ninja Turtles: Tournament Fighters', 1, NULL, NULL, NULL, '', 'teenage-mutant-ninja-turtles-tournament-fighters', 0, 0, 0),
(825, 'Tennis', 1, NULL, NULL, NULL, '', 'tennis', 0, 0, 0),
(826, 'The Terminator', 1, NULL, NULL, NULL, '', 'the-terminator', 0, 0, 0),
(827, 'Terminator 2: Judgment Day', 1, NULL, NULL, NULL, '', 'terminator-2-judgment-day', 0, 0, 0),
(828, 'Terra Cresta', 1, NULL, NULL, NULL, '', 'terra-cresta', 0, 0, 0),
(829, 'Tetris', 1, NULL, NULL, NULL, '', 'tetris', 0, 0, 0),
(830, 'Tetris 2', 1, NULL, NULL, NULL, '', 'tetris-2', 0, 0, 0),
(831, 'The Three Stooges', 1, NULL, NULL, NULL, '', 'the-three-stooges', 0, 0, 0),
(832, 'Thunder & Lightning', 1, NULL, NULL, NULL, '', 'thunder-and-lightning', 0, 0, 0),
(833, 'Thunderbirds', 1, NULL, NULL, NULL, '', 'thunderbirds', 0, 0, 0),
(834, 'Thundercade', 1, NULL, NULL, NULL, '', 'thundercade', 0, 0, 0),
(835, 'Tiger Heli', 1, NULL, NULL, NULL, '', 'tiger-heli', 0, 0, 0),
(836, 'Time Lord', 1, NULL, NULL, NULL, '', 'time-lord', 0, 0, 0),
(837, 'Times of Lore', 1, NULL, NULL, NULL, '', 'times-of-lore', 0, 0, 0),
(838, 'Tiny Toon Adventures', 1, NULL, NULL, NULL, '', 'tiny-toon-adventures', 0, 0, 0),
(839, 'Tiny Toon Adventures 2: Trouble in Wackyland', 1, NULL, NULL, NULL, '', 'tiny-toon-adventures-2-trouble-in-wackyland', 0, 0, 0),
(840, 'Tiny Toon Adventures Cartoon Workshop', 1, NULL, NULL, NULL, '', 'tiny-toon-adventures-cartoon-workshop', 0, 0, 0),
(841, 'To the Earth', 1, NULL, NULL, NULL, '', 'to-the-earth', 0, 0, 0),
(842, 'Toki', 1, NULL, NULL, NULL, '', 'toki', 0, 0, 0),
(843, 'Tom and Jerry', 1, NULL, NULL, NULL, '', 'tom-and-jerry', 0, 0, 0),
(844, 'Tombs & Treasure', 1, NULL, NULL, NULL, '', 'tombs-and-treasure', 0, 0, 0),
(845, 'Top Gun', 1, NULL, NULL, NULL, '', 'top-gun', 0, 0, 0),
(846, 'Top Gun: The Second Mission', 1, NULL, NULL, NULL, '', 'top-gun-the-second-mission', 0, 0, 0),
(847, 'Top Players\' Tennis', 1, NULL, NULL, NULL, '', 'top-players-tennis', 0, 0, 0),
(848, 'Total Recall', 1, NULL, NULL, NULL, '', 'total-recall', 0, 0, 0),
(849, 'Totally Rad', 1, NULL, NULL, NULL, '', 'totally-rad', 0, 0, 0),
(850, 'Touch Down Fever', 1, NULL, NULL, NULL, '', 'touch-down-fever', 0, 0, 0),
(851, 'Town & Country Surf Designs: Wood & Water Rage', 1, NULL, NULL, NULL, '', 'town-and-country-surf-designs-wood-and-water-rage', 0, 0, 0),
(852, 'Town & Country II: Thrilla\'s Surfari', 1, NULL, NULL, NULL, '', 'town-and-country-ii-thrillas-surfari', 0, 0, 0),
(853, 'Toxic Crusaders', 1, NULL, NULL, NULL, '', 'toxic-crusaders', 0, 0, 0),
(854, 'Track & Field', 1, NULL, NULL, NULL, '', 'track-and-field', 0, 0, 0),
(855, 'Track & Field II', 1, NULL, NULL, NULL, '', 'track-and-field-ii', 0, 0, 0),
(856, 'Treasure Master', 1, NULL, NULL, NULL, '', 'treasure-master', 0, 0, 0),
(857, 'Trog!', 1, NULL, NULL, NULL, '', 'trog', 0, 0, 0),
(858, 'Trojan', 1, NULL, NULL, NULL, '', 'trojan', 0, 0, 0),
(859, 'The Trolls in Crazyland', 1, NULL, NULL, NULL, '', 'the-trolls-in-crazyland', 0, 0, 0),
(860, 'Twin Cobra', 1, NULL, NULL, NULL, '', 'twin-cobra', 0, 0, 0),
(861, 'Twin Eagle', 1, NULL, NULL, NULL, '', 'twin-eagle', 0, 0, 0),
(862, 'Ufouria: The Saga', 1, NULL, NULL, NULL, '', 'ufouria-the-saga', 0, 0, 0),
(863, 'Ultima III: Exodus', 1, NULL, NULL, NULL, '', 'ultima-iii-exodus', 0, 0, 0),
(864, 'Ultima IV: Quest of the Avatar', 1, NULL, NULL, NULL, '', 'ultima-iv-quest-of-the-avatar', 0, 0, 0),
(865, 'Ultima V: Warriors of Destiny', 1, NULL, NULL, NULL, '', 'ultima-v-warriors-of-destiny', 0, 0, 0),
(866, 'Ultimate Air Combat', 1, NULL, NULL, NULL, '', 'ultimate-air-combat', 0, 0, 0),
(867, 'Ultimate Basketball', 1, NULL, NULL, NULL, '', 'ultimate-basketball', 0, 0, 0),
(868, 'The Uncanny X-Men', 1, NULL, NULL, NULL, '', 'the-uncanny-x-men', 0, 0, 0),
(869, 'Uncharted Waters', 1, NULL, NULL, NULL, '', 'uncharted-waters', 0, 0, 0),
(870, 'Uninvited', 1, NULL, NULL, NULL, '', 'uninvited', 0, 0, 0),
(871, 'The Untouchables', 1, NULL, NULL, NULL, '', 'the-untouchables', 0, 0, 0),
(872, 'Urban Champion', 1, NULL, NULL, NULL, '', 'urban-champion', 0, 0, 0),
(873, 'Vegas Dream', 1, NULL, NULL, NULL, '', 'vegas-dream', 0, 0, 0),
(874, 'Vice: Project Doom', 1, NULL, NULL, NULL, '', 'vice-project-doom', 0, 0, 0),
(875, 'Videomation', 1, NULL, NULL, NULL, '', 'videomation', 0, 0, 0),
(876, 'Volleyball', 1, NULL, NULL, NULL, '', 'volleyball', 0, 0, 0),
(877, 'Wacky Races', 1, NULL, NULL, NULL, '', 'wacky-races', 0, 0, 0),
(878, 'Wall Street Kid', 1, NULL, NULL, NULL, '', 'wall-street-kid', 0, 0, 0),
(879, 'Wario\'s Woods', 1, NULL, NULL, NULL, '', 'warios-woods', 0, 0, 0),
(880, 'Wayne Gretzky Hockey', 1, NULL, NULL, NULL, '', 'wayne-gretzky-hockey', 0, 0, 0),
(881, 'Wayne\'s World', 1, NULL, NULL, NULL, '', 'waynes-world', 0, 0, 0),
(882, 'WCW Wrestling', 1, NULL, NULL, NULL, '', 'wcw-wrestling', 0, 0, 0),
(883, 'Werewolf: The Last Warrior', 1, NULL, NULL, NULL, '', 'werewolf-the-last-warrior', 0, 0, 0),
(884, 'Wheel of Fortune', 1, NULL, NULL, NULL, '', 'wheel-of-fortune', 0, 0, 0),
(885, 'Wheel of Fortune Family Edition', 1, NULL, NULL, NULL, '', 'wheel-of-fortune-family-edition', 0, 0, 0),
(886, 'Wheel of Fortune: Featuring Vanna White', 1, NULL, NULL, NULL, '', 'wheel-of-fortune-featuring-vanna-white', 0, 0, 0),
(887, 'Wheel of Fortune Junior Edition', 1, NULL, NULL, NULL, '', 'wheel-of-fortune-junior-edition', 0, 0, 0),
(888, 'Where in Time Is Carmen Sandiego?', 1, NULL, NULL, NULL, '', 'where-in-time-is-carmen-sandiego', 0, 0, 0),
(889, 'Where\'s Waldo?', 1, NULL, NULL, NULL, '', 'wheres-waldo', 0, 0, 0),
(890, 'Who Framed Roger Rabbit?', 1, NULL, NULL, NULL, '', 'who-framed-roger-rabbit', 0, 0, 0),
(891, 'Whomp \'Em', 1, NULL, NULL, NULL, '', 'whomp-em', 0, 0, 0),
(892, 'Widget', 1, NULL, NULL, NULL, '', 'widget', 0, 0, 0),
(893, 'Wild Gunman', 1, NULL, NULL, NULL, '', 'wild-gunman', 0, 0, 0),
(894, 'Willow', 1, NULL, NULL, NULL, '', 'willow', 0, 0, 0),
(895, 'Win, Lose, or Draw', 1, NULL, NULL, NULL, '', 'win-lose-or-draw', 0, 0, 0),
(896, 'Winter Games', 1, NULL, NULL, NULL, '', 'winter-games', 0, 0, 0),
(897, 'Wizardry: Proving Grounds of the Mad Overlord', 1, NULL, NULL, NULL, '', 'wizardry-proving-grounds-of-the-mad-overlord', 0, 0, 0),
(898, 'Wizardry II: The Knight of Diamonds', 1, NULL, NULL, NULL, '', 'wizardry-ii-the-knight-of-diamonds', 0, 0, 0),
(899, 'Wizards & Warriors', 1, NULL, NULL, NULL, '', 'wizards-and-warriors', 0, 0, 0),
(900, 'Wizards & Warriors III: Kuros: Visions of Power', 1, NULL, NULL, NULL, '', 'wizards-and-warriors-iii-kuros-visions-of-power', 0, 0, 0),
(901, 'Wolverine', 1, NULL, NULL, NULL, '', 'wolverine', 0, 0, 0),
(902, 'World Champ', 1, NULL, NULL, NULL, '', 'world-champ', 0, 0, 0),
(903, 'World Class Track Meet', 1, NULL, NULL, NULL, '', 'world-class-track-meet', 0, 0, 0),
(904, 'World Games', 1, NULL, NULL, NULL, '', 'world-games', 0, 0, 0),
(905, 'Wrath of the Black Manta', 1, NULL, NULL, NULL, '', 'wrath-of-the-black-manta', 0, 0, 0),
(906, 'Wrecking Crew', 1, NULL, NULL, NULL, '', 'wrecking-crew', 0, 0, 0),
(907, 'Wurm: Journey to the Center of the Earth', 1, NULL, NULL, NULL, '', 'wurm-journey-to-the-center-of-the-earth', 0, 0, 0),
(908, 'WWF King of the Ring', 1, NULL, NULL, NULL, '', 'wwf-king-of-the-ring', 0, 0, 0),
(909, 'WWF WrestleMania', 1, NULL, NULL, NULL, '', 'wwf-wrestlemania', 0, 0, 0),
(910, 'WWF WrestleMania Challenge', 1, NULL, NULL, NULL, '', 'wwf-wrestlemania-challenge', 0, 0, 0),
(911, 'WWF WrestleMania: Steel Cage Challenge', 1, NULL, NULL, NULL, '', 'wwf-wrestlemania-steel-cage-challenge', 0, 0, 0),
(912, 'Xenophobe', 1, NULL, NULL, NULL, '', 'xenophobe', 0, 0, 0),
(913, 'Xevious', 1, NULL, NULL, NULL, '', 'xevious', 0, 0, 0),
(914, 'Xexyz', 1, NULL, NULL, NULL, '', 'xexyz', 0, 0, 0),
(915, 'Yo! Noid', 1, NULL, NULL, NULL, '', 'yo-noid', 0, 0, 0),
(916, 'Yoshi', 1, NULL, NULL, NULL, '', 'yoshi', 0, 0, 0),
(917, 'Yoshi\'s Cookie', 1, NULL, NULL, NULL, '', 'yoshis-cookie', 0, 0, 0),
(918, 'Young Indiana Jones Chronicles', 1, NULL, NULL, NULL, '', 'young-indiana-jones-chronicles', 0, 0, 0),
(919, 'Zanac', 1, NULL, NULL, NULL, '', 'zanac', 0, 0, 0),
(920, 'Zelda II: The Adventure of Link', 1, NULL, NULL, NULL, '', 'zelda-ii-the-adventure-of-link', 0, 0, 0),
(921, 'Zen the Intergalactic Ninja', 1, NULL, NULL, NULL, '', 'zen-the-intergalactic-ninja', 0, 0, 0),
(922, 'Zoda\'s Revenge: StarTropics II', 1, NULL, NULL, NULL, '', 'zodas-revenge-startropics-ii', 0, 0, 0),
(923, 'Zombie Nation', 1, NULL, NULL, NULL, '', 'zombie-nation', 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `games_comments`
--

CREATE TABLE `games_comments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `comment` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `games_user`
--

CREATE TABLE `games_user` (
  `id` int(11) NOT NULL,
  `games-id` int(11) NOT NULL,
  `games-region-id` int(11) NOT NULL,
  `game-condition` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `game_images`
--

CREATE TABLE `game_images` (
  `id` int(11) NOT NULL,
  `game_id` varchar(250) NOT NULL,
  `url` varchar(250) NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `added_by` int(11) NOT NULL,
  `comment` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `game_images`
--

INSERT INTO `game_images` (`id`, `game_id`, `url`, `created_time`, `added_by`, `comment`) VALUES
(1, '204', 'bilde1.jpg', '2016-05-02 13:13:09', 1, ''),
(2, '204', 'bilde2.jpg', '2016-05-02 13:13:09', 1, '');

-- --------------------------------------------------------

--
-- Table structure for table `image-to-game-to-region`
--

CREATE TABLE `image-to-game-to-region` (
  `id` int(11) NOT NULL,
  `url` int(11) NOT NULL,
  `game-to-region-id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Publishers`
--

CREATE TABLE `Publishers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `link-to-wikipedia` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Publishers`
--

INSERT INTO `Publishers` (`id`, `name`, `created_time`, `link-to-wikipedia`) VALUES
(97, 'Capcom', '2015-11-15 19:48:12', ''),
(98, 'Acclaim Entertainment', '2015-11-15 19:48:12', ''),
(99, 'Mindscape', '2015-11-15 19:48:12', ''),
(100, 'Taxan', '2015-11-15 19:48:12', ''),
(101, 'Milton Bradley Company', '2015-11-15 19:48:12', ''),
(102, 'Ocean Software', '2015-11-15 19:48:12', ''),
(103, 'FCI', '2015-11-15 19:48:12', ''),
(104, 'Hudson Soft', '2015-11-15 19:48:12', ''),
(105, 'Hudson Soft (NA/EU)', '2015-11-15 19:48:12', ''),
(106, 'Konami', '2015-11-15 19:48:12', ''),
(107, 'Bandai', '2015-11-15 19:48:12', ''),
(108, 'HAL America', '2015-11-15 19:48:12', ''),
(109, 'Activision (NA)', '2015-11-15 19:48:12', ''),
(110, 'THQ', '2015-11-15 19:48:12', ''),
(111, 'SETA', '2015-11-15 19:48:12', ''),
(112, 'Data East', '2015-11-15 19:48:12', ''),
(113, 'LJN', '2015-11-15 19:48:12', ''),
(114, 'Vic Tokai', '2015-11-15 19:48:12', ''),
(115, 'SNK', '2015-11-15 19:48:12', ''),
(116, 'American Sammy', '2015-11-15 19:48:12', ''),
(117, 'GameTek', '2015-11-15 19:48:12', ''),
(118, 'Activision', '2015-11-15 19:48:12', ''),
(119, 'Taito', '2015-11-15 19:48:12', ''),
(120, 'Infogrames (EU)', '2015-11-15 19:48:12', ''),
(121, 'Jaleco', '2015-11-15 19:48:12', ''),
(122, 'Bandai (NA)', '2015-11-15 19:48:12', ''),
(123, 'Laser Beam Entertainment (AU)', '2015-11-15 19:48:12', ''),
(124, 'Data East (NA)', '2015-11-15 19:48:12', ''),
(125, 'Tecmo', '2015-11-15 19:48:12', ''),
(126, 'Mattel', '2015-11-15 19:48:12', ''),
(127, 'Takara (EU)', '2015-11-15 19:48:12', ''),
(128, 'Koei', '2015-11-15 19:48:12', ''),
(129, 'Hi Tech Expressions', '2015-11-15 19:48:12', ''),
(130, 'Ultra Games', '2015-11-15 19:48:12', ''),
(131, 'Culture Brain', '2015-11-15 19:48:12', ''),
(132, 'Romstar', '2015-11-15 19:48:12', ''),
(133, 'Sunsoft', '2015-11-15 19:48:12', ''),
(134, 'Brøderbund (NA)', '2015-11-15 19:48:12', ''),
(135, 'Absolute Entertainment', '2015-11-15 19:48:12', ''),
(136, 'Tradewest', '2015-11-15 19:48:12', ''),
(137, 'Electro Brain (NA)', '2015-11-15 19:48:12', ''),
(138, 'Hot B', '2015-11-15 19:48:12', ''),
(139, 'Konami (NA/EU)', '2015-11-15 19:48:12', ''),
(140, 'Hot-B', '2015-11-15 19:48:12', ''),
(141, 'Titus Software', '2015-11-15 19:48:12', ''),
(142, 'JVC', '2015-11-15 19:48:12', ''),
(143, 'Sony Imagesoft', '2015-11-15 19:48:12', ''),
(144, 'Taito (NA/EU)', '2015-11-15 19:48:12', ''),
(145, 'Kemco', '2015-11-15 19:48:12', ''),
(146, 'Virgin Interactive', '2015-11-15 19:48:12', ''),
(147, 'Milton Bradley Company (NA)', '2015-11-15 19:48:12', ''),
(148, 'SOFEL', '2015-11-15 19:48:12', ''),
(149, 'Triffix (NA)', '2015-11-15 19:48:12', ''),
(150, 'ASCII', '2015-11-15 19:48:12', ''),
(151, 'HAL America (AU)', '2015-11-15 19:48:12', ''),
(152, 'Toho', '2015-11-15 19:48:12', ''),
(153, 'Asmik', '2015-11-15 19:48:12', ''),
(154, 'Palcom', '2015-11-15 19:48:12', '');

-- --------------------------------------------------------

--
-- Table structure for table `regions`
--

CREATE TABLE `regions` (
  `id` int(11) NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name` varchar(11) NOT NULL,
  `console_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `regions`
--

INSERT INTO `regions` (`id`, `created_time`, `name`, `console_id`) VALUES
(1, '2016-05-02 09:08:36', 'PAL-A UKV', 1),
(2, '2016-05-02 09:08:36', 'PAL-B SCN', 1),
(3, '2016-05-02 09:08:36', 'PAL-B HOL', 1),
(4, '2016-05-02 09:08:36', 'PAL-B NOE', 1),
(5, '2016-05-02 09:08:36', 'PAL-B FRA', 1),
(6, '2016-05-02 09:08:36', 'PAL-A ITA', 1),
(7, '2016-05-02 09:08:36', 'PAL-B ESP', 1),
(8, '2016-05-02 09:08:36', 'PAL-A AUS', 1),
(9, '2016-05-02 10:21:27', 'NTSC-J JAP', 1),
(10, '2016-05-02 10:21:42', 'NTSC USA', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` char(100) NOT NULL,
  `profile_image_url` varchar(200) DEFAULT NULL,
  `cover_photo_url` varchar(250) DEFAULT NULL,
  `created_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `role` varchar(100) DEFAULT NULL,
  `up_hash` varchar(255) DEFAULT NULL,
  `nick` varchar(250) NOT NULL,
  `slug` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `profile_image_url`, `cover_photo_url`, `created_time`, `role`, `up_hash`, `nick`, `slug`) VALUES
(1, 'jorgeja@gmail.com', '$2a$10$TOhM.bc9F1xBjn2J5t7D..sd85FllE0JQyMc21PGoTbx3xQ/Gkqmq', NULL, '', '2015-11-21 19:50:58', 'admin', NULL, 'jorgolini', 'jorgolini'),
(5, 'jorgen.jacobsen@nettavisen.no', '$2a$10$XK7kvoMDGcmyqP0n2dRPAeNhcuhu6kvXzVIa8R3OC0Pmi4OxlaSMG', NULL, NULL, '2016-05-09 08:53:35', 'regular', NULL, 'retrojorgen', 'retrojorgen');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `consoles`
--
ALTER TABLE `consoles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `Developers`
--
ALTER TABLE `Developers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `game-reviews`
--
ALTER TABLE `game-reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `game-to-region`
--
ALTER TABLE `game-to-region`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`),
  ADD KEY `title` (`title`);
ALTER TABLE `games` ADD FULLTEXT KEY `title_2` (`title`);

--
-- Indexes for table `games_comments`
--
ALTER TABLE `games_comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `games_user`
--
ALTER TABLE `games_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `game_images`
--
ALTER TABLE `game_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `image-to-game-to-region`
--
ALTER TABLE `image-to-game-to-region`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Publishers`
--
ALTER TABLE `Publishers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `regions`
--
ALTER TABLE `regions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `id_2` (`id`),
  ADD KEY `username_2` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `consoles`
--
ALTER TABLE `consoles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `Developers`
--
ALTER TABLE `Developers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `game-reviews`
--
ALTER TABLE `game-reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `game-to-region`
--
ALTER TABLE `game-to-region`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `games`
--
ALTER TABLE `games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=924;
--
-- AUTO_INCREMENT for table `games_comments`
--
ALTER TABLE `games_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `games_user`
--
ALTER TABLE `games_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `game_images`
--
ALTER TABLE `game_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `image-to-game-to-region`
--
ALTER TABLE `image-to-game-to-region`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Publishers`
--
ALTER TABLE `Publishers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=155;
--
-- AUTO_INCREMENT for table `regions`
--
ALTER TABLE `regions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
