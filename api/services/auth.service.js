import User from "../models/users.model.js";
import bcrypt from "bcrypt";

export const checkIfUserExists = async (email) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return {
      exists: true,
      message: "El usuario ya está registrado con este correo electrónico.",
    };
  }

  return { exists: false };
};
export const validateUserCredentials = async (email, password) => {
    const user = await User.findOne({ email }).select("+password");  
    if (!user) {
      return {
        isValid: false,
        message: "Error en el email",
      };
    }  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        isValid: false,
        message: "Contraseña incorrecta.",
      };
    }  
    return {
      isValid: true,
      user,
      message: "Credenciales válidas.",
    };
  };
