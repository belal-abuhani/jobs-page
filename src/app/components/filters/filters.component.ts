import { FiltersInput } from './../../model/job.model';
import { JobService } from '../../job.service';
import { Component, Input, OnInit } from '@angular/core';
import { Filters } from 'src/app/model/job.model';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class sectorComponent implements OnInit {
  @Input() filters: FiltersInput | null = [];

  selectedFilters: Omit<Filters, 'search'> = {
    city: [],
    sector: [],
    country: [],
  };

  constructor(protected jobService: JobService) {}

  ngOnInit(): void {}

  onChange({ name, values }: { name: string; values: string }) {
    this.selectedFilters = { ...this.selectedFilters, [name]: values };
    this.jobService.setFilters({
      ...this.jobService.selectedFilters,
      ...this.selectedFilters,
    });
  }
}
