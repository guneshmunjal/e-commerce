const userModel = require("../models/User");
var jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { token } = require("morgan");

const JWT_SECRET = "GUNESH";
// let us make for sign in

exports.signIn = async (req, res) => {
  try {
    const { email, password, name,role } = req.body;
    console.log(email,password,name,role)

    // first of all we would have to  fetch the email of the user by using findone method

    const checkUser = await userModel.findOne({email});

    if (checkUser) {
     return res.json({
        message:
          "this user exists thus you need to login instead of signing up",
      });
    }
  
    // now we need to hash the password
    let hashedpassword;
      try{
        hashedpassword = await bcrypt.hash(password,10);

      }
      catch{
       return res.json({
            error:"the password cannot be hashed try again later"
        });
       }
             console.log(hashedpassword);

       // now we need  to create the entry in the db

       let dataBase = await userModel.create({
        name,
        email,
        password:hashedpassword,
        role
       });
       console.log("databse",dataBase)


       const token  = jwt.sign({name:dataBase.name,email:dataBase.email,password:dataBase.password,role:dataBase.role},process.env.JWT_SECRET);
         
  } catch (error) {
  res.status(400).json({
          error:`this is the error ${error}`,
        })
  
  }
};


// now we need to make for login 


exports.loginTheuser = async (req,res) =>{
    try {
        
    // when we need to login the user we first have to fetch the email,password

    const {email,password} = req.body;
    console.log("email",email,password);

    // we need to check that password and email in the db so 
    let existingUser =  await  userModel.findOne({email})
    
      // if not then write that condition to send message for incorrect email and password
    if (!existingUser) {
        return res.json({
          message: "you  are   not a  registered user",
        });
      }

      console.log("nnfwwf",existingUser);
  
const matchPassword = await bcrypt.compare(password, existingUser.password)
  if (!matchPassword) {
  res.send(console.log("password does not match"));
  
  }
  



  // now   match  the password and  authenticate
   
        const token = await jwt.sign(
          { email: existingUser.email, password:existingUser.password ,role:existingUser.role},
          JWT_SECRET,
          {
            expiresIn: "2h",
          }) 

           existingUser = existingUser.toObject();
          existingUser.token = token;

         const   options ={
          httpOnly:true,
          expires:new Date(Date.now()  + 3*24*60*60*1000),
         }
        console.log(options);
         console.log("the options    were passed");

        
    res.cookie("secondcookie",token,options).status(200).json({
      success:true,
      message:"cookie  passed successfully",
      token,
      existingUser,
    
      
    })
  
  }
     catch (error) {
        return res.status(400).json({
            error: error,
            message: `the error isnew ${error}`,
          });
    }
  }


