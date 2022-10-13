import { Router } from "express";
import { AppDataSource } from "../data-source";

import User from "../entity/User";

const login = require("../middleware/login");
const classRouter = Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

classRouter.get('/',login, async(req, res)=>{
  try{  
    const users = await AppDataSource.manager.find(User)
    return res.status(200).json(users);
    

  }catch(err){
    return res.status(400).json("Erro ao executar " + err);
  }
})

classRouter.post('/', async(req, res)=>{
  try{  
    console.log(req.body)
    
    const hash = bcrypt.hashSync(req.body.senha, 15);
    req.body.senha = hash;

    //AppDataSource.initialize().then(async () => {
      await AppDataSource.manager.getRepository(User).save(req.body)
  //  })
    
    return res.status(204).json("");
  }catch(err){
    return res.status(400).json("Erro ao executar " + err);
  }
})

export default classRouter;
