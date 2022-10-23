import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import JobsList from '../assets/jobs-list.json';
import { Filters, Job } from './model/job.model';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  jobs: Job[] = [...JobsList];
  selectedFilters: Filters = { search: '', city: [], sector: [], country: [] };

  private jobsList = new BehaviorSubject([...this.jobs]);
  private filtersList = new BehaviorSubject(this.generateFiltersList());

  jobsListObservable = this.jobsList.asObservable();
  filtersListObservable = this.filtersList.asObservable();

  constructor() {
    this.jobsList.next([...this.jobs]);
    this.filtersList.next(this.generateFiltersList());
  }

  generateFiltersList() {
    const generatedFilter = this.jobs.reduce(
      (acc, job) => {
        return {
          city: [...new Set([...acc.city, job.city])],
          country: [...new Set([...acc.country, job.country])],
          sector: [...new Set([...acc.sector, job.sector])],
        };
      },
      { city: [], sector: [], country: [] } as Omit<Filters, 'search'>
    );

    return [
      {
        name: 'city',
        checkboxes: generatedFilter.city.map((value) => {
          return {
            value: value,
            isChecked: this.selectedFilters.city.includes(value),
          };
        }),
      },
      {
        name: 'country',
        checkboxes: generatedFilter.country.map((value) => {
          return {
            value: value,
            isChecked: this.selectedFilters.country.includes(value),
          };
        }),
      },
      {
        name: 'sector',
        checkboxes: generatedFilter.sector.map((value) => {
          return {
            value: value,
            isChecked: this.selectedFilters.sector.includes(value),
          };
        }),
      },
    ];
  }

  addJob(job: Job) {
    this.jobs = [{ ...job, id: Math.random() }, ...this.jobs];
    this.jobsList.next([...this.jobs]);
    this.filtersList.next(this.generateFiltersList());
  }

  setFilters(newFilters: Filters) {
    this.selectedFilters = { ...newFilters };
    this.filterJobsList(this.selectedFilters);
  }

  filterJobsList(filters: Filters) {
    let filterdJobs: Job[] = [...this.jobs];
    if (filters.search) {
      filterdJobs = [
        ...filterdJobs.filter(({ title }) => title.includes(filters.search)),
      ];
    }

    if (filters.city.length > 0) {
      filterdJobs = [
        ...filterdJobs.filter(({ city }) => filters.city.includes(city)),
      ];
    }

    if (filters.sector.length > 0) {
      filterdJobs = [
        ...filterdJobs.filter(({ sector }) => filters.sector.includes(sector)),
      ];
    }

    if (filters.country.length > 0) {
      filterdJobs = [
        ...filterdJobs.filter(({ country }) =>
          filters.country.includes(country)
        ),
      ];
    }

    this.jobsList.next([...filterdJobs]);
  }

  deletJob(jobId: number) {
    this.jobs = this.jobs.filter(({ id }) => id !== jobId);
    this.jobsList.next([
      ...(this.jobs = this.jobs.filter(({ id }) => id !== jobId)),
    ]);

    const newGeneratedFilter = this.generateFiltersList();

    this.filtersList.next(newGeneratedFilter);

    this.selectedFilters = newGeneratedFilter.reduce(
      (acc, { name, checkboxes }) => {
        let key = name as keyof typeof this.selectedFilters;
        let filter = this.selectedFilters[key];

        if (filter.length > 0 && name !== 'search') {
          filter = (filter as string[]).filter((value) =>
            checkboxes.some((item) => item.value === value)
          );
          acc[key] = filter;
        }

        return {
          ...acc,
        };
      },
      { ...this.selectedFilters } as any
    ) as Filters;

    this.filterJobsList(this.selectedFilters);
  }
}
