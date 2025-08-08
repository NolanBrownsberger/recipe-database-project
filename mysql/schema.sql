CREATE DATABASE IF NOT EXISTS recipe_db;
USE recipe_db;

-- Drop tables if they already exist
DROP TABLE IF EXISTS RECIPE_STEP;
DROP TABLE IF EXISTS RECIPE_INGREDIENT;
DROP TABLE IF EXISTS RECIPE;
DROP TABLE IF EXISTS USER;

-- Create USER table
CREATE TABLE USER (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE
);

-- Create RECIPE table
CREATE TABLE RECIPE (
    recipe_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    FOREIGN KEY (user_id) REFERENCES USER(user_id)
        ON DELETE CASCADE
);

-- Create RECIPE_INGREDIENT table
CREATE TABLE RECIPE_INGREDIENT (
    ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_id INT,
    name VARCHAR(100) NOT NULL,
    measurement VARCHAR(50),
    quantity VARCHAR(50),
    FOREIGN KEY (recipe_id) REFERENCES RECIPE(recipe_id)
        ON DELETE CASCADE
);

-- Create RECIPE_STEP table
CREATE TABLE RECIPE_STEP (
    step_id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_id INT,
    step_number INT NOT NULL,
    instruction TEXT NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES RECIPE(recipe_id)
        ON DELETE CASCADE
);