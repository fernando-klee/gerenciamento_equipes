import Setores from '../infra/typeorm/entities/Department'

export default interface IDepartmentRepository {
  save(setor: Setores): Promise<Setores>
  list(): Promise<Setores[]>
  deleteById(id: number): Promise<void>
  findById(id: number): Promise<Setores | null>
}