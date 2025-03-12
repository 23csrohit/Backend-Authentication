require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const SECRET_KEY = process.env.JWT_SECRET || "your-secure-secret";
const TOKEN_EXPIRATION = process.env.JWT_EXPIRATION || "1h";

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Access denied" });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ error: "Invalid token" });
        req.user = decoded;
        next();
    });
};

// Login Route - Generates JWT
app.post("/login", async (req, res) => {
    const { username } = req.body;
    if (!username) return res.status(400).json({ error: "Username required" });

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
    res.json({ token });
});

// Protected Route
app.get("/protected", verifyToken, (req, res) => {
    res.json({ message: "Protected data accessed", user: req.user });
});

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
