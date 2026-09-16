import AppException from './AppException'

export default class SoftSkillNotFoundException extends AppException {
	constructor() {
		super(400, 'Soft Skill não encontrada')
	}
}
