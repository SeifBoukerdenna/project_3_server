"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Simple Ping-Pong endpoint
app.get("/ping", (req, res) => {
    res.send("pong");
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
