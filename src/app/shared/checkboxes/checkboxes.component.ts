import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkboxes',
  templateUrl: './checkboxes.component.html',
  styleUrls: ['./checkboxes.component.scss'],
})
export class CheckboxesComponent implements OnInit {
  @Input() checkboxes: { value: string; label: string }[] = [];
  @Input() name: string = '';
  @Output() onCahnge = new EventEmitter();

  values: string[] = [];

  constructor() {}

  ngOnInit(): void {}

  onCheckChange(event: any) {
    if (event.target.checked) {
      this.values.push(event.target.value);
    } else {
      this.values = this.values.filter((value) => value != event.target.value);
    }

    this.onCahnge.emit({ name: this.name, values: this.values });
  }
}
