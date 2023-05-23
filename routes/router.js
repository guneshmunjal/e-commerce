const express = require("express");
const router=express.Router();


const {createproducts,getProducts,getbyId,updateProduct,deleteByid} = require("../controllers/productsController");


const {signIn,loginTheuser} = require("../controllers/userController");

const {middlewareAUTH ,iscustomer} = require("../middleware/Auth");

const {placeOrder,sellersSide } = require("../controllers/orderController");



router.post("/signup",signIn);

router.post("/login",loginTheuser);


router.post("/enterproduct",createproducts);

router.get("/checkProducts",getProducts);

router.get("/fetchid/:id",getbyId);

router.put("/updation/:id",updateProduct);

router.post("/delete/:id",deleteByid);

router.post("/order",placeOrder );
 router.get("/sellerorder",sellersSide);

router.get("/customer",
 ()=>{iscustomer, (req,res) =>{
 res.status(200).json({
    message:"you have entered the student path successfully"
 })}
})

router.get("/sellerpage",sellersSide);










module.exports = router;
