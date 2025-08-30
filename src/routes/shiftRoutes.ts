import express from "express";
import {
  createShift,
  getShifts,
  getShiftById,
  updateShift,
  deleteShift,
  bookShift
} from "../controllers/shiftController";
import { authMiddleware, adminOnly } from "../middleware/auth";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  adminOnly,
  [
    body("facility").notEmpty(),
    body("role").notEmpty(),
    body("date").isISO8601(),
    body("payRate").isNumeric()
  ],
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  createShift
);

router.get("/", getShifts);
router.get("/:id", getShiftById);
router.put("/:id", authMiddleware, updateShift);
router.delete("/:id", authMiddleware, adminOnly, deleteShift);
router.patch("/:id/book", authMiddleware, bookShift);

export default router;
