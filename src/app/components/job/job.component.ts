import { JobService } from '../../job.service';
import { Component, Input, OnInit } from '@angular/core';
import { Job } from 'src/app/model/job.model';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit {
  @Input() jobData!: Job;
  constructor(protected jobService: JobService) {}

  ngOnInit(): void {}

  onDelet(id: number) {
    this.jobService.deletJob(id);
  }
}
