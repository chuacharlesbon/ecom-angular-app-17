import { Component } from '@angular/core';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {
  newDate = new Date();
  currentDate = this.newDate.getDate().toString();
  currentMonth = this.newDate.getMonth();
  currentYear = this.newDate.getFullYear().toString();
  newMonth: string;

  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  constructor() {
    this.currentDate = this.currentDate;
    this.currentYear = this.currentYear;
    this.newMonth = (this.months[this.currentMonth]).toString();
  }
}
