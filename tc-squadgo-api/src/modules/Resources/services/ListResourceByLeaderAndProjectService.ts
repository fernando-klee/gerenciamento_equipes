import { inject, injectable } from 'tsyringe'
import IProjectsRepository from '../../Projects/repositories/IProjectsRepository'
import IProjectsResourcesRepository from '../../Projects/repositories/IProjectsResourcesRepository'
import IResourcesRepository from '../repositories/IResourcesRepository'

@injectable()
export default class ListResourceByLeaderAndProject {
    constructor(
        @inject('ResourcesRepository')
        private resourcesRepository: IResourcesRepository,

        @inject('ProjectsResourcesRepository')
        private projectsResourcesRepository: IProjectsResourcesRepository,

        @inject('ProjectsRepository')
        private projectsRepository: IProjectsRepository
    ) { }

    
    async execute(): Promise<any> {
        const resources = await this.resourcesRepository.listActives()
        const projects = await this.projectsResourcesRepository.listAllActives()
        const projectsNames = await this.projectsRepository.list()

        const leaders = resources.filter(resource => resource.leader)

        const formattedLeaders = leaders.map(leader => {
            const leaderResources = resources.filter(resource => resource.leader_id === leader.id)
            const formattedLeaderResource = this.formatLeader(leader)
            const formattedResources = leaderResources.map(resource => {
                const resourceProjects = projects.filter(project => project.resource_id === resource.id)
                const formattedProjects = resourceProjects.map(project => {
                    const projectInfo = projectsNames.find(p => p.id === project.project_id)
                    const customerName = projectInfo ? projectInfo.customer.name : 'Unknown'
                    return {
                        id: project.id,
                        project_id: project.project_id,
                        resource_id: project.resource_id,
                        hours_amount: project.hours_amount,
                        project_name: projectInfo ? projectInfo.name : 'Unknown',
                        customer_name: customerName
                    }
                })
                return {
                    ...this.formatCommonResource(resource),
                    projects: formattedProjects
                }
            })
            return {
                leader: formattedLeaderResource,
                resources: formattedResources
            }
        })

        return formattedLeaders
    }

    formatLeader(resource: any): any {
        return {
            id: resource.id,
            name: resource.name,
            photo_url: resource.photo_url,
            leader: resource.leader,
            status: resource.status
        }
    }

    formatCommonResource(resource: any): any {
        return {
            id: resource.id,
            name: resource.name,
            photo_url: resource.photo_url,
            leader: resource.leader,
            status: resource.status,
            leader_id: resource.leader_id
        }
    }
}
