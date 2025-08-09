import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// Proper __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
if(process.env.NODE_ENV !== "production") {
  app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  }));
}

// our simple middleware function
app.use((req, res, next) => {
  console.log(`Request method: ${req.method}`);
  console.log(`Request URL: ${req.url}`);
  next(); // Call next() to continue to the next middleware or route handler
});
// Routes
app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV === "production") {
  // Serve frontend build
  const frontendDist = path.join(__dirname, "../../frontend/dist");
  app.use(express.static(frontendDist));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendDist, "index.html"));
  });
}

// Add a route for the root path
app.get("/", (req, res) => {
  res.send("ThinkBoard API is running");
});

connectDB().then(() => {

  app.listen(PORT, () => {
    console.log("Server is running on port:",PORT);
    console.log(`http://localhost:${PORT}`);
  });
});



