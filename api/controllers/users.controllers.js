import User from "../models/users.model.js";
import bcrypt from "bcrypt";
import { createToken } from "../helpers/jwt.js";
import {
  checkIfUserExists,
  validateUserCredentials,
} from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const params = req.body;

    const { exists, message } = await checkIfUserExists(params.email);
    if (exists) {
      return res.status(400).send({
        status: "error",
        message,
      });
    }

    const hashedPassword = await bcrypt.hash(params.password, 10);
    const newUser = new User({
      name: params.name,
      email: params.email,
      password: hashedPassword,
      role: "usuario",
    });

    await newUser.save();

    const token = createToken({
      id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    });

    return res.status(200).send({
      status: "success",
      message: "Usuario registrado correctamente",
      user: {
        id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      token,
    });
  } catch (error) {
    return res.status(400).send({
      status: "error",
      message: error.message || "Error vuelve a intentarlo",
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { isValid, user, message } = await validateUserCredentials(
      email,
      password
    );

    if (!isValid) {
      return res.status(400).send({
        status: "error",
        message,
      });
    }

    validateUserCredentials;
    const token = createToken({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    });

    return res.status(200).send({
      status: "success",
      message: "Inicio de sesión exitoso.",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).send({
      status: "error",
      message: error.message || "Error vuelve a intentarlo.",
    });
  }
};
