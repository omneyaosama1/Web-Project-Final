const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [false, "Please enter a meal name"],
    },

    image: {
      type: String,
      required: [false, "Please enter a meal image"],
    },

    cookTime: {
      type: Number,
      required: [false, "Please enter the duration (in minutes)"],
    },

    difficulty: {
      type: String,
      required: [false, "Please enter the difficulty level"],
      enum: ["Easy", "Medium", "Hard"],
    },

    description: {
      type: String,
      required: [false, "Please enter a description"],
    },

    tags: {
      type: String,
      required: [false, "Please enter a cuisine"],
    },
    preferences: {
      type: [String],
      required: [false, "Please enter from the 6 preferences"],
      enum: ["meat", "veggies", "family", "fit", "speedy", "fish"],
      ref:"User"
    },
    ingredientsName: {
      type: [String],
      required: [false, "Please enter ingredients name"],
    },

    ingPer2: {
      type: [String],
      required: [false, "Please enter ingredients for 2 servings"],
    },

    ingPer4: {
      type: [String],
      required: [false, "Please enter ingredients for 4 servings"],
    },

    instructions: {
      type: [String],
      required: [false, "Please enter the instructions"],
    },
    allergens: {
      type: [String],
      required: [false, "Please enter allergens"],
    },
    utensils: {
      type: [String],
      required: [false, "Please enter utensils"],
    },
    nutrition: {
      energy: {
        type: Number,
        required: false,
        min: [0, "Energy must be a positive number"],
      },
      calories: {
        type: Number,
        required: false,
        min: [0, "Calories must be a positive number"],
      },
      fat: {
        type: Number,
        required: false,
        min: [0, "Fats must be a positive number"],
      },
      satFat: {
        type: Number,
        required: false,
        min: [0, "satFat must be a positive number"],
      },
      carbohydrates: {
        type: Number,
        required: false,
        min: [0, "Carbohydrates must be a positive number"],
      },
      sugar: {
        type: Number,
        required: false,
        min: [0, "Sugar must be a positive number"],
      },
      fiber: {
        type: Number,
        required: false,
        min: [0, "Fiber must be a positive number"],
      },
      protein: {
        type: Number,
        required: false,
        min: [0, "Protein must be a positive number"],
      },
      cholesterol: {
        type: Number,
        required: false,
        min: [0, "Cholesterol must be a positive number"],
      },
      sodium: {
        type: Number,
        required: false,
        min: [0, "Sodium must be a positive number"],
      },
    },
    recommendations: {
      type: [String],
      required: [false, "Please enter recommendations"],
    },
  },
  { timestamps: true }
);
const Meal = mongoose.model("Dish", mealSchema);

module.exports = Meal;