const inquirer = require('inquirer');
const userModel = require('../models/userModel');

async function loginOrRegister() {
  const { action } = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'Login or Register?',
    choices: ['Login', 'Register']
  });

  const { username, password } = await inquirer.prompt([
    { name: 'username', message: 'Username:' },
    { name: 'password', type: 'password', message: 'Password:' }
  ]);

  if (action === 'Register') {
    const existing = await userModel.findUserByUsername(username);
    if (existing) {
      console.log('User already exists!');
      return loginOrRegister();
    }
    const userId = await userModel.createUser(username, password);
    console.log('Registration successful!');
    return { user_id: userId, username };
  }

  const user = await userModel.findUserByUsername(username);
  if (!user || user.password !== password) {
    console.log('Invalid credentials.');
    return loginOrRegister();
  }

  console.log(`Welcome back, ${username}!`);
  return user;
}

module.exports = { loginOrRegister };