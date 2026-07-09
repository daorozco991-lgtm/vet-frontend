import type { Content, Dueno, DuenoUpdate } from "../models/Dueno";
import type { SelectOption } from "../models/SelectOption";
import API from "../types/api";

const search = async (search: string): Promise<Content> => {
  const response = await API.get<Content>("/duenos/search", {
    params: { query: search, page: 0, size: 15, sort: "id,desc" },
  });
  return response.data;
};

const create = async (dueno: DuenoUpdate): Promise<Dueno> => {
  const response = await API.post<Dueno>("/duenos", dueno);
  return response.data;
};

const update = async (
  id: number,
  dueno: DuenoUpdate
): Promise<DuenoUpdate> => {
  const { nombreDueno, contacto } = dueno;

  const response = await API.patch<DuenoUpdate>(`/duenos/${id}`, {
    nombreDueno,
    contacto,
  });

  return response.data;
};

const deleteById = async (id: number): Promise<void> => {
  await API.delete(`/duenos/${id}`);
};

const cargarIdsDeDuenos = async (): Promise<SelectOption[]> => {
  const response = await API.get<SelectOption[]>("/duenos/ids");
  return response.data;
};

export default {
  search,
  create,
  update,
  deleteById,
  cargarIdsDeDuenos,
};