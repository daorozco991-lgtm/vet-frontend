import { FiUser, FiEdit2, FiPhone, FiHeart } from "react-icons/fi";
import AddIcon from "@mui/icons-material/Add";
import type { Dueno } from "../../models/Dueno";

interface DuenoCardProps {
  dueno: Dueno;
  onEdit: (dueno: Dueno) => void;
  onEditMascota: (dueno: Dueno) => void;
}

const DuenoCard = ({ dueno, onEdit, onEditMascota }: DuenoCardProps) => {
  return (
    <div className="vet-card">
      <div className="vet-card__header">
        <div className="vet-card__avatar vet-card__avatar--green">
          <FiUser size={18} />
        </div>
        <div className="vet-card__header-info">
          <h3 className="vet-card__title">{dueno.nombreDueno}</h3>
          <span className="vet-card__id">ID: {dueno.id}</span>
        </div>
      </div>

      <div className="vet-card__body">
        <div className="vet-card__field">
          <span className="vet-card__label">
            <FiPhone size={13} /> Contacto
          </span>
          <span className="vet-card__value">{dueno.contacto}</span>
        </div>
        <div className="vet-card__field">
          <span className="vet-card__label">
            <FiHeart size={13} /> Mascotas
          </span>
          <span className="vet-card__badge">{dueno.totalMascotas || 0}</span>
        </div>
      </div>

      <div className="vet-card__footer">
        <button
          className="vet-btn vet-btn--secondary"
          onClick={() => onEdit(dueno)}
        >
          <FiEdit2 size={14} /> Editar
        </button>
        <button
          className="vet-btn vet-btn--primary"
          onClick={() => onEditMascota(dueno)}
        >
          <AddIcon style={{ fontSize: 20 }} />
          Asignar
        </button>
      </div>
    </div>
  );
};

export default DuenoCard;
