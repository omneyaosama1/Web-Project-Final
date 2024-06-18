const Recipe = require('../models/recipes');


//show all menu items
const getMenu = async (req, res) => {
    try {
        const menuData = await Recipe.find();
        res.render('menu', { menuData });
    } catch (err) {
        console.error('Error fetching recipes:', err);
        res.status(500).json({ error: 'Failed to fetch recipes' });
    }
};

//add new recipe
const addRecipe = async (req, res) => {
    try {
        const { name, description, imageUrl,cookTime, ingredients, allergens, utensils, nutrition, recommendations } = req.body;
        const newRecipe = new Recipe({
            name,
            imageUrl,
            cookTime,
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
        res.status(500).send(' Failed to Add');
    }
};

const deleteRecipe=async (req,res)=>{
    const {id}=req.params;
    console.log(`Received ID: ${id}`);
try{
const deletedRecipe=await Recipe.findByIdAndDelete(id);
if(!deletedRecipe){
    return res.status(404).send("Recipe Not Found");
}
return res.status(200).send("Recipe Deleted");
}catch(err){
    console.log(err);
        res.status(500).send(' Failed To Delete');
}
};

const updateRecipe=async (req,res)=>{
    const {id}=req.params;
    const { name, description, imageUrl,cookTime, ingredients, allergens, utensils, nutrition, recommendations } = req.body;
    console.log(`Received ID: ${id}`);
try{
const updateRecipe=await Recipe.findByIdAndUpdate(
    id,
    {
        name, description, imageUrl,cookTime, ingredients, allergens, utensils, nutrition, recommendations },
        {new:true}
    
);
if(!updateRecipe){
    return res.status(404).send("Recipe Not Found");
}
return res.status(200).send("Recipe Updated");
}catch(err){
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