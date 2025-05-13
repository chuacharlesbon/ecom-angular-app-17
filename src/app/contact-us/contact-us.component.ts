import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  async ngAfterViewInit() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
