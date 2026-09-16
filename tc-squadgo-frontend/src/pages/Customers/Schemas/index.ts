import * as yup from 'yup'

export const newCustomerSchema = yup.object({
        name: yup.string()
            .trim()
            .required('Nome é obrigatório')
            .matches(/^[a-zA-ZÀ-ÿ0-9\s\-_]+$/, 'Nome contém caracteres inválidos')
            .test('no-whitespace-only', 'Nome não pode conter apenas espaços', 
            (value) => value ? value.trim().length > 0 : false
            ),
        responsible_email: yup.string()
            .required('E-mail é obrigatório')
            .email('E-mail é inválido'),
        hired_hours: yup.number()
            .required('Hora é obrigatória')
            .max(9999, 'Máximo de 9999 horas'),
        responsible_name: yup.string()
            .required('Nome do responsável é obrigatório')
            .matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome do responsável contém caracteres inválidos')
            .test('no-whitespace-only', 'Nome do responsável não pode conter apenas espaços', 
            (value) => value ? value.trim().length > 0 : false
            ),
        responsible_phone: yup.string()
            .nullable()
            .transform((value) => value === '' ? null : value)
            .matches(/^[0-9+\-\(\)\s]+$/, 'Telefone contém caracteres inválidos'),
        objective: yup.string()
            .nullable()
            .transform((value) => value === '' ? null : value)
            .matches(/^[a-zA-ZÀ-ÿ0-9\s\-_.,]+$/, 'Objetivo contém caracteres inválidos'),
        resource_profile: yup.string()
            .nullable()
            .transform((value) => value === '' ? null : value)
            .matches(/^[a-zA-ZÀ-ÿ0-9\s\-_.,]+$/, 'Perfil contém caracteres inválidos'),
        start_contract_time: yup.date()
            .nullable()
            .transform((value, originalValue) => originalValue === '' ? null : value)
            .typeError('Data de início inválida'),
        end_contract_time: yup.date()
            .nullable()
            .transform((value, originalValue) => originalValue === '' ? null : value)
            .typeError('Data de término inválida')
            .test('is-after-start', 'Data de término deve ser maior que data de início', function(value) {
            const { start_contract_time } = this.parent;
            if (!value || !start_contract_time) return true;
            return new Date(value) > new Date(start_contract_time);
            })
    }).required();