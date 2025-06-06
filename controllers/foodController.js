<<<<<<< HEAD
// controllers/foodController.js
const { v4: uuidv4 } = require("uuid");

let foodItems = []; // Penyimpanan data sementara

exports.getAllFoods = async (request, h) => {
  return h
    .response({
      status: "success",
      data: foodItems,
    })
    .code(200);
};

exports.addFood = async (request, h) => {
  const { category, name, quantity, unit } = request.payload;
  const newFood = {
    id: uuidv4(),
    category,
    name,
    quantity,
    unit,
    createdAt: new Date().toISOString(),
  };
  foodItems.push(newFood);
  return h
    .response({
      status: "success",
      message: "Food added successfully",
      data: newFood,
    })
    .code(201);
};

exports.deleteFood = async (request, h) => {
  const { id } = request.params;
  foodItems = foodItems.filter((item) => item.id !== id);
  return h
    .response({
      status: "success",
      message: "Food deleted",
    })
    .code(200);
};

exports.updateFood = async (request, h) => {
  const { id } = request.params;
  const { category, name, quantity, unit } = request.payload;
  const index = foodItems.findIndex((item) => item.id === id);
  if (index === -1) {
    return h
      .response({
        status: "fail",
        message: "Food not found",
      })
      .code(404);
  }
  foodItems[index] = {
    ...foodItems[index],
    category,
    name,
    quantity,
    unit,
    updatedAt: new Date().toISOString(),
  };
  return h
    .response({
      status: "success",
      message: "Food updated",
      data: foodItems[index],
    })
    .code(200);
};
=======
// const Food = require("../models/foodModel");

// controllers/foodController.js
const { v4: uuidv4 } = require("uuid");

let foodItems = []; // Satu-satunya penyimpanan data

exports.getAllFoods = async (request, h) => {
  return h
    .response({
      status: "success",
      data: foodItems,
    })
    .code(200);
};

exports.addFood = async (request, h) => {
  const { category, name, quantity, unit } = request.payload;

  const newFood = {
    id: uuidv4(),
    category,
    name,
    quantity,
    unit,
    createdAt: new Date().toISOString(),
  };

  foodItems.push(newFood);

  return h
    .response({
      status: "success",
      message: "Food added successfully",
      data: newFood,
    })
    .code(201);
};

exports.deleteFood = async (request, h) => {
  const { id } = request.params;
  foodItems = foodItems.filter((item) => item.id !== id);

  return h
    .response({
      status: "success",
      message: "Food deleted",
    })
    .code(200);
};

exports.updateFood = async (request, h) => {
  const { id } = request.params;
  const { category, name, quantity, unit } = request.payload;

  const index = foodItems.findIndex((item) => item.id === id);

  if (index === -1) {
    return h
      .response({
        status: "fail",
        message: "Food not found",
      })
      .code(404);
  }

  foodItems[index] = {
    ...foodItems[index],
    category,
    name,
    quantity,
    unit,
    updatedAt: new Date().toISOString(),
  };

  return h
    .response({
      status: "success",
      message: "Food updated",
      data: foodItems[index],
    })
    .code(200);
};
>>>>>>> eac9af128ba9c20b2bbc397d5bbad0c64e017863
