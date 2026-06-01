import { Request, Response } from "express";
import prisma from "../config/prisma";

export const registerUser = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      fullName,
      phone,
      role,
      branchId,
      classId,
    } = req.body;

    const existingUser =
      await prisma.user.findUnique({
        where: {
          phone,
        },
      });

    if (existingUser) {
      return res.status(400).json({
        message:
          "User already registered",
      });
    }

    const user =
      await prisma.user.create({
        data: {
          fullName,
          phone,
          role,
          branchId,
          classId:
            role === "BRANCH_HEAD"
              ? null
              : classId,
        },
      });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to register user",
    });
  }
};