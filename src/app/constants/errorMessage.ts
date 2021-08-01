import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

export class ErrorMessage {
    public FORMAT_ERROR = {
        REQUIRED: (name: string) => `Please enter ${name}`,
        MIN_LENGTH: (name: string, length: number) => `Enter ${name} with at least ${length} characters.`,
        MAX_LENGTH: (name: string, length: number) => `Enter ${name} no more than ${length} characters.`,
        DATA_FORMAT: (name: string, format: string) => `Enter ${name} in the format ${format}.`,
        INVALID_PASSWORD: (name: string) => `Password and ${name} must be matched.`
    };

    public APPLICATION_ERROR = {
        AUTH: 'Invalid email and password!',
    };
}
