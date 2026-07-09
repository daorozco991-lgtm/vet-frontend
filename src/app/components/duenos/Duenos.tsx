import { useEffect, useState } from "react";
import duenoService from "../../services/dueno.service";
import type { Dueno, DuenoUpdate } from "../../models/Dueno";
import { DuenoForm } from "../formularios/DuenoForm";
import DuenoCard from "../card/DuenoCard";
import { MascotaForm } from "../formularios/MascotaForm";

import { Box, CircularProgress } from "@mui/material";
import mascotaService from "../../services/mascota.service";
import { useLayoutContext } from "../Layout.context";

export function DuenosPage() {
  const [duenos, setDuenos] = useState<Dueno[] | null>(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openMascotaForm, setOpenMascotaForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { busqueda, openCreateModal, setOpenCreateModal } = useLayoutContext();
  const [duenoEditado, setDuenoEditado] = useState<Dueno>({} as Dueno);
  const buscarDuenos = async (termino: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await duenoService.search(termino);
      setDuenos(response.content);
    } catch (error) {
      alert("Error al buscar dueños: " + (error as Error).message);
      setError(
        "Ocurrió un error al buscar dueños. Por favor, intenta de nuevo.",
      );
      setDuenos([]);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createDueno = async (dueno: DuenoUpdate) => {
    try {
      await duenoService.create(dueno);
      alert("Dueño creado");
      setOpenCreateModal(false);
    } catch (error: unknown) {
      alert("Error al crear dueño: " + (error as Error).message);
      throw error;
    }
  };

  const editDueno = async (id: number, dueno: DuenoUpdate) => {
    try {
      await duenoService.update(id, dueno);
      alert("Dueño actualizado");
      setOpenEditModal(false);
    } catch (error: unknown) {
      alert("Error al actualizar dueño: " + (error as Error).message);
      throw error;
    }
  };

  const onDelete = async (id: number) => {
    try {
      await duenoService.deleteById(id);
      alert("Dueño eliminado");
    } catch (error: unknown) {
      alert("Error al eliminar dueño: " + (error as Error).message);
      throw error;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (busqueda.trim()) {
        buscarDuenos(busqueda);
      } else {
        buscarDuenos("");
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [busqueda]);
  return (
    <div className="duenos-page-container">
      <div className="grid-list">
        {loading && duenos === null ? (
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
        ) : duenos?.length === 0 ? (
          <Box className="empty-state-container">
            <Box className="empty-state-box">
              <span className="empty-state-icon">👤</span>
              <h3 className="empty-state-title">No hay dueños</h3>
              <p className="empty-state-message">
                Registra un nuevo dueño o intenta con otro término de búsqueda
              </p>
            </Box>
          </Box>
        ) : (
          duenos!.map((dueno: Dueno) => (
            <DuenoCard
              onEditMascota={(dueno) => {
                setDuenoEditado(dueno);
                setOpenMascotaForm(true);
              }}
              key={dueno.id}
              dueno={dueno}
              onEdit={(d) => {
                setDuenoEditado(d);
                setOpenEditModal(true);
              }}
            />
          ))
        )}
      </div>

      {openCreateModal && (
        <DuenoForm
          onCreate={createDueno}
          onClose={() => setOpenCreateModal(false)}
        />
      )}

      {openEditModal && duenoEditado && duenoEditado.id && (
        <DuenoForm
          duenoInicial={duenoEditado}
          onUpdate={(dueno) => editDueno(duenoEditado.id! || 0, dueno)}
          onDelete={() => {
            onDelete(duenoEditado.id!);
            setOpenEditModal(false);
          }}
          onClose={() => {
            setOpenEditModal(false);
            setDuenoEditado({} as Dueno);
          }}
        />
      )}
      {openMascotaForm && duenoEditado && (
        <MascotaForm
          onCreate={async (mascota) => {
            await mascotaService.create(mascota);
            alert("Mascota asignada");
            setOpenMascotaForm(false);
          }}
          duenoId={duenoEditado!.id}
          onClose={() => {
            setOpenMascotaForm(false);
          }}
        />
      )}
    </div>
  );
}
