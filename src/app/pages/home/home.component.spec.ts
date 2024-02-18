import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { HomeComponent } from './home.component';

describe('Home component', () => {
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HomeComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
  });

  describe('Links and attributes', () => {
    it('should test the resume link will have routerLink to /resume', () => {
      const resumeRouterLink = fixture.debugElement
        .query(By.css('a[data-qa="qa-resume-link"]'))
        .nativeElement.getAttribute('routerLink');
      expect(resumeRouterLink).toEqual('/resume');
    });

    it('should test the photography link will have routerLink to /photography', () => {
      const photographyRouterLink = fixture.debugElement
        .query(By.css('a[data-qa="qa-photography-link"]'))
        .nativeElement.getAttribute('routerLink');
      expect(photographyRouterLink).toEqual('/photography');
    });

    it('should test the github link will have routerLink to the correct github url', () => {
      const githubLink = fixture.debugElement
        .query(By.css('a[data-qa="qa-github-link"]'))
        .nativeElement.getAttribute('href');
      expect(githubLink).toEqual('https://www.github.com/kennylai360');
    });

    it('should check that the github link has a rel attribute with values of noreferrer noopener', () => {
      const githubRelAttribute = fixture.debugElement
        .query(By.css('a[data-qa="qa-github-link"]'))
        .nativeElement.getAttribute('rel');
      expect(githubRelAttribute).toEqual('noreferrer noopener');
    });
  });

  it('should check the home UI should match snapshots', () => {
    expect(fixture.nativeElement).toMatchSnapshot();
  });
});
