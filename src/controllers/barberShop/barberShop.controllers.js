import * as barbersServices from "../../services/barberShop/barberShop.services.js";

/**
 * @module BarbeariaController
 * @description Controller responsável por gerenciamento das barbearias.
 */

export const registerBarberShop = async (req, res) => {
  try {
    const result = await barbersServices.registerBarberShop(req.body);

    if (!result.status) {
      return res.status(400).json({ status: false, error: result.mensagem });
    }

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      status: true,
      id: result.id_barbearia,
      access_token: result.access_token,
    });
  } catch (error) {
    if (error?.cause?.code === "23505") {
      return res.status(409).json({ error: "Email ou telefone ja cadastrado" });
    }
    console.log(error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};

export const getBarbersShop = async (req, res) => {
  try {
    const barbersShop = await barbersServices.getBarbersShop();
    return res.status(200).json({ barbersShop });
  } catch {
    return res.status(500).json({ error: "Erro ao buscar barbearias" });
  }
};

export const getBarberShopId = async (req, res) => {
  try {
    if (String(req.user.id) !== String(req.id))
      return res.status(403).json({ error: "Erro ao buscar usuario" });

    const barberShop = await barbersServices.getBarberShopId(req.id);

    if (!barberShop.length)
      return res.status(404).json({ error: "Barbearia nao encontrada" });

    return res.status(200).json({ barberShop: barberShop[0] });
  } catch {
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const loginBarberShop = async (req, res) => {
  try {
    const login = await barbersServices.loginBarberShop(req.body);

    if (!login.status) {
      return res.status(401).json({ status: false, error: login.mensagem });
    }

    return res.status(200).json({
      status: true,
      id: login.id_barbearia,
      access_token: login.access_token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const validBarberToken = async (req, res) => {
  try {
    if (req.user.id) {
      return res.status(200).json({
        status: true,
        user: req.user,
      });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro interno do servidor",
    });
  }
};
