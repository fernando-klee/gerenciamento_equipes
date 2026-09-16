import { instanceToInstance } from 'class-transformer'
import IGetUserProfileDTO from '../dtos/IGetResourceProfileDTO'
import Resource from '../../../modules/Resources/infra/typeorm/entities/Resource'


export default class ResourceMap {
	static resourceProfile(resource: Resource, permissions: string[]): IGetUserProfileDTO {
		const resourceMapper = instanceToInstance({
			id: resource.id,
			name: resource.name,
			email: resource.email,
			permissions
		})

		return resourceMapper
	}

}
