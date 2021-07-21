import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  imports: [],
  providers: [],
  exports: [
    MatToolbarModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  entryComponents: []
})

export class AngularMaterialModule {

  /** A label for the cancel button */
  cancelBtnLabel = 'キャンセル';

  /** A label for the set button */
  setBtnLabel = '選択';
}


// export function CustomPaginator(): MatPaginatorIntl {
//   const customPaginatorIntl = new MatPaginatorIntl();

//   customPaginatorIntl.itemsPerPageLabel = '表示件数:';

//   return customPaginatorIntl;
// }
