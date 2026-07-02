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

      approvalStatus: "PENDING",

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

export const getPendingUsers = async (
  req: Request,
  res: Response
) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        approvalStatus: "PENDING",
      },
      include: {
        branch: true,
        class: true,
      },
    });

    res.json(users);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};


export const approveUser = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        approvalStatus: "APPROVED",
      },
    });

    res.json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to approve user",
    });
  }
};

export const getPendingTeachers =
  async (req: Request, res: Response) => {
    try {
      const { branchId } = req.params;

      const users =
        await prisma.user.findMany({
          where: {
            role: "TEACHER",
            approvalStatus: "PENDING",
            branchId,
          },
          include: {
            branch: true,
            class: true,
          },
        });

      res.json(users);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to fetch teachers",
      });
    }
  };

  export const getPendingParents =
  async (req: Request, res: Response) => {
    try {
      const { branchId } = req.params;

      const users =
        await prisma.user.findMany({
          where: {
            role: "PARENT",
            approvalStatus: "PENDING",
            branchId,
          },
          include: {
            branch: true,
            class: true,
          },
        });

      res.json(users);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to fetch parents",
      });
    }
  };

  export const getPendingBranchHeads =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const users =
        await prisma.user.findMany({
          where: {
            role: "BRANCH_HEAD",
            approvalStatus: "PENDING",
          },

          include: {
            branch: true,
          },
        });

      res.json(users);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to fetch branch heads",
      });
    }
  };