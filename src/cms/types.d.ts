declare namespace CMS {
  interface MenuItem {
    name: string;
    link: string;
    children: MenuItem[];
  }

  interface SiteConfiguration {
    title: string;
    menu_items: MenuItem[];
  }

  interface Post {
    title: string;
    content: string;
    pub_date: string;
    author: string;
  }
}
