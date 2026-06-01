import express from "express";
import cors from "cors";

import branchRoutes from "./routes/branch.routes";
import classRoutes from "./routes/class.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/branches", branchRoutes);
app.use("/classes", classRoutes);
app.use(authRoutes);

export default app;