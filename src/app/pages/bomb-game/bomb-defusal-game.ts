import Phaser from 'phaser';

const CENTER = { x: 400, y: 340 };
const RADIUS = 220;
const START_GREEN_ARC = 70; // degrees wide
const MIN_GREEN_ARC = 15;
const ARC_SHRINK = 4;
const START_SPEED = 100; // degrees per second
const SPEED_STEP = 12;
const MAX_LIVES = 3;
const LIVES_CAP = 5;
const BONUS_LIFE_STREAK = 10;
const START_ZONE_COUNT = 3;
const HITS_PER_ZONE_REMOVAL = 3;
const MISS_PENALTY_PER_SECOND = 40;
const GLOW_DURATION = 0.8;
const COMBO_MULTIPLIER_STEP = 0.1;
const WARNING_DURATION = 0.25;

interface GreenZone {
  start: number;
  size: number;
}

class BombDefusalScene extends Phaser.Scene {
  private dialGfx!: Phaser.GameObjects.Graphics;
  private needleGfx!: Phaser.GameObjects.Graphics;
  private overlayGfx!: Phaser.GameObjects.Graphics;

  private menuButton!: Phaser.GameObjects.Text;
  private fullscreenButton!: Phaser.GameObjects.Text;

  private pauseOverlayGfx!: Phaser.GameObjects.Graphics;
  private pauseTitleText!: Phaser.GameObjects.Text;
  private resumeButton!: Phaser.GameObjects.Text;
  private optionsButton!: Phaser.GameObjects.Text;
  private restartFromPauseButton!: Phaser.GameObjects.Text;

  private optionsOverlayGfx!: Phaser.GameObjects.Graphics;
  private optionsTitleText!: Phaser.GameObjects.Text;
  private soundToggleButton!: Phaser.GameObjects.Text;
  private optionsBackButton!: Phaser.GameObjects.Text;
  private clearHighScoreButton!: Phaser.GameObjects.Text;
  private volumeDownButton!: Phaser.GameObjects.Text;
  private volumeUpButton!: Phaser.GameObjects.Text;
  private volumeText!: Phaser.GameObjects.Text;
  private showingOptions = false;

  private scoreText!: Phaser.GameObjects.Text;
  private livesText!: Phaser.GameObjects.Text;
  private messageText!: Phaser.GameObjects.Text;
  private highScoreText!: Phaser.GameObjects.Text;
  private multiplierText!: Phaser.GameObjects.Text;
  private warningText!: Phaser.GameObjects.Text;

  private angle = 0;
  private speed = START_SPEED;
  private greenArcSize = START_GREEN_ARC;
  private zones: GreenZone[] = [];
  private zoneCount = START_ZONE_COUNT;
  private hitStreak = 0;
  private comboStreak = 0;
  private score = 0;
  private highScore = Number(localStorage.getItem('bombDefuseHighScore')) || 0;
  private lives = MAX_LIVES;
  private gameOver = false;
  private paused = false;
  private flashColor: number | null = null;
  private flashTimer = 0;
  private warningTimer = 0;
  private timeSinceLastAction = 0;
  private greenGlowTimer = 0;
  private redGlowTimer = 0;

  private audioCtx: AudioContext | undefined;
  private soundEnabled = localStorage.getItem('bombDefuseSoundEnabled') !== 'false';
  private soundVolume = (() => {
    const stored = Number(localStorage.getItem('bombDefuseSoundVolume'));
    return Number.isNaN(stored) ? 1 : stored;
  })();

  constructor() {
    super({ key: 'BombDefusalScene' });
  }

