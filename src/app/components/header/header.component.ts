
import {
  Component,
  ChangeDetectionStrategy,
  computed,
  ElementRef,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { isActive, Router, RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import {
  faBomb,
  faCalculator,
  faCameraRetro,
  faCat,
  faChevronDown,
  faFile,
  faPenNib,
  faEllipsis,
  faHouseChimney,
} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterModule, FontAwesomeModule]
})
export class HeaderComponent {
  protected blogEnabled = environment.features.blog;

  protected icons = {
    home: faHouseChimney,
    resume: faFile,
    photography: faCameraRetro,
    blog: faPenNib,
    btcCalculator: faCalculator,
    copyCatMocking: faCat,
    bombGame: faBomb,
    misc: faEllipsis,
    caret: faChevronDown,
    twitter: faXTwitter,
    github: faGithub,
  };

  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private router = inject(Router);

  // The menu is only in the DOM while open, so Misc's active state can't come from routerLinkActive
  private miscRoutes = ['/converter', '/utils', '/bomb-game'].map((url) => isActive(url, this.router));
  protected miscActive = computed(() => this.miscRoutes.some((active) => active()));

  protected menuOpen = signal(false);

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    const dropdown = this.elementRef.nativeElement.querySelector('.nav-dropdown');
    if (!dropdown?.contains(event.target as Node)) {
      this.closeMenu();
    }
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.closeMenu();
  }
}
