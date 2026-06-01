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