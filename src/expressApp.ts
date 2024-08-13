import express from "express";
import cors from "cors";
import catalogRoutes from "./api/catalog.routes";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/", catalogRoutes);

export default app;
