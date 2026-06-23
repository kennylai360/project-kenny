import { Component, inject, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, DatePipe } from '@angular/common';
import { CommentsService } from './comments.service';

@Component({
  selector: 'app-jp-2026-schedule',
  templateUrl: './jp-2026-schedule.component.html',
  styleUrl: './jp-2026-schedule.component.scss',
  imports: [FormsModule, AsyncPipe, DatePipe],
  providers: [CommentsService],
})
export class Jp2026ScheduleComponent implements OnDestroy {
  protected commentsService = inject(CommentsService);
  protected name = '';
  protected text = '';
  protected submitting = false;

  async submitComment(): Promise<void> {
    const name = this.name.trim();
    const text = this.text.trim();
    if (!name || !text) return;

    this.submitting = true;
    await this.commentsService.addComment(name, text);
    this.text = '';
    this.submitting = false;
  }

  ngOnDestroy(): void {
    this.commentsService.destroy();
  }
}
