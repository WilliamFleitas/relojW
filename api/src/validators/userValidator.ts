import { Request, Response, NextFunction } from "express";
import { userType } from "../typos";
const {check } = require("express-validator");
const {validateResult} = require("./validatorHelpers/validateHelper");
const {User} = require("../database");


const createUserValidate = [
    check('username').exists().withMessage('Insert Username').not().isEmpty().isLength({ min: 5 }).withMessage('Min 5 characters').isString().withMessage('UserName has to be a string'),
    check('password').exists().withMessage('Insert password').not().isEmpty()
    .isLength({ min: 8 }).withMessage('Min 8 characters and 1 number').isString().withMessage('Password has to be a string').not()
    .isIn(['123', 'password', 'god', 'asdasd', "123456789"])
    .withMessage('Do not use common words as a password')
    .matches(/\d/),
    (req: Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next);
    }
];

const signUserValidate = [
    check('username').exists().withMessage('Insert Username').not().isEmpty().isString().withMessage('Insert a valid username').isLength({ min: 5 }).withMessage('Min 5 characters').custom((value: string) => {
        return  User.findOne({
            where: { username: value},
          }).then( (user: userType): any => {
            if (!user) {
              return Promise.reject('The user was not found');
            }
          });
        }),
    check('password' ,).exists().not().isEmpty().withMessage('Insert password'),
    (req: Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next);
    }
];
module.exports = {createUserValidate, signUserValidate};