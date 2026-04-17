import express from "express";
import morgam from "morgan";
import cors from "cors";
import "dotenv/config";

import routerBarberShop from "./routes/barberShop.routes.js";
import routerBarber from "./routes/barber.routes.js";
import routerUsers from "./routes/users.routes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgam("dev"));
app.set("trust proxy", true);
app.use("/v1/barberShop", routerBarberShop);
app.use("/v1/barber", routerBarber);
app.use("/v1/users", routerUsers);

app.use((req, res) => {
  return res.status(404).json({
    error: "Rota não encontrada!",
  });
});

app.listen(process.env.PORT, () => {
  console.log("Serve run port: " + process.env.PORT);
});
