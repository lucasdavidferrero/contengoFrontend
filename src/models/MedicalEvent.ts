export namespace MedicalEvent {
  export interface rowDetail {
    description: string
    quantity: number
    unitPrice: number
    finalPrice: number
  }

  export interface createReq {
    idMascota: string
    headerDate: string
    headerTime: string
    vetName: string
    observations: string
    rows: rowDetail[]
  }
}
