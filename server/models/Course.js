const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    customId: { type: String, unique: true, index: true },
    title: { type: String, required: true },
    price: { type: Number, required: true }, // Price in INR (e.g. 429)
    instructor: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);
