import { Schema, model } from "mongoose";
import Leader from "./leaders.model.js";

const guestSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
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
    entry_date: { type: Date, default: Date.now },
    status: { type: String, enum: ["activo", "inactivo"], default: "activo" },
    absences: {
      type: Number,
      default: 0,
      min: [0, "Las faltas no pueden ser negativas."],
    },
    leader: { type: Schema.Types.ObjectId, ref: "Leader", required: true },
  },
  { timestamps: true }
);

guestSchema.post("save", async function (doc, next) {
  await Leader.findByIdAndUpdate(doc.leader, { $inc: { invited_count: 1 } });
  next();
});

guestSchema.post("findOneAndDelete", async function (doc, next) {
  if (doc) {
    await Leader.findByIdAndUpdate(doc.leader, { $inc: { invited_count: -1 } });
  }
  next();
});

guestSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update.leader) {
    const oldGuest = await this.model.findOne(this.getQuery());
    if (oldGuest.leader.toString() !== update.leader.toString()) {
      await Leader.findByIdAndUpdate(oldGuest.leader, {
        $inc: { invited_count: -1 },
      });
      await Leader.findByIdAndUpdate(update.leader, {
        $inc: { invited_count: 1 },
      });
    }
  }
  next();
});

const Guest = model("Guest", guestSchema, "guests");

export default Guest;
