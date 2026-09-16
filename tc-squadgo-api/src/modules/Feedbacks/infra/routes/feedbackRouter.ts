import { Router } from 'express'
import FeedbacksController from '../controllers/FeedbacksController'

const feedbackRouter = Router()
const feedbacksController = new FeedbacksController()

feedbackRouter.post('/', feedbacksController.create)
feedbackRouter.get('/', feedbacksController.filter)

export default feedbackRouter
