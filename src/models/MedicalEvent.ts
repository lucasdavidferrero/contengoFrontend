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

  export interface headerCommon {
    idMascota: string
    vetName: string
    observations: string
  }

  export interface header extends headerCommon {
    id: number
  }

  export interface detail {
    description: string
    quantity: number
    unitPrice: number
  }

  export interface updateReq extends headerCommon {
    idHeader: number
    rows: detail[]
  }
}
