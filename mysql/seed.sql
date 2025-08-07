-- Insert sample users
INSERT INTO USER (username, password, is_admin)  VALUES
('alice', 'password123', FALSE),
('bob', 'adminpass', TRUE);

-- Insert sample recipes
INSERT INTO RECIPE (user_id, title, description) VALUES
(1, 'Spaghetti Bolognese', 'A classic Italian meat sauce recipe.'),
(2, 'Chili', 'Hearty chili with beans and veggies.');

-- Insert sample ingredients
INSERT INTO RECIPE_INGREDIENT (recipe_id, name, measurement, quantity) VALUES
(1, 'Spaghetti', 'grams', 200),
(1, 'Ground Beef', 'grams', 250),
(1, 'Tomato Sauce', 'cups', 1.5),
(2, 'Kidney Beans', 'cups', 2),
(2, 'Bell Pepper', 'pieces', 1),
(2, 'Tomato Paste', 'tablespoons', 2);

-- Insert sample steps
INSERT INTO RECIPE_STEP (recipe_id, step_number, instruction)  VALUES
(1, 1, 'Boil the spaghetti according to package instructions.'),
(1, 2, 'Brown the ground beef in a skillet.'),
(1, 3, 'Add tomato sauce and simmer.'),
(2, 1, 'Chop all vegetables.'),
(2, 2, 'Sauté peppers in a pot.'),
(2, 3, 'Add beans, tomato paste, and simmer for 20 minutes.');