  private playTone(freq: number, duration: number, type: OscillatorType = 'sine', volume = 0.25): void {
    if (!this.audioCtx || !this.soundEnabled || this.soundVolume <= 0) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(volume * this.soundVolume, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start();
    osc.stop(this.audioCtx.currentTime + duration);
  }

  private playHitSound(): void {
    this.playTone(880, 0.15, 'sine');
  }

  private playMissSound(): void {
    this.playTone(140, 0.35, 'sawtooth', 0.3);
  }

  private playGameOverSound(): void {
    this.playTone(220, 0.2, 'square', 0.3);
    setTimeout(() => this.playTone(160, 0.2, 'square', 0.3), 150);
    setTimeout(() => this.playTone(100, 0.4, 'square', 0.3), 300);
  }

  private formatHighScoreText(): string {
    return `High Score: ${this.highScore}`;
  }

  private pickGreenZones(): void {
    this.zones = [];
    const gap = 360 / this.zoneCount;
    for (let i = 0; i < this.zoneCount; i++) {
      const base = i * gap;
      const margin = Math.max(gap - this.greenArcSize - 5, 0);
      const start = (base + Phaser.Math.Between(0, margin)) % 360;
      this.zones.push({ start, size: this.greenArcSize });
    }
  }

  private isInZone(normalizedAngle: number, zone: GreenZone): boolean {
    const end = (zone.start + zone.size) % 360;
    return end > zone.start
      ? normalizedAngle >= zone.start && normalizedAngle <= end
      : normalizedAngle >= zone.start || normalizedAngle <= end;
  }

  private getMultiplier(): number {
    return 1 + this.comboStreak * COMBO_MULTIPLIER_STEP;
  }

  create(): void {
    this.dialGfx = this.add.graphics();
    this.needleGfx = this.add.graphics();
    this.overlayGfx = this.add.graphics().setDepth(10);

    this.scoreText = this.add.text(20, 20, 'Score: 0', { fontSize: '24px', color: '#ffffff' });
    this.livesText = this.add.text(20, 50, 'Lives: 3', { fontSize: '24px', color: '#ffffff' });
    this.multiplierText = this.add.text(20, 80, 'Multiplier: x1.0', { fontSize: '24px', color: '#00ccff' });
    this.highScoreText = this.add
      .text(780, 20, this.formatHighScoreText(), { fontSize: '24px', color: '#ffff00' })
      .setOrigin(1, 0);
    this.messageText = this.add
      .text(CENTER.x, CENTER.y, '', { fontSize: '32px', color: '#ffffff', align: 'center' })
      .setOrigin(0.5)
      .setDepth(11);

    this.warningText = this.add
      .text(CENTER.x, CENTER.y, '!', {
        fontSize: '320px',
        fontStyle: 'bold',
        color: '#ff0000',
        stroke: '#ffffff',
        strokeThickness: 12,
      })
      .setOrigin(0.5)
      .setDepth(12)
      .setAlpha(0);

    this.pickGreenZones();

    this.menuButton = this.add
      .text(780, 50, '☰ Menu', {
        fontSize: '20px',
        color: '#ffffff',
        backgroundColor: '#333333',
        padding: { x: 12, y: 6 },
      })
      .setOrigin(1, 0)
      .setDepth(21)
      .setInteractive({ useHandCursor: true });
    this.menuButton.on('pointerover', () => this.menuButton.setBackgroundColor('#555555'));
    this.menuButton.on('pointerout', () => this.menuButton.setBackgroundColor('#333333'));
    this.menuButton.on('pointerdown', (_pointer: Phaser.Input.Pointer, _x: number, _y: number, event: { stopPropagation: () => void }) => {
      event.stopPropagation();
      this.toggleMenu();
    });

    const fullscreenLabel = () => (this.scale.isFullscreen ? '⛶ Exit Fullscreen' : '⛶ Fullscreen');

    this.fullscreenButton = this.add
      .text(780, 620, fullscreenLabel(), {
        fontSize: '20px',
        color: '#ffffff',
        backgroundColor: '#333333',
        padding: { x: 12, y: 6 },
      })
      .setOrigin(1, 1)
      .setDepth(21)
      .setInteractive({ useHandCursor: true });
    this.fullscreenButton.on('pointerover', () => this.fullscreenButton.setBackgroundColor('#555555'));
    this.fullscreenButton.on('pointerout', () => this.fullscreenButton.setBackgroundColor('#333333'));
    this.fullscreenButton.on('pointerdown', (_pointer: Phaser.Input.Pointer, _x: number, _y: number, event: { stopPropagation: () => void }) => {
      event.stopPropagation();
      this.scale.toggleFullscreen();
    });

    if (this.sys.game.device.fullscreen.available) {
      const onFullscreenChange = () => {
        this.fullscreenButton.setText(fullscreenLabel());
        // The container's box only settles after the browser applies the
        // :fullscreen CSS rules, so defer the resize until the next frame.
        requestAnimationFrame(() => this.scale.refresh());
      };
      this.scale.on('enterfullscreen', onFullscreenChange);
      this.scale.on('leavefullscreen', onFullscreenChange);
    } else {
      this.fullscreenButton.setVisible(false);
    }

    this.pauseOverlayGfx = this.add.graphics().setDepth(20).setVisible(false);
    this.pauseTitleText = this.add
      .text(CENTER.x, CENTER.y - 90, 'Paused', { fontSize: '36px', color: '#ffffff' })
      .setOrigin(0.5)
      .setDepth(21)
      .setVisible(false);

    const makeMenuButton = (y: number, label: string) =>
      this.add
        .text(CENTER.x, y, label, {
          fontSize: '24px',
          color: '#ffffff',
          backgroundColor: '#333333',
          padding: { x: 16, y: 8 },
        })
        .setOrigin(0.5)
        .setDepth(21)
        .setVisible(false)
        .setInteractive({ useHandCursor: true });

    this.resumeButton = makeMenuButton(CENTER.y - 30, 'Resume');
    this.optionsButton = makeMenuButton(CENTER.y + 30, 'Options');
    this.restartFromPauseButton = makeMenuButton(CENTER.y + 90, 'Restart');

    const wireButton = (button: Phaser.GameObjects.Text, onClick: () => void) => {
      button.on('pointerover', () => button.setBackgroundColor('#555555'));
      button.on('pointerout', () => button.setBackgroundColor('#333333'));
      button.on('pointerdown', (_pointer: Phaser.Input.Pointer, _x: number, _y: number, event: { stopPropagation: () => void }) => {
        event.stopPropagation();
        onClick();
      });
    };

    wireButton(this.resumeButton, () => this.setPaused(false));
    wireButton(this.optionsButton, () => this.setShowingOptions(true));
    wireButton(this.restartFromPauseButton, () => {
      this.setPaused(false);
      this.restart();
    });

    this.optionsOverlayGfx = this.add.graphics().setDepth(20).setVisible(false);
    this.optionsTitleText = this.add
      .text(CENTER.x, CENTER.y - 90, 'Options', { fontSize: '36px', color: '#ffffff' })
      .setOrigin(0.5)
      .setDepth(21)
      .setVisible(false);

    this.soundToggleButton = makeMenuButton(CENTER.y - 30, 'Sound: ' + (this.soundEnabled ? 'On' : 'Off'));

    this.volumeDownButton = this.add
      .text(CENTER.x - 130, CENTER.y + 30, '-', {
        fontSize: '24px',
        color: '#ffffff',
        backgroundColor: '#333333',
        padding: { x: 16, y: 4 },
      })
      .setOrigin(0.5)
      .setDepth(21)
      .setVisible(false)
      .setInteractive({ useHandCursor: true });

    this.volumeText = this.add
      .text(CENTER.x, CENTER.y + 30, 'Volume: 100%', { fontSize: '18px', color: '#ffffff' })
      .setOrigin(0.5)
      .setDepth(21)
      .setVisible(false);

    this.volumeUpButton = this.add
      .text(CENTER.x + 130, CENTER.y + 30, '+', {
        fontSize: '24px',
        color: '#ffffff',
        backgroundColor: '#333333',
        padding: { x: 16, y: 4 },
      })
      .setOrigin(0.5)
      .setDepth(21)
      .setVisible(false)
      .setInteractive({ useHandCursor: true });

    this.clearHighScoreButton = makeMenuButton(CENTER.y + 90, 'Clear High Score');
    this.optionsBackButton = makeMenuButton(CENTER.y + 150, 'Back');

    const updateVolumeText = () => this.volumeText.setText('Volume: ' + Math.round(this.soundVolume * 100) + '%');
    updateVolumeText();

    wireButton(this.soundToggleButton, () => {
      this.soundEnabled = !this.soundEnabled;
      localStorage.setItem('bombDefuseSoundEnabled', String(this.soundEnabled));
      this.soundToggleButton.setText('Sound: ' + (this.soundEnabled ? 'On' : 'Off'));
    });

    const setVolume = (value: number) => {
      this.soundVolume = Math.max(0, Math.min(2, Math.round(value * 10) / 10));
      localStorage.setItem('bombDefuseSoundVolume', String(this.soundVolume));
      updateVolumeText();

      this.soundEnabled = this.soundVolume > 0;
      localStorage.setItem('bombDefuseSoundEnabled', String(this.soundEnabled));
      this.soundToggleButton.setText('Sound: ' + (this.soundEnabled ? 'On' : 'Off'));
    };

    wireButton(this.volumeDownButton, () => setVolume(this.soundVolume - 0.1));
    wireButton(this.volumeUpButton, () => setVolume(this.soundVolume + 0.1));
    wireButton(this.clearHighScoreButton, () => {
      this.highScore = 0;
      localStorage.removeItem('bombDefuseHighScore');
      this.highScoreText.setText(this.formatHighScoreText());
    });
    wireButton(this.optionsBackButton, () => this.setShowingOptions(false));

    const triggerAction = () => {
      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      if (this.paused) return;

      if (this.gameOver) {
        this.restart();
        return;
      }
      this.handleClick();
    };

    this.input.on('pointerdown', triggerAction);
    this.input.keyboard?.on('keydown-SPACE', triggerAction);
    this.input.keyboard?.on('keydown-ESC', () => this.toggleMenu());
    this.input.keyboard?.on('keydown-R', () => {
      if (!this.paused || this.showingOptions) return;
      this.setPaused(false);
      this.restart();
    });
  }

  private toggleMenu(): void {
    if (this.gameOver) return;
    if (this.paused && this.showingOptions) {
      this.setShowingOptions(false);
      return;
    }
    this.setPaused(!this.paused);
  }

  private setPaused(value: boolean): void {
    this.paused = value;
    if (!this.paused) {
      this.showingOptions = false;
      this.optionsOverlayGfx.setVisible(false);
      this.optionsTitleText.setVisible(false);
      this.soundToggleButton.setVisible(false);
      this.volumeDownButton.setVisible(false);
      this.volumeText.setVisible(false);
      this.volumeUpButton.setVisible(false);
      this.clearHighScoreButton.setVisible(false);
      this.optionsBackButton.setVisible(false);
    }
    this.updatePauseMenuVisibility();
  }

  private setShowingOptions(value: boolean): void {
    this.showingOptions = value;
    this.updatePauseMenuVisibility();
  }

  private updatePauseMenuVisibility(): void {
    const showPauseMenu = this.paused && !this.showingOptions;
    this.pauseOverlayGfx.setVisible(showPauseMenu);
    this.pauseTitleText.setVisible(showPauseMenu);
    this.resumeButton.setVisible(showPauseMenu);
    this.optionsButton.setVisible(showPauseMenu);
    this.restartFromPauseButton.setVisible(showPauseMenu);

    if (showPauseMenu) {
      const w = 300;
      const h = 280;
      const x = CENTER.x - w / 2;
      const y = CENTER.y - h / 2;
      this.pauseOverlayGfx.clear();
      this.pauseOverlayGfx.fillStyle(0x000000, 0.75);
      this.pauseOverlayGfx.fillRoundedRect(x, y, w, h, 16);
      this.pauseOverlayGfx.lineStyle(3, 0xffffff, 1);
      this.pauseOverlayGfx.strokeRoundedRect(x, y, w, h, 16);
    }

    const showOptionsMenu = this.paused && this.showingOptions;
    this.optionsOverlayGfx.setVisible(showOptionsMenu);
    this.optionsTitleText.setVisible(showOptionsMenu);
    this.soundToggleButton.setVisible(showOptionsMenu);
    this.volumeDownButton.setVisible(showOptionsMenu);
    this.volumeText.setVisible(showOptionsMenu);
    this.volumeUpButton.setVisible(showOptionsMenu);
    this.clearHighScoreButton.setVisible(showOptionsMenu);
    this.optionsBackButton.setVisible(showOptionsMenu);

    if (showOptionsMenu) {
      const w = 420;
      const h = 340;
      const x = CENTER.x - w / 2;
      const y = CENTER.y - 138;
      this.optionsOverlayGfx.clear();
      this.optionsOverlayGfx.fillStyle(0x000000, 0.75);
      this.optionsOverlayGfx.fillRoundedRect(x, y, w, h, 16);
      this.optionsOverlayGfx.lineStyle(3, 0xffffff, 1);
      this.optionsOverlayGfx.strokeRoundedRect(x, y, w, h, 16);
    }
  }

  private handleClick(): void {
    const normalized = ((this.angle % 360) + 360) % 360;
    const inGreen = this.zones.some((zone) => this.isInZone(normalized, zone));

    if (inGreen) {
      this.score += Math.round(this.speed * this.getMultiplier());
      this.comboStreak += 1;
      this.speed += SPEED_STEP;
      this.greenArcSize = Math.max(MIN_GREEN_ARC, this.greenArcSize - ARC_SHRINK);

      if (this.comboStreak % BONUS_LIFE_STREAK === 0 && this.lives < LIVES_CAP) {
        this.lives += 1;
      }

      this.hitStreak += 1;
      if (this.hitStreak >= HITS_PER_ZONE_REMOVAL && this.zoneCount > 1) {
        this.zoneCount -= 1;
        this.hitStreak = 0;
      }

      this.pickGreenZones();
      this.flashColor = 0x00ff00;
      this.greenGlowTimer = GLOW_DURATION;
      this.playHitSound();
    } else {
      this.lives -= 1;
      this.flashColor = 0xff0000;
      this.comboStreak = 0;

      const penalty = Math.round(this.timeSinceLastAction * MISS_PENALTY_PER_SECOND);
      this.score = Math.max(0, this.score - penalty);

      if (this.lives <= 0) {
        this.scoreText.setText('Score: ' + this.score);
        this.playGameOverSound();
        this.endGame();
        return;
      }

      this.playMissSound();

      this.speed = Math.max(START_SPEED, this.speed - SPEED_STEP * 2);
      this.greenArcSize = Math.min(START_GREEN_ARC, this.greenArcSize + ARC_SHRINK * 4);
      this.zoneCount = Math.min(START_ZONE_COUNT, this.zoneCount + 1);
      this.hitStreak = 0;
      this.pickGreenZones();

      this.warningTimer = WARNING_DURATION;
      this.redGlowTimer = GLOW_DURATION;
    }
    this.timeSinceLastAction = 0;
    this.flashTimer = 0.15;
    this.scoreText.setText('Score: ' + this.score);
    this.livesText.setText('Lives: ' + this.lives);
    this.multiplierText.setText('Multiplier: x' + this.getMultiplier().toFixed(1));
  }

  private endGame(): void {
    this.gameOver = true;
    this.livesText.setText('Lives: 0');
    this.messageText.setText(`BOOM! Game Over\nScore: ${this.score}\nClick to restart`);

    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('bombDefuseHighScore', String(this.highScore));
      this.highScoreText.setText(this.formatHighScoreText());
    }
  }

