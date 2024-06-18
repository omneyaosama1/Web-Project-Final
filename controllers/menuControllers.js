const Recipe = require('../models/recipes');



const getMenu = async (req, res) => {
    try {
        const menuData = await Recipe.find();
        res.render('menu', { menuData });
    } catch (err) {
        console.error('Error fetching recipes:', err);
        res.status(500).json({ error: 'Failed to fetch recipes' });
    }
};

const addRecipe = async (req, res) => {
    try {
        const { name, description, imageUrl, ingredients, allergens, utensils, nutrition, recommendations } = req.body;
        const newRecipe = new Recipe({
            name,
            imageUrl,
            description,
            ingredients,
            allergens,
            utensils,
            nutrition, 
            recommendations
        });

        await newRecipe.save();
        res.status(201).send('Recipe Added');
    } catch (err) {
        console.log(err);
        res.status(500).send(' Failed to ADD');
    }
};

module.exports = {
    getMenu,
    addRecipe
};