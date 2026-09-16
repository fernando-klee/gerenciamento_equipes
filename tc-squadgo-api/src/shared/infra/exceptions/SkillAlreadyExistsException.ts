import AppException from './AppException'

export default class SkillAlreadyExistsException extends AppException {
	constructor() {
		super(400, 'Skill já existe')
	}
}
