export class Pet {
  id: number
  idMicrochip: string
  idInternal: string
  name: string
  sex: string
  breed: string
  specie: string
  weightKg: number
  admitionKind: string
  admitionCondition: string
  admitionDate: string
  birthDate: string
  notes: string
  isAdopted: boolean
  createdAt?: string
  deletedAt?: string
  constructor (id: number, idMicrochip: string, idInternal: string, name: string, sex: string,
    breed: string, specie: string, weightKg: number, admitionKind: string, admitionCondition: string,
    admitionDate: string, birthDate: string, notes: string, isAdopted: boolean, createdAt ?: string, deletedAt ?: string) {
    this.id = id
    this.idMicrochip = idMicrochip
    this.idInternal = idInternal
    this.name = name
    this.sex = sex
    this.breed = breed
    this.specie = specie
    this.weightKg = weightKg
    this.admitionKind = admitionKind
    this.admitionCondition = admitionCondition
    this.admitionDate = admitionDate
    this.birthDate = birthDate
    this.notes = notes
    this.isAdopted = isAdopted
    this.createdAt = createdAt
    this.deletedAt = deletedAt
  }
}
