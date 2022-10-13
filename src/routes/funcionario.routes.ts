import { Router } from "express";
import { AppDataSource } from "../data-source";

import Funcionario from "../entity/Funcionario";

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
    const funcionarios = await AppDataSource.manager.find(Funcionario)
    return res.status(200).json(funcionarios);
    

  }catch(err){
    return res.status(400).json("Erro ao executar " + err);
  }
})

classRouter.post('/',login, async(req, res)=>{
  try{  
    console.log(req.body)
    
    /*const funcionario = new Funcionario()
    funcionario.nome = req.body?.nome
    funcionario.sobrenome = req.body?.sobrenome
    funcionario.age = req.body?.age*/

    const funcionario = await AppDataSource.manager.getRepository(Funcionario).save(req.body)
 
      //await AppDataSource.manager.save(funcionario)

    
    return res.status(200).json(funcionario);
  }catch(err){
    return res.status(400).json("Erro ao executar " + err);
  }
})

classRouter.get('/:id',login, async(req, res)=>{
  try{ 
    const funcionario = await AppDataSource.manager.getRepository(Funcionario).findOne(req.params._id)
    return res.status(200).json(funcionario);
    

  }catch(err){
    return res.status(400).json("Erro ao executar " + err);
  }
})


export default classRouter;
