export interface User {
    id: string;
    name: string;
    email: string;
    linkedin: string;
    gender: Gender;
    address: {
      line1: string;
      line2: string;
      state: string;
      city: string;
      pin: string;
    };
  }
  
  export enum Gender {
    Male = 'Male',
    Female = 'Female',
    Other = 'Other',
  }
  