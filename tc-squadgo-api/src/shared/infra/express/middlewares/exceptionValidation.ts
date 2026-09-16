import { NextFunction, Request, Response } from 'express'
import multer from 'multer'
import AppException from '../../exceptions/AppException'

export default async function exceptionValidation(err: Error, req: Request, res: Response, next: NextFunction) {
	if (err instanceof AppException) {
		return res.status(err.statusCode).json({
			message: err.message
		})
	}

	if (err instanceof multer.MulterError) {
		if (err.code === 'LIMIT_FILE_SIZE') {
			return res.status(400).json({
				message: 'Tamanho do arquivo deve ser até 5mb'
			})
		}
	}

	return res.status(500).json({
		status: 'error',
		message: `Internal server error: ${err.message}`
	})
}
