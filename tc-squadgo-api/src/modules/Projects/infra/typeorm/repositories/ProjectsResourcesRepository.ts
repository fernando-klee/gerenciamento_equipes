import { Repository } from 'typeorm'
import ICreateProjectsResourcesRepository from 'modules/Projects/dtos/ICreateProjectsResourcesRepository'
import IProjectsResourcesRepository from '../../../repositories/IProjectsResourcesRepository'
import ProjectResource from '../entities/ProjectResource'
import AppDataSource from '../../../../../shared/infra/typeorm/data-source'

export default class ProjectsResourcesRepository implements IProjectsResourcesRepository {
	private ormRepository: Repository<ProjectResource>

	constructor() {
		this.ormRepository = AppDataSource.getRepository(ProjectResource)
	}

	async save(data: ICreateProjectsResourcesRepository): Promise<ProjectResource> {
		const projectResourse = this.ormRepository.create(data)
		return await this.ormRepository.save(projectResourse)
	}

	async saveAll(data: ICreateProjectsResourcesRepository[]): Promise<void> {
		await this.ormRepository.save(data)
	}

	async listFutureProjectsByDate(date: string): Promise<ProjectResource[]> {
		const data = this.ormRepository
			.createQueryBuilder('pr')
			.select([
				'pr.id',
				'pr.hours_amount',
				'project.name',
				'project.end_estimate',
				'project.status',
				'resource.id',
				'resource.name',
				'resource.photo_url',
			])
			.leftJoin('pr.project', 'project')
			.leftJoin('pr.resource', 'resource')
			.orderBy('project.end_estimate', 'ASC')
			.where('project.status NOT LIKE :status', { status: 'CONCLUIDO' })
			.andWhere('DATE_FORMAT(project.end_estimate,\'%Y-%m\') = :end_estimate', {
				end_estimate: date,
			})

		return await data.getMany()
	}

	async listByResourceId(resource_id: number): Promise<ProjectResource[]> {
		return await this.ormRepository.find({ where: { resource_id } })
	}

	async listResourcesWithHoursLeft(): Promise<ProjectResource[]> {
		const data = this.ormRepository
			.createQueryBuilder('r')
			.select([
				'SUM(CASE WHEN p.status <> :statusToExclude THEN r.hours_amount ELSE 0 END) as hours_amount',
				'resource.id as id',
			])
			.leftJoin('r.resource', 'resource')
			.leftJoin('r.project', 'p')
			.where('resource.id IS NOT NULL')
			.groupBy('resource.id')
			.setParameter('statusToExclude', 'A_INICIAR')
			.orderBy('resource.name', 'ASC')
			.getRawMany()

		return await data
	}

	async getResourceHoursLeft(resource_id: number): Promise<ProjectResource> {
		const data = await this.ormRepository
			.createQueryBuilder('r')
			.select([
				'SUM(CASE WHEN p.status <> :statusToExclude THEN r.hours_amount ELSE 0 END) as hours_amount',
			])
			.leftJoin('r.resource', 'resource')
			.leftJoin('r.project', 'p')
			.groupBy('resource.id')
			.where({ resource_id })
			.setParameters({ statusToExclude: 'A_INICIAR' })
			.getRawOne()

		return await data
	}

	async listByResourceIdWithRelations(
		resource_id: number
	): Promise<ProjectResource[]> {
		const data = this.ormRepository
			.createQueryBuilder('pr')
			.select([
				'pr.id',
				'pr.hours_amount',
				'pr.created_at',
				'project.id',
				'project.name',
				'project.status',
				'project.start_estimate',
				'project.conclusion_date',
				'project.end_estimate',
				'customer.id',
				'customer.name',
				'customer.image_url',
				'responsible.id',
				'responsible.name',
				'responsible.photo_url',
			])
			.leftJoin('pr.project', 'project')
			.leftJoin('project.customer', 'customer')
			.leftJoin('project.responsible', 'responsible')
			.where({ resource_id })
			.getMany()

		return await data
	}

	async listByProject(project_id: number): Promise<ProjectResource[]> {
		const data = this.ormRepository
			.createQueryBuilder('pr')
			.select([
				'pr.id',
				'pr.hours_amount',
				'pr.created_at',
				'resource.id',
				'resource.name',
				'resource.email',
				'resource.photo_url',
				'resourceStatus.id',
				'status.id',
				'status.name',
				'status.description',
				'project.id',
				'project.name',
			])
			.leftJoin('pr.project', 'project')
			.leftJoin('pr.resource', 'resource')
			.leftJoin('resource.resourceStatus', 'resourceStatus')
			.leftJoin('resourceStatus.status', 'status')
			.where('pr.project_id = :project_id', { project_id })
			.getMany()

		return await data
	}

	async listResourcesByProject(project_id: number): Promise<ProjectResource[]> {
		const data = this.ormRepository
			.createQueryBuilder('pr')
			.select([
				'pr.id',
				'pr.hours_amount',
				'pr.created_at',
				'resource.id',
				'resource.name',
				'resource.email',
				'resource.photo_url',
			])
			.leftJoin('pr.resource', 'resource')
			.where('pr.project_id = :project_id', { project_id })
			.getMany()

		return await data
	}

	async listAllActives(): Promise<ProjectResource[]> {
		const data = this.ormRepository
			.createQueryBuilder('pr')
			.select(['pr.id', 'pr.project_id', 'pr.resource_id', 'pr.hours_amount'])
			.leftJoin('pr.project', 'project')
			.where('project.status NOT LIKE :status', { status: 'CONCLUIDO' })
			.getMany()

		return await data
	}

	async list(): Promise<ProjectResource[]> {
		const data = this.ormRepository
			.createQueryBuilder('pr')
			.select([
				'pr.id',
				'pr.project_id',
				'pr.resource_id',
				'pr.hours_amount',
				'pr.created_at',
			])
			.leftJoin('pr.project', 'project')
			.getMany()

		return await data
	}

	async deleteAllByProjectId(project_id: number): Promise<void> {
		await this.ormRepository.delete({ project_id })
	}

	async deleteAllByResourceId(resource_id: number): Promise<void> {
		await this.ormRepository.delete({ resource_id })
	}

	async findByResourceIdAndProjectId(
		resource_id: number,
		project_id: number
	): Promise<ProjectResource | null> {
		return await this.ormRepository.findOne({
			where: { resource_id, project_id },
			relations: ['project'],
		})
	}

	async delete(projectResource: ProjectResource): Promise<void> {
		await this.ormRepository.delete(projectResource)
	}
}
