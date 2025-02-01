import validate from "validate.js";

const leaderConstraints = {
  name: {
    presence: { allowEmpty: false, message: "El nombre es requerido." },
    type: "string",
    length: {
      minimum: 3,
      maximum: 50,
      message: "El nombre debe tener entre 3 y 50 caracteres.",
    },
  },
  whatsapp: {
    presence: { allowEmpty: false, message: "El número de WhatsApp es requerido." },
    format: {
      pattern: /^\+\d{1,3}\s?\d{6,15}$/,
      message: "El número de WhatsApp debe estar en formato internacional (+123456789).",
    },
  },
};

export const validateLeaderData = (data) => validate(data, leaderConstraints);
