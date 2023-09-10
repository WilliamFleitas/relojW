import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken")

export interface payloadType { 
    id: string;
    iat: number;
    exp: number;
}

export const tokenValidation = async (req: Request, res: Response, next: NextFunction) => {

try {
   
    const token = req.header("auth-token"); 
    
 if(!token) {
    res.status(401).send("Invalid Token.");
}
 else{
 const payloadToken = await  jwt.verify(token, process.env.TOKEN_SECRET) as  payloadType;
    req.userId= payloadToken.id;

    next();

 } 
} catch (error: any) {
        res.status(400).send(error);
}

};