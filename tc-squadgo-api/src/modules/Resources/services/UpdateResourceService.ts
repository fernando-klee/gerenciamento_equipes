import { inject, injectable } from 'tsyringe'
import { instanceToInstance } from 'class-transformer'

import { addYears } from 'date-fns'

import ResourceAlreadyExistsException from '../../../shared/infra/exceptions/ResourceAlreadyExistsException'
import IResourcesRepository from '../repositories/IResourcesRepository'
import ResourceNotFoundException from '../../../shared/infra/exceptions/ResourceNotFoundException'
import IProjectsResourcesRepository from '../../Projects/repositories/IProjectsResourcesRepository'
import IProjectsRepository from '../../Projects/repositories/IProjectsRepository'
import ITypesRepository from '../repositories/ITypesRepository'
import IGetResourceAvailableHours from '../providers/interfaces/IGetResourceAvailableHours'
import ICreateResourceStatus from '../providers/interfaces/ICreateResourceStatus'
import IClassificationsRepository from '../repositories/IClassificationsRepository'
import IResourcesClassificationsRepository from '../repositories/IResourcesClassificationsRepository'
import ClassificationNotFoundException from '../../../shared/infra/exceptions/ClassificationNotFoundException'
import ICreateResourceHistoricService from '../providers/interfaces/ICreateResourceHistoricService'
import Type from '../infra/typeorm/entities/Type'
import ICreateProjectHistoricService from '../../Projects/providers/interfaces/ICreateProjectHistoricService'
import ProjectResourceNotFoundException from '../../../shared/infra/exceptions/ProjectResourceNotFoundException'

interface IRequest {
	resource_id: number
	name: string
	email: string
	status: string
	hours_amount: string
	leader: boolean
	classification_id: number
	types_ids: number[],
	admission_date: Date
	vacation_date: Date | null
	backFromVacation: Date
	output_estimate: Date
	departure_forecast: Date
	leader_id: number
}

@injectable()
export default class UpdateResourceService {
	constructor(
		@inject('ResourcesRepository')
		private resourcesRepository: IResourcesRepository,

		@inject('ProjectsResourcesRepository')
		private projectsResourcesRepository: IProjectsResourcesRepository,

		@inject('ProjectsRepository')
		private projectsRepository: IProjectsRepository,

		@inject('TypesRepository')
		private typesRepository: ITypesRepository,

		@inject('GetResourceAvailableHours')
		private getResourceAvailableHours: IGetResourceAvailableHours,

		@inject('CreateResourceStatus')
		private createResourceStatus: ICreateResourceStatus,

		@inject('ClassificationsRepository')
		private classificationsRepository: IClassificationsRepository,

		@inject('ResourcesClassificationsRepository')
		private resourcesClassificationsRepository: IResourcesClassificationsRepository,

		@inject('CreateResourceHistoricService')
		private createResourceHistoricService: ICreateResourceHistoricService,

		@inject('CreateProjectHistoricService')
		private createProjectHistoricService: ICreateProjectHistoricService,
	) { }

	async execute(data: IRequest): Promise<any> {
		const { resource_id, name, email, leader, status, hours_amount, classification_id, types_ids, admission_date, vacation_date, backFromVacation, output_estimate, departure_forecast, leader_id } = data

		const resourceExistsById = await this.resourcesRepository.findById(resource_id)
		if (!resourceExistsById) throw new ResourceNotFoundException()

		const oldStatus = resourceExistsById.resourceStatus.status.name
		const oldTypesFounded = await resourceExistsById.types

		const resourceExistsByEmail = await this.resourcesRepository.findByEmail(email)
		if (resourceExistsByEmail && resourceExistsByEmail.id !== resource_id) throw new ResourceAlreadyExistsException()

		const typesFounded = await this.typesRepository.listByIds(types_ids)

		let vacationDate = vacation_date

		if (!vacation_date) vacationDate = addYears(admission_date, 1)

		Object.assign(resourceExistsById, {
			name,
			email,
			status: 'DISPONIVEL',
			leader,
			hours_amount,
			types: typesFounded,
			admission_date,
			vacation_date: vacationDate,
			backFromVacation,
			output_estimate,
			departure_forecast,
			leader_id
		})

		const projectsResource = await this.projectsResourcesRepository.listByResourceId(resource_id)

		for (const projectResource of projectsResource) {
			const idProjectResource = projectResource.project_id


			if (oldStatus !== 'INATIVO' && status === 'INATIVO') {
				resourceExistsById.hours_amount = 0
				await this.removeResponsibleResource(resource_id)
				await this.addHistoricProjectResourceInactive(idProjectResource, oldStatus, status, resourceExistsById.name)
			}
		}
		await this.resourcesRepository.save(resourceExistsById)

		if (classification_id !== resourceExistsById.resourceClassification.classification.id) {
			await this.updateResourceClassification(resource_id, classification_id)
		}

		const { resource_hours, available_hours } = await this.getResourceAvailableHours.execute(resource_id)

		const has_projects = available_hours !== resourceExistsById.hours_amount

		await this.createResourceStatus.execute({
			resource_id,
			hours_left: available_hours,
			resource_hours,
			has_projects,
			status
		})

		await this.addHistoricByResourceType(resource_id, oldTypesFounded, typesFounded)
		await this.addHistoricByResourceStatus(resource_id, oldStatus, status)

		const resourceUpdatedWithRelations = await this.resourcesRepository.findById(resource_id)
		if (!resourceUpdatedWithRelations) throw new ResourceNotFoundException()

		console.log(resourceUpdatedWithRelations)

		return instanceToInstance({ ...resourceUpdatedWithRelations, has_projects, hours_left: available_hours, backFromVacation })
	}

