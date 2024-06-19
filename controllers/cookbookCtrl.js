const Meal = require('../Schema/cookbookMealSchema');

const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error: 'Server Error' });
};

const getMeals = async (req, res) => {
  try {
    const meals = await Meal.find();
    res.render('cookbook', { meals }); 
  } catch (error) {
    handleServerError(res, error);
  }
};

const addMeal = async (req, res) => {
  const {
    name,
    image,
    cookTime,
    difficulty,
    description,
    tags,
    ingredientsName,
    ingPer2,
    ingPer4,
    instructions,
    allergens,
    utensils,
    nutrition,
    recommendations
  } = req.body;

  try {
    const newMeal = new Meal({
      name,
      image,
      cookTime,
      difficulty,
      description,
      tags,
      ingredientsName,
      ingPer2,
      ingPer4,
      instructions,
      allergens,
      utensils,
      nutrition,
      recommendations
    });
    
    await newMeal.save();
    res.status(201).json({ message: 'Meal added successfully', meal: newMeal });
  } catch (error) {
    handleServerError(res, error);
  }
};

const updateMeal = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    image,
    cookTime,
    difficulty,
    description,
    tags,
    ingredientsName,
    ingPer2,
    ingPer4,
    instructions,
    allergens,
    utensils,
    nutrition,
    recommendations
  } = req.body;

  try {
    const updatedMeal = await Meal.findByIdAndUpdate(
      id,
      {
        name,
        image,
        cookTime,
        difficulty,
        description,
        tags,
        ingredientsName,
        ingPer2,
        ingPer4,
        instructions,
        allergens,
        utensils,
        nutrition,
        recommendations
      },
      { new: true }
    );

    if (!updatedMeal) {
      return res.status(404).json({ error: 'Meal not found' });
    }
    
    res.status(200).json({ message: 'Meal updated successfully', meal: updatedMeal });
  } catch (error) {
    handleServerError(res, error);
  }
};

const deleteMeal = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMeal = await Meal.findByIdAndDelete(id);

    if (!deletedMeal) {
      return res.status(404).json({ error: 'Meal not found' });
    }
    
    res.status(200).json({ message: 'Meal deleted successfully', meal: deletedMeal });
  } catch (error) {
    handleServerError(res, error);
  }
};

module.exports = {
  getMeals,
  addMeal,
  updateMeal,
  deleteMeal
};
