export interface Content {
    content: Cita[];
    page:    Page;
}

export interface Cita {
    fecha:         string;
    hora:          string;
    id:            number 
    motivo:        string;
    nombreDueno:   string;
    nombreMascota: string;
    mascotaId:     number | null;
    contacto: string
    duenoId: number | null;
}

export interface Page {
    size:          number;
    number:        number;
    totalElements: number;
    totalPages:    number;
}

export interface CitaUpdate {
    fecha:     string;
    hora:      string;
    id:        number | null;
    mascotaId: number | null;
    motivo:    string;
}
