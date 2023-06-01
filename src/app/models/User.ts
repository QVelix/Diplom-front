export interface User{
  ID:number,
  Login:string,
  Password:string,
  First_name:string,
  Second_name:string,
  Last_name?:string,
  Birth_date:Date,
  Work_phone?:string,
  Personal_phone?:string,
  UserType_ID:number,
}
