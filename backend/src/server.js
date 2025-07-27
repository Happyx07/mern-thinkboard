import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
const __dirname = path.resolve();


// Middleware
if(process.env.NODE_ENV !== "production") {
  app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173"
}));
 

}


// app.use((req, res, next) => {
//   console.log("We just got a request!");
//   next();
// });


// our simple middleware function
app.use((req, res, next) => {
  console.log(`Request method: ${req.method}`);
  console.log(`Request URL: ${req.url}`);
  next(); // Call next() to continue to the next middleware or route handler
});
// Routes
app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV === "production") {
  
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// Add a route for the root path
app.get("/", (req, res) => {
  res.send("ThinkBoard API is running");
});

connectDB().then(() => {

  app.listen(PORT, () => {
    console.log("Server is running on port:",PORT);
    console.log("http://localhost:5000");
  });
});



