import * as schemas from "../../utils/barber.js";
/**
 * Utils para validação de dados
 * @param {string} req requisição
 */
export const validationBarber = (req, res, next) => {
  const result = schemas.validationBarber.safeParse(req.body);

  if (!result.success) {
    const error = result.error._zod.def.map((err) => ({
      message: err["message"],
      campo: err["path"][0],
    }));

    return res.status(401).json({
      status: false,
      error,
    });
  }

  res.body = result.data;
  next();
};

export const validationBarberId = (req, res, next) => {
  const id = schemas.validationBarberId.safeParse(req.params);

  if (!id.success) {
    const error = id.error._zod.def.map((err) => ({
      message: err["message"],
      campo: err["path"][0],
    }));

    return res.status(401).json({
      status: false,
      error,
    });
  }

  req.id = id.data.id;
  next();
};
