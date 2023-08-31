import express from "express";
import userRoutes from "./user";
import roleRoutes from "./role";
import donorRoutes from "./donor";
import eventRoutes from "./event";
import donationRoutes from "./donation";
import expCatRoutes from "./expensesCategory";
import expenseRoute from "./expense";
import dailyEventRoute from "./dailyEvent";
import { dailyEventService } from "../services";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/role",  roleRoutes);
router.use("/donor",  donorRoutes);
router.use("/event",  eventRoutes);
router.use("/donation",  donationRoutes);
router.use("/expensecat",  expCatRoutes);
router.use("/expense",  expenseRoute);
router.use("/dailyEvent", dailyEventRoute);

export default router;
