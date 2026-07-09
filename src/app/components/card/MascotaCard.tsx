import { FiEdit2, FiCalendar, FiHeart, FiUser, FiClock } from "react-icons/fi";
import type { Mascota } from "../../models/Mascota";

interface MascotaCardProps {
  mascota: Mascota;
  onEdit: (mascota: Mascota) => void;
  onEditCita: (mascota: Mascota) => void;
}

const MascotaCard = ({ mascota, onEdit, onEditCita }: MascotaCardProps) => {
  return (
    <div className="vet-card">
      <div className="vet-card__header">
        <div className="vet-card__avatar vet-card__avatar--green">
          <FiHeart size={18} />
        </div>
        <div className="vet-card__header-info">
          <h3 className="vet-card__title">{mascota.nombreMascota}</h3>
          <span className="vet-card__tag">{mascota.raza}</span>
        </div>
        <span className="vet-card__id">ID: {mascota.id}</span>
      </div>

      <div className="vet-card__body">
        <div className="vet-card__field">
          <span className="vet-card__label"><FiUser size={13} /> Propietario</span>
          <span className="vet-card__value">{mascota.nombreDueno}</span>
        </div>
        <div className="vet-card__field">
          <span className="vet-card__label"><FiClock size={13} /> Edad</span>
          <span className="vet-card__value">
            {mascota.edad !== null ? `${mascota.edad}` : "No especificada"}
          </span>
        </div>
      </div>

      <div className="vet-card__footer">
        <button className="vet-btn vet-btn--secondary" onClick={() => onEdit(mascota)}>
          <FiEdit2 size={14} /> Editar
        </button>
        <button className="vet-btn vet-btn--primary" onClick={() => onEditCita(mascota)}>
          <FiCalendar size={14} /> Agendar
        </button>
      </div>
    </div>
  );
};

export default MascotaCard;