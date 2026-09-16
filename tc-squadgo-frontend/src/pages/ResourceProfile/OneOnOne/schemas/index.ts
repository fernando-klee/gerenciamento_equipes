import * as yup from 'yup'

export const oneOnOneSchema = yup.object({
        description: yup.string().trim().min(3, 'Deve ter no mínimo 3 caracteres').max(1500, 'Deve ter até 1500 caracteres').required('Descrição é obrigatória'),
        type: yup.mixed().oneOf(['LEADER', 'RESOURCE'], 'Tipo é obrigatório'),
    }).required()