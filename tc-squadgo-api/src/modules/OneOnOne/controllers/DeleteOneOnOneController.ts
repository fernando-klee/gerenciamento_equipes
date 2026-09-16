import { Request, Response } from 'express'
import { container } from 'tsyringe'
import DeleteOneOnOneService from '../services/DeleteOneOnOneService'

export default class DeleteOneOnOneController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteOneOnOneService = container.resolve(DeleteOneOnOneService)

    await deleteOneOnOneService.execute({ id: Number(id) })

    return response.status(204).send()
  }
} 