import jwt from "jsonwebtoken";
import "dotenv/config";

export const verifyAccess = (usersAllowed = []) => {
  return (req, res, next) => {
    const authHeaders = req.headers.authorization;

    if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
      return res.status(401).json({
        status: 401,
        message: "Usuario não autorizado",
      });
    }

    const token = authHeaders.split(" ")[1];

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      if (usersAllowed.includes("*") || usersAllowed.includes(decode.tipo)) {
        req.status = true;
        req.user = decode;
        return next();
      }

      return res.status(403).json({ mensagem: "Acesso negado" });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          error: "Token expirado",
          code: "TOKEN_EXPIRED",
        });
      }

      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ error: "Token inválido" });
      }

      return res.status(401).json({ error: "Acesso negado!" });
    }
  };
};
