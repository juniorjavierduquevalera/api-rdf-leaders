import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/connection.js";
import userRoutes from "./routes/users.routes.js";
import leaderRoutes from "./routes/leader.routes.js";
import guestRoutes from "./routes/guest.routes.js";


dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
connectDB();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/leaders", leaderRoutes);
app.use("/api/guests", guestRoutes);


app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
