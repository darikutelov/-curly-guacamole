const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  position: {
    type: Number,
    required: true,
    unique: true,
  },
});

categorySchema.virtual("id").get(function () {
  return this._id?.toHexString();
});

categorySchema.set("toJSON", {
  virtuals: true,
});

module.exports = model("Categories", categorySchema);
