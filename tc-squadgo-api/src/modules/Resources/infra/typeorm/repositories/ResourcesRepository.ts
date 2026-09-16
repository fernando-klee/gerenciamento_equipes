import { Repository } from 'typeorm'
import IResourcesRepository from '../../../../../modules/Resources/repositories/IResourcesRepository'
import Resource from '../entities/Resource'
import Role from '../../../../../modules/Authorizations/infra/typeorm/entities/Role'
import Permission from '../../../../../modules/Authorizations/infra/typeorm/entities/Permission'
import AppDataSource from '../../../../../shared/infra/typeorm/data-source'

export default class ResourcesRepository implements IResourcesRepository {
	private ormRepository: Repository<Resource>

	constructor() {
		this.ormRepository = AppDataSource.getRepository(Resource)
	}

	async deleteById(resource_id: number): Promise<void> {
		await this.ormRepository.delete(resource_id)
	}

	async save(resource: Resource): Promise<Resource> {
		try {
			console.log('início do save')
			console.log(resource)
			const createdResource = await this.ormRepository.create(resource)

			console.log('após o create')
			console.log(resource)

			const theReturn = await this.ormRepository.save(createdResource)

			console.log('first')
			console.log(theReturn)
			return theReturn
		} catch (error) {
			console.error('Ocorreu um erro ao salvar o recurso:', error)

			if (error instanceof Error && error.stack) {
				const stackLines = error.stack.split('\n')
				const relevantStackLine = stackLines.find(line => line.includes('ManyToManySubjectBuilder'))
				console.error('Detalhes específicos do erro:', relevantStackLine)
			}

			throw error // Lança o erro novamente para que ele possa ser tratado pelo código que chama essa função
		}
	}

	async listWithRoles(): Promise<Resource[]> {
		return await this.ormRepository.find({ relations: ['roles'] })
	}

	async findById(resource_id: number): Promise<Resource | null> {
		const data = this.ormRepository.createQueryBuilder('r')
			.select([
				'r.id',
				'r.name',
				'r.email',
				'r.status',
				'r.photo_url',
				'r.leader',
				'r.created_at',
				'r.updated_at',
				'r.hours_amount',
				'r.admission_date',
				'r.vacation_date',
				'skills',
				'types',
				'resourceStatus.id',
				'status.id',
				'status.name',
				'status.description',
				'substatus.id',
				'substatus.name',
				'substatus.description',
				'substatus.color',
				'resourceClassification.id',
				'classification.id',
				'classification.description',
				'r.registry',
				'r.backFromVacation',
				'r.output_estimate',
				'r.departure_forecast',
				'r.leader_id'
			])
			.leftJoin('r.skills', 'skills')
			.leftJoin('r.types', 'types')
			.leftJoin('r.resourceStatus', 'resourceStatus')
			.leftJoin('resourceStatus.status', 'status')
			.leftJoin('resourceStatus.substatus', 'substatus')
			.leftJoin('r.resourceClassification', 'resourceClassification')
			.leftJoin('resourceClassification.classification', 'classification')
			.where({ id: resource_id })

			

		return await data.getOne()
	}

	async findByRegistry(uniqueID: string): Promise<Resource | null> {
		const data = this.ormRepository.createQueryBuilder('r')
			.select([
				'r.id',
				'r.name',
				'r.email',
				'r.status',
				'r.photo_url',
				'r.leader',
				'r.created_at',
				'r.updated_at',
				'r.hours_amount',
				'r.admission_date',
				'r.vacation_date',
				'skills',
				'types',
				'resourceStatus.id',
				'status.id',
				'status.name',
				'status.description',
				'substatus.id',
				'substatus.name',
				'substatus.description',
				'substatus.color',
				'resourceClassification.id',
				'classification.id',
				'classification.description',
				'r.registry'
			])
			.leftJoin('r.skills', 'skills')
			.leftJoin('r.types', 'types')
			.leftJoin('r.resourceStatus', 'resourceStatus')
			.leftJoin('resourceStatus.status', 'status')
			.leftJoin('resourceStatus.substatus', 'substatus')
			.leftJoin('r.resourceClassification', 'resourceClassification')
			.leftJoin('resourceClassification.classification', 'classification')
			.where({ registry: uniqueID  })

		return await data.getOne()
	}

