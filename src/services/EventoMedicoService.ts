import { api } from 'src/boot/axios'
import { MedicalEvent } from 'src/models/MedicalEvent'
export class EventoMedicoService {
  async create (createMedicalEventData: MedicalEvent.createReq): Promise<number> {
    const res = await api.post('/v1/medicalEvents/create', createMedicalEventData)
    console.log(res)
    return res.data.id
  }

  async getAllHeaders (): Promise<MedicalEvent.tableHeaderDetail[]> {
    const res = await api.get('/v1/medicalEvents/getHeaders')
    return res.data.map((x) => {
      x.rows = null
      return x
    })
  }

  async getDetailByHeaderId (idHeader: number): Promise<MedicalEvent.detail[] | null> {
    const res = await api.get(`/v1/medicalEvents/getDetail/${idHeader}`)
    if (res.data.length) return res.data
    return null
  }
}
