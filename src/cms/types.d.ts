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

  interface Member {
    name: string;
    login: string;
    url: string;
    avatarUrl: string;
    websiteUrl?: string;
    location?: string;
  }

  interface Project {
    id: string;
    name: string;
    created_at: string;
    url: string;
    description?: string;
  }
}
