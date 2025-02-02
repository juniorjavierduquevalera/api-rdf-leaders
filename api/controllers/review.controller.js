import Review from "../models/review.model.js";
import { validateReviewData } from "../validations/review.validations.js";

export const createReview = async (req, res) => {
  try {
    const { message } = req.body;
    const { name, email } = req.user;

    if (!message) {
      return res.status(400).send({
        status: "error",
        message: "El mensaje es obligatorio.",
      });
    }

    const validationErrors = validateReviewData({ name, message });
    if (validationErrors) {
      return res.status(400).send({
        status: "error",
        message: "Errores en la validación.",
        errors: validationErrors,
      });
    }

    const newReview = new Review({ name, email, message });
    await newReview.save();

    res.status(201).send({
      status: "success",
      review: newReview,
    });
  } catch (error) {
    console.error("Error al crear la reseña:", error.message);
    res.status(500).send({
      status: "error",
      message: "Error interno del servidor.",
    });
  }
};
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });

    res.status(200).send({
      status: "success",
      reviews,
    });
  } catch (error) {
    console.error("Error al obtener las reseñas:", error.message);
    res.status(500).send({
      status: "error",
      message: "Error interno del servidor.",
    });
  }
};
export const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).send({
        status: "error",
        message: "Reseña no encontrada.",
      });
    }

    res.status(200).send({
      status: "success",
      review,
    });
  } catch (error) {
    console.error("Error al obtener la reseña:", error.message);
    res.status(500).send({
      status: "error",
      message: "Error interno del servidor.",
    });
  }
};
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const { email } = req.user;

    if (!message) {
      return res.status(400).send({
        status: "error",
        message: "El mensaje es obligatorio.",
      });
    }

    const existingReview = await Review.findById(id);
    if (!existingReview) {
      return res.status(404).send({
        status: "error",
        message: "Reseña no encontrada.",
      });
    }

    if (existingReview.email !== email) {
      return res.status(403).send({
        status: "error",
        message: "No tienes permiso para modificar esta reseña.",
      });
    }

    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { message },
      { new: true, runValidators: true }
    );

    res.status(200).send({
      status: "success",
      review: updatedReview,
    });
  } catch (error) {
    console.error("Error al actualizar la reseña:", error.message);
    res.status(500).send({
      status: "error",
      message: "Error interno del servidor.",
    });
  }
};
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.user;

    const existingReview = await Review.findById(id);
    if (!existingReview) {
      return res.status(404).send({
        status: "error",
        message: "Reseña no encontrada.",
      });
    }

    if (existingReview.email !== email) {
      return res.status(403).send({
        status: "error",
        message: "No tienes permiso para eliminar esta reseña.",
      });
    }

    await Review.findByIdAndDelete(id);

    res.status(200).send({
      status: "success",
      message: "Reseña eliminada exitosamente.",
    });
  } catch (error) {
    console.error("Error al eliminar la reseña:", error.message);
    res.status(500).send({
      status: "error",
      message: "Error interno del servidor.",
    });
  }
};
