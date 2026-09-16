import * as yup from 'yup'

export const skillSchema = yup.object({
  description: yup
    .string()
    .trim()
    .min(1, "Deve ter no mínimo 1 caractere")
    .max(40, "Deve ter até 40 caracteres")
    .matches(/^[a-zA-ZÀ-ÿ0-9 _#-]+$/, "Descrição contém caracteres inválidos")
    .required("Descrição é obrigatória"),
  type: yup.mixed().oneOf(["HARD", "SOFT"], "Tipo é obrigatório"),
}).required();

export type SkillFormData = yup.InferType<typeof skillSchema>;