import fs from 'fs'
import path from 'path'
import { S3 } from 'aws-sdk'

import uploadConfig from '../../../../config/uploadConfig'
import ISubfoldersDTO from '../dtos/ISubfoldersDTO'
import IStorageProvider from '../interfaces/IStorageProvider'

export default class S3StorageProvider implements IStorageProvider {
	private readonly client: S3

	constructor() {
		this.client = new S3({
			region: 'us-west-2'
		})
	}

	public async saveFile(file: string, folder: ISubfoldersDTO): Promise<string> {
		const originalPath = path.resolve(uploadConfig.subFolders[folder], file)

		const correctFolder = path.resolve(uploadConfig.subFolders[folder])

		try {
			await fs.promises.stat(correctFolder)
		} catch (err) {
			await fs.promises.mkdir(correctFolder, { recursive: true })
		}

		await fs.promises.rename(
			path.resolve(uploadConfig.tmpFolder, file),
			path.resolve(originalPath)
		)
		const fileContent = await fs.promises.readFile(originalPath)

		try {
			await this.client.putObject({
				Bucket: `${uploadConfig.config.aws.bucket + '/' + folder}`,
				Key: file,
				ACL: 'public-read',
				Body: fileContent,
			}).promise()
		} catch (err) {
			console.log('Erro no putObject -> ' + err)
		}

		await fs.promises.unlink(originalPath)

		return file
	}

	public async deleteFile(file: string, folder: ISubfoldersDTO): Promise<void> {
		try {
			const bucketPath = uploadConfig.config.aws.bucket + '/' + folder
			await this.client.deleteObject({
				Bucket: bucketPath,
				Key: file
			}).promise()
		} catch (err) {
			console.log('err no delete -> ' + err)
		}

	}
}
