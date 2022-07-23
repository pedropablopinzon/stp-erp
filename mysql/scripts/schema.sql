CREATE TABLE `status` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(100)
);

CREATE TABLE `user` (
  `id` varchar(100) PRIMARY KEY,
  `display_name` varchar(100),
  `created_at` timestamp NOT NULL,
  `created_by` varchar(100) NOT NULL,
  `status_id` int NOT NULL,
  `updated_at` timestamp,
  `updated_by` varchar(100)
);

CREATE TABLE `business` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL,
  `created_by` varchar(100) NOT NULL,
  `status_id` int NOT NULL,
  `updated_at` timestamp,
  `updated_by` varchar(100)
);

CREATE TABLE `business_user` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `created_at` timestamp NOT NULL,
  `created_by` varchar(100) NOT NULL,
  `status_id` int NOT NULL,
  `updated_at` timestamp,
  `updated_by` varchar(100),
  `business_id` int NOT NULL,
  `user_id` varchar(100) NOT NULL
);

CREATE TABLE `project` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL,
  `created_by` varchar(100) NOT NULL,
  `status_id` int NOT NULL,
  `updated_at` timestamp,
  `updated_by` varchar(100),
  `business_id` int NOT NULL
);

CREATE TABLE `log_check_in_out` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `created_at` timestamp NOT NULL,
  `created_by` varchar(100) NOT NULL,
  `status_id` int NOT NULL,
  `updated_at` timestamp,
  `updated_by` varchar(100),
  `project_id` int NOT NULL,
  `check_in_at` timestamp NOT NULL,
  `check_out_at` timestamp
);

CREATE TABLE `progress_log` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `created_at` timestamp NOT NULL,
  `created_by` varchar(100) NOT NULL,
  `status_id` int NOT NULL,
  `updated_at` timestamp,
  `updated_by` varchar(100),
  `project_id` int NOT NULL,
  `comment` text NOT NULL
);

CREATE TABLE `progress_log_image` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `created_at` timestamp NOT NULL,
  `created_by` varchar(100) NOT NULL,
  `status_id` int NOT NULL,
  `updated_at` timestamp,
  `updated_by` varchar(100),
  `progress_log_id` int NOT NULL,
  `image_url` text NOT NULL
);

CREATE TABLE `expense_record` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `created_at` timestamp NOT NULL,
  `created_by` varchar(100) NOT NULL,
  `status_id` int NOT NULL,
  `updated_at` timestamp,
  `updated_by` varchar(100),
  `project_id` int NOT NULL,
  `comment` text NOT NULL,
  `amount` double NOT NULL,
  `expected_amount` double
);

CREATE TABLE `expense_record_image` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `created_at` timestamp NOT NULL,
  `created_by` varchar(100) NOT NULL,
  `status_id` int NOT NULL,
  `updated_at` timestamp,
  `updated_by` varchar(100),
  `expense_record_id` int NOT NULL,
  `image_url` text NOT NULL
);

ALTER TABLE `user` ADD CONSTRAINT `status_user` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`);

ALTER TABLE `business` ADD CONSTRAINT `status_business` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`);

ALTER TABLE `business_user` ADD CONSTRAINT `status_business_user` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`);

ALTER TABLE `project` ADD CONSTRAINT `status_project` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`);

ALTER TABLE `log_check_in_out` ADD CONSTRAINT `status_log_check_in_out` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`);

ALTER TABLE `progress_log` ADD CONSTRAINT `status_progress_log` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`);

ALTER TABLE `progress_log_image` ADD CONSTRAINT `status_progress_log_image` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`);

ALTER TABLE `expense_record` ADD CONSTRAINT `status_expense_record` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`);

ALTER TABLE `expense_record_image` ADD CONSTRAINT `status_expense_record_image` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`);

ALTER TABLE `business_user` ADD CONSTRAINT `business_business_user` FOREIGN KEY (`business_id`) REFERENCES `business` (`id`);

ALTER TABLE `project` ADD CONSTRAINT `business_project` FOREIGN KEY (`business_id`) REFERENCES `business` (`id`);

ALTER TABLE `log_check_in_out` ADD CONSTRAINT `project_log_check_in_out` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`);

ALTER TABLE `progress_log` ADD CONSTRAINT `project_progress_log` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`);

ALTER TABLE `expense_record` ADD CONSTRAINT `project_expense_record` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`);

ALTER TABLE `progress_log_image` ADD CONSTRAINT `progress_log_progress_log_image` FOREIGN KEY (`progress_log_id`) REFERENCES `progress_log` (`id`);

ALTER TABLE `expense_record_image` ADD CONSTRAINT `expense_record_expense_record_image` FOREIGN KEY (`expense_record_id`) REFERENCES `expense_record` (`id`);

ALTER TABLE `business` ADD CONSTRAINT `user_business` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`);

ALTER TABLE `business_user` ADD CONSTRAINT `user_business_user` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`);

ALTER TABLE `project` ADD CONSTRAINT `user_project` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`);

ALTER TABLE `log_check_in_out` ADD CONSTRAINT `user_log_check_in_out` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`);

ALTER TABLE `progress_log` ADD CONSTRAINT `user_progress_log` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`);

ALTER TABLE `progress_log_image` ADD CONSTRAINT `user_progress_log_image` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`);

ALTER TABLE `expense_record` ADD CONSTRAINT `user_expense_record` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`);

ALTER TABLE `expense_record_image` ADD CONSTRAINT `user_expense_record_image` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`);

ALTER TABLE `business` ADD CONSTRAINT `user_business_u` FOREIGN KEY (`updated_by`) REFERENCES `user` (`id`);

ALTER TABLE `business_user` ADD CONSTRAINT `user_business_user_u` FOREIGN KEY (`updated_by`) REFERENCES `user` (`id`);

ALTER TABLE `project` ADD CONSTRAINT `user_project_u` FOREIGN KEY (`updated_by`) REFERENCES `user` (`id`);

ALTER TABLE `log_check_in_out` ADD CONSTRAINT `user_log_check_in_out_u` FOREIGN KEY (`updated_by`) REFERENCES `user` (`id`);

ALTER TABLE `progress_log` ADD CONSTRAINT `user_progress_log_u` FOREIGN KEY (`updated_by`) REFERENCES `user` (`id`);

ALTER TABLE `progress_log_image` ADD CONSTRAINT `user_progress_log_image_u` FOREIGN KEY (`updated_by`) REFERENCES `user` (`id`);

ALTER TABLE `expense_record` ADD CONSTRAINT `user_expense_record_u` FOREIGN KEY (`updated_by`) REFERENCES `user` (`id`);

ALTER TABLE `expense_record_image` ADD CONSTRAINT `user_expense_record_image_u` FOREIGN KEY (`updated_by`) REFERENCES `user` (`id`);
