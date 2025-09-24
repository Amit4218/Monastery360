import mongoose from "mongoose";

const tourSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  type: {
    type: String,
    required: true,
  },
  tourName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  guest: {
    type: String || Number,
    required: true,
  },
  cab: {
    type: String,
    required: true,
  },
  guide: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  specialRequests: {
    type: String,
    default: "",
  },
  totalPrice: {
    type: String || Number,
    required: true,
  },
});

const TourSchema = mongoose.model("TourSchema", tourSchema);
export default TourSchema;
