import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import Phaser from 'phaser';
import { createBombDefusalGame } from './bomb-defusal-game';

@Component({
    selector: 'app-bomb-game',
    templateUrl: './bomb-game.component.html',
    styleUrl: './bomb-game.component.scss',
    imports: []
})
export class BombGameComponent implements AfterViewInit, OnDestroy {
  @ViewChild('gameContainer', { static: true }) gameContainer!: ElementRef<HTMLDivElement>;

  private game: Phaser.Game | undefined;

  ngAfterViewInit(): void {
    this.game = createBombDefusalGame(this.gameContainer.nativeElement);
  }

  ngOnDestroy(): void {
    this.game?.destroy(true);
  }
}
