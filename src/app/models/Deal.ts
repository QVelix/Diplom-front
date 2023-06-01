export interface Deal{
  ID:number,
  NAME:string,
  Number:number,
  Price:number,
  Creation_date:Date,
  Close_date?:Date,
  Companies_ID?:number,
  Companies_CompaniesType_ID?:number,
  Responsible:number,
  Users_UserType_ID:number
}
