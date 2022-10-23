import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import JobsList from '../assets/jobs-list.json';
import { Filters, Job } from './model/job.model';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  jobs: Job[] = [...JobsList];
  filters: Filters = { search: '', city: [], sector: [], country: [] };

  private jobsList = new BehaviorSubject([...this.jobs]);

  jobsListObservable = this.jobsList.asObservable();

  constructor() {
    this.jobsList.next([...this.jobs]);
  }

  addJob(job: Job) {
    this.jobs = [{ ...job, id: Math.random() }, ...this.jobs];
    this.jobsList.next([...this.jobs]);
  }

  setFilters(newFilters: Filters) {
    this.filters = { ...newFilters };
    this.FilterJobsList(this.filters);
  }

  FilterJobsList(filters: Filters) {
    let jobs: Job[] = [...this.jobs];

    if (filters.search) {
      jobs = [...jobs.filter(({ title }) => title.includes(filters.search))];
    }

    if (filters.city.length > 0) {
      jobs = [...jobs.filter(({ city }) => filters.city.includes(city))];
    }

    if (filters.sector.length > 0) {
      jobs = [...jobs.filter(({ sector }) => filters.sector.includes(sector))];
    }

    if (filters.country.length > 0) {
      jobs = [
        ...jobs.filter(({ country }) => filters.country.includes(country)),
      ];
    }

    this.jobsList.next([...jobs]);
  }

  deletJob(jobId: number) {
    this.jobs = this.jobs.filter(({ id }) => id !== jobId);
    this.jobsList.next([
      ...(this.jobs = this.jobs.filter(({ id }) => id !== jobId)),
    ]);
  }
}
