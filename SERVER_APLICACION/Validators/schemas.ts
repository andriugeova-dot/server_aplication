import { z } from "../Dependencies/dependencies.ts";

// ---------- Aprendiz ----------
export const aprendizSchema = z.object({
  documento: z.string().min(1, "El documento es obligatorio"),
  nombre: z.string().min(1, "El nombre es obligatorio"),
  apellido: z.string().min(1, "El apellido es obligatorio"),
  correo: z.string().email("El correo no es válido"),
  telefono: z.string().min(1, "El teléfono es obligatorio"),
  idFicha: z.number().int().positive("idFicha debe ser un entero positivo"),
});
export const aprendizUpdateSchema = aprendizSchema.partial();

// ---------- Usuario ----------
export const usuarioSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  apellido: z.string().min(1, "El apellido es obligatorio"),
  correo: z.string().email("El correo no es válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  idRol: z.number().int().positive("idRol debe ser un entero positivo"),
});
export const usuarioUpdateSchema = usuarioSchema.partial();

// ---------- Login ----------
export const loginSchema = z.object({
  correo: z.string().email("El correo no es válido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

// ---------- Ficha ----------
export const fichaSchema = z.object({
  numeroFicha: z.string().min(1, "El número de ficha es obligatorio"),
  jornada: z.string().min(1, "La jornada es obligatoria"),
  idPrograma: z.number().int().positive("idPrograma debe ser un entero positivo"),
});
export const fichaUpdateSchema = fichaSchema.partial();

// ---------- Programa ----------
export const programaSchema = z.object({
  nombrePrograma: z.string().min(1, "El nombre del programa es obligatorio"),
});
export const programaUpdateSchema = programaSchema.partial();

// ---------- Rol ----------
export const rolSchema = z.object({
  nombreRol: z.string().min(1, "El nombre del rol es obligatorio"),
});
export const rolUpdateSchema = rolSchema.partial();

// ---------- Asignatura ----------
export const asignaturaSchema = z.object({
  nombreAsignatura: z.string().min(1, "El nombre de la asignatura es obligatorio"),
  descripcion: z.string().optional(),
});
export const asignaturaUpdateSchema = asignaturaSchema.partial();

// ---------- Horario ----------
export const horarioSchema = z.object({
  diaSemana: z.string().min(1, "El día de la semana es obligatorio"),
  horaInicio: z.string().min(1, "La hora de inicio es obligatoria"),
  horaFin: z.string().min(1, "La hora de fin es obligatoria"),
});
export const horarioUpdateSchema = horarioSchema.partial();

// ---------- HFA (Horario-Ficha-Asignatura) ----------
export const hfaSchema = z.object({
  idFicha: z.number().int().positive("idFicha debe ser un entero positivo"),
  idHorario: z.number().int().positive("idHorario debe ser un entero positivo"),
  idAsignatura: z.number().int().positive("idAsignatura debe ser un entero positivo"),
});
export const hfaUpdateSchema = hfaSchema.partial();

// ---------- AsignacionFicha ----------
export const asignacionFichaSchema = z.object({
  idUsuario: z.number().int().positive("idUsuario debe ser un entero positivo"),
  idFicha: z.number().int().positive("idFicha debe ser un entero positivo"),
});
export const asignacionFichaUpdateSchema = asignacionFichaSchema.partial();

// ---------- AsignacionUsuario ----------
export const asignacionUsuarioSchema = z.object({
  idUsuario: z.number().int().positive("idUsuario debe ser un entero positivo"),
  idAsignatura: z.number().int().positive("idAsignatura debe ser un entero positivo"),
});
export const asignacionUsuarioUpdateSchema = asignacionUsuarioSchema.partial();

// ---------- Asistencia ----------
export const asistenciaSchema = z.object({
  idAprendiz: z.number().int().positive("idAprendiz debe ser un entero positivo"),
  idHFA: z.number().int().positive("idHFA debe ser un entero positivo"),
  fecha: z.string().min(1, "La fecha es obligatoria"),
  horaEntrada: z.string().optional(),
  horaSalida: z.string().optional(),
  estado: z.enum(["Presente", "Ausente", "Tarde", "Justificado"]).optional(),
  observacion: z.string().optional(),
});
export const asistenciaUpdateSchema = asistenciaSchema.partial();