	private async removeResponsibleResource(resource_id: number) {
		await this.projectsResourcesRepository.deleteAllByResourceId(resource_id)

		const projectsResponsible = await this.projectsRepository.listByResponsibleId(resource_id)
		const projectsResponsibleUpdated = await Promise.all(projectsResponsible.map(async p => {
			return { ...p, responsible_id: null }
		}))

		await this.projectsRepository.updateAll(projectsResponsibleUpdated)
	}

	private async addHistoricByProps(resource_id: number, ...props: string[]) {
		await Promise.resolve(props.map(async p => {
			if (p === 'admission_date') {
				await this.createResourceHistoricService.execute({
					resource_id,
					description: 'Foi inativado da empresa.',
					type: 'STATUS_INACTIVE'
				})
			}
		}))
	}

	private async addHistoricProjectResourceInactive(project_id: number, oldStatus: string, status: string, name: string) {
		if (oldStatus !== status && status === 'INATIVO') {
			await this.createProjectHistoricService.execute({
				description: `Foi inativado da empresa: ${this.addStrongTag(name)}`,
				project_id,
				type: 'REMOVE_RESOURCE'
			})
		} else {
			console.log('Error!')
		}
	}

	private async addHistoricByResourceStatus(resource_id: number, oldStatus: string, status: string) {
		if (oldStatus !== status) {
			if (status === 'INATIVO') {
				await this.createResourceHistoricService.execute({
					resource_id,
					description: 'Foi inativado da empresa.',
					type: 'STATUS_INACTIVE'
				})
			} else if (oldStatus === 'INATIVO') {
				await this.createResourceHistoricService.execute({
					resource_id,
					description: 'Reingressou no sistema.',
					type: 'STATUS_CHANGED'
				})
			} else if (oldStatus === 'FERIAS') {
				await this.createResourceHistoricService.execute({
					resource_id,
					description: 'Voltou de férias.',
					type: 'STATUS_CHANGED'
				})
			} else if (oldStatus === 'TREINAMENTO') {
				await this.createResourceHistoricService.execute({
					resource_id,
					description: 'Saiu de treinamento.',
					type: 'STATUS_CHANGED'
				})
			} else {
				if (status === 'FERIAS') {
					await this.createResourceHistoricService.execute({
						resource_id,
						description: 'Entrou de férias.',
						type: 'STATUS_CHANGED'
					})
				} else if (status === 'TREINAMENTO') {
					await this.createResourceHistoricService.execute({
						resource_id,
						description: 'Entrou em treinamento.',
						type: 'STATUS_CHANGED'
					})
				}
			}
		}
	}

	private async addHistoricByResourceClassification(resource_id: number, newClassification: string) {
		await this.createResourceHistoricService.execute({
			resource_id,
			description: `Mudou a classificação para "${newClassification}".`,
			type: 'TYPE_CHANGED'
		})
	}

	private async addHistoricByResourceType(resource_id: number, oldTypes: Type[], types: Type[]) {
		if (oldTypes.length > 0 || types.length > 0) {
			let isDifferent = false

			if (oldTypes.length > types.length) {
				isDifferent = oldTypes.some(ot => !types.some(t => t.id === ot.id))
			} else if (oldTypes.length < types.length) {
				isDifferent = types.some(t => !oldTypes.some(ot => ot.id === t.id))
			} else {
				isDifferent = oldTypes.some(ot => !types.some(t => t.id === ot.id))
			}

			if (isDifferent) {
				let typesAppend = ''
				types.map((t, i) => {
					const typeAppended = i + 1 !== types.length ? `${t.name}, ` : t.name
					typesAppend = typesAppend + typeAppended
				})

				if (typesAppend !== '') {
					await this.createResourceHistoricService.execute({
						resource_id,
						description: `Mudou o tipo para "${typesAppend}".`,
						type: 'TYPE_CHANGED'
					})
				} else {
					await this.createResourceHistoricService.execute({
						resource_id,
						description: 'O tipo foi removido pois a classificação do recurso foi alterada.',
						type: 'TYPE_CHANGED'
					})
				}
			}
		}
	}

	private async updateResourceClassification(resource_id: number, classification_id: number): Promise<void> {
		const classificationExists = await this.classificationsRepository.findById(classification_id)
		if (!classificationExists) throw new ClassificationNotFoundException()

		await this.addHistoricByResourceClassification(resource_id, classificationExists.description)
		await this.resourcesClassificationsRepository.findCreateOrUpdate(resource_id, classification_id)
	}

	private addStrongTag(text: any): string {
		return `<strong>${text}</strong>`
	}
}
