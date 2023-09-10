import { Request, Response, NextFunction } from "express";
import { payloadType } from "./tokenValidation";
const jwt = require("jsonwebtoken");
const {User} = require("../database");


export const checkRoleAuth = (rolType1:string, rolType2: string) => async (req: Request, res: Response, next: NextFunction) => {

   try {
    
     const token = req.header("auth-token"); 
     if(!token){
      res.status(404).send("Invalid Token.");
     }
     const tokenData = await  jwt.verify(token?.toString(), process.env.TOKEN_SECRET as string) as  payloadType;
     
     const userData = await User.findByPk(tokenData.id, {
         attributes: {
             exclude: ['password']
         }
     });
     
     if(userData.role === rolType1 || userData.role === rolType2){
         next();
     }
     else{
         res.status(409).send({error: 'You do not have access permissions'})
     }
   } catch (error) {
     res.status(400).send(error);
   }
};

export const checkRoleAdmin = (rolType1:string) => async (req: Request, res: Response, next: NextFunction) => {

  try {
    
    const token = req.header("auth-token"); 
    if(!token){
     res.status(404).send("Invalid Token.");
    }
    const tokenData = await  jwt.verify(token?.toString(), process.env.TOKEN_SECRET as string) as  payloadType;
    
    const userData = await User.findByPk(tokenData.id, {
        attributes: {
            exclude: ['password']
        }
    });
    
    if(userData.role === rolType1){
        next();
    }
    else{
        res.status(409).send({error: 'You do not have access permissions'})
    }
  } catch (error) {
    res.status(400).send(error);
  }
};