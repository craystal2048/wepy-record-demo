/*
 Navicat MySQL Data Transfer

 Source Server         : 127.0.0.1
 Source Server Version : 50621
 Source Host           : localhost
 Source Database       : RUNOOB

 Target Server Version : 50621
 File Encoding         : utf-8

 Date: 05/18/2016 11:44:07 AM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `websites`
-- ----------------------------
DROP TABLE IF EXISTS `song_list`;
CREATE TABLE `songs_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT '' COMMENT '歌名',
  `picUrl` varchar(1000) NOT NULL DEFAULT '' COMMENT '封面',
  `songUrl` varchar(1000) NOT NULL DEFAULT '' COMMENT '歌曲链接',
  `duration` varchar(100) NOT NULL DEFAULT '' COMMENT '歌曲时长',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `websites`
-- ----------------------------
BEGIN;
INSERT INTO `songs_list` VALUES ('1306431916', '凌晨三点（demo）','http://p2.music.126.net/lqDi9TSwYGB3jbdbfN73QQ==/109951163526222616.jpg','http://m10.music.126.net/20180928170554/8ca12c7a0708fc1d68a9300d80b40370/ymusic/fd9e/2af9/eee0/8f1d47b628b49af930fa06447d087638.mp3','92891');
INSERT INTO `songs_list` VALUES ('31877467', '假如爱有天意 (Live)','http://p2.music.126.net/DprdNIWpRWYZJak4Q-cS-Q==/2891715582273535.jpg','http://m10.music.126.net/20180928170712/67df304d3e62f1bcc0197ada700132e3/ymusic/dd6a/2c4b/bd1f/c0b0e36bef35416013cdefa878b90bd2.mp3','303000');
INSERT INTO `songs_list` VALUES ('561313205', '想你','http://p2.music.126.net/FPBMP254Crj6ER7ZPeKJ6Q==/109951163298566753.jpg','http://m10.music.126.net/20180928170740/8f4c577e4b2954729ec3c25489a1e6e2/ymusic/c5f3/e95e/2eb3/6e1491380674194202f883391e88da16.mp3','280689');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
