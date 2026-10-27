import { DatePipe } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { BlogService } from '../../../api/blog.service';
import { IBlogPost } from '../blog-post.interface';

interface ILoadedPost {
  post: IBlogPost;
  html: string;
}

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, FontAwesomeModule, RouterLink],
})
export class BlogPostComponent {
  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);
  private titleService = inject(Title);

  protected icons = {
    back: faArrowLeft,
  };

  // undefined while loading, null when the slug doesn't match a post
  protected loadedPost = toSignal(
    this.route.paramMap.pipe(
      map((params) => params.get('slug')),
      switchMap((slug) => this.loadPost(slug)),
      tap((loaded) =>
        this.titleService.setTitle(loaded ? loaded.post.title : 'Post not found')
      )
    )
  );

  // The dev server and nginx both fall back to index.html for unknown paths,
  // so look the slug up in the index rather than trusting the html request.
  private loadPost(slug: string): Observable<ILoadedPost | null> {
    return this.blogService.posts$.pipe(
      map((posts) => posts.find((post) => post.slug === slug)),
      switchMap((post) =>
        post
          ? this.blogService
              .loadPostHtml(slug)
              .pipe(map((html) => ({ post, html })))
          : of(null)
      ),
      catchError(() => of(null))
    );
  }
}
