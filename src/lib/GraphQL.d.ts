declare namespace GraphQL {
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
