import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  filters = [
    {
      name: 'sector',
      checkboxes: [
        { value: 'sales', label: 'Sales' },
        { value: 'airlines', label: 'Airlines' },
        { value: 'administration', label: 'Administration' },
        { value: 'computerSoftware', label: 'Computer Software' },
      ],
    },
    {
      name: 'country',
      checkboxes: [
        { value: 'palestine', label: 'Palestine' },
        { value: 'jordan', label: 'Jordan' },
        { value: 'lebanon', label: 'Lebanon' },
        { value: 'saudiArabia', label: 'Saudi Arabia' },
      ],
    },
    {
      name: 'city',
      checkboxes: [{ value: 'beirut', label: 'Beirut' }],
    },
  ];
  constructor() {}
}
