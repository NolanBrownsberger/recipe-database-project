const inquirer = require('inquirer');
const recipeModel = require('../models/recipeModel');

async function viewAllRecipes() {
  const recipes = await recipeModel.getAllRecipes();
  const choices = recipes.map(r => ({
    name: `${r.title} (by ${r.username})`,
    value: r.recipe_id
  }));

  if (choices.length === 0) {
    console.log("No recipes found.");
    return;
  }

  const { selectedId } = await inquirer.prompt({
    type: 'list',
    name: 'selectedId',
    message: 'Select a recipe to view:',
    choices
  });

  const recipe = await recipeModel.getRecipeById(selectedId);

  console.log(`\n${recipe.title}`);
  console.log(`Description: ${recipe.description}\n`);
  console.log(`Ingredients:`);
  recipe.ingredients.forEach(i => {
    console.log(`- ${i.quantity} ${i.measurement} ${i.name}`);
  });

  console.log(`\nSteps:`);
  recipe.steps.forEach(s => {
    console.log(`${s.step_number}. ${s.instruction}`);
  });

  console.log('');
}

async function addRecipe(user) {
  const { title, description } = await inquirer.prompt([
    { name: 'title', message: 'Recipe title:' },
    { name: 'description', message: 'Recipe description:' }
  ]);

  const ingredients = [];
  while (true) {
    const { name, measurement, quantity } = await inquirer.prompt([
      { name: 'name', message: 'Ingredient name:' },
      { name: 'measurement', message: 'Measurement (e.g., cups, grams):' },
      { 
        name: 'quantity', 
        message: 'Quantity:',
        validate: input => {
          const num = parseFloat(input);
          return !isNaN(num) && num > 0 ? true : 'Please enter a valid number';
        },
      }
    ]);

    ingredients.push({ name, measurement, quantity: parseFloat(quantity) });

    const { more } = await inquirer.prompt({
      type: 'confirm',
      name: 'more',
      message: 'Add another ingredient?',
      default: false
    });
    if (!more) break;
  }

  const steps = [];
  while (true) {
    const { instruction } = await inquirer.prompt({
      name: 'instruction',
      message: `Step ${steps.length + 1}:`
    });
    steps.push(instruction);

    const { more } = await inquirer.prompt({
      type: 'confirm',
      name: 'more',
      message: 'Add another step?',
      default: false
    });
    if (!more) break;
  }

  console.log(`\nRecipe added\n`);
}

async function deleteRecipe(user) {
  const recipes = await recipeModel.getAllRecipes();

  // Filter based on admin status
  const filteredRecipes = user.is_admin
    ? recipes
    : recipes.filter(r => r.user_id === user.user_id);

  if (filteredRecipes.length === 0) {
    console.log("No recipes available to delete.");
    return;
  }

  // Build choices
  const choices = filteredRecipes.map(r => ({
    name: `${r.title} (by ${r.username})`,
    value: r.recipe_id
  }));

  choices.push({name: 'Cancel', value: null});

  const { recipeId } = await inquirer.prompt({
    type: 'list',
    name: 'recipeId',
    message: 'Which recipe would you like to delete?',
    choices
  });

  if (recipeId === null) {
    console.log("Deletion cancelled.");
    return;
  }

  await recipeModel.deleteRecipe(recipeId);
  console.log("Recipe deleted.");
}

module.exports = {
  viewAllRecipes,
  addRecipe,
  deleteRecipe
};