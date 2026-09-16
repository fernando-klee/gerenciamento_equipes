import AppException from './AppException'

export default class SkillNotFoundException extends AppException {
	constructor() {
		super(400, 'Skill não encontrada')
	}
}
