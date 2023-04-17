import { Request, Response, NextFunction } from "express";
import { payloadType } from "./tokenValidation";
const jwt = require("jsonwebtoken");
const {User} = require("../database");


export const checkRoleAuth = (rolType1:string, rolType2: string) => async (req: Request, res: Response, next: NextFunction) => {

   try {
    //  const token = req.cookies.token;
     const token = req.header("auth-token"); 
     if(!token){
      res.status(404).send("Token invalido.");
     }
     const tokenData = await  jwt.verify(token?.toString(), process.env.TOKEN_SECRET as string) as  payloadType;
     
     const userData = await User.findByPk(tokenData.id, {
         attributes: {
             exclude: ['password']
         }
     });
     
     if(userData.privilege === rolType1 || userData.privilege === rolType2){
         next();
     }
     else{
         res.status(409).send({error: 'Acceso denegado por permisos'})
     }
   } catch (error) {
     res.status(400).send(error);
   }
};

export const checkRoleAdmin = (rolType1:string) => async (req: Request, res: Response, next: NextFunction) => {

  try {
    // const token = req.cookies.token;
    const token = req.header("auth-token"); 
    if(!token){
     res.status(404).send("Token invalido.");
    }
    const tokenData = await  jwt.verify(token?.toString(), process.env.TOKEN_SECRET as string) as  payloadType;
    
    const userData = await User.findByPk(tokenData.id, {
        attributes: {
            exclude: ['password']
        }
    });
    
    if(userData.privilege === rolType1){
        next();
    }
    else{
        res.status(409).send({error: 'Acceso denegado por permisos'})
    }
  } catch (error) {
    res.status(400).send(error);
  }
};