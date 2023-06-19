export interface Deal{
  id:number,
  name:string,
  number:number,
  price:number,
  creationDate:Date,
  closeDate?:Date,
  companyId?:number,
  userId:number,
}
