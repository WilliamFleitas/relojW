import { Request, Response, NextFunction } from "express";
const {check } = require("express-validator");
const {validateResult} = require("./validatorHelpers/validateHelper");

//hacer otro endpoint para alarmas de una vez
const createAlarmValidate = [
    check('hour').exists().withMessage('Debe ingresar la hora').not().isEmpty().isTime().withMessage('El formato debe ser HH:MM:SS')
    ,
    check('description').isString().withMessage('Descripción debe ser un string'),
    check('alarmDays').exists().withMessage('Ingrese los días para la alarma').not().isEmpty().isArray().withMessage("Días de alarma debe ser un array").custom((value: Array<number>) => {
        for (let i = 0; i < value.length; i++) {
          if (!Number.isInteger(value[i])) {
            throw new Error('El campo debe ser un array de números enteros');
          }
        }
        return true;
      }),
      check('userId').exists().withMessage("Se necesita userID").not().isEmpty().isString(),
    (req: Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next);
    }
];


module.exports = {createAlarmValidate};