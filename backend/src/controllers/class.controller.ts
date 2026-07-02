import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createClass = async (
  req: Request,
  res: Response
) => {
  try {
    const { branchId, type } = req.body;

    const existingClass =
      await prisma.class.findFirst({
        where: {
          branchId,
          type,
        },
      });

    if (existingClass) {
      return res.status(400).json({
        message:
          "Class already exists in this branch",
      });
    }

    const newClass = await prisma.class.create({
      data: {
        branchId,
        type,
      },
    });

    res.status(201).json(newClass);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create class",
    });
  }
};

export const deleteClass = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const existingClass =
      await prisma.class.findUnique({
        where: { id },
      });

    if (!existingClass) {
      return res.status(404).json({
        message: "Class not found",
      });
    }

    await prisma.class.delete({
      where: { id },
    });

    return res.json({
      message: "Class deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to delete class",
    });
  }
};