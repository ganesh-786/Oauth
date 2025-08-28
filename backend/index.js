import express from "express";
import router from "./routes/route.js";
const PORT = 8005;
import cors from "cors";
import { connectDB } from "./config/db.js";
const app = express();

app.use(express.json());
app.use(cors());
app.use("/", router);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`App running at http://localhost:${PORT}`);
  });
});
