import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema(
  {
    lang: { type: String, required: false },
    date: { type: String, required: false },
    name: { type: String, required: false },
    phone: { type: String, default: false },
    email: { type: String, required: false },
    message: { type: String, required: false },
    image: { type: String, required: false },
    treatment: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Treatment"
    },
  },
  { timestamps: true }
);

export const Reservation = mongoose.model("Reservation", ReservationSchema);

export default {
  Reservation,
};
