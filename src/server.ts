import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Simple Ping-Pong endpoint returning JSON
app.get("/ping", (req: Request, res: Response) => {
  res.json({ message: "pong" }); // Changed from res.send('pong') to res.json({ message: 'pong' })
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
