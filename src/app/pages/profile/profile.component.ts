import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProfileContentComponent } from '../../components/profile-content/profile-content.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ProfileContentComponent],
})
export class ProfileComponent implements OnInit {
  private dateOfBirth: Date = new Date(Date.UTC(1993, 9, 26));

  public dateOfBirthDisplay: string;

  public currentAge: number;

  public educationSurreyDetails: Array<string>;

  public educationQmcDetails: Array<string>;

  public educationBhccDetails: Array<string>;

  public workExperienceEasyParkDetails: Array<string>;

  constructor() {}

  ngOnInit() {
    const timeDiff = Math.abs(Date.now() - Number(this.dateOfBirth));
    this.currentAge = Math.floor(timeDiff / (1000 * 3600 * 24) / 365);

    this.dateOfBirthDisplay = this.dateOfBirth.toLocaleDateString('en-GB');

    this.educationSurreyDetails = [
      'Bachelor of Science in Computer Science (2:1)',
      `Final year project involves researching Games Development techniques and 
    comparisons of various popular game engines at the time.`,
    ];

    this.educationQmcDetails = [
      'Computing(B), Mathematics(B), Electronics(A), AS-Level Sociology(B), GCSE Japanese(A*)',
    ];

    this.educationBhccDetails = [
      '12 GCSEs between A* - C including Maths(A) and English(B)',
    ];

    this.workExperienceEasyParkDetails = [
      `Implement new features, fixing bugs and tech debt for a back-office
      React application with a small agile team of five developers, a
      product manager and engineering manager.`,
      `Help write E2e tests using Cypress.`,
      `Write and mantain unit tests using Jest Javascript Testing Framework.`,
      `Wrote an update infrastructure-as-code (IaC) to assist in migrating a
      React application to AWS EKS.`,
      `Getting involved in meetings with the team to discuss upcoming
      priorities/refinements.`,
    ];
  }
}
