# Project Kenny — Architecture

## Codebase Structure

```
project-kenny/src/app/
│
├── app.component ─────────────── Shell (header + router-outlet + footer)
│
├── api/ ──────────────────────── HTTP Services
│   ├── coincap.service          BTC price data (CoinCap API)
│   ├── profile.service          Resume/profile data
│   └── blog.service             Blog index + rendered post HTML
│
├── components/ ───────────────── Shared/Reusable Components
│   ├── header                   Nav bar + social links
│   ├── footer                   Footer
│   ├── gallery-album-cover      Single image thumbnail (emits load status)
│   ├── gallery-album-jumbotron  Album header (title, subtitle, cover)
│   ├── overlay/
│   │   └── overlay-container    Enlarged image modal (keyboard/swipe/click nav)
│   └── profile-content          Resume section block
│
├── pages/ ────────────────────── Routed Page Components
│   ├── home                     /home — landing page
│   ├── profile                  /resume — resume page
│   ├── blog/
│   │   ├── blog-list            /blog — post listing (newest first)
│   │   └── blog-post            /blog/:slug — rendered post
│   ├── galleries/
│   │   ├── gallery-section      /photography — parent (router-outlet)
│   │   ├── gallery-album-listing  /photography — album grid
│   │   └── gallery-album        /photography/:id — album detail + overlay
│   ├── converter                /converter — BTC calculator
│   ├── utils                    /utils — copycat mocking tool
│   └── notFound                 /** — 404 page
│
├── state-management/ ─────────── NgRx Store
│   ├── ngrx-index               Root state (IndexState = app + gallery)
│   │
│   ├── app/ ──────────────────── App State (modal/overlay)
│   │   ├── app-state.interface  { modalOpen, selectedImage, selectedImageId, ... }
│   │   ├── app.actions          Open/Close Modal, UpdateSelectedImage/Id
│   │   ├── app.reducers         State transitions
│   │   ├── app.selectors        modalStatus, selectedImage, selectedImageId, ...
│   │   └── app.facade           Public API for components
│   │
│   └── gallery-list/ ─────────── Gallery State
│       ├── gallery-state.interface  { galleryList, selectedAlbumId, albumData }
│       ├── gallery-cover.interface  IGalleryCover (album metadata)
│       ├── social-media-links.interface
│       ├── gallery.actions      Load/Set gallery data
│       ├── gallery.effects      Side effects (HTTP → store)
│       ├── gallery.reducers     State transitions
│       ├── gallery.selectors    galleryList, albumData, ...
│       └── gallery.facade       Public API for components
│
└── main.ts ───────────────────── Bootstrap + Routes + Providers
```

## Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | redirect → `/home` | |
| `/home` | HomeComponent | Landing page |
| `/resume` | ProfileComponent | Resume page |
| `/photography` | GallerySectionComponent | Parent with router-outlet |
| `/photography` (child) | GalleryAlbumListingComponent | Album grid |
| `/photography/:id` (child) | GalleryAlbumComponent | Album detail + overlay |
| `/blog` | BlogListComponent | Blog post listing |
| `/blog/:slug` | BlogPostComponent | Single blog post |
| `/converter` | ConverterComponent | BTC calculator |
| `/utils` | UtilsComponent | Copycat mocking tool |
| `/**` | NotFoundComponent | 404 page |

## NgRx Store

```
IndexState
├── app: IAppState
│   ├── modalOpen: boolean
│   ├── selectedImage: string (URL)
│   ├── selectedImageId: number
│   └── selectedImageHorizontalOrientation: boolean
│
└── gallery: IGalleryState
    ├── galleryList: IGalleryCover[]
    ├── selectedAlbumId: string
    └── albumData: IGalleryCover
```

## Gallery Overlay Data Flow

```
User clicks thumbnail
        │
        ▼
GalleryAlbumComponent.openModal()
        │
        ├──► AppFacade.updateSelectedImage(url, id, orient)
        │         │
        │         ▼
        │    Store ──► app.reducers ──► app state updated
        │
        └──► AppFacade.openModal()
                  │
                  ▼
             Store ──► app.reducers ──► modalOpen = true

        ┌─────────────────────────────────────────────┐
        │         OverlayContainerComponent            │
        │                                             │
        │  selectedImageId$ ──► currentIndex           │
        │                  ──► displayImageUrl          │
        │                  ──► displayHorizontalOrient  │
        │                                             │
        │  isModalOpen$    ──► show/hide overlay (CSS)  │
        │                  ──► body scroll lock         │
        │                                             │
        │  Input: albumSet ──► image list for nav       │
        │                                             │
        │  Navigation (keyboard/click/swipe):           │
        │    navigateImage() ──► update local state     │
        │                   ──► sync store              │
        │                   ──► [@slideAnimation]       │
        └─────────────────────────────────────────────┘
```

### Navigation inputs

- **Keyboard**: ArrowLeft / ArrowRight / Escape (HostListener on `document:keydown`)
- **Click**: Left/right arrow buttons (desktop only, `@media (hover: hover)`)
- **Swipe**: Touch start/end delta (mobile, HostListener on `document:touchstart`/`touchend`)

All three funnel through `navigateImage(direction)` which updates local state synchronously, then syncs the store.

## Blog

The blog is behind `environment.features.blog` (`src/environments/environment*.ts`):
true in dev, false in prod. When false, the header link and `/blog` routes are
not registered (`/blog` shows the 404 page). Set it to `true` in
`environment.prod.ts` to publish. The generated post files are still bundled
into `assets/` either way, so use `draft: true` for anything not yet public.

Posts are Markdown files in `content/blog/<slug>.md` with frontmatter
(`title` and `date` required; `description`, `tags`, `draft` optional).
`scripts/build-blog.mjs` (run by the `prestart`/`prebuild`/`prebp` npm hooks,
or manually with `npm run blog:build`) renders them to `src/assets/blog/<slug>.html`
plus an `index.json` of metadata. Both are generated and gitignored; the app
fetches them at runtime via `BlogService`. Post images go in
`src/assets/blog/images/` and are referenced as `/assets/blog/images/<file>`.
