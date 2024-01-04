import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './notFound.component.html',
  styleUrls: ['./notFound.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class NotFoundComponent {
  public requestedUrl: string;

  public constructor(private router: Router, private titleService: Title) {
    this.requestedUrl = this.router.url;
    this.titleService.setTitle('Error 404 - Page not found!');
  }
}
