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
    const funcionario = await AppDataSource.manager.getRepository(Funcionario).save(req.body)
    return res.status(200).json(funcionario);
  }catch(err){
    return res.status(400).json("Erro ao executar " + err);
  }
})

classRouter.get('/:id',login, async(req, res)=>{
  try{ 
    const funcionario = await AppDataSource.manager.getRepository(Funcionario).findOne(req.params.id)
    return res.status(200).json(funcionario);

  }catch(err){
    return res.status(400).json("Erro ao executar " + err);
  }
})

classRouter.put('/:id',login, async(req, res)=>{
  try{ 
    const funcionario = await AppDataSource.manager.getRepository(Funcionario).findOne(req.params.id)
    if(funcionario){
      const updatedFuncionario = await AppDataSource.manager.getRepository(Funcionario).save({
      ...funcionario,
      ...req.body
      })
      return res.status(200).json(updatedFuncionario);
    }
    
    return res.status(204).json('Funcionário não encontrado!!');

  }catch(err){
    return res.status(400).json("Erro ao executar " + err);
  }
})

classRouter.delete('/:id',login, async(req, res)=>{
  try{ 
    const funcionario = await AppDataSource.manager.getRepository(Funcionario).findOne(req.params.id)
    if(funcionario){
      await AppDataSource.manager.getRepository(Funcionario).delete(req.params.id)
      return res.status(204).json('Funcionario Excluido');
    }else{
      return res.status(400).json('Funcionário não encontrado!');
    }
  }catch(err){
    return res.status(400).json("Erro ao executar " + err);
  }
})


export default classRouter;
