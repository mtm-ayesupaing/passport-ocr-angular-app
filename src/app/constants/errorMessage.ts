import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

export class ErrorMessage {
    public FORMAT_ERROR = {
        REQUIRED: (name: string) => `${name}を入力してください。`,
        REQUIRED_SELECT: (name: string) => `${name}を選択してください。`,
        MIN_LENGTH: (name: string, length: number) => `${name}は${length}文字以上で入力してください。`,
        MAX_LENGTH: (name: string, length: number) => `${name}は${length}文字以下で入力してください。`,
        DATA_FORMAT: (name: string, format: string) => `${name}は「${format}」の形式で入力してください。`,
        CONFLICTED: (name: string) => `${name}が重複しています。`,
    };

    public APPLICATION_ERROR = {
        AUTH: 'メールアドレスもしくはパスワードが登録されたものと違います。',
        EXPIRED_TOKEN: 'tokenの有効期限が切れています。',
        SESSION_TIMEOUT: '長時間操作がなかったためログアウトしました。',
        OFFLINE: 'オフラインになりました。通信状況を確認し、再度お試しください。',
        TIMEOUT: '集計結果のエスクポートでタイムアウトしました。',
        SERVER: 'エラーが発生しました。',
    };

    public CUSTOM_ERROR = {
        TASK_NOT_COMPLETE: '前のタスクが完了してないため、タスクが割当られません。',
        CASE_GROUP_DUPLICATE: '同一の代表文があるため、作成できません。',
        LOCKED_UNIT_TASK: 'ユニットタスクはすでにロックされています。',
        SYMBOLIC_SENTENCE_DUPLICATE: '同一の代表文があるため、作成できません。',
        AVAILABILITY: {
            INCOMPLETE_GROUPING_TASKS_REMAINS: '完了していないグルーピングフローが残っているため作成できません。',
            INCOMPLETE_MERGING_TASKS_REMAINS: '完了していない結合・分割フローが残っているため作成できません。',
            INCOMPLETE_INDIVIDUAL_TASKS_REMAINS: '完了してないグルーピング（独立）フローが残っているため作成できません。',
            INCOMPLETE_AGGREGATIONAL_TASKS_REMAINS: '完了してない集計フローが残っているため作成できません。',
            NO_INDIVIDUAL_CARES: '独立したケア体験が存在しないため作成できません。',
            NO_COMPLETED_GROUPING_TASKS: '完了したグルーピングフローがないため作成できません。',
        }
    };
}
