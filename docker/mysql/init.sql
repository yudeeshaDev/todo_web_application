-- MySQL initialization script for Todo App
-- This script runs when the MySQL container starts for the first time

-- Create the database if it doesn't exist (already created by environment variables)
-- CREATE DATABASE IF NOT EXISTS todo_app;

-- Use the todo_app database
USE todo_app;

-- Set character set and collation
ALTER DATABASE todo_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create any additional initial data or configurations here
-- The Laravel migrations will handle table creation

-- Grant additional permissions if needed
-- GRANT ALL PRIVILEGES ON todo_app.* TO 'todo_user'@'%';
-- FLUSH PRIVILEGES;
