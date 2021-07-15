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

  export interface Passport {
    passport_type: string;
    country_code: string;
    passport_no: string;
    name: string;
    nationality: string;
    dob: Date;
    sex: string;
    issue_date: Date;
    expiry_date: Date;
    pob: string;
    authority: string;
  }