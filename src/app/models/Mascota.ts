
export interface Content {
  content: Mascota[];
  page:    Page;
}

export interface Mascota {
  totalCitas: number
  edad:          number | null;
  id:            number 
  nombreDueno:   string;
  nombreMascota: string;
  raza:          string;
  fechaNacimiento: string;
  duenoId: number | null
}

export interface Page {
  size:          number;
  number:        number;
  totalElements: number;
  totalPages:    number;
}

export interface MascotaUpdate {
  duenoId:         number | null;
  edad:            number | null;
  fechaNacimiento: string;
  id:              number | null;
  nombreMascota:          string;
  raza:            string;
}
