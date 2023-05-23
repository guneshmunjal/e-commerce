const orderModel = require("../models/Orders");
const productModel = require("../models/products");
const middleware = require("../middleware/Auth");
const userModel = require("../models/User");
var jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const JWT_SECRET = "GUNESH";
require("dotenv").config();
// in this we need POST /orders:that is Create a new order.

// to create a new order we need to get the product via the id

exports.placeOrder = async (req, res) => {
  try {
    const { orderId, customerInformation, Payment } = req.body;

    const getProduct = await productModel.findById({ _id: orderId });
    console.log(getProduct);

    // if the product id not valid then that means the product is not there therefore send this message

    if (!getProduct) {
      return res.status(404).json({
        message:
          "The product you are trying to order does not exist. Please provide a valid product ID.",
      });
    }

    // now we need to place the order

    const newOrder = new orderModel(
      {
        _id: orderId,
        Payment,
        customerInformation,
      },
      { new: true }
    );

    console.log("hey man how are you doinngGG", newOrder);

    // Assign the product ID to the _id field of the new order
    //newOrder._id = productId;

    // now we need to save the new order in the db

    const saveOrder = await newOrder.save({});
    console.log("the order has been placed congratulations", saveOrder);

    res.json({
      message: "the order has been placed successfully",
    });
  } catch (error) {
    res.status(404).json({
      message: "your product cannot be placed SORRY",
      error: `the error is ${error}`,
    });
  }

  //now once we have gotten the product we need to place the order for it
};


exports.sellersSide = async (req,res) =>{

try{
  const {token,orderId} = req.body;

// Sample token and secret key (replace with your own)
const checkToken = token;
const secretKey = JWT_SECRET;


    // Verify the token and check the user's role
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        // Token verification failed
        console.error('Token verification failed:', err.message);
        return res.status(401).json({
          message: 'Invalid token',
        });
      }

      // Token is valid
      console.log('Token is valid');
      console.log('Decoded payload:', decoded);

      // Check user's role
      const userRole = decoded.role;
      if (userRole === 'sellers') {
        // User is an admin
        // Implement your logic for admin role in the order controller
        const sellerId = decoded.orderId;
        const sellerOrders = orderModel.find({ 
          _id: orderId});

          console.log("ksniorn",sellerId,sellerOrders);
          


      }  else {
        // User role is unknown or not authorized
        console.log('Unauthorized access');
        return res.status(403).json({
          message: 'Unauthorized access',
        });
      }

      // Continue with the rest of your code for the order controller
      // ...
    });
  } 

  catch (error) {
    return res.status(400).json({
      error: error,
      message: `the error is ${error}`,
    });
  }
};