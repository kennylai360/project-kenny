import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-not-found',
    templateUrl: './notFound.component.html',
    styleUrl: './notFound.component.scss',
    imports: [FontAwesomeModule]
})
export class NotFoundComponent {
  private router = inject(Router);
  private titleService = inject(Title);

  public requestedUrl: string;

  protected icons = {
    notFound: faTriangleExclamation,
  };

  public constructor() {
    this.requestedUrl = this.router.url;
    this.titleService.setTitle('Error 404 - Page not found!');
  }
}
