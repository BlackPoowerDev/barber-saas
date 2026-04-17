import * as barberServices from "../../services/barber/barber.services.js";
export async function createBarber(req, res) {
  try {
    const idBarbeariaUrl = req.params.id;
    const idBarbeariaToken = req.user.id;

    if (String(idBarbeariaUrl) !== String(idBarbeariaToken))
      return res.status(403).json({ status: false, error: "403 Forbidden" });

    const result = await barberServices.createBarber(
      idBarbeariaToken,
      req.body,
    );

    if (result?.status === false)
      return res.status(400).json({ status: false, error: result.error });

    return res.status(201).json({ status: true, id_barbeiro: result.id });
  } catch (error) {
    // console.log(error);
    if (error?.cause?.code === "23505") {
      return res.status(409).json({
        status: false,
        error: "Telefone ja cadastrado",
      });
    }
    return res
      .status(500)
      .json({ status: false, error: "Erro interno do servidor" });
  }
}

export async function getBarberId(req, res) {
  try {
    const barber = await barberServices.getBarberId(req.user.id, req.id);

    if (!barber.length)
      return res
        .status(404)
        .json({ status: false, error: "Barbeiro não encontrado" });

    return res.status(200).json({ status: true, barber: barber[0] });
  } catch {
    return res
      .status(500)
      .json({ status: false, error: "Erro interno do servidor" });
  }
}
export async function getBarbers(req, res) {
  try {
    const barbers = await barberServices.getBarbers(req.user.id);
    return res.status(200).json({ status: true, barbers });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, error: "Erro interno do servidor" });
  }
}

export async function deleteBarber(req, res) {
  try {
    const barber = await barberServices.deleteBarber(req.user.id, req.id);

    if (barber?.status === false) {
      return res.status(400).json({
        status: false,
        error: barber.error,
      });
    }

    return res.status(204).send();
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

export async function updateBarber(req, res) {
  try {
    const result = await barberServices.updateBarber(
      req.user.id,
      req.params.id,
      req.body,
    );

    if (result?.status === false) {
      return res.status(400).json({ status: false, error: result.error });
    }
    return res.status(204).send();
  } catch (error) {
    if (error?.cause?.code === "23505" || error?.code === "23505") {
      return res
        .status(409)
        .json({ status: false, error: "Este telefone já está cadastrado." });
    }
    return res
      .status(500)
      .json({ status: false, error: "Erro interno do servidor" });
  }
}
