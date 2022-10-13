import { Router } from "express";
import { getRepository } from 'typeorm';
import { AppDataSource } from "../data-source";
import User from "../entity/User";


const classRouter = Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();

AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

classRouter.post('/',async(req, res)=>{
  try {
    //const email = req.body.email;
    //const repo = getRepository(User);
    const user = await AppDataSource.manager.getRepository(User).findOneBy({
      email: req.body.email
    })

    if(user == null){
      return res.status(400).json({ erro: "Login ou senha incorretos!!!"});
    }
   if (bcrypt.compareSync(req.body.senha, user.senha)) {
     
        const token = jwt.sign(
        {
          user
        }, process.env.JWT_KEY,
        {
          expiresIn: "3h"
        })
        res.status(200).json({user, msg: "Ok!!!" , token})
    } else {
        res.status(400).json({ erro: "Login ou senha incorretos!!!" })
    }
} catch (error) {
    res.status(400).json({ erros: error.message });
}

})



export default classRouter;
