import express from "express";
const routerBarber = express.Router();

import * as rateLimiter from "../config/rateLimiter.js";
import verifyRateLimiter from "../middlewares/verifyRateLimiter.js";

import { verifyAccess } from "../middlewares/verifyAccess.js";

import * as barberServices from "../controllers/barber/barber.controllers.js";
import * as validationBarber from "../controllers/barber/barber.validation.js";

// Cadastrar barbeiro na barbearia
routerBarber.post(
  "/create/:id",
  validationBarber.validationBarber,
  verifyRateLimiter(rateLimiter.registerLimiter),
  verifyAccess(["barbearia"]),
  barberServices.createBarber,
);

// Buscar barbeiro pelo id
routerBarber.get(
  "/:id",
  validationBarber.validationBarberId,
  verifyAccess(["barbearia"]),
  verifyRateLimiter(rateLimiter.globalLimiter),
  barberServices.getBarberId,
);

routerBarber.get(
  "/",
  verifyAccess(["barbearia"]),
  verifyRateLimiter(rateLimiter.globalLimiter),
  barberServices.getBarbers,
);

// Deletar usuario da barbeareia
routerBarber.delete(
  "/:id",
  validationBarber.validationBarberId,
  verifyRateLimiter(rateLimiter.globalLimiter),
  verifyAccess(["barbearia"]),
  barberServices.deleteBarber,
);

// Editar usuario da barbearia
routerBarber.patch(
  "/:id",
  verifyRateLimiter(rateLimiter.globalLimiter),
  verifyAccess(["barbearia"]),
  barberServices.updateBarber,
);

export default routerBarber;
