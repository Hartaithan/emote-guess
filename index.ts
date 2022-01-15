import express from "express";
import path from "path";
import cors from "cors";

const app = express();
const port = process.env.YOUR_PORT || process.env.PORT || 5000;

app.use(cors({ origin: "*" }));

if (process.env.NODE_ENV === "production") {
  app.use("/frontend", express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Running on port ${port}`));
