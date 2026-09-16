import AppException from './AppException'

export default class SoftSkillAlreadyExistsException extends AppException {
	constructor() {
		super(400, 'Soft Skill já existe')
	}
}
