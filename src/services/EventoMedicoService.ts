import { api } from 'src/boot/axios'
import { MedicalEvent } from 'src/models/MedicalEvent'
export class EventoMedicoService {
  async create (createMedicalEventData: MedicalEvent.createReq): Promise<number> {
    const res = await api.post('/v1/medicalEvents/create', createMedicalEventData)
    console.log(res)
    return res.data.id
  }
}
