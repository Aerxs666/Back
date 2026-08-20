

export interface Guard {
  id: number;
  name: string;
  category: string; // especialidad: armado, desarmado, escolta, vigilancia_electronica, supervision
  hourlyRate: number;
  yearsOfExperience: number;
  active: boolean;
}


export type CreateGuardDto = Omit<Guard, 'id'>;


export type UpdateGuardDto = Partial<CreateGuardDto>;