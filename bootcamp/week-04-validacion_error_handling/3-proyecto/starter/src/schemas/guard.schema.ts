import { z } from 'zod';

export const createGuardSchema = z.object({
  name: z.string({ error: 'name es obligatorio' }).min(1, 'name no puede estar vacío').trim(),
  category: z.enum(['armado', 'desarmado', 'escolta', 'vigilancia_electronica', 'supervision'] as const, {
    error: 'category es obligatorio',
  }),
  hourlyRate: z.number({ error: 'hourlyRate es obligatorio' }).positive('hourlyRate debe ser mayor a 0'),
  yearsOfExperience: z
    .number()
    .int('yearsOfExperience debe ser un entero')
    .nonnegative('yearsOfExperience no puede ser negativo')
    .default(0),
  active: z.boolean().default(true),
});

// reutiliza el schema de creación, pero con todos los campos opcionales
export const updateGuardSchema = createGuardSchema.partial();

export type CreateGuardDto = z.infer<typeof createGuardSchema>;
export type UpdateGuardDto = z.infer<typeof updateGuardSchema>;