export interface Trabajador {
  id: number;
  nombres: string;
  apellidos: string;
  email: string;
  documentoIdentificacion: string;
  objCargo: any | null;
  telefono: string;
  direccion: string;
  sueldo: number;
}
