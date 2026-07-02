import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getBoards = async (
  req: Request,
  res: Response
) => {
  try {
    const boards = await prisma.board.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    res.json(boards);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch boards",
    });
  }
};