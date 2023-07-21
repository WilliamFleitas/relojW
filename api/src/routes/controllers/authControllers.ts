import { userType } from "../../typos";
const { User } = require("../../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export const signUp = async (body: userType) => {
  try {
    
    const findUsername = await User.findOne({
      where: { username: body.username },
    });
    if (findUsername) {
        throw new Error("Usuario no disponible");
    } 
    else {
      const password: Promise<string> = await bcrypt.hashSync(
        body.password,
        10
      );
      const user = {
        username: body.username,
        password: password.toString(),
      };

      const result = User.create(user);

      if (result) {
        return result;
      } else {
        throw new Error("no se pudo crear el usuario");
      }
    }
  } catch (error: any) {
    throw new Error(error);
  }
};


export const signIn = async (body: userType) => {
  try {
    
    const findUser: userType = await User.findOne({
        where: { username: body.username },
      });
      if (!findUser ) {
        throw new Error("Usuario no encontrado");
      } 
        const validateBcrypt: Promise<boolean> = await bcrypt.compare(
          body.password,
          findUser.password
        );
        if (!validateBcrypt ) {
          throw new Error("Contraseña invalida");
        } else {
          const id = findUser.id;
          const username = findUser.username;
          const privilege = findUser.role;
          const userForToken = { id, username };
          const token: string = await jwt.sign(
            userForToken,
            process.env.TOKEN_SECRET,
            { expiresIn: 60 * 60 }
          );
            
          const objUser = {
            username: username,
            id: id,
            privilege: privilege
          }
          return { token, objUser };
        }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const profile = async (userId: string) => {
  try {
    const user = await User.findByPk(userId, {
        attributes: {
            exclude: ['password']
        }
    });
    if(!user){
        throw new Error("No se encontro el usuario!")
    }
    else {
        return user;
    }
  } catch (error: any) {
   
    throw new Error(error.message);
  }
};
