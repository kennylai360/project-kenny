import { DatePipe } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { BlogService } from '../../../api/blog.service';
import { IBlogPost } from '../blog-post.interface';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, RouterLink],
})
export class BlogListComponent {
  private blogService = inject(BlogService);

  // undefined while loading, [] when empty or the index failed to load
  protected posts = toSignal(
    this.blogService.posts$.pipe(catchError(() => of([] as IBlogPost[])))
  );
}
