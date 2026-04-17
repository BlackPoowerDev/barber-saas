import * as rateLimiter from "../config/rateLimiter.js";
import verifyRateLimiter from "../middlewares/verifyRateLimiter.js";

import * as barberShopControllers from "../controllers/barberShop/barberShop.controllers.js";
import * as validationBarber from "../controllers/barberShop/barberShop.validation.js";

import { verifyAccess } from "../middlewares/verifyAccess.js";

import express from "express";
const routerBarberShop = express.Router();

// Cadastrar barbearia
routerBarberShop.post(
  "/create",
  verifyRateLimiter(rateLimiter.registerLimiter),
  validationBarber.validationBarberShop,
  barberShopControllers.registerBarberShop,
);

// Validar acessToken
routerBarberShop.get(
  "/validate",
  verifyAccess("*"),
  verifyRateLimiter(rateLimiter.globalLimiter),
  barberShopControllers.validBarberToken,
);

// Buscar todas as barbearias
routerBarberShop.get(
  "/",
  verifyAccess(["*"]),
  verifyRateLimiter(rateLimiter.globalLimiter),
  barberShopControllers.getBarbersShop,
);

// Buscar barbeiro pelo id
routerBarberShop.get(
  "/:id",
  verifyAccess(["barbearia"]),
  verifyRateLimiter(rateLimiter.globalLimiter),
  validationBarber.validationBarberId,
  barberShopControllers.getBarberShopId,
);

// Rota de login da barbearia
routerBarberShop.post(
  "/login",
  verifyRateLimiter(rateLimiter.loginLimiter),
  barberShopControllers.loginBarberShop,
);

export default routerBarberShop;
