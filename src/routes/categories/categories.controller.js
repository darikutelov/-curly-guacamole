const {
  getAllCategories,
  saveCategory,
} = require("../../models/categories/categories.model");

async function httpGetAllCategories(req, res) {
  return res.status(200).json(await getAllCategories());
}

async function httpSaveCategory(req, res) {
  const { category } = req.body;
  return res.status(200).json(await saveCategory(category));
}

module.exports = {
  httpGetAllCategories,
  httpSaveCategory,
};
