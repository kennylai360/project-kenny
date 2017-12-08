// import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
// import { Http} from '@angular/http';
// import { Observable } from 'rxjs/Observable';
//
// @Component({
//   selector: 'app-galleries',
//   templateUrl: './galleries.component.html',
//   styleUrls: ['./galleries.component.scss'],
//   encapsulation: ViewEncapsulation.None
// })
//
// export class GalleriesComponent {
//   image = 'https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg';
//   iamge1 = 'https://farm1.staticflickr.com/642/31998184046_427f0aff78_k.jpg';
//   image2 = 'https://farm6.staticflickr.com/5482/22767392148_84fffcaa32_k.jpg';
//   image3 = 'https://farm6.staticflickr.com/5530/22828936808_4213e371d9_k.jpg'
//
//   constructor(private http: Http) {}
//
//   // Split this up into another separate generic file which can be imported and used for other gallery components
//   public readJSONFile(): Observable<any> {
//     return this. http.get('../../assets/gallery-1.json')
//       .map((res: any) => res.json());
//
//   }
// }

import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-galleries',
  styles: [`
        img {
            min-width: 1497px;
            width: 100%;
            min-height: 1127px;
            transition: opacity 1s;
            opacity: 0;
        }

        img.ng-lazyloaded {
            opacity: 1;
        }
    `],
  template: `
        <img
          *ngFor="let image of images"
          [defaultImage]="defaultImage"
          [errorImage]="errorImage"
          [lazyLoad]="image">
    `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleriesComponent {
  errorImage = 'https://i.imgur.com/XkU4Ajf.png';
  defaultImage = 'https://www.placecage.com/1000/1000';

  images = [
    'https://images.unsplash.com/photo-1468413922365-e3766a17da9e?dpr=2&auto=compress,format&fit=crop&w=1199&h=800&q=80',
    'https://images.unsplash.com/photo-1488388373205-a134c1cc7e4e?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80',
    'https://images.unsplash.com/photo-1422257986712-4f02edc298ce?dpr=2&auto=compress,format&fit=crop&w=1199&h=1199&q=80'
  ];
}