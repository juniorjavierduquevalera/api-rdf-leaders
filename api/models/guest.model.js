import { Schema, model } from "mongoose";

const guestSchema = new Schema(
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
        message:
          "Número de WhatsApp no válido. Usa formato internacional (+123456789).",
      },
    },
    entry_date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["activo", "inactivo"],
      default: "activo",
    },
    absences: {
      type: Number,
      default: 0,
      min: [0, "Las faltas no pueden ser negativas."],
    },
    leader: {
      type: Schema.Types.ObjectId,
      ref: "Leader",
      required: true,
    },
  },
  { timestamps: true }
);

const Guest = model("Guest", guestSchema, "guests");

export default Guest;
