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
    // ROLLBACK: 'ロールバックしますがよろしいでしょうか?',
    DELETE: '削除しますがよろしいでしょうか?',
    // DELETE_COKLUSTER_FIELDS: '行目を削除しますがよろしいでしょうか?'
  };

  public ERROR = {
    COMMON_ERROR: 'エラーが発生しました。',
  };
}
