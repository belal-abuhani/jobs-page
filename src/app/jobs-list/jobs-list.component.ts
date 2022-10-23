import { Job } from './../model/job.model';
import { JobService } from './../job.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss'],
})
export class JobsListComponent implements OnInit {
  showDialog = false;
  jobs: Job[] = [];

  public current: number = 1;
  public jobsToDisplay: Job[] = [];
  public perPage = 10;
  public total: number = 0;

  constructor(protected jobService: JobService) {}

  ngOnInit(): void {
    this.jobService.jobsListObservable.subscribe((jobs) => {
      this.jobs = jobs;
      this.total = Math.ceil(jobs.length / this.perPage);
      this.jobsToDisplay = this.paginate(this.current, this.perPage);
    });
  }

  onClick() {
    this.showDialog = true;
  }

  onAddJob(job: Job) {
    this.jobService.addJob(job);
  }

  setShowDialog(value: boolean) {
    this.showDialog = value;
  }

  onSearch(value: string) {
    this.jobService.setFilters({
      ...this.jobService.selectedFilters,
      search: value,
    });
  }

  public paginate(current: number, perPage: number): Job[] {
    return [...this.jobs.slice((current - 1) * perPage).slice(0, perPage)];
  }

  public onGoTo(page: number): void {
    this.current = page;
    this.jobsToDisplay = this.paginate(this.current, this.perPage);
  }

  public onNext(page: number): void {
    this.current = page + 1;
    this.jobsToDisplay = this.paginate(this.current, this.perPage);
  }

  public onPrevious(page: number): void {
    this.current = page - 1;
    this.jobsToDisplay = this.paginate(this.current, this.perPage);
  }
}
