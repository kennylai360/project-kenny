import { TestBed } from '@angular/core/testing';
import { NotFoundComponent } from './notFound.component';

describe('NotFoundComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(NotFoundComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should do a snapshot test', () => {
    const fixture = TestBed.createComponent(NotFoundComponent);
    expect(fixture.nativeElement).toMatchSnapshot();
  });
});
