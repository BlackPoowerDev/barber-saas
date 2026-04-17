import jwt from "jsonwebtoken";
import "dotenv/config";

export const createJwt = (data) => {
  return jwt.sign(
    {
      id: data.id,
      tipo: data.type,
    },
    process.env.JWT_SECRET,
    { expiresIn: data.expired },
  );
};

export const createRefreshToken = (data) => {
  return jwt.sign(
    {
      id: data.id,
      tipo: data.type,
    },
    process.env.REFRESH_SECRET,
    { expiresIn: data.expired },
  );
};
