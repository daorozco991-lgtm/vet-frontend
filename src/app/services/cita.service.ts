import type { CitaUpdate, Content } from "../models/Cita";
import API from "../types/api";

const search = async (search: string): Promise<Content> => {
  const response = await API.get<Content>("/citas/search", {
    params: { query: search, page: 0, size: 15, sort: "id,desc" },
  });

  return response.data;
};

const create = async (cita: CitaUpdate): Promise<CitaUpdate> => {
  const { fecha, hora, motivo, mascotaId } = cita;

  const response = await API.post<CitaUpdate>("/citas", {
    fecha,
    hora,
    motivo,
    mascotaId,
  });

  return response.data;
};

const update = async (
  id: number,
  cita: CitaUpdate
): Promise<CitaUpdate> => {
  const { fecha, hora, motivo } = cita;

  const response = await API.patch<CitaUpdate>(`/citas/${id}`, {
    fecha,
    hora,
    motivo,
  });

  return response.data;
};

const deleteById = async (id: number): Promise<void> => {
  await API.delete(`/citas/${id}`);
};

export default {
  search,
  create,
  update,
  deleteById,
};