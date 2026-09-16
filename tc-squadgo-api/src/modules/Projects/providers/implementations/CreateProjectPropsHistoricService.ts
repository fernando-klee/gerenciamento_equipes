import { inject, injectable } from 'tsyringe'
import { format } from 'date-fns'

import { HistoricTypeProps } from '../../infra/typeorm/entities/ProjectHistoric'
import IProjectsToHistoricCreationDTO from '../dtos/IProjectsToHistoricCreationDTO'
import ICreateProjectPropsHistoricService from '../interfaces/ICreateProjectPropsHistoricService'
import IProjectsResourcesRepository from '../../repositories/IProjectsResourcesRepository'
import ICreateProjectHistoricService from '../interfaces/ICreateProjectHistoricService'

type ResponsibleProps = {
	id: number
	name: string
} | null | undefined

interface ResponsibleStatusProps {
	project_id: number
	username: string
	oldResponsible: ResponsibleProps
	newResponsible: ResponsibleProps
}

@injectable()
export default class CreateProjectPropsHistoricService implements ICreateProjectPropsHistoricService {
	constructor(
		@inject('ProjectsResourcesRepository')
		private projectsResourcesRepository: IProjectsResourcesRepository,

		@inject('CreateProjectHistoricService')
		private createProjectHistoricService: ICreateProjectHistoricService,
	) { }

	async execute(data: IProjectsToHistoricCreationDTO): Promise<void> {
		const { username, oldProject, newProject } = data
		const project_id = newProject.id

		if (oldProject) {

			if (oldProject.name != newProject.name) {
				const description = `${this.addStrongTag(username)} alterou o nome do projeto para ${this.addStrongTag(newProject.name)}.`
				await this.createProjectHistoricService.execute({ description, project_id, type: 'NAME' })
			}

			if (oldProject.hours != newProject.hours) {
				const description = `${this.addStrongTag(username)} alterou as horas para ${this.addStrongTag(newProject.hours + 'h')}.`
				await this.createProjectHistoricService.execute({ description, project_id, type: 'HOURS' })
			}

			if (oldProject.type != newProject.type) {
				const description = `${this.addStrongTag(username)} alterou o tipo para ${this.addStrongTag(newProject.type)}.`
				await this.createProjectHistoricService.execute({ description, project_id, type: 'TYPE' })
			}

			if (oldProject.status != newProject.status) {
				let type = 'STATUS' as HistoricTypeProps
				if (newProject.status === 'CONCLUIDO') {
					type = 'CLOSING_PROJECT'
				}
				const description = `${this.addStrongTag(username)} alterou o status para ${this.addStrongTag(this.statusDescription(newProject.status))}.`
				await this.createProjectHistoricService.execute({ description, project_id, type })
			}

			const oldEstimate = format(oldProject.start_estimate, 'dd/MM/yyyy')
			const newEstimate = format(newProject.start_estimate, 'dd/MM/yyyy')

			if (oldEstimate !== newEstimate) {
				const description = `${this.addStrongTag(username)} alterou a estimativa para ${this.addStrongTag(newEstimate)}.`
				await this.createProjectHistoricService.execute({ description, project_id, type: 'START_ESTIMATE' })
			}

			await this.responsibleStatus({
				project_id,
				username,
				oldResponsible: oldProject.responsible,
				newResponsible: newProject.responsible
			})

			if (oldProject.customer.id != newProject.customer.id) {
				const description = `${this.addStrongTag(username)} alterou o cliente para ${this.addStrongTag(newProject.customer.name)}.`
				await this.createProjectHistoricService.execute({ description, project_id, type: 'CUSTOMER_ID' })
			}

		} else {
			const description = `${this.addStrongTag(username)} criou o projeto em ${this.addStrongTag(format(new Date, 'dd/MM/yyyy'))}.`
			await this.createProjectHistoricService.execute({ description, project_id, type: 'NEW_PROJECT' })
		}

	}

	private async responsibleStatus(data: ResponsibleStatusProps) {
		const { project_id, username, oldResponsible, newResponsible } = data
		if (oldResponsible) {
			if (newResponsible && newResponsible.id !== oldResponsible.id) {
				const description = `${this.addStrongTag(username)} alterou o responsável para ${this.addStrongTag(newResponsible.name)}.`
				await this.createProjectHistoricService.execute({ description, project_id, type: 'RESPONSIBLE_ID' })
			} else if (oldResponsible && !newResponsible) {
				const description = `${this.addStrongTag(username)} removeu o responsável.`
				await this.createProjectHistoricService.execute({ description, project_id, type: 'RESPONSIBLE_ID' })
			}
		} else if (!oldResponsible && newResponsible) {
			const description = `${this.addStrongTag(username)} adicionou o responsável ${newResponsible.name}.`
			await this.createProjectHistoricService.execute({ description, project_id, type: 'RESPONSIBLE_ID' })
		}
	}

	private statusDescription(status: string): string {
		if (status === 'A_INICIAR') return 'A Iniciar'
		else if (status === 'EM_ANDAMENTO') return 'Em Andamento'
		else return 'Concluído'
	}

	private addStrongTag(text: any): string {
		return `<strong>${text}</strong>`
	}

}
