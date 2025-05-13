import { Component, Input } from '@angular/core';
import { BlogsModel } from '../../myinterfaces/blogs';
import { RouterModule } from '@angular/router';
import { routeNames } from '../../app.routes';

@Component({
  selector: 'app-blogs-cards',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './blogs-cards.component.html',
  styleUrl: './blogs-cards.component.css'
})
export class BlogsCardsComponent {
  @Input() blogData!: BlogsModel;
  blogsLink = `/${routeNames.blog.path}`;
}
