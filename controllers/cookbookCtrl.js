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
    res.status(500).send('Failed to add a meal',error);
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


const getMealsAdmin = async (req, res) => {
  try {
    const meals = await Meal.find();
    res.render('adminProducts', { meals });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

const addMealAdmin = async (req, res) => {
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
    if (isNaN(nutrition.energy) || isNaN(nutrition.calories) || isNaN(nutrition.fat) || isNaN(nutrition.satFat) || isNaN(nutrition.carbohydrates) || isNaN(nutrition.sugar) || isNaN(nutrition.fiber) || isNaN(nutrition.protein) || isNaN(nutrition.cholesterol) || isNaN(nutrition.sodium)) {
      throw new Error('Invalid nutritional values');
    }

    const newMeal = new Meal({
      name,
      image,
      cookTime,
      difficulty,
      description,
      tags,
      preferences: preferences.split(','),  // Split preferences by comma
      ingredientsName: ingredientsName.split(','),  // Same for ingredientsName
      ingPer2: ingPer2.split(','),  // Same for ingPer2
      ingPer4: ingPer4.split(','),  // Same for ingPer4
      instructions: instructions.split(','),  // Same for instructions
      allergens: allergens.split(','),  // Same for allergens
      utensils: utensils.split(','),  // Same for utensils
      nutrition: {
        energy: parseFloat(nutrition.energy),
        calories: parseFloat(nutrition.calories),
        fat: parseFloat(nutrition.fat),
        satFat: parseFloat(nutrition.satFat),
        carbohydrates: parseFloat(nutrition.carbohydrates),
        sugar: parseFloat(nutrition.sugar),
        fiber: parseFloat(nutrition.fiber),
        protein: parseFloat(nutrition.protein),
        cholesterol: parseFloat(nutrition.cholesterol),
        sodium: parseFloat(nutrition.sodium),
      },
      recommendations: recommendations.split(','),  // Same for recommendations
    });

    await newMeal.save();
    res.redirect('/products'); // Redirect to the products page
  } catch (error) {
    console.error('Error details:', error); // Log detailed error information
    res.status(500).send('Failed to add a meal');
  }
};

module.exports = {
  getMeals,
  addMeal,
  updateMeal,
  deleteMeal,
  getMealsAdmin,
  addMealAdmin
};