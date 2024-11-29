export interface User {
    id: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    company? : company,
    birthDate? : string;
    gender? : string;
    age ?: number;
  }
  

  export interface ApiResponse {
    users : User[];
  }
  

export interface company
{
  name : string;
}
  