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
      user: req.session.user 
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Failed to display meals');
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const getMeal = await Meal.findById(id);
    if (!getMeal) {
      return res.status(404).json({ message: 'Meal not found' });
    }
    return res.status(200).json(getMeal);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
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

  const splitStringToArray = (input) => {
    if (typeof input === 'string') {
      return input.split(',').map(item => item.trim());
    }
    return input;
  };

  try {
    const newMeal = new Meal({
      name,
      image,
      cookTime,
      difficulty,
      description,
      tags,
      preferences: splitStringToArray(preferences),
      ingredientsName: splitStringToArray(ingredientsName),
      ingPer2: splitStringToArray(ingPer2),
      ingPer4: splitStringToArray(ingPer4),
      instructions: splitStringToArray(instructions),
      allergens: splitStringToArray(allergens),
      utensils: splitStringToArray(utensils),
      nutrition,
      recommendations: splitStringToArray(recommendations),
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
    res.redirect('/products');
  } catch (error) {
    console.log(error);
    res.status(500).send('Failed to update a meal');
  }
};

const deleteMeal = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMeal = await Meal.findByIdAndDelete(id);
    res.redirect('/products');
  } catch (error) {
    console.log(error);
    res.status(500).send('Failed to delete a meal');
  }
};

const getMealsAdmin = async (req, res) => {
  try {
    const meals = await Meal.find();
    res.render('products', { meals });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getMeals,
  addMeal,
  updateMeal,
  getById,
  deleteMeal,
  getMealsAdmin,
};
