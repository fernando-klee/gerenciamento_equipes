 import * as yup from 'yup'
 
 export const feedbackSchema = yup.object({
        description: yup.string().trim().min(3, 'Deve ter no mínimo 3 caracteres').max(1500, 'Deve ter até 1500 caracteres').required('Descrição é obrigatória'),
        type: yup.mixed().oneOf([
            'CUSTOMER',
            'PERSONAL',
            'PROJECT',
            'RESOURCE'
        ], 'Tipo é obrigatório'),
        project_id: yup.number().nullable().when('type', (type, project_id) =>
            type === 'PROJECT' ? project_id.min(1, 'Projeto é obrigatório').required('Projeto é obrigatório') : project_id
        ),
        customer_id: yup.number().nullable().when('type', (type, customer_id) =>
            type === 'CUSTOMER' ? customer_id.min(1, 'Cliente é obrigatório').required('Cliente é obrigatório') : customer_id
        ),
    }).required()