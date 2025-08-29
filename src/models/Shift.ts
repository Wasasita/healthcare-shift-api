import mongoose from "mongoose";

const ShiftSchema = new mongoose.Schema({
  facility: { type: String, required: true },
  role: { type: String, required: true },
  date: { type: Date, required: true },
  payRate: { type: Number, required: true },
  isBooked: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Shift", ShiftSchema);
