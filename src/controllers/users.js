import * as userServices from "../services/users.js";

export const getUsers = async (req, res) => {
  try {
    const users = userServices.listUsers();

    if (users) {
      return res.status(200).json({
        status: true,
        users: users,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      status: false,
      message: "Erro ao listar usuarios",
    });
  }
};
