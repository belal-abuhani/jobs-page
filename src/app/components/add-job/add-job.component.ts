import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss'],
})
export class AddJobComponent implements OnInit {
  @Output() dataSubmit = new EventEmitter();
  @Output() setShowDialog = new EventEmitter();

  sectors = [
    { value: 'sales', label: 'Sales' },
    { value: 'airlines', label: 'Airlines' },
    { value: 'administration', label: 'Administration' },
    { value: 'computerSoftware', label: 'Computer Software' },
  ];

  countries = [
    { value: 'palestine', label: 'Palestine' },
    { value: 'jordan', label: 'Jordan' },
    { value: 'lebanon', label: 'Lebanon' },
    { value: 'saudiArabia', label: 'Saudi Arabia' },
    { value: 'qatar', label: 'Qatar' },
  ];

  cities = [
    { value: 'beirut', label: 'Beirut' },
    { value: 'nablus', label: 'Nablus' },
    { value: 'doha', label: 'Doha' },
    { value: 'ramallah', label: 'Ramallah' },
    { value: 'tulkarem', label: 'Tulkarem' },
    { value: 'amman', label: 'Amman' },
  ];

  addJob = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    sector: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    this.dataSubmit.emit(this.addJob.value);
    this.addJob.reset({
      title: '',
      sector: '',
      country: '',
      city: '',
      description: '',
    });
    this.setShowDialog.emit(false);
  }

  onCancel() {
    this.setShowDialog.emit(false);
  }
}
