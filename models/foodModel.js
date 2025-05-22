// models/foodModel.js

let foods = [];

const FoodModel = {
  find: async () => foods,

  findByIdAndDelete: async (id) => {
    foods = foods.filter((food) => food.id !== id);
  },

  findByIdAndUpdate: async (id, updatedData) => {
    foods = foods.map((food) => (food.id === id ? { ...food, ...updatedData } : food));
  },

  save: async (food) => {
    foods.push(food);
  },
};

module.exports = FoodModel;
