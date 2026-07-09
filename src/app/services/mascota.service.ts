import type { SelectOption } from "../models/SelectOption";
import type { Content, Mascota, MascotaUpdate } from "../models/Mascota";
import API from "../types/api";

const search = async (search: string): Promise<Content> => {
  const response = await API.get<Content>("/mascotas/search", {
    params: { query: search, page: 0, size: 15, sort: "id,desc" },
  });
  return response.data;
};

const create = async (mascota: MascotaUpdate): Promise<Mascota> => {
  const response = await API.post<Mascota>("/mascotas", mascota);
  return response.data;
};

const update = async (
  id: number,
  mascota: MascotaUpdate,
): Promise<MascotaUpdate> => {
  const { nombreMascota, raza, fechaNacimiento } = mascota;

  const response = await API.patch<MascotaUpdate>(`/mascotas/${id}`, {
    nombreMascota,
    raza,
    fechaNacimiento,
  });

  return response.data;
};

const deleteById = async (id: number): Promise<void> => {
  await API.delete(`/mascotas/${id}`);
};

const cargarIdsDeMascotas = async (): Promise<SelectOption[]> => {
  const response = await API.get<SelectOption[]>("/mascotas/ids");
  return response.data;
};

export default {
  search,
  create,
  update,
  deleteById,
  cargarIdsDeMascotas,
};
