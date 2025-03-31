import express from "express";
import cors from "cors";
import { router as libraryRouter } from "./src/modules/library.controller.js";
const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(libraryRouter);

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});
