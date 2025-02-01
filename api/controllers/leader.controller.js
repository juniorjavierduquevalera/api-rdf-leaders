import Leader from "../models/leaders.model.js";
import { validateLeaderData } from "../validations/leader.validations.js";

export const createLeader = async (req, res) => {
  try {
    const { name, whatsapp } = req.body;

    const validationErrors = validateLeaderData({ name, whatsapp });
    if (validationErrors) {
      return res.status(400).send({
        status: "error",
        message: "Errores en la validación.",
        errors: validationErrors,
      });
    }

    const newLeader = new Leader({ name, whatsapp });

    await newLeader.save();

    res.status(201).send({
      status: "success",
      leader: newLeader,
    });
  } catch (error) {
    console.error("Error al crear el líder:", error.message);
    res.status(500).send({
      status: "error",
      message: "Error interno del servidor.",
    });
  }
};

export const getLeaders = async (req, res) => {
  try {
    const leaders = await Leader.find().sort({ createdAt: -1 });

    res.status(200).send({
      status: "success",
      leaders,
    });
  } catch (error) {
    console.error("Error al obtener los líderes:", error.message);
    res.status(500).send({
      status: "error",
      message: "Error interno del servidor.",
    });
  }
};

export const getLeaderById = async (req, res) => {
  try {
    const { id } = req.params;
    const leader = await Leader.findById(id);

    if (!leader) {
      return res.status(404).send({
        status: "error",
        message: "Líder no encontrado.",
      });
    }

    res.status(200).send({
      status: "success",
      leader,
    });
  } catch (error) {
    console.error("Error al obtener el líder:", error.message);
    res.status(500).send({
      status: "error",
      message: "Error interno del servidor.",
    });
  }
};

export const updateLeader = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, whatsapp } = req.body;

    const updatedLeader = await Leader.findByIdAndUpdate(
      id,
      { name, whatsapp },
      { new: true, runValidators: true }
    );

    if (!updatedLeader) {
      return res.status(404).send({
        status: "error",
        message: "Líder no encontrado.",
      });
    }

    res.status(200).send({
      status: "success",
      leader: updatedLeader,
    });
  } catch (error) {
    console.error("Error al actualizar el líder:", error.message);
    res.status(500).send({
      status: "error",
      message: "Error interno del servidor.",
    });
  }
};

export const deleteLeader = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedLeader = await Leader.findByIdAndDelete(id);

    if (!deletedLeader) {
      return res.status(404).send({
        status: "error",
        message: "Líder no encontrado.",
      });
    }

    res.status(200).send({
      status: "success",
      message: "Líder eliminado exitosamente.",
    });
  } catch (error) {
    console.error("Error al eliminar el líder:", error.message);
    res.status(500).send({
      status: "error",
      message: "Error interno del servidor.",
    });
  }
};
