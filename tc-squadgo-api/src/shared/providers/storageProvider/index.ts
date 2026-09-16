import uploadConfig from '../../../config/uploadConfig'
import { container } from 'tsyringe'
import DiskStorageProvider from './implementations/DiskStorageProvider'
import IStorageProvider from './interfaces/IStorageProvider'
import S3StorageProvider from './implementations/S3StorageProvider'

const storage = {
	disk: container.resolve(DiskStorageProvider),
	s3: container.resolve(S3StorageProvider)
}

container.registerInstance<IStorageProvider>('StorageProvider', storage[uploadConfig.driver])
