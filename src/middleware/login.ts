//rotas que deverão ser prtegidas!!!!

const { request } = require('express');
const jwt = require('jsonwebtoken');



module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token, process.env.JWT_KEY);
        req.body_id = decode.usuario_id;
        next();//chama a proxima funcao a ser executada
    }catch(error){
        return res.status(401).send({erro: "Falha na autenticação"})
    }


}