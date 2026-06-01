import { Router } from "express";
import { createClass } from "../controllers/class.controller";

const router = Router();

router.post("/", createClass);

export default router;