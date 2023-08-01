const db = require("../../util/dao");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const schema = Joi.object().keys({
    firstName:Joi.string().alphanum().min(3).max(50).required(),
    lastName: Joi.string().alphanum().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().trim().min(5).max(15).required(),
});

const CreateUserController=async(req,res)=>{
    const isValidate = schema.validate(req.body);

    if(isValidate){
        try {
            const insert = await InsertUser(req);
            //console.log("REG",register)
            if (insert.insertId > 0) {
              return res.status(200).json({ IsSuccess:true,message:"User Create Successfully",data:insert});
            } else {
              res.status(401).send("Something went wrong");
            }
        } catch (error) {
            res.status(500).send("Internal server error");
            throw error;
        }
    }else{
        res.status(500).json({IsSuccess:false,message:'Internal Server Error.'})
    }
}

const InsertUser= async (req) => {
    const {
        firstName,
        lastName,
        email,
        password
    }=req.body;

    const salt = await bcrypt.genSalt();
    const encPassword=await bcrypt.hash(password, salt);

    try {
      const sql = `INSERT INTO user(firstName,lastName,email,password) VALUES ('${firstName}','${lastName}','${email}','${encPassword}')`;
  
      const user = await db.execute_value(sql);
      return user;
    } catch (error) {
      console.log('Cupboard Insert Error.')
      throw error;
    }
};

module.exports=CreateUserController;