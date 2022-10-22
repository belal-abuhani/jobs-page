import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  @Output() setShowDialog = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClose(e: any) {
    if (e.target.className === 'overlay') {
      this.setShowDialog.emit();
    }
  }
}
