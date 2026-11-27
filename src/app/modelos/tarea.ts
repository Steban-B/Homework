export interface Tarea {
  id: number;
  user_id: string;
  titulo: string;
  completada: boolean;
  creada_en: string;
}

export type Filtro = 'todas' | 'pendientes' | 'completadas';
