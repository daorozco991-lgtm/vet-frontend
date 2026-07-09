import { useEffect, useState } from "react";
import citaService from "../../services/cita.service";
import type { Cita, CitaUpdate } from "../../models/Cita";
import CitaCard from "../card/CitaCard";
import { CitaForm } from "../formularios/CitaForm";

import { Box, CircularProgress } from "@mui/material";
import { useLayoutContext } from "../../hooks/useLayoutContext";

export function CitasPage() {
  const [citas, setCitas] = useState<Cita[] | null>(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { busqueda, openCreateModal, setOpenCreateModal } = useLayoutContext();
  const [citaEditada, setCitaEditada] = useState<Cita | null>(null);

  const buscarCitas = async (termino: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await citaService.search(termino);
      setCitas(response.content);
    } catch (error) {
      console.error("Error al buscar citas:", error);
      setError(
        "Ocurrió un error al buscar citas. Por favor, intenta de nuevo.",
      );
      setCitas([]);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      if (busqueda.trim()) {
        buscarCitas(busqueda);
      } else {
        buscarCitas("");
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [busqueda,openEditModal, openCreateModal]);

  const createCita = async (cita: CitaUpdate) => {
    try {
      await citaService.create(cita);
      alert("Cita creada");
      setOpenCreateModal(false);
    } catch (error: unknown) {
      alert("Error al crear cita: " + (error as Error).message);
      throw error;
    }
  };

  const editCita = async (idCita: number, cita: CitaUpdate) => {
    try {
      await citaService.update(idCita, cita);
      alert("Cita actualizada");
      setOpenEditModal(false);
      setCitaEditada(null);
    } catch (error: unknown) {
      alert("Error al actualizar cita: " + (error as Error).message);
      throw error;
    }
  };

  const onDelete = async (idCita: number) => {
    try {
      await citaService.deleteById(idCita);
      alert("Cita eliminada");
      setOpenEditModal(false);
      setCitaEditada(null);
    } catch (error: unknown) {
      alert("Error al eliminar cita: " + (error as Error).message);
      throw error;
    }
  };

  return (
    <div className="citas-page-container">
      <div className="grid-list">
        {loading && citas! === null ? (
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
        ) : citas!.length === 0 ? (
          <Box className="empty-state-container">
            <Box className="empty-state-box">
              <span className="empty-state-icon">📅</span>
              <h3 className="empty-state-title">No hay citas</h3>
              <p className="empty-state-message">
                Programa una nueva cita o intenta con otro término de búsqueda
              </p>
            </Box>
          </Box>
        ) : (
          citas!.map((cita: Cita) => (
            <CitaCard
              key={cita.id}
              cita={cita}
              onEdit={(item) => {
                setCitaEditada(item);
                setOpenCreateModal(false);
                setOpenEditModal(true);
              }}
            />
          ))
        )}
      </div>

      {openCreateModal && (
        <CitaForm
          onCreate={createCita}
          onClose={() => setOpenCreateModal(false)}
        />
      )}
      {openEditModal && citaEditada && (
        <CitaForm
          citaInicial={citaEditada}
          onUpdate={(cita) => editCita(citaEditada.id, cita)}
          onClose={() => {
            setOpenEditModal(false);
            setCitaEditada(null);
          }}
          onDelete={() => {
            onDelete(citaEditada.id);
          }}
        />
      )}
    </div>
  );
}