  private restart(): void {
    this.angle = 0;
    this.speed = START_SPEED;
    this.greenArcSize = START_GREEN_ARC;
    this.zoneCount = START_ZONE_COUNT;
    this.hitStreak = 0;
    this.comboStreak = 0;
    this.score = 0;
    this.lives = MAX_LIVES;
    this.gameOver = false;
    this.paused = false;
    this.flashColor = null;
    this.warningTimer = 0;
    this.greenGlowTimer = 0;
    this.redGlowTimer = 0;
    this.timeSinceLastAction = 0;
    this.warningText.setAlpha(0);
    this.pickGreenZones();
    this.scoreText.setText('Score: 0');
    this.livesText.setText('Lives: 3');
    this.multiplierText.setText('Multiplier: x1.0');
    this.messageText.setText('');
  }

  update(_time: number, rawDelta: number): void {
    if (this.paused) return;

    const delta = Math.min(rawDelta, 33);

    if (!this.gameOver) {
      this.angle += this.speed * (delta / 1000);
      this.timeSinceLastAction += delta / 1000;
    }

    if (this.flashTimer > 0) {
      this.flashTimer -= delta / 1000;
    }

    if (this.warningTimer > 0) {
      this.warningTimer -= delta / 1000;
      this.warningText.setAlpha(Math.max(0, this.warningTimer / WARNING_DURATION));
    }

    if (this.greenGlowTimer > 0) {
      this.greenGlowTimer -= delta / 1000;
    }

    if (this.redGlowTimer > 0) {
      this.redGlowTimer -= delta / 1000;
    }

    this.drawDial();
    this.drawNeedle();
    this.drawOverlay();
  }

