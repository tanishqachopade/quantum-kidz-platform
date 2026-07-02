import { Router } from "express";

import {
  getBoardPosts,
  createPost,
  updatePost,
  deletePost,
  
} from "../controllers/post.controller";

const router = Router();

router.get(
  "/boards/:boardId/posts",
  getBoardPosts
);

router.post(
  "/posts",
  createPost
);

router.put(
  "/posts/:id",
  updatePost
);

router.delete(
  "/posts/:id",
  deletePost
);

export default router;