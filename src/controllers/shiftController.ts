import { Request, Response } from "express";
import Shift from "../models/Shift";

export const createShift = async (req: Request, res: Response) => {
  try {
    const shift = await Shift.create(req.body);
    res.status(201).json(shift);
  } catch (error) {
    res.status(500).json({ message: "Error creating shift", error });
  }
};

export const getShifts = async (req: Request, res: Response) => {
  try {
    const shifts = await Shift.find();
    res.json(shifts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shifts", error });
  }
};

export const getShiftById = async (req: Request, res: Response) => {
  try {
    const shift = await Shift.findById(req.params.id);
    if (!shift) return res.status(404).json({ message: "Shift not found" });
    res.json(shift);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateShift = async (req: Request, res: Response) => {
  try {
    const shift = await Shift.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!shift) return res.status(404).json({ message: "Shift not found" });
    res.json(shift);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteShift = async (req: Request, res: Response) => {
  try {
    const shift = await Shift.findByIdAndDelete(req.params.id);
    if (!shift) return res.status(404).json({ message: "Shift not found" });
    res.json({ message: "Shift deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const bookShift = async (req: Request, res: Response) => {
  try {
    const shift = await Shift.findById(req.params.id);
    if (!shift) return res.status(404).json({ message: "Shift not found" });
    if (shift.isBooked) return res.status(400).json({ message: "Already booked" });
    shift.isBooked = true;
    await shift.save();
    res.json(shift);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
