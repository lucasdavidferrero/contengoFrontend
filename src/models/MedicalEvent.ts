export namespace MedicalEvent {
  export interface rowDetail {
    description: string
    quantity: number
    unitPrice: number
    finalPrice: number
  }

  export interface createReq {
    idMascota: string
    vetName: string
    observations: string
    rows: rowDetail[]
  }

  // chill
  export interface header {
    idHeader: number
    idMascota: string
    vetName: string
    observations: string
  }

  export interface detail {
    description: string
    quantity: number
    unitPrice: number
  }

  export interface updateReq extends header {
    rows: detail[]
  }

  export interface tableHeaderDetail extends header {
    rows: detail[] | null
  }
}
