import { FiEdit2, FiCalendar, FiUser, FiPhone } from "react-icons/fi";
import type { Cita } from "../../models/Cita";

interface CitaCardProps {
  cita: Cita;
  onEdit: (cita: Cita) => void;
}

const CitaCard = ({ cita, onEdit }: CitaCardProps) => {
  return (
    <div className="vet-card">
      <div className="vet-card__header">
        <div className="vet-card__avatar vet-card__avatar--green">
          <FiCalendar size={18} />
        </div>
        <div className="vet-card__header-info">
          <h3 className="vet-card__title">{cita.nombreMascota}</h3>
          <span className="vet-card__tag">{`${parseInt(cita.hora.substring(0,2)) > 12 ? parseInt(cita.hora.substring(0,2)) - 12 : parseInt(cita.hora.substring(0,2))}${cita.hora.substring(2,5)} ${parseInt(cita.hora.substring(0,2)) >= 12 ? "pm" : "am"}`}</span>
        </div>
        <span className="vet-card__id">{cita.fecha}</span>
      </div>

      <div className="vet-card__body">
        <div className="vet-card__field">
          <span className="vet-card__label"><FiUser size={13} /> Propietario</span>
          <span className="vet-card__value">{cita.nombreDueno}</span>
        </div>
        <div className="vet-card__field">
          <span className="vet-card__label"><FiPhone size={13} /> Contacto</span>
          <span className="vet-card__value">{cita.contacto}</span>
        </div>
      </div>

      <div className="vet-card__footer">
        <button className="vet-btn vet-btn--primary" onClick={() => onEdit(cita)}>
          <FiEdit2 size={14} /> Editar cita
        </button>
      </div>
    </div>
  );
};

export default CitaCard;