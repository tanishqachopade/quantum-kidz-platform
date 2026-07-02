import { Router } from "express";
import {
  createClass,
  deleteClass,
} from "../controllers/class.controller";

const router = Router();

router.post("/", createClass);
router.delete("/:id", deleteClass);

export default router;