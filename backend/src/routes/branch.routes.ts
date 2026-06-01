import { Router } from "express";

import {
  createBranch,
  getBranches,
} from "../controllers/branch.controller";

const router = Router();

router.get("/", getBranches);

router.post("/", createBranch);

export default router;