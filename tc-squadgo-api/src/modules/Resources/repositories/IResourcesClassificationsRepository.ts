import ResourcesClassifications from '../infra/typeorm/entities/ResourcesClassifications'

export default interface IResourcesClassificationsRepository {
	findCreateOrUpdate(resource_id: number, classification_id: number): Promise<ResourcesClassifications>
}
