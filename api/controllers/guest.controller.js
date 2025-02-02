import Guest from "../models/guest.model.js";
import Leader from "../models/leaders.model.js";
import { validateGuestData } from "../validations/guest.validations.js";

export const createGuest = async (req, res) => {
  try {
    const { name, whatsapp, leaderId } = req.body;

    const validationErrors = validateGuestData({ name, whatsapp, leaderId });
    if (validationErrors) {
      return res.status(400).send({
        status: "error",
        message: "Errores en la validación.",
        errors: validationErrors,
      });
    }

    const leader = await Leader.findById(leaderId);
    if (!leader) {
      return res.status(404).send({
        status: "error",
        message: "Líder no encontrado.",
      });
    }

    const newGuest = new Guest({
      name,
      whatsapp,
      leader: leaderId,
    });

    await newGuest.save();

    res.status(201).send({
      status: "success",
      guest: newGuest,
    });
  } catch (error) {
    console.error("Error al crear el invitado:", error.message);
    res.status(500).send({
      status: "error",
      message: "Error interno del servidor.",
    });
  }
};
export const getGuests = async (req, res) => {
  try {
    const guests = await Guest.find().populate("leader", "name whatsapp");

    res.status(200).send({
      status: "success",
      guests,
    });
  } catch (error) {
    console.error("Error al obtener los invitados:", error.message);
    res.status(500).send({
      status: "error",
      message: "Error interno del servidor.",
    });
  }
};
export const getGuestById = async (req, res) => {
  try {
    const { id } = req.params;
    const guest = await Guest.findById(id).populate("leader", "name whatsapp");

    if (!guest) {
      return res.status(404).send({
        status: "error",
        message: "Invitado no encontrado.",
      });
    }

    res.status(200).send({
      status: "success",
      guest,
    });
  } catch (error) {
    console.error("Error al obtener el invitado:", error.message);
    res.status(500).send({
      status: "error",
      message: "Error interno del servidor.",
    });
  }
};
export const updateGuest = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, whatsapp, status, absences } = req.body;

    const updatedGuest = await Guest.findByIdAndUpdate(
      id,
      { name, whatsapp, status, absences },
      { new: true, runValidators: true }
    );

    if (!updatedGuest) {
      return res.status(404).send({
        status: "error",
        message: "Invitado no encontrado.",
      });
    }

    res.status(200).send({
      status: "success",
      guest: updatedGuest,
    });
  } catch (error) {
    console.error("Error al actualizar el invitado:", error.message);
    res.status(500).send({
      status: "error",
      message: "Error interno del servidor.",
    });
  }
};
export const deleteGuest = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedGuest = await Guest.findByIdAndDelete(id);

    if (!deletedGuest) {
      return res.status(404).send({
        status: "error",
        message: "Invitado no encontrado.",
      });
    }

    res.status(200).send({
      status: "success",
      message: "Invitado eliminado exitosamente.",
    });
  } catch (error) {
    console.error("Error al eliminar el invitado:", error.message);
    res.status(500).send({
      status: "error",
      message: "Error interno del servidor.",
    });
  }
};
