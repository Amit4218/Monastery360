import express from "express";
import HomeStay from "../models/homeStay.model.js";

const router = express.Router();

router.get("/get-booking-data", async (req, res) => {
  try {
    const id = req.user.id;

    const homeStayData = await HomeStay.find({ userId: id });

    return res.status(200).json({
      HomeStayData: homeStayData,
      message: "",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});
