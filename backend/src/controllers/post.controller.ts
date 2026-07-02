import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getBoardPosts = async (
  req: Request,
  res: Response
) => {
  try {
    const { boardId } = req.params;

    const posts = await prisma.post.findMany({
      where: {
        boardId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(posts);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch posts",
    });
  }
};

export const createPost = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      title,
      content,
      imageUrl,
      boardId,
    } = req.body;

    if (!boardId) {
      return res.status(400).json({
        message: "Board is required",
      });
    }

    if (!title?.trim()) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    if (
      !content?.trim() &&
      !imageUrl
    ) {
      return res.status(400).json({
        message:
          "Post must contain content or an image",
      });
    }

    const post =
      await prisma.post.create({
        data: {
          title: title.trim(),
          content:
            content?.trim() ?? "",
          imageUrl,
          boardId,
          authorId: "SUPER_ADMIN",
        },
      });

    res.status(201).json(post);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create post",
    });
  }
};

export const updatePost = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const {
      title,
      content,
      imageUrl,
    } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    if (
      !content?.trim() &&
      !imageUrl
    ) {
      return res.status(400).json({
        message:
          "Post must contain content or an image",
      });
    }

    const post =
      await prisma.post.update({
        where: {
          id,
        },
        data: {
          title: title.trim(),
          content:
            content?.trim() ?? "",
          imageUrl,
        },
      });

    res.json(post);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update post",
    });
  }
};

export const deletePost = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    await prisma.post.delete({
      where: {
        id,
      },
    });

    res.json({
      message: "Post deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete post",
    });
  }
};