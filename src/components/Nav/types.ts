export interface LevelProp {
  isOpen: boolean;
  level?: number;
}

export interface MenuItem {
  name: string;
  link: string;
  children: MenuItem[] | null;
}
