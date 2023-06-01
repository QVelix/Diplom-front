export interface Contact{
  ID:number,
  First_name:string,
  Second_name:string,
  Last_name?:string,
  Work_phone?:string,
  Personal_phone?:string,
  Companies_ID?:number,
  Companies_CompaniesType_ID?:number,
  Responsible:number,
  Users_UserType_ID:number
}
