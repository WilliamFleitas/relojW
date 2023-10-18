import { userType } from "../../typos";
const { User, UserPreferences, sequelize } = require("../../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export const signUp = async (body: userType) => {
  try {
    
      const password: Promise<string> = await bcrypt.hashSync(
        body.password,
        10
      );
      const user = {
        username: body.username,
        email: body.email,
        password: password.toString(),
      };

      const result = await User.create(user);
      if (result) {
        const newUserPreferences = await UserPreferences.create({userId: result.id});
        result.userPreferences = newUserPreferences;
        await result.save();
        return result;
      } else {
        throw new Error("There was an error creating the user");
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
        throw new Error("The username or password you entered is incorrect");
      } 
        const validateBcrypt: Promise<boolean> = await bcrypt.compare(
          body.password,
          findUser.password
        );
        if (!validateBcrypt ) {
          throw new Error("The username or password you entered is incorrect");
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
        },
        include: [
          {
            model: sequelize.models.UserPreferences,
            as: "userPreferences", 
          },
        ],
    });
    if(!user){
        throw new Error("The user was not found")
    }
    else {
        return user;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
