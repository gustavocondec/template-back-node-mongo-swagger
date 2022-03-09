export interface ResponseError {
  msg: string,
  status: number,
  errors: Array<any>
}

export interface ResponseOk{
  msg: string,
  data: Array<any>
}
