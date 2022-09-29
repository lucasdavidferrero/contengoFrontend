/* eslint-disable @typescript-eslint/no-explicit-any */
import { PetDataListRes, PetDataRes, PetFormCreateReq, PetFormUpdateReq, PetCreateRes } from './../models/PetReqRes'
import { GeneralUpdateRes } from 'src/models/GeneralReqRes'
import { api } from 'src/boot/axios'
import { Pet } from 'src/entities/Pet'

export class PetService {
  async getAll () : Promise<PetDataRes[] | null> {
    const res = await api.get('/v1/pets/list')
    const resData = res.data as PetDataListRes
    if (!resData.pets) return null

    return resData.pets.map((el) => {
      return this.serializePetDataFromResponse(el) as PetDataRes
    })
  }

  async createNew (pet: Pet) {
    const data : PetFormCreateReq = {
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
    return res.data as Promise<PetCreateRes>
  }

  async update (pet: Pet) {
    const data: PetFormUpdateReq = {
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
    return res.data as GeneralUpdateRes
  }

  /**
   * Función para acomodar la fecha del Response(Java/Spring) a Javascript.
   */
  private serializePetDataFromResponse (pet: any): PetDataRes {
    const createdAtDate = new Date(pet.createdAt)
    pet.birthDate = this.serializeDateForQSelectFromArray(pet.birthDate)
    pet.admitionDate = this.serializeDateForQSelectFromArray(pet.admitionDate)
    pet.birthDate = pet.birthDate.join('/')
    pet.admitionDate = pet.admitionDate.join('/')
    pet.createdAt = `${createdAtDate.getFullYear()}/${this.prependZeroIfLessThanTen(createdAtDate.getMonth() + 1)}/${this.prependZeroIfLessThanTen(createdAtDate.getDate())}`
    return pet as PetDataRes
  }

  private serializeDateForQSelectFromArray (dateArray: number[]) {
    // TODO Esto debería ser lógica de componente.
    if (!dateArray.length) return ''
    return dateArray.map(num => this.prependZeroIfLessThanTen(num))
  }

  private prependZeroIfLessThanTen (num: number) {
    return num >= 10 ? num.toString() : '0' + num
  }
}
