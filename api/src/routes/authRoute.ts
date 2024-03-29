import { Router, Request, Response } from "express";
import { profile, signIn, signUp } from "./controllers/authControllers";
import { tokenValidation } from "../libs/tokenValidation";
import { checkRoleAuth } from "../libs/roleAuth";
const {createUserValidate, signUserValidate} = require("../../src/validators/userValidator");
const rolType1: string = process.env.ROL_TYPE1 as string;
const rolType2: string = process.env.ROL_TYPE2 as string;
const route = Router();



route.post("/signup", createUserValidate, async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const result = await signUp(body);
       
        res.status(200).send(result);
    } catch (error: any) {
        res.status(500).send(error.message);
    }

});

route.post("/signin", signUserValidate,  async (req: Request, res: Response) => {
 const { body } = req;
 
    try {
        const result = await signIn(body);
        if(!result.objUser.id || !result.token){
          res.status(400).send("The username or password you entered is incorrect")
        }else{
            res.status(200).send({data: result.objUser, token: result.token});
        }
    } catch (error: any) {
       
        res.status(400).send(error.message);
    }

});

route.get("/profile", tokenValidation, checkRoleAuth(rolType1, rolType2),  async (req: Request, res: Response) => {

    try {
        const result = await profile(req.userId);
        if(!result){
            res.status(400).send("The user was not found");
        }
        else{
        res.status(200).send(result);
    }
    } catch (error: any) {
        res.status(400).send(error);
    }
});

export default route;