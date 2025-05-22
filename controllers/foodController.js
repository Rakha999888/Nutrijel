const { v4: uuidv4 } = require("uuid");
const Food = require("../models/foodModel");

exports.getAllFoods = async (request, h) => {
  const foods = await Food.find();
  return h.response(foods);
};

exports.addFood = async (request, h) => {
  const { category, name, quantity, unit, kcal } = request.payload;
  const newFood = {
    id: uuidv4(),
    category, // karbohidrat, protein, sayur, buah
    name,
    quantity,
    unit, // piring, buah, butir, dll
    kcal,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  await Food.save(newFood);
  return h.response({ message: "Food added successfully", food: newFood }).code(201);
};

exports.deleteFood = async (request, h) => {
  const { id } = request.params;
  await Food.findByIdAndDelete(id);
  return h.response({ message: "Food deleted" });
};

exports.updateFood = async (request, h) => {
  const { id } = request.params;
  const { category, name, quantity, unit, kcal } = request.payload;
  await Food.findByIdAndUpdate(id, {
    category,
    name,
    quantity,
    unit,
    kcal,
    updatedAt: new Date(),
  });
  return h.response({ message: "Food updated" });
};