  private drawOverlay(): void {
    this.overlayGfx.clear();
    if (!this.gameOver) return;

    const w = 360;
    const h = 160;
    const x = CENTER.x - w / 2;
    const y = CENTER.y - h / 2;

    this.overlayGfx.fillStyle(0x000000, 0.75);
    this.overlayGfx.fillRoundedRect(x, y, w, h, 16);
    this.overlayGfx.lineStyle(3, 0xff0000, 1);
    this.overlayGfx.strokeRoundedRect(x, y, w, h, 16);
  }

  private drawDial(): void {
    this.dialGfx.clear();

    const bgColor = this.flashTimer > 0 ? this.flashColor! : 0x222222;

    if (this.redGlowTimer > 0) {
      const glowAlpha = this.redGlowTimer / GLOW_DURATION;
      this.dialGfx.fillStyle(0xff0000, glowAlpha * 0.5);
      this.dialGfx.fillCircle(CENTER.x, CENTER.y, RADIUS + 55);
    }

    if (this.greenGlowTimer > 0) {
      const glowAlpha = this.greenGlowTimer / GLOW_DURATION;
      this.dialGfx.fillStyle(0x00ff00, glowAlpha * 0.5);
      this.dialGfx.fillCircle(CENTER.x, CENTER.y, RADIUS + 55);
    }

    const stripeCount = 24;
    const stripeAngle = 360 / stripeCount;
    for (let i = 0; i < stripeCount; i++) {
      this.dialGfx.fillStyle(i % 2 === 0 ? 0xffcc00 : 0x111111, 1);
      this.dialGfx.slice(
        CENTER.x,
        CENTER.y,
        RADIUS + 20,
        Phaser.Math.DegToRad(i * stripeAngle),
        Phaser.Math.DegToRad((i + 1) * stripeAngle),
        false
      );
      this.dialGfx.fillPath();
    }

    this.dialGfx.fillStyle(0xaa0000, 1);
    this.dialGfx.slice(CENTER.x, CENTER.y, RADIUS, 0, Phaser.Math.DegToRad(360), false);
    this.dialGfx.fillPath();

    this.dialGfx.fillStyle(0x00cc00, 1);
    this.zones.forEach((zone) => {
      this.dialGfx.slice(
        CENTER.x,
        CENTER.y,
        RADIUS,
        Phaser.Math.DegToRad(zone.start),
        Phaser.Math.DegToRad(zone.start + zone.size),
        false
      );
      this.dialGfx.fillPath();
    });

    this.dialGfx.fillStyle(bgColor, 1);
    this.dialGfx.fillCircle(CENTER.x, CENTER.y, 30);
  }

  private drawNeedle(): void {
    this.needleGfx.clear();
    this.needleGfx.lineStyle(6, 0xffffff, 1);
    const rad = Phaser.Math.DegToRad(this.angle);
    const x2 = CENTER.x + Math.cos(rad) * RADIUS;
    const y2 = CENTER.y + Math.sin(rad) * RADIUS;
    this.needleGfx.lineBetween(CENTER.x, CENTER.y, x2, y2);
    this.needleGfx.fillStyle(0xffffff, 1);
    this.needleGfx.fillCircle(CENTER.x, CENTER.y, 10);
  }
}

export function createBombDefusalGame(parent: HTMLElement): Phaser.Game {
  return new Phaser.Game({
    type: Phaser.WEBGL,
    width: 800,
    height: 640,
    backgroundColor: '#111111',
    parent,
    // Fullscreen the actual container (rather than letting Phaser create its own
    // wrapper div) so our :fullscreen CSS applies and the scale manager measures
    // the real fullscreen bounds.
    fullscreenTarget: parent,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    render: {
      antialias: false,
      roundPixels: false,
    },
    fps: {
      target: 60,
      smoothStep: true,
    },
    scene: [BombDefusalScene],
  });
}
