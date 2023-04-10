import { Router, Request, Response } from "express";
import { createAlarm } from "./controllers/alarmController";
// const rolType1: string = process.env.ROL_TYPE1 as string;
// const rolType2: string = process.env.ROL_TYPE2 as string;
const route = Router();


//esto debe tener proteccion de rol
// route.get("/getusers", async(_req: Request, res: Response) => { 
//     try {
//     const result = await getUsers();
//     res.status(200).send(result);
//     } catch (error: any) {
//         res.status(400).send(error);
//     }
// });
// 

route.post("/createalarm", async (req: Request, res: Response) => {
    const  {body } = req;
    try {
        const result = await createAlarm(body);
          

        res.status(200).send(result);
    } catch (error: any) {
        res.status(400).send(error.message);
    }

});




export default route;