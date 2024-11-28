export interface User {
    id: number;
    name: string;
    email: string;
    company : company
  }
  

  export interface ApiResponse {
    users : User[];
  }
  

export interface company
{
  name : string;
}
  