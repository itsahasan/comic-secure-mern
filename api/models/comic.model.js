const mongoose = require('mongoose');

const comicSchema = new mongoose.Schema(
  {
    csvId: { type: Number, index: true },
    serie: { type: String, required: true, trim: true, maxlength: 200 },
    number: { type: String, trim: true, maxlength: 50 },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comic', comicSchema);
