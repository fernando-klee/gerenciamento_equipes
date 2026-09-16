import ISubfolderProps from '../dtos/ISubfoldersDTO'

export default interface IStorageProvider {
	saveFile(file: string, folder: ISubfolderProps): Promise<string>
	deleteFile(file: string, folder: ISubfolderProps): Promise<void>
}
