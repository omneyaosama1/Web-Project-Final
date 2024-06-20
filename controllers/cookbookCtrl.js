const Meal = require("../Schema/mealSchema");
const mealsPerPage = 12;

const getMeals = async (req, res) => {
  try {
    const page = +req.query.page || 1;
    const skip = (page - 1) * mealsPerPage;
    const meals = await Meal.find().skip(skip).limit(mealsPerPage).exec();
    const totalMealsCount = await Meal.countDocuments();
    const totalPages = Math.ceil(totalMealsCount / mealsPerPage);

    res.render("cookbook", {
      meals: meals,
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Failed to display meals');
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
    preferences,
    ingredientsName,
    ingPer2,
    ingPer4,
    instructions,
    allergens,
    utensils,
    nutrition,
    recommendations,
  } = req.body;

  try {
    const newMeal = new Meal({
      name,
      image,
      cookTime,
      difficulty,
      description,
      tags,
      preferences, 
      ingredientsName,
      ingPer2,
      ingPer4,
      instructions,
      allergens,
      utensils,
      nutrition,
      recommendations,
    });

    await newMeal.save();
    res.status(201).json({ message: "Meal added successfully", meal: newMeal });
  } catch (error) {
    console.log(error);
    res.status(500).send('Failed to add a meal');
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
    preferences,
    ingredientsName,
    ingPer2,
    ingPer4,
    instructions,
    allergens,
    utensils,
    nutrition,
    recommendations,
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
        preferences, 
        ingredientsName,
        ingPer2,
        ingPer4,
        instructions,
        allergens,
        utensils,
        nutrition,
        recommendations,
      },
      { new: true }
    );

    if (!updatedMeal) {
      return res.status(404).json({ error: "Meal not found" });
    }

    res
      .status(200)
      .json({ message: "Meal updated successfully", meal: updatedMeal });
  } catch (error) {
    console.log(error);
    res.status(500).send('Failed to update a meal');
  }
};

const deleteMeal = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMeal = await Meal.findByIdAndDelete(id);

    if (!deletedMeal) {
      return res.status(404).json({ error: "Meal not found" });
    }

    res
      .status(200)
      .json({ message: "Meal deleted successfully", meal: deletedMeal });
  } catch (error) {
    console.log(error);
    res.status(500).send('Failed to delete a meal');
  }
};

module.exports = {
  getMeals,
  addMeal,
  updateMeal,
  deleteMeal,
};