	async showSimpleProfile(resource_id: number): Promise<Resource | null> {
		const data = this.ormRepository.createQueryBuilder('r')
			.select([
				'r.id',
				'r.name',
				'r.email',
				'r.status',
				'r.photo_url',
				'r.created_at',
				'r.updated_at',
				'r.hours_amount',
				'r.admission_date',
				'r.vacation_date',
				'resourceClassification.id',
				'classification.id',
				'classification.description'
			])
			.leftJoin('r.skills', 'skills')
			.leftJoin('r.types', 'types')
			.leftJoin('r.resourceStatus', 'resourceStatus')
			.leftJoin('resourceStatus.status', 'status')
			.leftJoin('resourceStatus.substatus', 'substatus')
			.leftJoin('r.resourceClassification', 'resourceClassification')
			.leftJoin('resourceClassification.classification', 'classification')
			.where({ id: resource_id })

		return await data.getOne()
	}

	async findByEmail(resource_email: string): Promise<Resource | null> {
		return await this.ormRepository.findOne({
			where: { email: resource_email },
			select: [
					'id',
					'name',
					'email',
					'status',
					'photo_url',
					'leader',
					'created_at',
					'updated_at',
					'hours_amount',
					'admission_date',
			]
	})
	}

	async list(): Promise<Resource[]> {
		const data = this.ormRepository.createQueryBuilder('r')
			.select([
				'r.id',
				'r.name',
				'r.email',
				'r.status',
				'r.photo_url',
				'r.leader',
				'r.created_at',
				'r.updated_at',
				'r.hours_amount',
				'r.admission_date',
				'r.vacation_date',
				'r.backFromVacation',
				'r.output_estimate',
				'r.departure_forecast',
				'r.leader_id',
				'types',
				'resourceStatus.id',
				'status.id',
				'status.name',
				'status.description',
				'substatus.id',
				'substatus.name',
				'substatus.description',
				'substatus.color',
				'resourceClassification.id',
				'classification.id',
				'classification.description'
			])
			.leftJoin('r.types', 'types')
			.leftJoin('r.resourceStatus', 'resourceStatus')
			.leftJoin('resourceStatus.status', 'status')
			.leftJoin('resourceStatus.substatus', 'substatus')
			.leftJoin('r.resourceClassification', 'resourceClassification')
			.leftJoin('resourceClassification.classification', 'classification')
			.orderBy('r.name', 'ASC')

		return await data.getMany()
	}

	async listResponsibles(): Promise<Resource[]> {
		const data = this.ormRepository.createQueryBuilder('r')
			.select([
				'r.id',
				'r.name',
				'r.email',
				'r.status',
				'r.photo_url',
				'r.leader',
				'r.created_at',
				'r.updated_at',
			])
			.orderBy('r.name', 'ASC')
			.where('r.leader = true')

		return await data.getMany()
	}

	async listActives(): Promise<Resource[]> {
		const data = this.ormRepository.createQueryBuilder('resource')
			.addSelect([
				'resource.id',
				'resource.created_at',
				'resource.name',
				'resource.email',
				'resource.photo_url',
				'resource.hours_amount'
			])
			.leftJoin('resource.resourceStatus', 'resourceStatus')
			.leftJoin('resourceStatus.status', 'status')
			.where('status.name NOT LIKE :status', { status: 'INATIVO' })
			.orderBy('resource.name', 'ASC')

		return await data.getMany()
	}

	async listByIds(resources_ids: number[]): Promise<Resource[] | null> {
		return await this.ormRepository.findByIds(resources_ids)
	}

	async findWithClassification(resource_id: number): Promise<Resource | null> {
		const data = this.ormRepository.createQueryBuilder('r')
			.select([
				'r.id',
				'r.name',
				'resourceClassification.id',
				'classification.id',
				'classification.description'
			])
			.leftJoin('r.resourceClassification', 'resourceClassification')
			.leftJoin('resourceClassification.classification', 'classification')
			.where('r.id = :resource_id', { resource_id })
			.getOne()

		return await data
	}

	async listPermissionsByResourceId(resource_id: number): Promise<Permission[]> {
		const ResourceRoles = await AppDataSource
			.createQueryBuilder()
			.relation(Resource, 'roles')
			.of(resource_id)
			.loadMany()

		if (ResourceRoles.length > 0) {
			const userPermissions = await AppDataSource
				.createQueryBuilder()
				.relation(Role, 'permissions')
				.of(ResourceRoles)
				.loadMany()

			return userPermissions
		}

		return []
	}

	async findByOnlyResourceByRegistry(registry: string): Promise<Resource | null> {
		return await this.ormRepository.findOne({ where: { registry } })
	}
}
