import { Router } from "express";

import {
  createBranch,
  getBranches,
  deleteBranch,
} from "../controllers/branch.controller";

const router = Router();

router.get("/", getBranches);

router.post("/", createBranch);

router.delete("/:id", deleteBranch);

export default router;