import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './notFound.component.html',
  styleUrls: ['./notFound.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class NotFoundComponent {}
