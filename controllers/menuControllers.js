const Recipe = require('../Schema/mealSchema');
const User = require('../Schema/userSchema');
const userCtrl=require('../controllers/userCtrl');

//show all menu items
// const getMenu = async (req, res) => {
//     try {
//         const menuData = await Recipe.find();
//         res.render('menu', { menuData });
//     } catch (err) {
//         console.error('Error fetching recipes:', err);
//         res.status(500).json({ error: 'Failed to fetch recipes' });
//     }
// };


// Show all menu items according to user preferences
const getMenu = async (req, res) => {
    try {
        if (!req.session.user) {
            req.session.user = await User.findById(req.session.userId);
        }

        const user = req.session.user;
        

        const preferences = user.subPlan.preferences;
        console.log('User preferences:', preferences);

        const menuData = await Recipe.find({ preferences: { $in: preferences } });

        res.render('menu', { menuData });
    } catch (err) {
        console.error('Error fetching recipes:', err);
        res.status(500).json({ error: 'Failed to fetch recipes' });
    }
};


//add new recipe
const addRecipe = async (req, res) => {
    try {
        const { name, image, cookTime, difficulty, tags, prefrences, description, ingredientsName, ingPer2, ingPer4, instructions, allergens, utensils, nutrition, recommendations } = req.body;
        const newRecipe = new Recipe({
            name,
            image,
            cookTime,
            difficulty,
            tags,
            prefrences,

            description,
            ingredientsName,
            ingPer2,
            ingPer4,
            instructions,
            allergens,
            utensils,
            nutrition,
            recommendations
        });

        await newRecipe.save();
        res.status(201).send('Recipe Added');
    } catch (err) {
        console.log(err);
        res.status(500).send(' Failed to Add');
    }
};

const deleteRecipe = async (req, res) => {
    const { id } = req.params;
    console.log(`Received ID: ${id}`);
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(id);
        if (!deletedRecipe) {
            return res.status(404).send("Recipe Not Found");
        }
        return res.status(200).send("Recipe Deleted");
    } catch (err) {
        console.log(err);
        res.status(500).send(' Failed To Delete');
    }
};

const updateRecipe = async (req, res) => {
    const { id } = req.params;
    const { name, description, imageUrl, cookTime, ingredients, allergens, utensils, nutrition, recommendations } = req.body;
    console.log(`Received ID: ${id}`);
    try {
        const updateRecipe = await Recipe.findByIdAndUpdate(
            id,
            {
                name, description, imageUrl, cookTime, ingredients, allergens, utensils, nutrition, recommendations
            },
            { new: true }

        );
        if (!updateRecipe) {
            return res.status(404).send("Recipe Not Found");
        }
        return res.status(200).send("Recipe Updated");
    } catch (err) {
        console.log(err);
        res.status(500).send(' Failed To Update');
    }
};


module.exports = {
    getMenu,
    addRecipe,
    deleteRecipe,
    updateRecipe
};