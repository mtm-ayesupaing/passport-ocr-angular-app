import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ApiMessage {
  public APPLICATION_RESULT = {
    CREATE_USER: 'Saved Successfully.',
    UPDATE_USER: 'Updated Successfully.',
    DELETE_USER: 'Deleted Successfully.',
  };

  public APPLICATION_CONFIRM = {
    DELETE: 'Are you sure you want to delete it?',
  };

  public ERROR = {
    COMMON_ERROR: 'An error has occured',
  };
}
