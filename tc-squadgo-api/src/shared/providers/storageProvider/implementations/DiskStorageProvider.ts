import fs from 'fs'
import path from 'path'

import uploadConfig from '../../../../config/uploadConfig'
import ISubfoldersDTO from '../dtos/ISubfoldersDTO'
import IStorageProvider from '../interfaces/IStorageProvider'

export default class DiskStorageProvider implements IStorageProvider {
	public async saveFile(file: string, folder: ISubfoldersDTO): Promise<string> {

		const correctFolder = uploadConfig.subFolders[folder]

		try {
			await fs.promises.stat(correctFolder)
		} catch (err) {
			await fs.promises.mkdir(correctFolder, { recursive: true })
		}

		await fs.promises.rename(
			path.resolve(uploadConfig.tmpFolder, file),
			path.resolve(correctFolder, file)
		)

		return file
	}

	public async deleteFile(file: string, folder: ISubfoldersDTO): Promise<void> {
		const filePath = uploadConfig.tmpFolder

		try {
			await fs.promises.stat(filePath)
		} catch {
			return
		}

		await fs.promises.unlink(`${filePath}/${folder}/${file}`)
	}
}
