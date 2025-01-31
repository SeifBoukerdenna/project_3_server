"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const PORT = 3000;
// --- 1. Mongoose connection (no env vars) ---
mongoose_1.default
    .connect("mongodb+srv://elmelz6472:fgF2gHx0Z9OzcBED@mycluster.813qh.mongodb.net/?retryWrites=true&w=majority&appName=myCluster")
    .then(() => {
    console.log("Connected to MongoDB");
})
    .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
});
// --- 2. Schema & Model ---
const quizSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: String,
    questions: [String],
});
const Quiz = mongoose_1.default.model("Quiz", quizSchema);
// --- 3. Middleware ---
app.use(express_1.default.json());
// --- 4. Routes ---
// Simple ping
app.get("/ping", (req, res) => {
    res.json({ message: "pong" });
});
// Create a new quiz
app.post("/quizzes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, questions } = req.body;
        const newQuiz = new Quiz({ title, description, questions });
        yield newQuiz.save();
        res.status(201).json(newQuiz);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Get all quizzes
app.get("/quizzes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quizzes = yield Quiz.find();
        res.json(quizzes);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Get quiz by ID
app.get("/quizzes/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quiz = yield Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        res.json(quiz);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Update quiz by ID
app.put("/quizzes/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, questions } = req.body;
        const updatedQuiz = yield Quiz.findByIdAndUpdate(req.params.id, { title, description, questions }, { new: true });
        if (!updatedQuiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        res.json(updatedQuiz);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Delete quiz by ID
app.delete("/quizzes/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedQuiz = yield Quiz.findByIdAndDelete(req.params.id);
        if (!deletedQuiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        res.json({ message: "Quiz deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// --- 5. Listen ---
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// pas: fgF2gHx0Z9OzcBED
