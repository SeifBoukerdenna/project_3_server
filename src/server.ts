import express from "express";
import { Request, Response } from "express";
import mongoose from "mongoose";

const app = express();
const PORT = 3000;

// --- 1. Mongoose connection (no env vars) ---
mongoose
  .connect(
    "mongodb+srv://elmelz6472:fgF2gHx0Z9OzcBED@mycluster.813qh.mongodb.net/?retryWrites=true&w=majority&appName=myCluster"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// --- 2. Schema & Model ---
const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  questions: [String],
});
const Quiz = mongoose.model("Quiz", quizSchema);

// --- 3. Middleware ---
app.use(express.json());

// --- 4. Routes ---

// Simple ping
app.get("/ping", (req: Request, res: Response) => {
  res.json({ message: "pong" });
});

// Create a new quiz
app.post("/quizzes", async (req: Request, res: Response) => {
  try {
    const { title, description, questions } = req.body;
    const newQuiz = new Quiz({ title, description, questions });
    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get all quizzes
app.get("/quizzes", async (req: Request, res: Response) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get quiz by ID
app.get("/quizzes/:id", async (req: any, res: any) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json(quiz);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update quiz by ID
app.put("/quizzes/:id", async (req: any, res: any) => {
  try {
    const { title, description, questions } = req.body;
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      { title, description, questions },
      { new: true }
    );
    if (!updatedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json(updatedQuiz);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete quiz by ID
app.delete("/quizzes/:id", async (req: any, res: any) => {
  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!deletedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json({ message: "Quiz deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- 5. Listen ---
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// pas: fgF2gHx0Z9OzcBED
