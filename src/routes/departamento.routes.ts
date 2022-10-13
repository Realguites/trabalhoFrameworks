import { Router } from "express";
import { AppDataSource } from "../data-source";

import Departamento from "../entity/Departamento";

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
    const departamentos = await AppDataSource.manager.getRepository(Departamento).find()
    console.log(departamentos)
    return res.status(200).json(departamentos);
    

  }catch(err){
    return res.status(400).json("Erro ao executar " + err);
  }
})

classRouter.get('/:id',login, async(req, res)=>{
  try{ 
    console.log(req.params.id)
    const departamentos = await AppDataSource.manager.getRepository(Departamento).findOne(req.params.id)
    console.log(departamentos)
    return res.status(200).json(departamentos);
    

  }catch(err){
    return res.status(400).json("Erro ao executar " + err);
  }
})


classRouter.post('/',login, async(req, res)=>{
  try{
    await console.log("sadasdsa", req.body)  
    await AppDataSource.manager.getRepository(Departamento).save(req.body)
    return res.status(204).json("");
  }catch(err){
    return res.status(400).json("Erro ao executar " + err);
  }
})


export default classRouter;
