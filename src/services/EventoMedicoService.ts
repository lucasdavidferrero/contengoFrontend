// import { api } from 'src/boot/axios'
import { MedicalEvent } from 'src/models/MedicalEvent'
export class EventoMedicoService {
  create (createMedicalEventData: MedicalEvent.createReq) {
    console.log('Hacer request a backend Java.')
    console.log(createMedicalEventData)
  }
}
