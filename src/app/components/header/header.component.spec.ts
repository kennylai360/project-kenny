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

    it('should test the twitter link will have href to twitter profile', () => {
      const twitterHref = fixture.debugElement
        .query(By.css('a[data-qa="qa-twitter-link"]'))
        .nativeElement.getAttribute('href');
      expect(twitterHref).toEqual('https://www.twitter.com/KENIII26');
    });

    it('should test the twitch link will have href to twitch profile', () => {
      const twitchHref = fixture.debugElement
        .query(By.css('a[data-qa="qa-twitch-link"]'))
        .nativeElement.getAttribute('href');
      expect(twitchHref).toEqual('https://www.twitch.tv/KENIII26');
    });

    it('should test the instagram link will have href to instagram profile', () => {
      const instagramHref = fixture.debugElement
        .query(By.css('a[data-qa="qa-instagram-link"]'))
        .nativeElement.getAttribute('href');
      expect(instagramHref).toEqual('https://www.instagram.com/kennykinkeelai');
    });
  });

  it('should check the UI should be consistent', () => {
    expect(fixture.nativeElement).toMatchSnapshot();
  });
});
