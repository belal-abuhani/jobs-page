import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements OnInit {
  @Input() placeholder: string = '';
  @Output() inputChange = new EventEmitter();

  private subjextOnChange = new Subject<any>();

  constructor() {}

  ngOnInit(): void {
    this.subjextOnChange.pipe(debounceTime(500)).subscribe((value) => {
      this.inputChange.emit(value);
    });
  }

  onChange($event: Event) {
    this.subjextOnChange.next(($event.target as HTMLInputElement).value);
  }
}
