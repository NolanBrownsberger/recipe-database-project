// app/index.js
const { loginOrRegister } = require('./controllers/authController');
const inquirer = require('inquirer');

(async function main() {
  const user = await loginOrRegister();

  // Once logged in, show options
  while (true) {
    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: 'What do you want to do?',
      choices: ['View Recipes', 'Add Recipe', 'Edit Recipe', 'Delete Recipe', 'Logout']
    });

    if (action === 'Logout') {
      console.log('Goodbye!');
      break;
    }

  }
})();