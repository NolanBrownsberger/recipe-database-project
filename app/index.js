// app/index.js
const { loginOrRegister } = require('./controllers/authController');
const {
  viewAllRecipes,
  addRecipe,
  deleteRecipe
} = require('./controllers/recipeController');
const inquirer = require('inquirer');

(async function main() {
  const user = await loginOrRegister();

  // Once logged in, show options
  while (true) {
    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: 'What do you want to do?',
      choices: ['View Recipes', 'Add Recipe', 'Delete Recipe', 'Logout']
    });

    switch (action) {
      case 'View Recipes':
        await viewAllRecipes();
        break;
      case 'Add Recipe':
        await addRecipe(user);
        break;
      case 'Delete Recipe':
        await deleteRecipe();
        break;
      case 'Logout':
        console.log('Goodbye!');
        running = false;
        break;
    }
  }
})();