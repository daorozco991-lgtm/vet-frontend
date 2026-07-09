import type { CitaUpdate } from "../../models/Cita";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import mascotaService from "../../services/mascota.service";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import type { SelectOption } from "../../models/SelectOption";

interface CitaFormProps {
  onCreate?: (cita: CitaUpdate) => void;

  citaInicial?: CitaUpdate;

  onUpdate?: (cita: CitaUpdate) => void;

  onDelete?: () => void;

  onClose: () => void;

  mascotaId?: number;
}

export const CitaForm = ({
  onCreate,
  onUpdate,
  onClose,
  citaInicial,
  onDelete,
  mascotaId,
}: CitaFormProps) => {
  const isEdit = !!citaInicial;

  const [touched, setTouched] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [opciones, setOpciones] = useState<SelectOption[]>([]);
  const [loadingMascotas, setLoadingMascotas] = useState(false);
  const formatMascotaOption = (option: SelectOption) =>
    `${option.id} - ${option.nombre}`;

  const [formData, setFormData] = useState<CitaUpdate>(
    citaInicial || {
      fecha: "",

      hora: "",

      motivo: "",

      id: null,
      mascotaId: mascotaId ?? null,
    },
  );
  const ahora = new Date();

  const fechaHoy = ahora.toLocaleDateString("en-CA", {
    timeZone: "America/Bogota",
  });

  const horaActual = ahora.toLocaleTimeString("es-CO", {
    timeZone: "America/Bogota",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const minHora = formData.fecha === fechaHoy ? horaActual : "00:00";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched(true);

    const motivoError = formData.motivo === "";
    const mascotaError = formData.mascotaId === null;
    const fechaError = formData.fecha === "" || formData.fecha < fechaHoy;
    const horaError =
      formData.hora === "" ||
      (formData.fecha === fechaHoy && formData.hora < horaActual);
    if (!motivoError && !fechaError && !horaError) {
      if (citaInicial && formData.id) {
        setDisabled(true);
        onUpdate!(formData);
      } else if (!mascotaError) {
        setDisabled(true);
        onCreate!(formData);
      }
    }
  };
  useEffect(() => {
    setLoadingMascotas(true);
    mascotaService
      .cargarIdsDeMascotas()
      .then(setOpciones)
      .catch((error) => console.error("Error al cargar mascotas:", error))
      .finally(() => setLoadingMascotas(false));
    }, []);
  return (
    <div className="form-overlay">
      <div className="form-container">
        <div className="form-header">
          <h2 className="form-title">{isEdit ? "Editar Cita" : "Agendar"}</h2>
          <button className="form-close" onClick={onClose} type="button">
            <CloseIcon />
          </button>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          {!isEdit && (
            <div className="form-group">
              <label>Mascota</label>

              <Autocomplete
                options={opciones}
                loading={loadingMascotas}
                noOptionsText="No se encontraron mascotas"
                getOptionLabel={formatMascotaOption}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={
                  opciones.find((op) => op.id === formData.mascotaId) ?? null
                }
                onChange={(_, value) =>
                  setFormData({
                    ...formData,
                    mascotaId: value?.id ?? null,
                  })
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Buscar mascota..."
                    error={touched && formData.mascotaId == null}
                    slotProps={{
                      input: {
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loadingMascotas ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      },
                    }}
                  />
                )}
              />
            </div>
          )}

          <div className="form-group">
            <label>Fecha</label>
            <input
              className={
                touched && (formData.fecha === "" || formData.fecha < fechaHoy)
                  ? "error"
                  : ""
              }
              type="date"
              min={fechaHoy}
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Hora</label>
            <input
              className={
                touched &&
                (formData.hora === "" ||
                  (formData.fecha === fechaHoy && formData.hora < horaActual))
                  ? "error"
                  : ""
              }
              type="time"
              name="hora"
              min={touched ? minHora : "00:00"}
              value={formData.hora}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Motivo</label>
            <input
              className={formData.motivo === "" && touched ? "error" : ""}
              type="text"
              name="motivo"
              value={formData.motivo}
              onChange={handleChange}
              placeholder="Ej: Vacunación"
            />
          </div>

          <div className="form-buttons">
            <button
              disabled={disabled}
              className="form-btn-submit"
              type="submit"
            >
              {isEdit ? "Editar" : "Guardar"}
            </button>
            {isEdit && (
              <button
                disabled={disabled}
                className="form-btn-delete"
                type="button"
                onClick={() => {
                  setDisabled(true);
                  onDelete!();
                }}
              >
                Eliminar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
