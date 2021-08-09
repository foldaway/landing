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
    updatedAt: string;
    isArchived: boolean;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type Edge = Record<string, any>;
}
