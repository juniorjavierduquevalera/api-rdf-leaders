import validate from "validate.js";

const reviewConstraints = {
  name: {
    presence: { allowEmpty: false, message: "El nombre es obligatorio." },
    type: "string",
  },
  message: {
    presence: { allowEmpty: false, message: "El mensaje es obligatorio." },
    length: { minimum: 2, message: "Debe tener al menos 2 caracteres." },
  },
};

export const validateReviewData = (data) => {
  return validate(data, reviewConstraints);
};
