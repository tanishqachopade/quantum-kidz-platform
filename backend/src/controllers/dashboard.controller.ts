import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getDashboardStats = async (
  req: Request,
  res: Response
) => {
  try {
    const totalBranches =
      await prisma.branch.count();

    const totalTeachers =
      await prisma.user.count({
        where: {
          role: "TEACHER",
          approvalStatus: "APPROVED",
        },
      });

    const totalParents =
      await prisma.user.count({
        where: {
          role: "PARENT",
          approvalStatus: "APPROVED",
        },
      });

    const pendingApprovals =
      await prisma.user.count({
        where: {
          approvalStatus: "PENDING",
        },
      });

    res.json({
      totalBranches,
      totalTeachers,
      totalParents,
      pendingApprovals,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch dashboard stats",
    });
  }
};