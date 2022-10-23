import { PaginationComponent } from './shared/pagination/pagination.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { JobComponent } from './components/job/job.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { sectorComponent } from './components/filters/filters.component';
import { CheckboxesComponent } from './shared/checkboxes/checkboxes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddJobComponent } from './components/add-job/add-job.component';
import { DialogComponent } from './shared/dialog/dialog.component';
import { SearchInputComponent } from './shared/search-input/search-input.component';
import { JobService } from './job.service';
@NgModule({
  declarations: [
    AppComponent,
    JobComponent,
    JobsListComponent,
    sectorComponent,
    CheckboxesComponent,
    AddJobComponent,
    AddJobComponent,
    DialogComponent,
    SearchInputComponent,
    PaginationComponent,
  ],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [JobService],
  bootstrap: [AppComponent],
})
export class AppModule {}
