import express, { Request, Response } from "express";
import router from "./Routes/router";
import cors from "cors";
const app = express();
const port: number = 1234;

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/", router);

app.use((err: Error, req: Request, res: Response) => {
  res.status(500).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
