export interface Content {
    content: Dueno[];
    page:    Page;
}

export interface Dueno {
    contacto: string;
    id?:       number;
    totalMascotas?: number;
    nombreDueno:   string;
}

export interface Mascota {
    duenoId:         number;
    edad:            string;
    fechaNacimiento: Date;
    id:              number;
    nombre:          string;
    raza:            string;
}

export interface Page {
    size:          number;
    number:        number;
    totalElements: number;
    totalPages:    number;
}


export interface DuenoUpdate {
    contacto: string;
    id?:       number;
    nombreDueno:   string;
}
