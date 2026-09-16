import * as yup from 'yup'

export const resourceSchema = yup.object({
    name: yup
        .string()
        .trim()
        .required('Nome é obrigatório'),
    email: yup
        .string()
        .required('E-mail é obrigatório')
        .email('E-mail é inválido'),
    admission_date: yup
        .date()
        .nullable()
        .required('Admissão é obrigatória'),
    hours_amount: yup
        .number()
        .required('Horas é obrigatório'),
    status: yup
        .mixed()
        .oneOf([
            'ATIVO',
            'FERIAS',
            'TREINAMENTO',
            'INATIVO'
        ], 'Status é obrigatório'),
    classification_id: yup
        .number()
        .min(1, 'Classificação é obrigatória'),
    types_ids: yup
        .array()
        .when('classification_id', (classification_id, types_ids) => {
            return classification_id === 4
                ? types_ids
                    .min(1, 'Selecione pelo menos um tipo')
                    .required('Selecione pelo menos um tipo')
                : types_ids
        })
})