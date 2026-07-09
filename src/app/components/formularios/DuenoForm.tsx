import { useState } from "react";

import type { Dueno, DuenoUpdate } from "../../models/Dueno";
import CloseIcon from "@mui/icons-material/Close";

interface DuenoFormProps {
  onCreate?: (dueno: Dueno) => void;

  duenoInicial?: Dueno;

  onDelete?: () => void;

  onUpdate?: (dueno: DuenoUpdate, duenoId: number | undefined) => void;

  onClose: () => void;
}

export const DuenoForm = ({
  onCreate,
  onUpdate,
  onClose,

  duenoInicial,

  onDelete,
}: DuenoFormProps) => {
  const isEdit = !!duenoInicial;

  const [touched, setTouched] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [formData, setFormData] = useState<Dueno>(
    duenoInicial || {
      nombreDueno: "",
      contacto: "",
    },
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validarId = (valor: string) => {
    if (valor.trim() === "") {
      return true;
    }
    return isNaN(Number(valor));
  };
  const validarCampos = (valor: string) => {
    if (valor.trim() === "") {
      return true;
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTouched(true);

    const idError = formData.id === null;
    const nombreError = formData.nombreDueno === "";
    const contactoError = formData.contacto === "";

    if (!nombreError && !contactoError) {
      setDisabled(true);

      try {
        if (formData.id && onUpdate) {
          await onUpdate(formData, formData.id);
        } else if (!idError && onCreate) {
          await onCreate(formData);
        }
      } catch (error) {
        setDisabled(false);
        throw error;
      }
    }
  };
  return (
    <div className="form-overlay">
      <div className="form-container">
        <div className="form-header">
          <h2 className="form-title">{isEdit ? "Editar Dueño" : "Crear Dueño"}</h2>
          <button className="form-close" type="button" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          {!isEdit && (
            <div className="form-group">
              <label>Identificación</label>
              <input
                className={
                  touched && validarId(formData.id?.toString() || "")
                    ? "error"
                    : ""
                }
                type="text"
                name="id"
                value={formData.id?.toString() || ""}
                onChange={handleChange}
                placeholder="Escriba solo números"
              />
            </div>
          )}

          <div className="form-group">
            <label>Nombre del dueño</label>
            <input
              className={
                touched && validarCampos(formData.nombreDueno) ? "error" : ""
              }
              type="text"
              name="nombreDueno"
              value={formData.nombreDueno}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Contacto</label>
            <input
              className={
                touched && validarCampos(formData.contacto) ? "error" : ""
              }
              type="text"
              name="contacto"
              value={formData.contacto}
              onChange={handleChange}
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
