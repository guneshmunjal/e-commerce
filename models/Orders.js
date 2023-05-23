const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  customerInformation: {
    type: Object,
    properties: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
  },
  Payment: {
    type: Object,
    properties: {
      modeOfPayment: {
        type: String,
        enum: ["COD", "CARD", "PAYPAL", "AMAZON CARD"],
        required: true,
      },
      deliveryAddress: {
        type: String,
        required: true,
      },
    },
  },
});

module.exports = mongoose.model("oders", orderSchema);
