const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const recipeSchema = new mongoose.Schema({
    name: String,
    imageUrl: String,
    description: String,
    ingredients: [String],
    allergens: [String],
    utensils: [String],
    nutrition: {
        calories: Number,
        protein: Number,
        fat: Number,
        carbohydrates: Number,
        cholesterol: Number,
        sodium: Number
    },
    recommendations: [String] 
});

const recipe=mongoose.model("menus",recipeSchema);
module.exports=recipe;