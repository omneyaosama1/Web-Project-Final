const mongoose = require('mongoose');


const MealSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please enter a meal name"],
        validate: {
            validator: function(v) {
                return /^[A-Za-z\s,'’&\.\-:]+$/i.test(v);
            },
            message: props => `${props.value} is not a valid meal name`
        }  
    },
    
    image: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
            
                return /\.(jpg|jpeg|png|gif)$/i.test(v);
            },
            message: props => `${props.value} is not a valid image URL`
        }
    
      },
  
    cookTime:{
        type: Number,
        required: [true, "Please enter the duration (in minutes)"],
        validate: {
            validator: function(v) {
                return /^\d+$/.test(v);
            },
            message: props => `${props.value} must contain only numeric characters`
        }
      },
  

    difficulty: {
        type: String,
        required: [true, "Please enter the difficulty level"],
        enum: ["Easy", "Medium", "Hard"],
      },
  
      description: {
        type: String,
        required: [true, "Please enter a description"],
        validate: {
            validator: function(v) {
                return /^[A-Za-z\s,'’&\.\-:]+$/i.test(v);
            },
            message: props => `${props.value} is not a valid meal name`
        }  
    },

  tags:{
    type:String,
    required: [true, "Please enter a tag"],
    validate: {
        validator: function(v) {
            
            return /^[A-Za-z\s,'’&\.\-:]+$/i.test(v);
        },
        message: props => `${props.value} is not a valid meal name`
    }  
  },
    ingredientsName: {
        type: [String],
        required: [true, "Please enter ingredients name"],
        validate: {
            validator: function(v) {
                return /^[A-Za-z\s,'’&\.\-:]+$/i.test(v);
            },
            message: props => `${props.value} is not a valid meal name`
        }  
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
  
    allergens: {
        type: [String],
        required: [true, "Please enter allergens"],
        validate: {
            validator: function(v) {
                return /^[A-Za-z\s,'’&\.\-:]+$/i.test(v);
            },
            message: props => `${props.value} is not a valid meal name`
        }  
    },
    utensils: {
        type: [String],
        required: [true, "Please enter utensils"],
        validate: {
            validator: function(v) {
                return /^[A-Za-z\s,'’&\.\-:]+$/i.test(v);
            },
            message: props => `${props.value} is not a valid meal name`
        }  
    },

    nutrition: {
        energy: {
          type: Number,
          required: true,
          min: [0, "Energy must be a positive number"],
          validate: {
            validator: function(v) {
                return /^\d+$/.test(v);
            },
            message: props => `${props.value} must contain only numeric characters`
        }
        },
        calories: {
          type: Number,
          required: true,
          min: [0, "Calories must be a positive number"],
          validate: {
            validator: function(v) {
                return /^\d+$/.test(v);
            },
            message: props => `${props.value} must contain only numeric characters`
        }
        },
        fat: {
          type: Number,
          required: true,
          min: [0, "Fats must be a positive number"],
          validate: {
            validator: function(v) {
                return /^\d+$/.test(v);
            },
            message: props => `${props.value} must contain only numeric characters`
        }
        },
        satFat: {
          type: Number,
          required: true,
          min: [0, "satFat must be a positive number"],
          validate: {
            validator: function(v) {
                return /^\d+$/.test(v);
            },
            message: props => `${props.value} must contain only numeric characters!`
        }
        },
        carbohydrates: {
          type: Number,
          required: true,
          min: [0, "Carbohydrates must be a positive number"],
          validate: {
            validator: function(v) {
                return /^\d+$/.test(v);
            },
            message: props => `${props.value} must contain only numeric characters!`
        }
        },
        sugar: {
          type: Number,
          required: true,
          min: [0, "Sugar must be a positive number"],
          validate: {
            validator: function(v) {
                return /^\d+$/.test(v);
            },
            message: props => `${props.value} must contain only numeric characters!`
        }
        },
        fiber: {
          type: Number,
          required: true,
          min: [0, "Fiber must be a positive number"],
          validate: {
            validator: function(v) {
                return /^\d+$/.test(v);
            },
            message: props => `${props.value} must contain only numeric characters!`
        }
        },
        protein: {
          type: Number,
          required: true,
          min: [0, "Protein must be a positive number"],
          validate: {
            validator: function(v) {
                return /^\d+$/.test(v);
            },
            message: props => `${props.value} must contain only numeric characters!`
        }
        },
        cholesterol: {
          type: Number,
          required: true,
          min: [0, "Cholesterol must be a positive number"],
          validate: {
            validator: function(v) {
                return /^\d+$/.test(v);
            },
            message: props => `${props.value} must contain only numeric characters!`
        }
        },
        sodium: {
          type: Number,
          required: true,
          min: [0, "Sodium must be a positive number"],
          validate: {
            validator: function(v) {
                return /^\d+$/.test(v);
            },
            message: props => `${props.value} must contain only numeric characters!`
        }
        },
        
      },
    recommendations: {
        type: [String],
        required: [true, "Please enter recommendations"],
        validate: {
            validator: function(v) {
                return /^[A-Za-z\s,'’&\.\-:]+$/i.test(v);
            },
            message: props => `${props.value} is not a valid string!`
        }  
    },

    

},{ timestamps: true });

const recipe = mongoose.model("menu", MealSchema);
module.exports = recipe;