import { Request, Response, NextFunction, } from "express";
const {check } = require("express-validator");
const {validateResult} = require("./validatorHelpers/validateHelper");

const goalDateFormatValidate = (date: string) => {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  return datePattern.test(date);
};
const createAlarmValidate = [
    check('hour').exists().withMessage('You must enter the time').not().isEmpty().isTime().withMessage('Format(HH/MM/SS)')
    ,
    check('goalType').isBoolean().exists().withMessage('goalType needed'),
    check('goalDateEnd').custom((value: any, { req }: { req: Request } ) => {
      const goalType = req.body.goalType ;
      if (goalType === true && !value) {
        throw new Error('Goal Date End is needed');
      }
      if (goalType === true && !goalDateFormatValidate(value)) {
        throw new Error('Goal Date End format has to be "YYYY-MM-DD"');
      }
      return true; 
    }),
    check('alarmType').not().isEmpty().isString().withMessage('alarmType has to be a string'),
    check('description').exists().isString().withMessage('Description has to be a string'),
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