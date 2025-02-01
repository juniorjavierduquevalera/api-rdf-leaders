import validate from "validate.js";

const guestConstraints = {
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
  leaderId: {
    presence: { allowEmpty: false, message: "El ID del líder es requerido." },
    type: "string",
    length: {
      is: 24,
      message: "El ID del líder debe ser un ObjectId válido (24 caracteres).",
    },
  },
  status: {
    inclusion: {
      within: ["activo", "inactivo"],
      message: "El estado debe ser 'activo' o 'inactivo'.",
    },
  },
  absences: {
    numericality: {
      onlyInteger: true,
      greaterThanOrEqualTo: 0,
      message: "Las faltas deben ser un número entero mayor o igual a 0.",
    },
  },
};

export const validateGuestData = (data) => validate(data, guestConstraints);
