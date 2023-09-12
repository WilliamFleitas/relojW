import { Request, Response, NextFunction } from "express";
const {check } = require("express-validator");
const {validateResult} = require("./validatorHelpers/validateHelper");


const createAlarmValidate = [
    check('hour').exists().withMessage('You must enter the time').not().isEmpty().isTime().withMessage('Format(HH/MM/SS)')
    ,
    check('description').isString().withMessage('Description has to be a string'),
    check('alarmDays').exists().withMessage('Insert Alarm Days').not().isEmpty().isArray().withMessage("Alarm Days has to be an array").custom((value: Array<number>) => {
        for (let i = 0; i < value.length; i++) {
          if (!Number.isInteger(value[i])) {
            throw new Error('Value has to be an array of int');
          }
        }
        return true;
      }),
      check('userId').exists().withMessage("No userID detected").not().isEmpty().isString(),
    (req: Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next);
    }
];

const enableAlarmValidate = [
  check('enable').trim().isBoolean().withMessage('Must be a boolean true or false'),
  (req: Request, res: Response, next: NextFunction) => {
      validateResult(req, res, next);
  }
];
module.exports = {createAlarmValidate, enableAlarmValidate};