import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
  });

  describe('Header links', () => {
    it('should test the home link will have routerLink to /', () => {
      const homeRouterLink = fixture.debugElement
        .query(By.css('a[data-qa="qa-home-link"]'))
        .nativeElement.getAttribute('routerLink');
      expect(homeRouterLink).toEqual('/');
    });

    it('should test the resume link will have routerLink to /resume', () => {
      const homeRouterLink = fixture.debugElement
        .query(By.css('a[data-qa="qa-resume-link"]'))
        .nativeElement.getAttribute('routerLink');
      expect(homeRouterLink).toEqual('/resume');
    });

    it('should test the photography link will have routerLink to /photography', () => {
      const homeRouterLink = fixture.debugElement
        .query(By.css('a[data-qa="qa-photography-link"]'))
        .nativeElement.getAttribute('routerLink');
      expect(homeRouterLink).toEqual('/photography');
    });

    it('should test the twitter link will have href to twitter profile', () => {
      const homeRouterLink = fixture.debugElement
        .query(By.css('a[data-qa="qa-twitter-link"]'))
        .nativeElement.getAttribute('href');
      expect(homeRouterLink).toEqual('https://www.twitter.com/KENIII26');
    });

    it('should test the twitch link will have href to twitch profile', () => {
      const homeRouterLink = fixture.debugElement
        .query(By.css('a[data-qa="qa-twitch-link"]'))
        .nativeElement.getAttribute('href');
      expect(homeRouterLink).toEqual('https://www.twitch.tv/KENIII26');
    });

    it('should test the instagram link will have href to instagram profile', () => {
      const homeRouterLink = fixture.debugElement
        .query(By.css('a[data-qa="qa-instagram-link"]'))
        .nativeElement.getAttribute('href');
      expect(homeRouterLink).toEqual(
        'https://www.instagram.com/kennykinkeelai'
      );
    });
  });

  it('should check the UI should be consistent', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    expect(fixture.nativeElement).toMatchSnapshot();
  });
});
