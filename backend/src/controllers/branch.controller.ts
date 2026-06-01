import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getBranches = async (
  req: Request,
  res: Response
) => {
  try {
    const branches = await prisma.branch.findMany({
      include: {
        classes: true,
      },
    });

    res.json(branches);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch branches",
    });
  }
};

export const createBranch = async (
  req: Request,
  res: Response
) => {
  try {
    const { name } = req.body;

    const existingBranch =
      await prisma.branch.findUnique({
        where: {
          name,
        },
      });

    if (existingBranch) {
      return res.status(400).json({
        message: "Branch already exists",
      });
    }

    const branch = await prisma.branch.create({
      data: {
        name,
      },
    });

    res.status(201).json(branch);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create branch",
    });
  }
};