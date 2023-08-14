import express from "express";
import userRoutes from "./user";
import roleRoutes from "./role";
import donorRoutes from "./donor";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/role",  roleRoutes);
router.use("/donor",  donorRoutes);

export default router;
