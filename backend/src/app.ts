import express from "express";
import cors from "cors";

import branchRoutes from "./routes/branch.routes";
import classRoutes from "./routes/class.routes";
import authRoutes from "./routes/auth.routes";
import boardRoutes from "./routes/board.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import postRoutes from "./routes/post.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/branches", branchRoutes);
app.use("/classes", classRoutes);
app.use(authRoutes);
app.use("/boards", boardRoutes);
app.use("/dashboard", dashboardRoutes);
app.use(postRoutes);

export default app;