  export interface StrapiUser {
    jwt: string;
    user: User;
  }
  
  export interface User {
    user_id: number;
    user_name: string;
    user_email: string;
    user_password: string;
  }

  export interface Role {
    id: number;
    name: string;
    description: string;
    type: string;
  }