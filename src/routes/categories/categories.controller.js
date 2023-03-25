const {
  getAllCategories,
  saveCategory,
} = require("../../models/categories/categories.model");

async function httpGetAllCategories(req, res) {
  const categories = await getAllCategories();
  const categoriesNoMongoID = categories.map((category) => {
    return {
      id: category.id,
      name: category.name,
      imageUrl: category.imageUrl,
    };
  });

  return res.status(200).json(categoriesNoMongoID);
}

async function httpSaveCategory(req, res) {
  const { category } = req.body;
  return res.status(200).json(await saveCategory(category));
}

module.exports = {
  httpGetAllCategories,
  httpSaveCategory,
};
