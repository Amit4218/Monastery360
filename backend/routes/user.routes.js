import express from "express";
import HomeStay from "../models/homeStay.model.js";
import TourSchema from "../models/tour.model.js";

const router = express.Router();

router.get("/get-booking-data", async (req, res) => {
  try {
    const id = req.user.userId;

    const homeStayData = await HomeStay.find({ userId: id });

    const tourData = await TourSchema.find({ userId: id });

    return res.status(200).json({
      HomeStayData: homeStayData,
      tourData: tourData,
      message: "Data fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/home-stay", async (req, res) => {
  try {
    const {
      id,
      name,
      distance,
      location,
      price,
      rating,
      reviews,
      image,
      host,
      checkIn,
      checkOut,
      guests,
      fullName,
      email,
      phone,
    } = req.body;
    const userId = req.user.userId;

    const data = await HomeStay.create({
      userId,
      id,
      name,
      distance,
      location,
      price,
      rating,
      reviews,
      image,
      host,
      checkIn,
      checkOut,
      guests,
      fullName,
      email,
      phone,
    });

    return res.status(201).json({
      message: "HomeStay saved",
      homeStay: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/tour", async (req, res) => {
  try {
    const {
      type,
      tourName,
      date,
      guest,
      cab,
      guide,
      fullName,
      email,
      phone,
      specialRequests,
      totalPrice,
    } = req.body;
    const userId = req.user.userId;

    const data = await TourSchema.create({
      userId,
      type,
      tourName,
      date,
      guest,
      cab,
      guide,
      fullName,
      email,
      phone,
      specialRequests,
      totalPrice,
    });

    return res.status(201).json({
      message: "tour saved",
      tour: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

export default router
