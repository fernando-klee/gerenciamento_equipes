import { Repository } from 'typeorm'

import IFilterProjectsByMonthProps from '../../../dtos/IFilterProjectsByMonthsDTO'
import IProjectsRepository from '../../../repositories/IProjectsRepository'
import Project from '../entities/Project'
import AppDataSource from '../../../../../shared/infra/typeorm/data-source'

export default class ProjectsRepository implements IProjectsRepository {
	private ormRepository: Repository<Project>

	constructor() {
		this.ormRepository = AppDataSource.getRepository(Project)
	}

	async save(project: Project): Promise<Project> {
		const projectCreated = this.ormRepository.create(project)

		return await this.ormRepository.save(projectCreated)
	}

	async getTotalFutureHoursToStart(): Promise<Project> {
		const data = this.ormRepository.createQueryBuilder('p')
			.distinctOn(['p.id'])
			.select([
				'SUM(p.hours) as hours'
			])
			.where('p.start_estimate > now()')
			.getRawOne()

		return await data
	}

	async updateAll(projects: Project[]): Promise<Project[]> {
		return await this.ormRepository.save(projects)
	}

	async list(): Promise<Project[]> {
		const data = this.ormRepository.createQueryBuilder('p')
			.select([
				'p.id',
				'p.name',
				'p.hours',
				'p.type',
				'p.status',
				'p.start_estimate',
				'p.end_estimate',
				'p.created_at',
				// 'p.customer_poc',
				'customer.id',
				'customer.name',
				'customer.image_url',
				'responsible.id',
				'responsible.name',
				'responsible.photo_url',
				'responsible.hours_amount',
			])
			.leftJoinAndSelect('p.customer', 'customer')
			.leftJoinAndSelect('p.responsible', 'responsible')
			.loadRelationCountAndMap('p.resources_length', 'p.resources')
			.orderBy('p.name', 'ASC')

		return await data.getMany()
	}

	async listActives(): Promise<Project[]> {
		const data = this.ormRepository.createQueryBuilder('p')
			.select([
				'p.id',
				'p.name',
				'p.hours',
				'p.type',
				'p.status',
				'p.start_estimate',
				'p.end_estimate',
				'p.created_at',
				// 'p.customer_poc',
				'customer.id',
				'customer.name',
				'customer.image_url',
				'responsible.id',
				'responsible.name',
				'responsible.photo_url',
				'responsible.hours_amount',
			])
			.leftJoinAndSelect('p.customer', 'customer')
			.leftJoinAndSelect('p.responsible', 'responsible')
			.loadRelationCountAndMap('p.resources_length', 'p.resources')
			.where('p.status = :status', { status: 'EM_ANDAMENTO' })
			.orderBy('p.name', 'ASC')

		return await data.getMany()
	}

	async listByMonths(data: IFilterProjectsByMonthProps): Promise<Project[]> {
		const { start, end, showFinished } = data

		const projectsData = this.ormRepository.createQueryBuilder('p')
			.select([
				'p.id',
				'p.name',
				'p.status',
				'p.start_estimate',
				'p.end_estimate',
				'p.created_at',
			])
			.orderBy('p.start_estimate', 'ASC')
			.where('p.start_estimate BETWEEN :start and :end', { start, end })

			if (showFinished) {
				projectsData.andWhere('p.status IN ("EM_ANDAMENTO", "CONCLUIDO")')
			} else {
				projectsData.andWhere('p.status LIKE :status', { status: 'A_INICIAR' })
			}

		return await projectsData.getMany()
	}

	async listWithType(): Promise<Project[]> {
		const data = this.ormRepository.createQueryBuilder('p')
			.select([
				'p.id',
				'p.name',
				'p.type'
			])
			.where('p.status NOT LIKE :status', { status: 'CONCLUIDO' })
			.getMany()

		return await data
	}

	async listByCustomerId(customer_id: number): Promise<Project[]> {
		const data = this.ormRepository.createQueryBuilder('p')
			.select([
				'p.id',
				'p.created_at',
				'p.updated_at',
				'p.name',
				'p.hours',
				'p.type',
				'p.status',
				'p.start_estimate',
				'p.end_estimate',
				'p.responsible_id',
				'p.customer_id',
				// 'p.customer_poc'
			])
			.where({ customer_id })
			.andWhere('p.status NOT LIKE :status', { status: 'CONCLUIDO' })

		return await data.getMany()
	}

	async listByResponsibleId(responsible_id: number): Promise<Project[]> {
		const data = this.ormRepository.createQueryBuilder('p')
			.select([
				'p.id',
				'p.created_at',
				'p.updated_at',
				'p.name',
				'p.hours',
				'p.type',
				'p.status',
				'p.start_estimate',
				'p.end_estimate',
				'p.responsible_id',
				'p.customer_id',
				// 'p.customer_poc'
			])
			.where({ responsible_id })

		return await data.getMany()
	}

	async listByResourceId(resource_id: number): Promise<Project[]> {
		const data = this.ormRepository.createQueryBuilder('p')
			.select([
				'p.id',
				'p.name',
				'p.hours',
				'p.type',
				'p.status',
				'p.start_estimate',
				'p.end_estimate',
				'p.created_at',
				// 'p.customer_poc',
				'customer.id',
				'customer.name',
				'customer.image_url',
				'responsible.id',
				'responsible.name',
				'responsible.photo_url',
				'responsible.hours_amount',
				'resources.id',
				'resources.name',
				'resources.photo_url',
				'resources.hours_amount'
			])
			.leftJoin('p.customer', 'customer')
			.leftJoin('p.responsible', 'responsible')
			.leftJoin('p.resources', 'resources')
			.where({ resource_id })

		return await data.getMany()
	}

	async findById(project_id: number): Promise<Project | null> {
		const data = this.ormRepository.createQueryBuilder('p')
			.select([
				'p.id',
				'p.name',
				'p.hours',
				'p.type',
				'p.status',
				'p.start_estimate',
				'p.end_estimate',
				'p.created_at',
				// 'p.customer_poc',
				'customer.id',
				'customer.name',
				'customer.image_url',
				'responsible.id',
				'responsible.name',
				'responsible.photo_url',
				'responsible.hours_amount',
				'resources.id',
				'resources.name',
				'resources.photo_url',
				'resources.hours_amount',
				'resourceStatus.id',
				'status.id',
				'status.name',
			])
			.leftJoin('p.customer', 'customer')
			.leftJoin('p.responsible', 'responsible')
			.leftJoin('p.resources', 'resources')
			.loadRelationCountAndMap('p.resources_length', 'p.resources')
			.leftJoin('resources.resourceStatus', 'resourceStatus')
			.leftJoin('resourceStatus.status', 'status')
			.where({ id: project_id })

		return await data.getOne()
	}

}
