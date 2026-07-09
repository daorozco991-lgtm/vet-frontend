import { useEffect, useState } from "react";
import type { MascotaUpdate } from "../../models/Mascota";
import CloseIcon from "@mui/icons-material/Close";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import duenoService from "../../services/dueno.service";
import type { SelectOption } from "../../models/SelectOption";

interface MascotaFormProps {
  onCreate?: (mascota: MascotaUpdate) => void;

  mascotaInicial?: MascotaUpdate;

  onDelete?: () => void;

  onUpdate?: (mascota: MascotaUpdate, id: number) => void;

  onClose?: () => void;
  duenoId?: number;
}

export const MascotaForm = ({
  onCreate,

  mascotaInicial,

  onClose,

  onDelete,

  onUpdate,

  duenoId,
}: MascotaFormProps) => {
  const [touched, setTouched] = useState(false);
  const [opciones, setOpciones] = useState<SelectOption[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [loadingDuenos, setLoadingDuenos] = useState(false);
  const isEdit = mascotaInicial;
  const formatOwnerOption = (option: SelectOption) =>
    `${option.id} - ${option.nombre}`;

  const [formData, setFormData] = useState<MascotaUpdate>(
    mascotaInicial || {
      id: null,
      nombreMascota: "",

      raza: "",

      fechaNacimiento: "",

      duenoId: duenoId ?? null,

      edad: null,
    },
  );

  const fechaHoy = new Date().toLocaleDateString("en-CA", {
    timeZone: "America/Bogota",

    hour12: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTouched(true);

    const nombreError = formData.nombreMascota === "";

    const razaError = formData.raza === "";

    const duenoError = formData.duenoId === null;

    const fechaSinValor =
      formData.fechaNacimiento === "" || formData.fechaNacimiento > fechaHoy;

    if (!nombreError && !razaError && !fechaSinValor) {
      if (mascotaInicial && formData.id) {
        setDisabled(true);
        onUpdate!(formData, formData.id);
      } else if (!duenoError) {
        setDisabled(true);
        onCreate!(formData);
      }
    }
  };

  useEffect(() => {
    setLoadingDuenos(true);
    duenoService
      .cargarIdsDeDuenos()
      .then(setOpciones)
      .catch((error) => {
        console.error("Error al cargar los dueños:", error);
      })
      .finally(() => {
        setLoadingDuenos(false);
      });
  }, []);
  return (
    <div className="form-overlay">
      <div className="form-container">
        <div className="form-header">
          <h2 className="form-title">
            {isEdit ? "Editar Mascota" : "Crear Mascota"}
          </h2>
          <button className="form-close" onClick={onClose} type="button">
            <CloseIcon onClick={onClose} />
          </button>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre de mascota</label>
            <input
              className={
                formData.nombreMascota === "" && touched ? "error" : ""
              }
              type="text"
              name="nombreMascota"
              value={formData.nombreMascota}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Raza</label>
            <input
              className={formData.raza === "" && touched ? "error" : ""}
              type="text"
              name="raza"
              value={formData.raza}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Fecha de nacimiento</label>
            <input
              className={
                touched &&
                (formData.fechaNacimiento === "" ||
                  formData.fechaNacimiento > fechaHoy)
                  ? "error"
                  : ""
              }
              type="date"
              max={fechaHoy}
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
            />
          </div>

          {!isEdit && (
            <div className="form-group">
              <label>Dueño</label>
              <Autocomplete
                options={opciones}
                loading={loadingDuenos}
                noOptionsText="No se encontraron dueños"
                getOptionLabel={formatOwnerOption}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={
                  opciones.find((op) => op.id === formData.duenoId) ?? null
                }
                onChange={(_, value) =>
                  setFormData({
                    ...formData,
                    duenoId: value?.id ?? null,
                  })
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Buscar mascota..."
                    error={touched && formData.duenoId == null}
                    slotProps={{
                      input: {
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loadingDuenos ? (
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
                onClick={() => {
                  setDisabled(true);
                  onDelete!();
                }}
                type="button"
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
