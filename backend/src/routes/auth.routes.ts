import { Router } from "express";

import {
  registerUser,
  getPendingUsers,
  approveUser,
  getPendingTeachers,
  getPendingParents,
  getPendingBranchHeads,
} from "../controllers/auth.controller";

const router = Router();

router.post("/register", registerUser);

router.get(
  "/pending-users",
  getPendingUsers
);

router.put(
  "/approve-user/:id",
  approveUser
);

router.get(
  "/pending-branch-heads",
  getPendingBranchHeads
);

router.get(
  "/pending-teachers/:branchId",
  getPendingTeachers
);

router.get(
  "/pending-parents/:branchId",
  getPendingParents
);

export default router;