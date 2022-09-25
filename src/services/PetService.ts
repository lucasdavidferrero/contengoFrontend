import { PetData, PetCreate, PetUpdate, PetCreateResponse } from './../components/models'
import { api } from 'src/boot/axios'
import { Pet } from 'src/entities/Pet'

export class PetService {
  async getAll () : Promise<PetData[]> {
    const res = await api.get('/v1/pets/list')

    return res.data.pets as PetData[]
  }

  async createNew (pet: Pet) {
    const data : PetCreate = {
      idMicrochip: pet.idMicrochip,
      idInternal: pet.idInternal,
      name: pet.name,
      sex: pet.sex,
      breed: pet.breed,
      specie: pet.specie,
      weightKg: pet.weightKg,
      admitionKind: pet.admitionKind,
      admitionCondition: pet.admitionCondition,
      notes: pet.notes,
      birthDate: pet.birthDate,
      admitionDate: pet.admitionDate
    }

    const res = await api.post('/v1/pets/create', data)
    return res.data as Promise<PetCreateResponse>
  }

  async update (pet: Pet) {
    const data: PetUpdate = {
      id: pet.id,
      isAdopted: pet.isAdopted,
      idMicrochip: pet.idMicrochip,
      idInternal: pet.idInternal,
      name: pet.name,
      sex: pet.sex,
      breed: pet.breed,
      specie: pet.specie,
      weightKg: pet.weightKg,
      admitionKind: pet.admitionKind,
      admitionCondition: pet.admitionCondition,
      notes: pet.notes,
      birthDate: pet.birthDate,
      admitionDate: pet.admitionDate
    }
    const res = await api.post('/v1/pets/update', data)
    return res.data
  }
}
