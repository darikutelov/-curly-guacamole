const categories = require("./categories.mongo");

async function getAllCategories() {
  return await categories.find({}, { __v: 0 }).sort({ position: 1 });
}

async function saveCategory(category) {
  try {
    const categoriesCount = await categories.estimatedDocumentCount();
    let { name, imageUrl, position } = category;
    if (!position) {
      position = categoriesCount + 1;
    }

    const { upsertedCount, modifiedCount } = await categories.updateOne(
      { name },
      { imageUrl, position },
      {
        upsert: true,
      }
    );
    return {
      success: !!(upsertedCount || modifiedCount),
    };
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllCategories,
  saveCategory,
};
