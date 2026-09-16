import * as express from 'express'
import path from 'path'
import crypto from 'crypto'
import multer, { StorageEngine, MulterError } from 'multer'

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')

interface IUploadConfig {
	driver: 'disk' | 's3'

	tmpFolder: string
	subFolders: {
		customers_images: string
		resources_photos: string
	}

	multer: {
		storage: StorageEngine
	}

	config: {
		aws: {
			bucket: string
		}
	}
}

export default {
	driver: process.env.STORAGE_DRIVER,
	tmpFolder,
	subFolders: {
		customers_images: path.resolve(tmpFolder, 'customers_images'),
		resources_photos: path.resolve(tmpFolder, 'resources_photos')
	},
	multer: {
		storage: multer.diskStorage({
			destination: tmpFolder,
			filename: (request, file, callback) => {
				const fileHash = crypto.randomBytes(10).toString('hex')
				const fileName = `${fileHash}_${file.originalname}`

				return callback(null, fileName)
			}
		}),
		limits: {
			fileSize: (1024 * 1024) * 5,
			files: 1
		},
		fileFilter: (req: express.Request, file: any, cb: any) => {
			const allowedMimes = [
				'image/jpeg',
				'image/pjpeg',
				'image/png',
				'image/gif'
			]

			if (allowedMimes.includes(file.mimetype)) {
				cb(null, true)
			} else {
				cb(new MulterError('LIMIT_FILE_SIZE', 'foto'))
			}
		}
	},

	config: {
		aws: {
			bucket: process.env.S3_BUCKET
		}
	}


} as IUploadConfig
