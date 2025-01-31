import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Simple Ping-Pong endpoint
app.get("/ping", (req: Request, res: Response) => {
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
