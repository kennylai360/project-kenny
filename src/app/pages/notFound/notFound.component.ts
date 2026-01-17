
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-not-found',
    templateUrl: './notFound.component.html',
    styleUrls: ['./notFound.component.scss'],
    imports: [FontAwesomeModule]
})
export class NotFoundComponent {
  public requestedUrl: string;

  protected icons = {
    notFound: faTriangleExclamation,
  };

  public constructor(private router: Router, private titleService: Title) {
    this.requestedUrl = this.router.url;
    this.titleService.setTitle('Error 404 - Page not found!');
  }
}
