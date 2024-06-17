const Meal = require('../Schema/cookbookMealSchema');

// Display all of the cookbook page
const getMeals = async (req, res) => {
  try {
    const meals = await Meal.find();
    res.render('cookbook', { meals });
  } catch (error) {
    console.error(error); 
    res.status(500).send('Server Error');
  }
};

// Add a new meal
const addMeal = async (req, res) => {
  const { name, description, image, duration, difficulty, ingPer2, ingPer4, instructions, nutrition, utensils } = req.body;
  try {
    const newMeal = new Meal({
      name,
      description,
      image,
      duration,
      difficulty,
      ingPer2,
      ingPer4,
      instructions,
      nutrition,
      utensils
    });
    await newMeal.save();
    res.status(201).send('Meal added successfully');
  } catch (error) {
    console.error(error); 
    res.status(500).send('Failed to add meal');
  }
};

// Update a meal
const updateMeal = async (req, res) => {
  const {id}  = req.params;
  const { name, description, image, duration, difficulty, ingPer2, ingPer4, instructions, nutrition, utensils } = req.body;
  try {
    const updatedMeal = await Meal.findByIdAndUpdate(
      id,
      {
        name,
        description,
        image,
        duration,
        difficulty,
        ingPer2,
        ingPer4,
        instructions,
        nutrition,
        utensils
      },
      { new: true } 
    );
    if (!updatedMeal) {
      return res.status(404).send('Meal not found');
    }
    res.status(200).send('Meal updated successfully');
  } catch (error) {
    console.error(error); 
    res.status(500).send('Failed to update meal');
  }
};

// Delete a meal
const deleteMeal = async (req, res) => {
  const {id}  = req.params;
  try {
    const deletedMeal = await Meal.findByIdAndDelete(id);
    if (!deletedMeal) {
      return res.status(404).send('Meal not found');
    }
    res.status(200).send('Meal deleted successfully');
  } catch (error) {
    console.error(error); 
    res.status(500).send('Failed to delete meal');
  }
};

module.exports = {
  getMeals,
  addMeal,
  updateMeal,
  deleteMeal
};
