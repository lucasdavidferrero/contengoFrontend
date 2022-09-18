import { PetData } from './../components/models'
import { api } from 'src/boot/axios'

export class PetService {
  async getAll () : Promise<PetData[]> {
    const res = await api.get('/v1/pets/list')

    return res.data.pets as PetData[]
  }
}
