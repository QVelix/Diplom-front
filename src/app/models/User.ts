export interface User{
  id:number,
  login:string,
  password:string,
  firstName:string,
  secondName:string,
  lastName?:string,
  birthDate:Date,
  workPhone?:string,
  personalPhone?:string,
  userTypesId:number,
}
