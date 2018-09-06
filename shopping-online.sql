-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 06, 2018 at 04:44 PM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 5.6.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shopping-online`
--

-- --------------------------------------------------------

--
-- Table structure for table `cartproducts`
--

CREATE TABLE `cartproducts` (
  `productId` int(50) NOT NULL,
  `quantity` int(10) NOT NULL,
  `price` int(20) NOT NULL,
  `cartId` int(50) NOT NULL,
  `productname` varchar(50) COLLATE utf8_bin NOT NULL,
  `measure` varchar(10) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `cartproducts`
--

INSERT INTO `cartproducts` (`productId`, `quantity`, `price`, `cartId`, `productname`, `measure`) VALUES
(31, 3, 3, 145, 'chips', 'units'),
(1, 3, 4, 146, 'milky', 'units'),
(31, 3, 3, 147, 'chips', 'units');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(20) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'milk'),
(2, 'meet'),
(3, 'fruit&vegetables'),
(4, 'bread&pastries');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `firstname` varchar(20) COLLATE utf8_bin NOT NULL,
  `lastname` varchar(20) COLLATE utf8_bin NOT NULL,
  `email` varchar(50) COLLATE utf8_bin NOT NULL,
  `password` varchar(50) COLLATE utf8_bin NOT NULL,
  `cityId` int(5) NOT NULL,
  `street` varchar(20) COLLATE utf8_bin NOT NULL,
  `role` varchar(10) COLLATE utf8_bin NOT NULL,
  `cusid` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`firstname`, `lastname`, `email`, `password`, `cityId`, `street`, `role`, `cusid`) VALUES
('yochai', 'tamir', 'divinedesign1911@gmail.com', 'a', 3000, 'arie 9', 'customer', 111),
('yochai', 'tamir', 'yoyocooljmsmith@gmail.com', 'a', 3000, 'bruria 9', 'manager', 222),
('moshe', 'levi', 'moshe@gmail.com', 's', 70, 'levi 8', 'customer', 333);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(50) NOT NULL,
  `customerId` int(50) NOT NULL,
  `cartId` int(50) NOT NULL,
  `price` int(50) NOT NULL,
  `cityId` int(5) NOT NULL,
  `street` varchar(20) COLLATE utf8_bin NOT NULL,
  `date` date NOT NULL,
  `orderDate` date NOT NULL,
  `creditCard` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customerId`, `cartId`, `price`, `cityId`, `street`, `date`, `orderDate`, `creditCard`) VALUES
(123, 333, 145, 9, 70, 'levi 8', '2018-09-06', '2018-09-27', 2345),
(124, 111, 146, 12, 3000, 'arie 9', '0000-00-00', '2018-09-20', 1234),
(125, 111, 147, 9, 3000, 'arie 9', '2018-09-06', '2018-09-20', 1234);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(50) NOT NULL,
  `productname` varchar(40) COLLATE utf8_bin NOT NULL,
  `categoryId` int(5) NOT NULL,
  `price` int(10) NOT NULL,
  `imageUrl` varchar(250) COLLATE utf8_bin NOT NULL,
  `measure` varchar(10) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `productname`, `categoryId`, `price`, `imageUrl`, `measure`) VALUES
(1, 'milky', 1, 4, 'image0.7172667195539348.jpg', 'units'),
(31, 'chips', 4, 3, 'image0.4043475250188524.jpg', 'units'),
(137, 'cake', 1, 4, 'image0.9315774394124146.jpg', 'units'),
(138, 'beef', 2, 11, 'image0.603566399009857.jpg', 'units'),
(139, 'milky bar', 1, 16, 'image0.9661753968946891.jpg', 'units'),
(140, 'olives', 3, 4, 'image140.jpg', 'kg');

-- --------------------------------------------------------

--
-- Table structure for table `shopingcart`
--

CREATE TABLE `shopingcart` (
  `cartid` int(250) NOT NULL,
  `customerId` int(11) NOT NULL,
  `createDate` date NOT NULL,
  `isopen` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `shopingcart`
--

INSERT INTO `shopingcart` (`cartid`, `customerId`, `createDate`, `isopen`) VALUES
(145, 333, '2018-09-06', 1),
(146, 111, '2018-09-06', 1),
(147, 111, '2018-09-06', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cartproducts`
--
ALTER TABLE `cartproducts`
  ADD KEY `product-id` (`productId`),
  ADD KEY `cart-id` (`cartId`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`cusid`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer-id` (`customerId`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product-category` (`categoryId`);

--
-- Indexes for table `shopingcart`
--
ALTER TABLE `shopingcart`
  ADD PRIMARY KEY (`cartid`),
  ADD KEY `cart-customer` (`customerId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=126;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=141;

--
-- AUTO_INCREMENT for table `shopingcart`
--
ALTER TABLE `shopingcart`
  MODIFY `cartid` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=148;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cartproducts`
--
ALTER TABLE `cartproducts`
  ADD CONSTRAINT `cart-id` FOREIGN KEY (`cartId`) REFERENCES `shopingcart` (`cartid`),
  ADD CONSTRAINT `product-id` FOREIGN KEY (`productId`) REFERENCES `product` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `customer-id` FOREIGN KEY (`customerId`) REFERENCES `customer` (`cusid`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product-category` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`);

--
-- Constraints for table `shopingcart`
--
ALTER TABLE `shopingcart`
  ADD CONSTRAINT `cart-customer` FOREIGN KEY (`customerId`) REFERENCES `customer` (`cusid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
