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

    const quantumBoard =
  await prisma.board.findFirst({
    where: {
      type: "QUANTUM",
    },
  });

if (!quantumBoard) {
  await prisma.board.create({
    data: {
      title:
        "Quantum Kidz Announcements",
      type: "QUANTUM",
    },
  });
}

    await prisma.board.create({
      data: {
        title: `${name} Branch Board`,
        type: "BRANCH",
        branchId: branch.id,
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

export const deleteBranch = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const branch = await prisma.branch.findUnique({
      where: { id },
    });

    if (!branch) {
      return res.status(404).json({
        message: "Branch not found",
      });
    }

    await prisma.branch.delete({
      where: { id },
    });

    return res.json({
      message: "Branch deleted successfully",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to delete branch",
    });
  }
};