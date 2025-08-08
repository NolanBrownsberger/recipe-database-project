const db = require('./db');

async function getAllRecipes() {
  const [rows] = await db.query(`
    SELECT r.recipe_id, r.title, r.description, u.username
    FROM RECIPE r
    JOIN USER u ON r.user_id = u.user_id
  `);
  return rows;
}

async function getRecipeById(recipeId) {
  const [[recipe]] = await db.query(
    `SELECT * FROM RECIPE WHERE recipe_id = ?`,
    [recipeId]
  );

  const [ingredients] = await db.query(
    `SELECT * FROM RECIPE_INGREDIENT WHERE recipe_id = ?`,
    [recipeId]
  );

  const [steps] = await db.query(
    `SELECT * FROM RECIPE_STEP WHERE recipe_id = ? ORDER BY step_number ASC`,
    [recipeId]
  );

  return { ...recipe, ingredients, steps };
}

async function createRecipe(userId, title, description, ingredients, steps) {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const [result] = await conn.query(
      `INSERT INTO RECIPE (user_id, title, description) VALUES (?, ?, ?)`,
      [userId, title, description]
    );
    const recipeId = result.insertId;

    for (const ingredient of ingredients) {
      await conn.query(
        `INSERT INTO RECIPE_INGREDIENT (recipe_id, name, measurement, quantity) VALUES (?, ?, ?, ?)`,
        [recipeId, ingredient.name, ingredient.measurement, ingredient.quantity]
      );
    }

    for (let i = 0; i < steps.length; i++) {
      await conn.query(
        `INSERT INTO RECIPE_STEP (recipe_id, step_number, instruction) VALUES (?, ?, ?)`,
        [recipeId, i + 1, steps[i]]
      );
    }

    await conn.commit();
    return recipeId;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

async function deleteRecipe(recipeId) {
  await db.query(`DELETE FROM RECIPE WHERE recipe_id = ?`, [recipeId]);
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  deleteRecipe
};
