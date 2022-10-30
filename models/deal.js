const mongoose = require("mongoose");

const Schema = mongoose.Schema;
//const mongooseAlgolia = require("mongoose-algolia");
const DealSchema = new Schema(
  {

    title: String,
    description: String,
    photo: String,
    price: Number,
    stockQuantity: Number,


 //   time: { type: Date, default: Date.now },
 createdAt: { type: Date, expires: '5m', default: Date.now }
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  },
  {
    timestamps: true
  }
);

const Deal = mongoose.model("Deal", DealSchema);
module.exports = Deal;
