import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatListModule, MatToolbarModule, MatInputModule, MatProgressSpinnerModule, MatTableModule, MatFormFieldModule, MatCardModule, MatSelectModule, MatGridListModule, MatProgressBarModule, MatSidenavModule, MatDialogModule, MatPaginatorModule, MatSortModule, MatMenuModule, MatDividerModule, MatExpansionModule, MatStepperModule, MatRadioModule, MatCheckboxModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatInputModule, MatProgressSpinnerModule, MatTableModule, MatFormFieldModule, MatCardModule, MatSelectModule, MatGridListModule, MatProgressBarModule, MatSidenavModule, MatDialogModule, MatPaginatorModule, MatSortModule, MatListModule, MatMenuModule, MatDividerModule, MatExpansionModule, MatStepperModule, MatRadioModule, MatCheckboxModule],
  exports: [MatButtonModule, MatToolbarModule, MatInputModule, MatProgressSpinnerModule, MatTableModule, MatFormFieldModule, MatCardModule, MatSelectModule, MatGridListModule, MatProgressBarModule, MatSidenavModule, MatDialogModule, MatPaginatorModule, MatSortModule, MatListModule, MatMenuModule, MatDividerModule, MatExpansionModule, MatStepperModule, MatRadioModule, MatCheckboxModule],
})
export class MaterialModule { }
