import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  async ngAfterViewInit() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
