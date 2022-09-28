export interface PetFormCreateReq {
  idMicrochip?: string
  idInternal?: string
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

export interface PetFormUpdateReq extends PetFormCreateReq {
  id: number
  isAdopted: boolean
}

export interface PetDataRes extends PetFormUpdateReq {
  deletedAt: string
  createdAt: string
}

export interface PetDataListRes {
  pets: PetDataRes[]
  total: number
}

export interface PetCreateRes {
  id: number
  createdAt: number // Unix miliseconds
}

export interface PetUpdateRes {
  id: number
  createdAt: number
}
