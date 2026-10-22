export interface IBlogPost {
  slug: string;
  title: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  description: string;
  tags: string[];
  readingTimeMinutes: number;
}
