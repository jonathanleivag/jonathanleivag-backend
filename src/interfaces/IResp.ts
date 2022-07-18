type status = 'success' | 'error'

export interface IResp {
  status: status
  message: string
}
