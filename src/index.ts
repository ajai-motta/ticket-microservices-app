import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Default Route


// Fixed route - now matches what ingress sends
app.get("/api/users/", (req: Request, res: Response) => {
  console.log("Current user endpoint hit! ✅");
  res.send("hi there from current user endpoint");
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});