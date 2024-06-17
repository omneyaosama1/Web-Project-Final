const mongoose = require("mongoose");

const mealSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a meal name"],
    },
    description: {
      type: String,
      required: [true, "Please enter a description"],
    },
    duration: {
      type: Number,
      required: [true, "Please enter the duration (in minutes)"],
    },
    difficulty: {
      type: String,
      required: [true, "Please enter the difficulty level"],
      enum: ["Easy", "Medium", "Hard"],
    },
    ingPer2: {
      type: [String],
      required: [true, "Please enter ingredients for 2 servings"],
    },
    ingPer4: {
      type: [String],
      required: [true, "Please enter ingredients for 4 servings"],
    },
    instructions: {
      type: [String],
      required: [true, "Please enter the instructions"],
    },
    nutrition: {
      energy: {
        type: Number,
        required: true,
      },
      calories: {
        type: Number,
        required: true,
      },
      fat: {
        type: Number,
        required: true,
      },
      satFat: {
        type: Number,
        required: true,
      },
      carbs: {
        type: Number,
        required: true,
      },
      sugar: {
        type: Number,
        required: true,
      },
      fiber: {
        type: Number,
        required: true,
      },
      protein: {
        type: Number,
        required: true,
      },
      cholesterol: {
        type: Number,
        required: true,
      },
      sodium: {
        type: Number,
        required: true,
      },
    },
    utensils: {
      type: [String],
      required: [true, "Please enter the utensils needed"],
    },
    image:{
        type:String,
        required:true,
    },
  }
);
const Meal = mongoose.model("Meal", mealSchema);
module.exports = Meal;
