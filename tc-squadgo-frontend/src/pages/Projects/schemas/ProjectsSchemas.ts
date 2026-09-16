// src/pages/Projects/schemas.ts
import * as yup from "yup";
import { isBefore } from "date-fns";

export const createProjectSchema = (switchEstimate: boolean) => {
  const startEstimateSchema = switchEstimate
    ? yup.date().nullable()
    : yup.date().when("end_estimate", (end_estimate, schema) =>
        schema
          .test(
            "isStartDateBeforeEndDate",
            "Data deve ser menor que finalização",
            (value: any) => {
              if (end_estimate) return isBefore(value, end_estimate);
              return true;
            }
          )
          .required("Estimativa é obrigatória")
      );

  return yup.object({
    name: yup
      .string()
      .trim()
      .required("Nome é obrigatório")
      .max(50, "Nome não pode ter mais que 50 caracteres")
      .matches(/^[a-zA-ZÀ-ÿ0-9\s\-_]+$/, "Nome contém caracteres inválidos"),
    customer_id: yup
      .number()
      .min(1, "Cliente é obrigatório")
      .required("Cliente é obrigatório"),
    hours: yup
      .number()
      .typeError("Horas é obrigatório")
      .min(1, "Valor de horas deve ser maior que 1")
      .max(9999, "Valor de horas não pode ser maior que 9999")
      .transform((value) => (value > 9999 ? 9999 : value)),
    type: yup.mixed().oneOf(["PF", "PR"], "Tipo é obrigatório"),
    end_estimate: yup
      .date()
      .nullable()
      .when("type", (type, end_estimate) =>
        type === "PF"
          ? end_estimate.required("Finalização é obrigatória")
          : end_estimate
      ),
    start_estimate: startEstimateSchema,
    status: yup
      .mixed()
      .oneOf(
        ["EM_ANDAMENTO", "A_INICIAR", "CONCLUIDO"],
        "Status é obrigatório"
      ),
  });
};

export const deleteUserFromProjectSchema = yup.object({
  output_estimate: yup.date().required("Estimativa é obrigatória").nullable(),
});