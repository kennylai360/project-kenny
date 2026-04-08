interface Role {
  header?: string;
  roleTitle: string;
  year: string;
  content: Array<string>;
}

export interface ProfileContent {
  section: string;
  sectionContents: Array<Role>;
}
