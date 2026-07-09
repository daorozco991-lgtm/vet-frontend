import { useEffect, useState } from "react";
import mascotaService from "../services/mascota.service";
import type { Mascota, MascotaUpdate } from "../models/Mascota";
import { MascotaForm } from "../components/formularios/MascotaForm";
import MascotaCard from "../components/card/MascotaCard";
import { CitaForm } from "../components/formularios/CitaForm";
import { Box, CircularProgress } from "@mui/material";
import citaService from "../services/cita.service";
import { useLayoutContext } from "../hooks/useLayoutContext";

export function MascotasPage() {
  const [mascotas, setMascotas] = useState<Mascota[] | null>(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openCitaForm, setOpenCitaForm] = useState(false);
  const [mascotaEditada, setMascotaEditada] = useState<Mascota | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { busqueda, openCreateModal, setOpenCreateModal } = useLayoutContext();

  const buscarMascotas = async (termino: string) => {
    setLoading(true);
    setError(null);
    try {
      const resultado = await mascotaService.search(termino);
      setMascotas(resultado.content);
    } catch (error: unknown) {
      alert("Error al buscar mascotas: " + (error as Error).message);
      setError(
        "Ocurrió un error al buscar mascotas. Por favor, intenta de nuevo.",
      );
      setMascotas([]);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createMascota = async (mascota: MascotaUpdate) => {
    try {
      await mascotaService.create(mascota);
      alert("Mascota creada");
      setOpenCreateModal(false);
    } catch (error: unknown) {
      alert("Error al crear mascota: " + (error as Error).message);
      throw error;
    }
  };

  const editMascota = async (idMascota: number, mascota: MascotaUpdate) => {
    try {
      await mascotaService.update(idMascota, mascota);
      alert("Mascota actualizada");
      setOpenEditModal(false);
      setMascotaEditada(null);
    } catch (error: unknown) {
      alert("Error al actualizar mascota: " + (error as Error).message);
      throw error;
    }
  };

  const onDelete = async (idMascota: number) => {
    try {
      await mascotaService.deleteById(idMascota);
      alert("Mascota eliminada");
      setOpenEditModal(false);
      setMascotaEditada(null);
    } catch (error: unknown) {
      alert("Error al eliminar mascota: " + (error as Error).message);
      throw error;
    }
  };

   useEffect(() => {
    const timer = setTimeout(() => {
      if (busqueda.trim()) {
        buscarMascotas(busqueda);
      } else {
        buscarMascotas("");
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [busqueda, openEditModal, openCreateModal, openCitaForm]);

  return (
    <div className="mascotas-page-container">
      <div className="grid-list">
        {loading && mascotas === null ? (
          <Box className="empty-state-container">
            <Box className="loading-spinner">
              <CircularProgress size={50} />
            </Box>
          </Box>
        ) : error ? (
          <Box className="empty-state-container">
            <Box className="empty-state-box">
              <span className="empty-state-icon">⚠️</span>
              <h3 className="empty-state-title">Error</h3>
              <p className="empty-state-message">{error}</p>
            </Box>
          </Box>
        ) : mascotas?.length === 0 ? (
          <Box className="empty-state-container">
            <Box className="empty-state-box">
              <span className="empty-state-icon">🐾</span>
              <h3 className="empty-state-title">No hay mascotas</h3>
              <p className="empty-state-message">
                Crea una nueva mascota o intenta con otro término de búsqueda
              </p>
            </Box>
          </Box>
        ) : (
          mascotas!.map((mascota: Mascota) => (
            <MascotaCard
              onEditCita={(mascota) => {
                setMascotaEditada(mascota);
                setOpenCitaForm(true);
              }}
              key={mascota.id}
              mascota={mascota}
              onEdit={(mascota) => {
                setOpenCreateModal(false);
                setOpenEditModal(true);
                setMascotaEditada(mascota);
              }}
            />
          ))
        )}
      </div>

      {openCreateModal && (
        <MascotaForm
          onCreate={createMascota}
          onClose={() => setOpenCreateModal(false)}
        />
      )}
      {openEditModal && mascotaEditada && (
        <MascotaForm
          mascotaInicial={mascotaEditada}
          onDelete={() => onDelete(mascotaEditada.id)}
          onUpdate={(mascota) => editMascota(mascotaEditada.id, mascota)}
          onClose={() => {
            setOpenEditModal(false);
            setMascotaEditada(null);
          }}
        />
      )}

      {openCitaForm && mascotaEditada && (
        <CitaForm
          onCreate={async (cita) => {
            await citaService.create(cita);
            alert("Cita asignada");

            setOpenCitaForm(false);
          }}
          mascotaId={mascotaEditada?.id}
          onClose={() => setOpenCitaForm(false)}
        ></CitaForm>
      )}
    </div>
  );
}
