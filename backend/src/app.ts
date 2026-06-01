import express from "express";
import cors from "cors";

import branchRoutes from "./routes/branch.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/branches", branchRoutes);

export default app;