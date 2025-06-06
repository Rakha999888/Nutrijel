// routes/foodRoutes.js
const { getAllFoods, addFood, deleteFood, updateFood } = require("../controllers/foodController");

module.exports = [
  {
    method: "GET",
    path: "/foods",
    handler: getAllFoods,
  },
  {
    method: "POST",
    path: "/foods",
    handler: addFood,
  },
  {
    method: "DELETE",
    path: "/foods/{id}",
    handler: deleteFood,
  },
  {
    method: "PUT",
    path: "/foods/{id}",
    handler: updateFood,
  },
];
