const productModel = require("../models/products");

exports.createproducts = async (req, res) => {
  try {
    // first of all to get the body we need to fetch it

    const { name, price, itemType, description } = req.body;
    console.log(name, price, itemType, description);

    //const updation = updatedAt.Date.now();

    const allProducts = new productModel({
      name: name,
      price: price,
      itemType: itemType,
      description: description,
    });

    console.log(allProducts);

    // now we need to save that in the db
    const save = await allProducts.save();
    console.log("checkSave", save);

    res.status(200).json({
      success: true,
      message: "the data has been saved successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error,
    });
  }
};

// now we need to get products

exports.getProducts = async (req, res) => {
  try {
    // we need to get the items that are saved in the db

    const getItems = await productModel.find({});
    console.log(getItems);

    res.status(200).json({
      success: true,
      message: "these are the products",
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

//now to get  the products by id

exports.getbyId = async (req, res) => {
  try {
    // first of all we would have to fetch the id
    const id = req.params.id;

    const getproductsbyId = await productModel.findById({
      _id: id,
    });

    console.log(getproductsbyId);

    res.status(200).json({
      success: true,
      message: "successfully found by id",
    });
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};

// now to update any product

/*
exports.updateProduct = async (req,res) =>{

       // first of all you need to fetch the name price and other stuff  you need to allow users to change something in that
       // you need to fetch the existing entry via  the id and then update it 

       // fetch via id
try{
       const fetchId = req.params.id;

       const {name,itemType,price,description,updatedAt} = req.body;

       const time = new Date().toISOString();

          const updation = await productModel.findByIdAndUpdate({
            _id: fetchId},{
            name:name,
            itemType:itemType,
            price:price,
            description:description,
            updatedAt:time
         
            },
            { new: true }
            );
       
            
        console.log(name,itemType,description,updatedAt,fetchId);
                    
        
        console.log("wekjncwn",updation);

        res.status(200).json({
            message:"changes have been made successfull",
            success:true
         })

        }
        catch(error){
           res.status(404).json({
            success:false,
            message:`there is an ${error}`
           })

        }


}
*/

exports.updateProduct = async (req, res) => {
  // first of all you need to fetch the name price and other stuff  you need to allow users to change something in that
  // you need to fetch the existing entry via  the id and then update it

  // fetch via id
  try {
    const fetchId = req.params.id;

    const { name, itemType, price, description, updatedAt } = req.body;

    const time = new Date().toISOString();

    const existingProduct = await productModel.findById({
      _id: fetchId,
    });

    if (!existingProduct) {
      res.send({
        message: "id not found",
      });
    }

    if (
      name === existingProduct.name &&
      price === existingProduct.price &&
      description === existingProduct.description &&
      itemType === existingProduct.itemType &&
      updatedAt === existingProduct.updatedAt
    ) {
      res.send({
        message: "no changes have been made to the post ",
      });
    } else {
      existingProduct.name = name;
      existingProduct.itemType = itemType;
      existingProduct.price = price;
      existingProduct.description = description;
      existingProduct.updatedAt = time;
    }

    // save in the db to update

    const updatedProduct = await existingProduct.save();
    console.log("updated", updatedProduct);

    res.status(200).json({
      message: "success",
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: "failed",
    });
  }
};

// now to delete the product via id

exports.deleteByid = async (req, res) => {
  try {
    // first of all fetch the post that you want to delete by fetching the Id.

    const getId = req.params.id;

    // now since you have fetched the id you just need to delete that post

    const deletePost = await productModel.findByIdAndDelete({
      _id: getId,
    });
    console.log("post deleted successfully", deletePost);

    res.send({
      message: "the post has been deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "the post has not been deleted",
    });
  }
};
