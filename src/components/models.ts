export interface PetCreate {
  idMicrochip: string
  idInternal: string
  name: string
  sex: string
  breed: string
  specie: string
  weightKg: number
  admitionKind: string
  admitionCondition: string
  notes: string
  birthDate: string
  admitionDate: string
}

export interface PetUpdate extends PetCreate{
  id: number
  isAdopted: boolean
}

export interface PetData extends PetUpdate {
  createdAt: string
  deletedAt: string
}
