import { Schema, model } from "mongoose";

const leaderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, 
    },
    whatsapp: {
      type: String,
      required: true,
      unique: true, 
      validate: {
        validator: function (value) {
          return /^\+\d{1,3}\s?\d{6,15}$/.test(value); 
        },
        message: "Número de WhatsApp no válido. Usa formato internacional (+123456789).",
      },
    },
    invited_count: {
      type: Number,
      required: true,
      default: 0, 
      min: [0, "El número de invitados no puede ser negativo."],
    },
  },
  { timestamps: true } 
);

const Leader = model("Leader", leaderSchema, "leaders");

export default Leader;
