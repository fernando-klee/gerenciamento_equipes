import { inject, injectable } from 'tsyringe'
import IProjectsRepository from '../../Projects/repositories/IProjectsRepository'
import IProjectsResourcesRepository from '../../Projects/repositories/IProjectsResourcesRepository'
import IResourcesRepository from '../repositories/IResourcesRepository'
import { instanceToInstance } from 'class-transformer'
import ICustomersRepository from '../../Customers/repositories/ICustomersRepository'

@injectable()
export default class ListFormattedForPortalLeadersProjectsResourcesService {
    constructor(
        @inject('ResourcesRepository')
        private resourcesRepository: IResourcesRepository,

        @inject('ProjectsResourcesRepository')
        private projectsResourcesRepository: IProjectsResourcesRepository,

        @inject('ProjectsRepository')
        private projectsRepository: IProjectsRepository,

        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository
    ) { }

    async execute(leader_id: number): Promise<any> {
        const leaderId = leader_id

        const resources = await this.resourcesRepository.listActives()
        const projects = await this.projectsRepository.listByResponsibleId(leaderId)

        const leader = instanceToInstance(resources).find(resource => resource.id === leaderId)

        if (!leader) {
            return []
        }

        const leaderProjects = projects.filter(project => project.status === 'EM_ANDAMENTO')

        const formattedLeaderResource = this.formatLeader(leader)

        const formattedProjects = await Promise.all(leaderProjects.map(async project => {
            const customer = await this.customersRepository.findById(project.customer_id)
            const customerName = customer ? customer.name : 'Unknown'
            const imageUrl = customer?.getImageUrl()

            const projectResources = await this.projectsResourcesRepository.listResourcesByProject(project.id)

            const formattedProjectResources = instanceToInstance(projectResources).map(projectResource => {
                const resource = projectResource.resource
                return {
                    id: resource.id,
                    name: resource.name,
                    photo_url: resource.photo_url,
                    leader: resource.id === leaderId,
                    status: resource.status,
                    leader_id: resource.id === leaderId ? leaderId : null
                }
            })

            return {
                id: project.id,
                name: project.name,
                customer_name: customerName,
                // image_url: imageUrl ? 'https://equipes.s3.us-west-2.amazonaws.com/customers_images/' + imageUrl : null,
                image_url: imageUrl,
                project_resources: formattedProjectResources
            }
        }))

        return [{
            leader: formattedLeaderResource,
            projects: formattedProjects
        }]
    }

    formatLeader(leader: any): any {
        return {
            id: leader.id,
            name: leader.name,
            photo_url: leader.photo_url,
            leader: leader.leader,
            status: leader.status
        }
    }
}