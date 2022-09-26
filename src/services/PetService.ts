import { PetData, PetCreate, PetUpdate, PetCreateResponse } from './../components/models'
import { api } from 'src/boot/axios'
import { Pet } from 'src/entities/Pet'

export class PetService {
  async getAll () : Promise<PetData[]> {
    // TODO -> Ver como mapear las fechas de la DB con las de JS.
    const res = await api.get('/v1/pets/list')
    return res.data.pets.map((el) => {
      const createdAtDate = new Date(el.createdAt)
      el.birthDate = el.birthDate.join('/')
      el.admitionDate = el.admitionDate.join('/')
      el.createdAt = `${createdAtDate.getFullYear()}/${createdAtDate.getMonth() + 1}/${createdAtDate.getDate()}`
      return el
    }) as PetData[]
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

  async deleteById (id: number) {
    const res = await api.get(`/v1/pets/delete/${id}`)
    return res.data
  }
}
