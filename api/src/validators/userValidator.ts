import { Request, Response, NextFunction } from "express";
import { userType } from "../typos";
const {check } = require("express-validator");
const {validateResult} = require("./validatorHelpers/validateHelper");
const {User} = require("../database");


const createUserValidate = [
    check('username').exists().withMessage('Ingrese nombre de usuario').not().isEmpty().isLength({ min: 5 }).withMessage('Minimo 5+ caracteres de longitud').isString().withMessage('Nombre de usuario debe ser un string'),
    check('password').exists().withMessage('Ingrese password').not().isEmpty()
    .isLength({ min: 8 }).withMessage('Minimo 8 caracteres y un numero').isString().withMessage('La contraseña debe ser un string').not()
    .isIn(['123', 'password', 'god', 'asdasd'])
    .withMessage('No usar palabras comunes como contraseña')
    .matches(/\d/),
    (req: Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next);
    }
];

const signUserValidate = [
    check('username').exists().withMessage('Ingrese un nombre de usuario').not().isEmpty().isString().withMessage('Ingrese un nombre de usuario valido').isLength({ min: 5 }).withMessage('Minimo 5+ caracteres de longitud').custom((value: string) => {
        return  User.findOne({
            where: { username: value},
          }).then( (user: userType): any => {
            if (!user) {
              return Promise.reject('No se encontro el usuario');
            }
          });
        }),
    check('password' ,).exists().not().isEmpty().withMessage('Ingrese password'),
    (req: Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next);
    }
];
module.exports = {createUserValidate, signUserValidate};